import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function makeHooks(initialOverrides = new Map()) {
  const slots = [];
  let cursor = 0;

  return {
    reset() {
      cursor = 0;
    },
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) {
        slots[index] = initialOverrides.has(index)
          ? initialOverrides.get(index)
          : initial;
      }
      return [slots[index], (value) => {
        slots[index] = typeof value === "function" ? value(slots[index]) : value;
      }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useMemo(factory) {
      cursor++;
      return factory();
    },
  };
}

function jsx(type, props) {
  return { type, props: props || {} };
}

function loadTsx(relativePath, { events, fetch, formValues, initialState } = {}) {
  const filename = resolve(repoRoot, relativePath);
  const source = readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  });
  const hooks = makeHooks(initialState);
  const analytics = {
    trackEvent(eventName, params = {}) {
      events.push({ eventName, params: JSON.parse(JSON.stringify(params)) });
    },
  };
  const form = {
    values: { ...(formValues || {}) },
    reset() {
      this.values = {};
    },
  };
  class MockFormData {
    constructor(target) {
      this.target = target;
    }
    get(name) {
      return this.target.values[name] ?? null;
    }
  }

  const componentStub = (name) => {
    const component = function ComponentStub() {};
    Object.defineProperty(component, "name", { value: name });
    return component;
  };
  const dependencies = {
    react: hooks,
    "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: Symbol("Fragment") },
    "../lib/analytics": analytics,
    "@/app/lib/analytics": analytics,
    "lucide-react": { Check: componentStub("Check"), Mail: componentStub("Mail") },
    "./StepShell": { StepShell: componentStub("StepShell") },
    "../primitives/PhaseCard": { PhaseCard: componentStub("PhaseCard") },
    "../primitives/PrimaryButton": { PrimaryButton: componentStub("PrimaryButton") },
    "@/lib/links": { BOOKING_URL: "https://example.invalid/booking" },
    "./ProgressBar": { ProgressBar: componentStub("ProgressBar") },
    "./steps/SingleChoiceStep": { SingleChoiceStep: componentStub("SingleChoiceStep") },
    "./steps/RecommendationStep": { RecommendationStep: componentStub("RecommendationStep") },
    "./steps/VideoTypeStep": { VideoTypeStep: componentStub("VideoTypeStep") },
    "./steps/ScopeStep": { ScopeStep: componentStub("ScopeStep") },
    "./steps/BriefStep": { BriefStep: componentStub("BriefStep") },
    "./steps/DetailsStep": { DetailsStep: componentStub("DetailsStep") },
    "./steps/LoadingStep": { LoadingStep: componentStub("LoadingStep") },
    "./steps/ResultStep": { ResultStep: componentStub("ResultStep") },
    "@/lib/questions": {
      QUESTIONS: [{ id: "details", kind: "details", title: "Details", subtitle: "" }],
      VIDEO_TYPE_OPTIONS: [],
      SCOPE_OPTIONS: [],
    },
    "@/lib/pricing": {
      FALLBACK_ESTIMATE: {
        scope_band: "fallback",
        production_low: 1,
        production_high: 2,
        post_production_low: 1,
        post_production_high: 2,
        pre_production_low: 0,
        pre_production_high: 0,
        total_low: 2,
        total_high: 4,
        rationale: "Fallback",
        production_description: "",
        post_production_description: "",
        pre_production_description: null,
        escalate: false,
        escalation_reason: null,
        fallback: true,
      },
    },
  };

  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require(specifier) {
      if (Object.prototype.hasOwnProperty.call(dependencies, specifier)) {
        return dependencies[specifier];
      }
      throw new Error(`Unexpected component dependency: ${specifier}`);
    },
    process: { env: {} },
    fetch,
    FormData: MockFormData,
    window: {
      setTimeout(callback) {
        callback();
      },
      scrollTo() {},
      location: { pathname: "/contact" },
    },
    console,
  };
  vm.runInNewContext(output.outputText, context, { filename });

  return {
    component: module.exports,
    form,
    render(Component, props = {}) {
      hooks.reset();
      return Component(props);
    },
  };
}

function loadEstimatePost(body) {
  const filename = resolve(repoRoot, "app/api/estimate/route.ts");
  const source = readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  });
  const fallbackEstimate = {
    scope_band: "fallback",
    production_low: 1,
    production_high: 2,
    post_production_low: 1,
    post_production_high: 2,
    pre_production_low: 0,
    pre_production_high: 0,
    total_low: 2,
    total_high: 4,
    rationale: "Fallback",
    production_description: "",
    post_production_description: "",
    pre_production_description: null,
    escalate: false,
    escalation_reason: null,
  };
  const dependencies = {
    "@anthropic-ai/sdk": class AnthropicStub {},
    "next/server": {
      NextResponse: {
        json(payload, init = {}) {
          return new Response(JSON.stringify(payload), {
            status: init.status || 200,
            headers: { "Content-Type": "application/json" },
          });
        },
      },
      after() {},
    },
    "@/lib/systemPrompt": { getSystemPrompt: () => "" },
    "@/lib/pricing": {
      PRICING_VERSION: "test",
      FALLBACK_ESTIMATE: fallbackEstimate,
      ESCALATION_ESTIMATE: { ...fallbackEstimate, escalate: true },
      normalizeEstimateResponse: () => null,
    },
    "@/lib/leadCapture": { captureLead: async () => {} },
    "@/lib/beehiiv": { subscribeToNewsletter: async () => {} },
    "@/lib/requestSecurity": {
      checkRateLimit: () => ({ ok: true }),
      cleanSingleLine: (value) => String(value || "").trim(),
      cleanText: (value) => String(value || "").trim(),
      isTooLong: () => false,
      isValidEmail: () => true,
      isSameOriginRequest: () => true,
      readJsonObject: async () => body,
      RequestBodyError: class RequestBodyError extends Error {},
    },
  };
  const module = { exports: {} };
  vm.runInNewContext(output.outputText, {
    module,
    exports: module.exports,
    require(specifier) {
      if (Object.prototype.hasOwnProperty.call(dependencies, specifier)) {
        return dependencies[specifier];
      }
      throw new Error(`Unexpected estimate API dependency: ${specifier}`);
    },
    process: { env: {} },
    console: { warn() {}, error() {} },
    Response,
  }, { filename });
  return module.exports.POST;
}

function findNode(tree, typeName) {
  if (!tree || typeof tree !== "object") return null;
  if (
    tree.type === typeName ||
    (typeof tree.type === "function" && tree.type.name === typeName)
  ) return tree;
  const children = tree.props?.children;
  for (const child of Array.isArray(children) ? children : [children]) {
    const found = findNode(child, typeName);
    if (found) return found;
  }
  return null;
}

function jsonResponse(payload, ok = true) {
  return { ok, json: async () => payload };
}

const validContactValues = {
  name: "Taylor Example",
  phone: "0400000000",
  email: "taylor@example.test",
  foundUs: "Referral / word of mouth",
  message: "",
  subscribe: "on",
  website: "",
};

async function submitContact({ response, formValues = validContactValues } = {}) {
  const events = [];
  const loaded = loadTsx("app/components/ContactForm.tsx", {
    events,
    formValues,
    fetch: async () => response,
  });
  const tree = loaded.render(loaded.component.ContactForm);
  const form = findNode(tree, "form") || tree;
  await form.props.onSubmit({ preventDefault() {}, currentTarget: loaded.form });
  return events;
}

test("accepted contact submission emits one generate_lead", async () => {
  const events = await submitContact({ response: jsonResponse({ ok: true, accepted: true }) });
  assert.equal(events.filter((event) => event.eventName === "generate_lead").length, 1);
  assert.deepEqual(events.find((event) => event.eventName === "generate_lead").params, {
    lead_type: "contact_enquiry",
    form_source: "Contact page",
  });
});

test("failed contact response emits no lead", async () => {
  const events = await submitContact({ response: jsonResponse({ message: "Rejected" }, false) });
  assert.equal(events.some((event) => event.eventName === "generate_lead"), false);
  assert.equal(events.filter((event) => event.eventName === "form_error").length, 1);
});

test("honeypot success response emits no lead", async () => {
  const events = await submitContact({ response: jsonResponse({ ok: true, accepted: false }) });
  assert.equal(events.some((event) => event.eventName === "generate_lead"), false);
  assert.equal(events.some((event) => event.eventName === "form_error"), false);
});

test("AI imagery lead retains the selected pack before form reset", async () => {
  const events = [];
  const formValues = {
    name: "Taylor Example",
    phone: "0400000000",
    email: "taylor@example.test",
    company: "Example Co",
    pack: "5 Images $400",
    message: "",
    subscribe: "on",
    website: "",
  };
  const loaded = loadTsx("app/components/AiImageryContactForm.tsx", {
    events,
    formValues,
    fetch: async () => jsonResponse({ ok: true, accepted: true }),
  });
  const tree = loaded.render(loaded.component.AiImageryContactForm);
  const form = findNode(tree, "form") || tree;
  await form.props.onSubmit({ preventDefault() {}, currentTarget: loaded.form });

  const lead = events.find((event) => event.eventName === "generate_lead");
  assert.equal(lead?.params.pack, "5 Images $400");
  assert.deepEqual(loaded.form.values, {});
});

function estimatorHarness(response) {
  const events = [];
  const initialAnswers = {
    brief: "A short campaign video",
    details: { name: "Taylor Example", email: "taylor@example.test", company: "", newsletter: false },
  };
  const loaded = loadTsx("components/Estimator.tsx", {
    events,
    fetch: async () => response,
    initialState: new Map([
      [0, 6],
      [1, initialAnswers],
    ]),
  });
  const tree = loaded.render(loaded.component.Estimator);
  const details = findNode(tree, "DetailsStep");
  assert.ok(details, "estimator should render the mocked details step");
  return { events, details };
}

test("successful estimate emits quiz_complete with its result category", async () => {
  const response = jsonResponse({
    accepted: true,
    escalate: true,
    fallback: false,
    escalation_reason: "Large scope",
  });
  const { events, details } = estimatorHarness(response);
  await details.props.onSubmit();

  assert.equal(events.filter((event) => event.eventName === "quiz_complete").length, 1);
  assert.deepEqual(events.find((event) => event.eventName === "quiz_complete").params, {
    estimate_type: "escalation",
  });
});

test("actual estimate API honeypot response does not emit quiz_complete", async () => {
  const post = loadEstimatePost({ details: { website: "bot-filled" } });
  const apiResponse = await post(new Request("https://example.test/api/estimate", { method: "POST" }));
  const payload = await apiResponse.json();
  assert.equal(apiResponse.status, 200);
  assert.equal(payload.accepted, false);

  const { events, details } = estimatorHarness(jsonResponse(payload));
  await details.props.onSubmit();
  assert.equal(events.some((event) => event.eventName === "quiz_complete"), false);
  assert.equal(events.some((event) => event.eventName === "estimate_complete"), false);
});

test("actual valid server fallback is accepted and completes the quiz", async () => {
  const post = loadEstimatePost({
    goal: "Awareness",
    videoType: "Campaign",
    length: "Short",
    vibe: "Warm",
    scope: "Standard",
    brief: "A short campaign video",
    details: { name: "Taylor Example", email: "taylor@example.test" },
  });
  const apiResponse = await post(new Request("https://example.test/api/estimate", { method: "POST" }));
  const payload = await apiResponse.json();
  assert.equal(apiResponse.status, 200);
  assert.equal(payload.accepted, true);
  assert.equal(payload.fallback, true);

  const { events, details } = estimatorHarness(jsonResponse(payload));
  await details.props.onSubmit();
  assert.equal(
    events.find((event) => event.eventName === "quiz_complete")?.params.estimate_type,
    "server_fallback",
  );
});

test("HTTP 200 estimate without an acceptance marker does not emit quiz_complete", async () => {
  const { events, details } = estimatorHarness(jsonResponse({ escalate: false, fallback: false }));
  await details.props.onSubmit();
  assert.equal(events.some((event) => event.eventName === "quiz_complete"), false);
});

test("rejected estimate fallback does not emit quiz_complete", async () => {
  const response = jsonResponse({ error: "Rejected" }, false);
  const { events, details } = estimatorHarness(response);
  await details.props.onSubmit();

  assert.equal(events.some((event) => event.eventName === "quiz_complete"), false);
  assert.ok(events.some((event) => event.eventName === "form_error"));
  assert.ok(events.some((event) =>
    event.eventName === "estimate_complete" &&
    event.params.estimate_type === "client_error_fallback",
  ));
});

test("accepted estimate email emits supporting event only", async () => {
  const events = [];
  const loaded = loadTsx("components/steps/ResultStep.tsx", {
    events,
    fetch: async () => jsonResponse({ ok: true, accepted: true }),
  });
  const result = loaded.render(loaded.component.ResultStep, {
    estimate: { escalate: false, fallback: true },
    recipient: { name: "Taylor Example", email: "taylor@example.test", company: "" },
    onStartOver() {},
  });
  const emailButtonComponent = findNode(result, "EmailEstimateButton");
  assert.ok(emailButtonComponent, "result view should render the email-estimate control");
  const emailButton = findNode(
    loaded.render(emailButtonComponent.type, emailButtonComponent.props),
    "button",
  );
  assert.ok(emailButton);
  await emailButton.props.onClick();

  assert.equal(events.filter((event) => event.eventName === "estimate_email_sent").length, 1);
  assert.equal(events.some((event) => event.eventName === "generate_lead"), false);
  assert.equal(events.some((event) => event.eventName === "estimate_email_sent" &&
    event.params.estimate_type === "server_fallback"), true);
});
