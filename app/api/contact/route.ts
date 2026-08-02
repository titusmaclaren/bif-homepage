import { NextResponse, after } from "next/server";
import { sendEmail } from "@/lib/email";
import { subscribeToNewsletter } from "@/lib/beehiiv";
import {
  checkRateLimit,
  cleanSingleLine,
  cleanText,
  isTooLong,
  isValidEmail,
  isSameOriginRequest,
  readJsonObject,
  RequestBodyError,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";

const DEFAULT_TO_EMAIL = "info@blackirisfilms.com";
const MAX_BODY_BYTES = 16 * 1024;
const FIELD_LIMITS = {
  name: 100,
  phone: 50,
  email: 254,
  company: 120,
  pack: 80,
  foundUs: 80,
  message: 1200,
  source: 100,
};

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: "Cross-origin form submissions are not allowed." },
      { status: 403 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await readJsonObject(
      request,
      MAX_BODY_BYTES,
    )) as ContactPayload;
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof RequestBodyError
            ? error.message
            : "Invalid form submission.",
      },
      { status: error instanceof RequestBodyError ? error.status : 400 },
    );
  }

  if (cleanSingleLine(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const rateLimit = checkRateLimit(request, {
    bucket: "contact",
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      {
        message:
          "Too many submissions in a short time. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      },
    );
  }

  const name = cleanSingleLine(payload.name);
  const phone = cleanSingleLine(payload.phone);
  const email = cleanSingleLine(payload.email).toLowerCase();
  const company = cleanSingleLine(payload.company);
  const pack = cleanSingleLine(payload.pack);
  const foundUs = cleanSingleLine(payload.foundUs);
  const message = cleanText(payload.message);
  const source =
    cleanSingleLine(payload.source) || "Website contact form";
  const subscribed = payload.subscribed === true;

  const isAiImagery = source.toLowerCase().includes("ai imagery");

  if (!name || !phone || !email || !foundUs || (isAiImagery && !pack)) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const tooLong =
    isTooLong(name, FIELD_LIMITS.name) ||
    isTooLong(phone, FIELD_LIMITS.phone) ||
    isTooLong(email, FIELD_LIMITS.email) ||
    isTooLong(company, FIELD_LIMITS.company) ||
    isTooLong(pack, FIELD_LIMITS.pack) ||
    isTooLong(foundUs, FIELD_LIMITS.foundUs) ||
    isTooLong(message, FIELD_LIMITS.message) ||
    isTooLong(source, FIELD_LIMITS.source);

  if (tooLong) {
    return NextResponse.json(
      {
        message:
          "One of the fields is too long. Please shorten your message and try again.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid work email address." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_FORM_TO || DEFAULT_TO_EMAIL;
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

  const firstName = name.split(/\s+/)[0] || name;
  const acknowledgementSubject = isAiImagery
    ? "Thanks for your AI imagery enquiry"
    : "Thanks for getting in touch with Black Iris Films";
  const acknowledgementText = [
    `Hi ${firstName},`,
    "",
    "Thanks for getting in touch with Black Iris Films. We've received your enquiry and will be in touch soon.",
    "",
    "If there is anything time-sensitive you would like to add, reply to this email or call us on (02) 8201 3504.",
    "",
    "Black Iris Films",
    "Sydney, Australia",
  ].join("\n");
  const acknowledgementHtml = `
    <div style="background:#f5f6f8;padding:32px 16px;font-family:Arial,sans-serif;color:#0f1826;line-height:1.6;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e6ec;padding:32px;">
        <p style="margin:0 0 20px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#55ad78;">Black Iris Films</p>
        <h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;">Thanks for getting in touch.</h1>
        <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
        <p style="margin:0 0 16px;">We've received your enquiry and will be in touch soon.</p>
        <p style="margin:0 0 24px;">If there is anything time-sensitive you would like to add, reply to this email or call us on <a href="tel:+61282013504" style="color:#287448;">(02) 8201 3504</a>.</p>
        <p style="margin:0;font-weight:700;">Black Iris Films</p>
        <p style="margin:2px 0 0;color:#667085;font-size:13px;">Sydney, Australia</p>
      </div>
    </div>
  `;

  const [internalResult, acknowledgementResult] = await Promise.all([
    sendEmail({
      to,
      replyTo: email,
      subject,
      text,
      html,
    }),
    sendEmail({
      to: email,
      replyTo: to,
      subject: acknowledgementSubject,
      text: acknowledgementText,
      html: acknowledgementHtml,
    }),
  ]);

  if (!internalResult.ok || !acknowledgementResult.ok) {
    const internalError = internalResult.ok ? null : internalResult.error;
    const acknowledgementError = acknowledgementResult.ok
      ? null
      : acknowledgementResult.error;
    console.error("Contact form SMTP error:", {
      internal: internalError,
      acknowledgement: acknowledgementError,
    });

    return NextResponse.json(
      { message: "Unable to send your enquiry right now." },
      { status: 502 },
    );
  }

  if (subscribed) {
    after(() =>
      subscribeToNewsletter({
        email,
        name,
        source,
      }),
    );
  }

  return NextResponse.json({ ok: true });
}
