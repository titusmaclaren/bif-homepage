import nodemailer from "nodemailer";

const DEFAULT_FROM = "Black Iris Films <info@blackirisfilms.com>";

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

type SendPayload = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const secure =
    process.env.SMTP_SECURE?.toLowerCase() === "false" ? false : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });
}

export async function sendEmail(payload: SendPayload): Promise<SendResult> {
  try {
    const from = process.env.SMTP_FROM || DEFAULT_FROM;
    const result = await getTransporter().sendMail({
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    return { ok: true, id: result.messageId || "" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
