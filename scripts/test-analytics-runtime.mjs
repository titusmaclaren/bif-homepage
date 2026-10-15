import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const runtimePath = fileURLToPath(new URL("../app/lib/analytics-runtime.ts", import.meta.url));
const source = await readFile(runtimePath, "utf8");
const runtime = source.match(/String\.raw`([\s\S]*)`;\s*$/)?.[1];
assert.ok(runtime, "analytics runtime source is a String.raw template");

function createBrowser({ config, href, referrer = "", queue = [], doNotTrack = "0", gpc = false }) {
  const calls = [];
  const listeners = {};
  const addedScripts = [];
  const location = new URL(href);
  const history = {
    pushState(_state, _title, next) {
      if (next) location.href = new URL(next, location.href).href;
    },
    replaceState(_state, _title, next) {
      if (next) location.href = new URL(next, location.href).href;
    },
  };
  const document = {
    referrer,
    head: { appendChild: (script) => addedScripts.push(script) },
    documentElement: { appendChild: (script) => addedScripts.push(script) },
    createElement: (name) => ({ tagName: name }),
    addEventListener: (name, listener) => { listeners[name] = listener; },
  };
  const context = {
    URL,
    URLSearchParams,
    Object,
    Array,
    Date,
    Math,
    isFinite,
    encodeURIComponent,
    decodeURIComponent,
    location,
    history,
    document,
    navigator: { doNotTrack, globalPrivacyControl: gpc },
    addEventListener: (name, listener) => { listeners[name] = listener; },
    __BIF_ANALYTICS_CONFIG__: config,
    bifAnalyticsQueue: queue,
    dataLayer: [],
    doNotTrack,
  };
  context.window = context;
  vm.runInNewContext(runtime, context);
  return { context, calls, listeners, addedScripts, location };
}

test("direct GA drains early events once, strips personal URL data, and tracks SPA pageviews once", () => {
  const { context, addedScripts, location, listeners } = createBrowser({
    config: { enabled: true, mode: "ga", id: "G-TEST123" },
    href: "https://www.blackirisfilms.com/estimate?email=person@example.com&utm_source=summer&utm_campaign=private%40example.com",
    referrer: "https://partner.example/path?phone=0412345678",
    queue: [{
      eventName: "generate_lead",
      params: {
        lead_type: "contact_enquiry",
        form_source: "Website contact form",
        name: "Person Name",
        email: "person@example.com",
        message: "Private message",
      },
    }],
  });

  const events = context.dataLayer.filter((item) => item && item[0] === "event");
  assert.equal(events.filter((item) => item[1] === "generate_lead").length, 1);
  assert.equal(events.filter((item) => item[1] === "page_view").length, 1);
  const initialLead = events.find((item) => item[1] === "generate_lead")[2];
  assert.match(initialLead.page_location, /\/estimate\?utm_source=summer$/);
  assert.equal(initialLead.page_referrer, "https://partner.example/path");
  context.bifAnalytics.trackEvent("form_error", {
    form_source: "The Last $10 contact page",
    error_type: "submission_failed",
  });
  const formError = context.dataLayer.find((item) => item && item[0] === "event" && item[1] === "form_error")[2];
  assert.equal(formError.form_source, "the_last_10_contact");
  assert.equal(formError.error_type, "submission_failed");
  context.bifAnalytics.trackEvent("form_error", { error_type: "unbounded user text" });
  const rejectedError = context.dataLayer.filter((item) => item && item[0] === "event" && item[1] === "form_error").at(-1)[2];
  assert.equal("error_type" in rejectedError, false);
  const serialized = JSON.stringify(context.dataLayer);
  assert.equal(serialized.includes("person@example.com"), false);
  assert.equal(serialized.includes("0412345678"), false);
  assert.equal(serialized.includes("Private message"), false);
  assert.match(serialized, /utm_source=summer/);
  assert.equal(addedScripts.length, 1);

  vm.runInNewContext(runtime, context);
  assert.equal(addedScripts.length, 1, "runtime reinjection must not add another Google script");
  context.history.pushState({}, "", "/contact?name=Private");
  const afterNavigation = context.dataLayer.filter((item) => item && item[0] === "event" && item[1] === "page_view");
  assert.equal(afterNavigation.length, 2, "one pageview is sent for the SPA navigation");
  assert.equal(location.pathname, "/contact");
  context.bifAnalytics.trackEvent("generate_lead", { lead_type: "contact_enquiry" });
  let latestLead = context.dataLayer.filter((item) => item && item[0] === "event" && item[1] === "generate_lead").at(-1)[2];
  assert.equal(latestLead.page_location, "https://www.blackirisfilms.com/contact");
  assert.equal(latestLead.page_referrer, "https://www.blackirisfilms.com/estimate?utm_source=summer");
  const updatedConfig = context.dataLayer.filter((item) => item && item[0] === "config").at(-1)[2];
  assert.equal(updatedConfig.update, true);
  assert.equal(updatedConfig.send_page_view, false, "config context updates do not create an extra pageview");

  location.href = "https://www.blackirisfilms.com/";
  const popstate = listeners.popstate;
  popstate();
  const afterBack = context.dataLayer.filter((item) => item && item[0] === "event" && item[1] === "page_view");
  assert.equal(afterBack.length, 3, "back navigation sends exactly one more pageview");
  context.bifAnalytics.trackEvent("generate_lead", { lead_type: "contact_enquiry" });
  latestLead = context.dataLayer.filter((item) => item && item[0] === "event" && item[1] === "generate_lead").at(-1)[2];
  assert.equal(latestLead.page_location, "https://www.blackirisfilms.com/");
  assert.equal(latestLead.page_referrer, "https://www.blackirisfilms.com/contact");
  assert.equal(JSON.stringify(latestLead).includes("Private"), false);
});

test("production-disabled and privacy-opt-out configurations never load Google scripts", () => {
  for (const options of [
    { config: { enabled: false, mode: "ga", id: "G-TEST123" } },
    { config: { enabled: true, mode: "ga", id: "G-TEST123" }, doNotTrack: "1" },
    { config: { enabled: true, mode: "ga", id: "G-TEST123" }, gpc: true },
  ]) {
    const { context, addedScripts } = createBrowser({
      href: "https://www.blackirisfilms.com/",
      queue: [{ eventName: "generate_lead", params: {} }],
      ...options,
    });
    assert.equal(addedScripts.length, 0);
    assert.equal(context.bifAnalyticsQueue.length, 0);
    context.bifAnalytics.trackEvent("generate_lead", {});
    assert.equal(addedScripts.length, 0);
  }
});

test("click listener classifies contact, quote, case study, booking, downloads, and video without exposing full URLs", () => {
  const { context, listeners } = createBrowser({
    config: { enabled: true, mode: "gtm", id: "GTM-TEST123" },
    href: "https://www.blackirisfilms.com/",
  });
  const click = listeners.click;
  const clickHref = (href) => click({
    target: { closest: () => ({ getAttribute: () => href }) },
  });
  clickHref("tel:+61299998888");
  clickHref("mailto:person@example.com?subject=private");
  clickHref("/estimate?email=person@example.com");
  clickHref("/case-studies/example?secret=1");
  clickHref("https://calendly.com/blackiris/meeting?email=person@example.com");
  clickHref("/assets/brief.pdf?name=private");
  clickHref("https://youtu.be/abcdefgh?secret=1");

  const events = context.dataLayer.filter((item) => item && item.event && item.event !== "gtm.js");
  assert.deepEqual(events.map((item) => item.event), [
    "phone_click", "email_click", "quote_cta_click", "case_study_click",
    "booking_outbound_click", "file_download", "video_open",
  ]);
  assert.equal(JSON.stringify(events).includes("person@example.com"), false);
  assert.equal(JSON.stringify(events).includes("+61299998888"), false);
  assert.equal(events.find((item) => item.event === "file_download").file_extension, "pdf");
});

test("GTM mode respects GTM ownership of pageviews and finite conversion metadata", () => {
  const { context } = createBrowser({
    config: { enabled: true, mode: "gtm", id: "GTM-TEST123" },
    href: "https://www.blackirisfilms.com/estimate",
    queue: [{
      eventName: "generate_lead",
      params: { estimate_type: "generated", pack: "5 Images $400", email: "private@example.com" },
    }],
  });
  const event = context.dataLayer.find((item) => item && item.event === "generate_lead");
  assert.equal(event.estimate_type, "generated");
  assert.equal(event.pack, "5 Images $400");
  assert.equal("email" in event, false);
  assert.equal(context.dataLayer.some((item) => item && item.event === "page_view"), false);
});
