/**
 * POST /api/email-estimate
 *
 * Takes the estimate the user just saw, renders it as a self-contained
 * HTML email, and sends it via SMTP. We used to route this through
 * MailerLite but hit field-length caps and HTML escaping in their merge
 * tags, so transactional mail lives on the site mailer. Beehiiv handles
 * newsletter opt-ins separately.
 *
 * Body: { email: string, name?: string, company?: string, estimate: EstimateResponse }
 *
 * Returns { ok: true } on success, or { ok: false, error } on failure. The
 * client shows a friendly "sent" or "something went wrong" message based on
 * the flag.
 */
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { renderEstimateHtml } from "@/lib/renderEstimateHtml";
import {
  normalizeEstimateResponse,
  type EstimateResponse,
} from "@/lib/pricing";
import {
  checkRateLimit,
  cleanSingleLine,
  isTooLong,
  isValidEmail,
  isSameOriginRequest,
  readJsonObject,
  RequestBodyError,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const maxDuration = 15;

const MAX_BODY_BYTES = 32 * 1024;

type Body = {
  email?: string;
  name?: string;
  company?: string;
  estimate?: EstimateResponse;
  website?: string;
};

export async function POST(req: Request) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json(
      { ok: false, error: "Cross-origin email requests are not allowed." },
      { status: 403 },
    );
  }

  let body: Body;
  try {
    body = (await readJsonObject(req, MAX_BODY_BYTES)) as Body;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof RequestBodyError
            ? error.message
            : "Invalid JSON body",
      },
      { status: error instanceof RequestBodyError ? error.status : 400 },
    );
  }

  if (cleanSingleLine(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const rateLimit = checkRateLimit(req, {
    bucket: "email-estimate",
    limit: 4,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many email requests in a short time. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      },
    );
  }

  const email = cleanSingleLine(body.email).toLowerCase();
  const name = cleanSingleLine(body.name);
  const estimate = normalizeEstimateResponse(body.estimate);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }

  if (isTooLong(name, 100) || isTooLong(email, 254)) {
    return NextResponse.json(
      { ok: false, error: "Please shorten your details and try again." },
      { status: 400 },
    );
  }

  if (!estimate) {
    return NextResponse.json(
      { ok: false, error: "Estimate missing or invalid." },
      { status: 400 },
    );
  }

  const html = renderEstimateHtml(estimate, name || undefined);
  const subject = estimate.escalate
    ? "About your Black Iris Films brief"
    : "Your Black Iris Films estimate";

  const result = await sendEmail({
    to: email,
    subject,
    html,
    text: "Thanks for using the Black Iris Films estimator. Your estimate is included in the HTML version of this email.",
    replyTo: "titus@blackirisfilms.com",
  });

  if (!result.ok) {
    console.error("[email-estimate] SMTP error:", result.error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send that just now. Please book a call and we'll come back to you directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
