import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const REPORT_URL = "/the-social-media-theory-of-everything/9389162002";
const FORM_URL = "/the-social-media-theory-of-everything#lead-form";

type ApiEnvelope = {
  data?: { id?: string; name?: string };
  contact?: { id?: string };
  marketingConsent?: { state?: string };
};

export async function POST(request: Request) {
  const form = await request.formData();
  const name = cleanValue(form.get("name"));
  const email = cleanValue(form.get("email")).toLowerCase();
  const subscribe = cleanValue(form.get("subscribe")) === "yes";
  const honeypot = cleanValue(form.get("website") || form.get("company_url"));

  if (honeypot) return redirect(request, REPORT_URL);
  if (!name) {
    return sendHtml(400, "Name required", "Please enter your name before downloading the report.");
  }
  if (!isValidEmail(email)) {
    return sendHtml(
      400,
      "Work email required",
      "Please enter a valid email address before downloading the report.",
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const reportGroupId =
    process.env.MAILERLITE_REPORT_GROUP_ID || process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !reportGroupId) {
    console.error("MailerLite report delivery is not configured.");
    return sendHtml(
      500,
      "Report delivery is not configured yet",
      "The form is connected, but its delivery settings are missing. Please try again shortly.",
    );
  }

  const [firstName, ...lastNameParts] = name.split(/\s+/);
  const lastName = lastNameParts.join(" ");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const subscriberResponse = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        fields: { name: firstName, last_name: lastName },
        status: "active",
        resubscribe: true,
      }),
    },
  );
  const subscriberBody = await readJson(subscriberResponse);

  if (!subscriberResponse.ok) {
    console.error("MailerLite subscriber upsert failed", {
      status: subscriberResponse.status,
      response: subscriberBody,
    });
    return sendHtml(
      subscriberResponse.status === 422 ? 400 : 502,
      "Download request failed",
      subscriberResponse.status === 422
        ? "MailerLite rejected the email address. Please check it and try again."
        : "The report service could not accept the submission. Please try again in a moment.",
    );
  }

  const subscriberId = subscriberBody?.data?.id;
  if (!subscriberId) {
    return sendHtml(
      502,
      "Download request failed",
      "The report service accepted the submission but did not return a subscriber record.",
    );
  }

  const groupUrl = `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(subscriberId)}/groups/${encodeURIComponent(reportGroupId)}`;
  const unassignResponse = await fetch(groupUrl, { method: "DELETE", headers });
  if (!unassignResponse.ok && unassignResponse.status !== 404) {
    console.error("MailerLite report group unassign failed", unassignResponse.status);
    return sendHtml(502, "Download request failed", "The report email could not be refreshed. Please try again.");
  }

  const assignResponse = await fetch(groupUrl, { method: "POST", headers });
  if (!assignResponse.ok) {
    console.error("MailerLite report group assign failed", assignResponse.status);
    return sendHtml(502, "Download request failed", "The report email could not be triggered. Please try again.");
  }

  if (subscribe) {
    await addWixNewsletterContact({ email, firstName, lastName });
  }

  return redirect(request, `${REPORT_URL}?sent=1`);
}

async function addWixNewsletterContact({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const apiKey = process.env.WIX_API_KEY;
  if (!apiKey) return;

  const siteId = process.env.WIX_SITE_ID;
  const labelKeys = (
    process.env.WIX_NEWSLETTER_LABEL_KEYS ||
    "custom.theory-download,custom.newsletter"
  )
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: apiKey,
    ...(siteId ? { "wix-site-id": siteId } : {}),
  };

  try {
    const contactResponse = await fetch(
      "https://www.wixapis.com/contacts/v4/contacts",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          allowDuplicates: false,
          info: {
            name: { first: firstName, last: lastName },
            emails: { items: [{ tag: "MAIN", email }] },
            labelKeys: { items: labelKeys },
          },
        }),
      },
    );
    if (!contactResponse.ok && contactResponse.status !== 409) {
      console.error("Wix newsletter contact failed", contactResponse.status);
    }

    const consentResponse = await fetch(
      "https://www.wixapis.com/marketing-consent/v1/marketing-consent/upsert",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          marketingConsent: {
            details: { type: "EMAIL", email },
            state: "CONFIRMED",
            lastConfirmationActivity: {
              source: "FORM",
              description: "Subscribed through the Social Media Theory of Everything report form.",
              updatedDate: new Date().toISOString(),
              optInLevel: "SINGLE_CONFIRMATION",
            },
          },
        }),
      },
    );
    if (!consentResponse.ok) {
      console.error("Wix newsletter consent failed", consentResponse.status);
    }
  } catch (error) {
    console.error("Wix newsletter integration failed", error);
  }
}

function redirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

async function readJson(response: Response): Promise<ApiEnvelope | null> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as ApiEnvelope;
  } catch {
    return null;
  }
}

function cleanValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendHtml(status: number, title: string, message: string) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Black Iris Films</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#0b1120;color:#fff;font-family:Montserrat,Arial,sans-serif}main{max-width:520px;border:1px solid rgba(255,255,255,.12);background:#141d2e;padding:34px;border-radius:8px;text-align:center}h1{margin:0 0 12px;font-size:24px}p{color:#a8b4c7;line-height:1.6;margin:0 0 24px}a{display:inline-block;background:#e8b82f;color:#0b1120;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:6px}</style></head><body><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><a href="${FORM_URL}">Back to the form</a></main></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
