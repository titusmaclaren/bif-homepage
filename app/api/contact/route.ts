import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "info@blackirisfilms.com";
const DEFAULT_FROM_EMAIL = "Black Iris Films <onboarding@resend.dev>";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  pack?: unknown;
  foundUs?: unknown;
  message?: unknown;
  subscribed?: unknown;
  source?: unknown;
  website?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid form submission." },
      { status: 400 },
    );
  }

  if (getString(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = getString(payload.name);
  const phone = getString(payload.phone);
  const email = getString(payload.email);
  const company = getString(payload.company);
  const pack = getString(payload.pack);
  const foundUs = getString(payload.foundUs);
  const message = getString(payload.message);
  const source = getString(payload.source) || "Website contact form";
  const subscribed = payload.subscribed === true;

  const isAiImagery = source.toLowerCase().includes("ai imagery");

  if (!name || !phone || !email || !foundUs || (isAiImagery && !pack)) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid work email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Email sending is not configured yet." },
      { status: 503 },
    );
  }

  const to = [DEFAULT_TO_EMAIL];
  const from = process.env.CONTACT_FORM_FROM || DEFAULT_FROM_EMAIL;
  const subject = source.toLowerCase().includes("partner")
    ? `Partner enquiry from ${name}`
    : isAiImagery
      ? `AI imagery enquiry from ${name}`
      : `Quote enquiry from ${name}`;

  const rows = [
    ["Source", source],
    ["Name", name],
    ["Contact number", phone],
    ["Work email", email],
    ...(company ? [["Company", company]] : []),
    ...(pack ? [["Credit pack", pack]] : []),
    ["How did you find us?", foundUs],
    ["Subscribe for insights", subscribed ? "Yes" : "No"],
    ["Project notes", message || "Not provided"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f1826; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 18px;">${escapeHtml(subject)}</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border-top: 1px solid #e2e6ec; padding: 10px 14px 10px 0; font-weight: 700; vertical-align: top; width: 190px;">${escapeHtml(
                  label,
                )}</td>
                <td style="border-top: 1px solid #e2e6ec; padding: 10px 0; vertical-align: top;">${escapeHtml(
                  value,
                ).replace(/\n/g, "<br />")}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend contact form error:", errorText);

    return NextResponse.json(
      { message: "Unable to send your enquiry right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
