/**
 * Resend transactional email client.
 *
 * We use Resend rather than MailerLite for the "email me this estimate"
 * button because MailerLite (a) caps custom Text fields at 1024 chars,
 * (b) escapes HTML pulled in via merge tags, and (c) sends from shared
 * marketing IPs that Gmail files as Promotions. Resend is transactional,
 * accepts raw HTML bodies, and lands in Primary.
 *
 * Required env vars:
 *   RESEND_API_KEY   (from https://resend.com dashboard -> API Keys)
 *   RESEND_FROM      (optional; defaults to the Black Iris Films sender).
 *                    Must be on a domain verified in Resend.
 *
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */

const RESEND_API = "https://api.resend.com";
const DEFAULT_FROM = "Black Iris Films <titus@blackirisfilms.com>";

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

type SendPayload = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(payload: SendPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not set" };
  }

  const from = process.env.RESEND_FROM || DEFAULT_FROM;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${RESEND_API}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Resend ${res.status}: ${text.slice(0, 400)}`,
      };
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id || "" };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
