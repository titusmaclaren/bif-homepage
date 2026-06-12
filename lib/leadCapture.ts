/**
 * Posts every estimator submission to a Google Apps Script webhook which
 * appends a row to a Sheet and emails a notification to the team. The
 * webhook URL is configured via LEAD_WEBHOOK_URL. If unset, we silently
 * skip (so local dev without a webhook still works).
 *
 * Deliberately non-blocking from the user's point of view. Call it with
 * Next.js `after(() => captureLead(...))` so it fires after the response
 * is sent.
 */

import type { EstimateResponse } from "./pricing";

type Answers = {
  goal?: string;
  videoType?: string;
  length?: string;
  vibe?: string;
  scope?: string;
  brief?: string;
  details?: {
    name?: string;
    email?: string;
    company?: string;
    newsletter?: boolean;
  };
};

export async function captureLead(
  answers: Answers,
  estimate: EstimateResponse,
): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    // Not configured; silently skip so dev and early deploys still work.
    return;
  }

  const payload = {
    name: answers.details?.name || "",
    email: answers.details?.email || "",
    company: answers.details?.company || "",
    newsletter: Boolean(answers.details?.newsletter),
    goal: answers.goal || "",
    videoType: answers.videoType || "",
    length: answers.length || "",
    vibe: answers.vibe || "",
    scope: answers.scope || "",
    brief: answers.brief || "",
    estimate,
    submittedAt: new Date().toISOString(),
  };

  try {
    // 8-second ceiling. Apps Script web apps normally respond in 1-3s; if
    // Google is slow, we'd rather drop this lead capture than have the
    // serverless function time out.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      // Apps Script redirects from script.google.com to script.googleusercontent.com
      // on POST. fetch follows redirects by default, but make sure.
      redirect: "follow",
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.error(
        "[leadCapture] webhook returned non-2xx",
        res.status,
        await res.text().catch(() => ""),
      );
    }
  } catch (err) {
    console.error("[leadCapture] webhook POST failed", err);
  }
}
