/**
 * Wix Contacts v4 — newsletter opt-in for the estimator quiz.
 *
 * When a user ticks the "newsletter" checkbox on the details step we add
 * them to the Wix contact list with the standard newsletter labels and
 * mark their email as SUBSCRIBED. This mirrors the
 * `addWixNewsletterContact` half of the stories app's
 * /api/report-download endpoint, but skips its MailerLite report-group
 * step — quiz leads should not also receive the social media theory
 * report email.
 *
 * Deliberately non-blocking. Call it with Next.js `after(() =>
 * subscribeToNewsletter(...))` so the user gets their estimate back at
 * normal speed and the Wix call happens after the response is sent.
 *
 * Required env vars:
 *   WIX_API_KEY                 Wix dashboard -> Settings -> API Keys.
 *                               Same key the stories app uses; safe to
 *                               reuse since it's site-scoped.
 *   WIX_SITE_ID                 Wix site settings -> Site Info.
 *   WIX_NEWSLETTER_LABEL_KEYS   Optional. Comma-separated label keys to
 *                               attach to the contact. Defaults to
 *                               "custom.newsletter". The stories app
 *                               also adds custom.theory-download — we
 *                               deliberately leave that off here.
 *
 * Docs: https://dev.wix.com/api/rest/contacts/contacts/contact/create-contact
 */

const WIX_CONTACTS_URL = "https://www.wixapis.com/contacts/v4/contacts";

type SubscribeInput = {
  email: string;
  name?: string;
};

type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string; skipped?: boolean };

function splitName(full: string | undefined): { first: string; last: string } {
  const trimmed = (full || "").trim();
  if (!trimmed) return { first: "", last: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { first: trimmed, last: "" };
  return {
    first: trimmed.slice(0, idx).trim(),
    last: trimmed.slice(idx + 1).trim(),
  };
}

function parseLabelKeys(raw: string | undefined): string[] {
  // Default just to the generic newsletter tag. The theory-download tag
  // belongs to a different funnel and we don't want to cross-contaminate.
  if (!raw) return ["custom.newsletter"];
  const keys = raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  return keys.length ? keys : ["custom.newsletter"];
}

export async function subscribeToNewsletter(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  // Strip ALL whitespace from both values. Copy-pasted keys can carry
  // newlines or spaces anywhere in the string (e.g. a wrapped display
  // in Vercel's UI) and Node's fetch Headers.append throws a TypeError
  // on any whitespace character in a header value. Valid API keys and
  // site IDs never contain whitespace, so this is safe.
  const apiKey = (process.env.WIX_API_KEY || "").replace(/\s+/g, "");
  const siteId = (process.env.WIX_SITE_ID || "").replace(/\s+/g, "");

  if (!apiKey || !siteId) {
    // Not configured. Don't fail the request — newsletter signup is a
    // nice-to-have, not the primary submit path.
    console.warn(
      "[wixContacts] WIX_API_KEY or WIX_SITE_ID not set; skipping newsletter signup.",
    );
    return { ok: false, error: "WIX_API_KEY/WIX_SITE_ID not set", skipped: true };
  }

  const email = input.email.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: "Empty email", skipped: true };
  }

  const { first, last } = splitName(input.name);
  const labelKeys = parseLabelKeys(process.env.WIX_NEWSLETTER_LABEL_KEYS);

  const body = {
    allowDuplicates: false,
    info: {
      name: { first, last },
      emails: {
        items: [{ tag: "MAIN", email }],
      },
      labelKeys: { items: labelKeys },
      extendedFields: {
        items: {
          "emailSubscriptions.subscriptionStatus": "SUBSCRIBED",
          "emailSubscriptions.effectiveEmail": email,
        },
      },
    },
  };

  // 8s ceiling matching the Apps Script lead capture pattern. If Wix is
  // slow we'd rather drop this signup than time out the serverless function.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(WIX_CONTACTS_URL, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "wix-site-id": siteId,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // 409 conflict on duplicate is fine — Wix returns this when the
      // email already exists and allowDuplicates is false. The user is
      // still subscribed, which is what we wanted.
      if (res.status === 409) {
        return { ok: true };
      }
      console.error(
        "[wixContacts] non-2xx",
        res.status,
        text.slice(0, 400),
      );
      return {
        ok: false,
        error: `Wix ${res.status}: ${text.slice(0, 400)}`,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[wixContacts] POST failed", err);
    return { ok: false, error: String(err) };
  }
}
