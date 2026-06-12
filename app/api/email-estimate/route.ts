/**
 * POST /api/email-estimate
 *
 * Takes the estimate the user just saw, renders it as a self-contained
 * HTML email, and sends it via Resend. We used to route this through
 * MailerLite but hit field-length caps and HTML escaping in their merge
 * tags, so transactional mail now lives on Resend and MailerLite is kept
 * for the newsletter (deferred).
 *
 * Body: { email: string, name?: string, company?: string, estimate: EstimateResponse }
 *
 * Returns { ok: true } on success, or { ok: false, error } on failure. The
 * client shows a friendly "sent" or "something went wrong" message based on
 * the flag.
 */
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { renderEstimateHtml } from "@/lib/renderEstimateHtml";
import type { EstimateResponse } from "@/lib/pricing";

export const runtime = "nodejs";
export const maxDuration = 15;

type Body = {
  email?: string;
  name?: string;
  company?: string;
  estimate?: EstimateResponse;
};

function isValidEmail(s: string): boolean {
  // Loose check. Resend validates server-side too; this just rejects the
  // obviously-broken input before we burn an API call.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const email = (body.email || "").trim();
  const name = (body.name || "").trim();
  const estimate = body.estimate;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }

  if (!estimate || typeof estimate !== "object") {
    return NextResponse.json(
      { ok: false, error: "Estimate missing." },
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
    replyTo: "titus@blackirisfilms.com",
  });

  if (!result.ok) {
    console.error("[email-estimate] Resend error:", result.error);
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
