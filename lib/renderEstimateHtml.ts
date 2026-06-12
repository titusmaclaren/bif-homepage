/**
 * Renders an EstimateResponse as a self-contained HTML fragment suitable for
 * dropping into a MailerLite "Custom HTML" block via the {$estimate_html}
 * merge tag.
 *
 * All styles are inline because email clients (Outlook in particular) ignore
 * <style> blocks. Width caps at 600px, which is the de facto standard.
 */

import type { EstimateResponse } from "./pricing";
import { BOOKING_URL } from "./links";

const NAVY = "#29334D";
const BLUE_SLATE = "#4B6B8B";
const MINT = "#61B383";
const OFF_WHITE = "#FAFAF8";
const TEXT = "#1A1F2E";
const BORDER = "#E8E8E5";

function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

function range(low: number, high: number): string {
  return `${fmt(low)} &ndash; ${fmt(high)}`;
}

function esc(s: string | null | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderEstimateHtml(
  estimate: EstimateResponse,
  recipientName?: string,
): string {
  // Escalation variant: no numbers, just a warm nudge to book a call.
  if (estimate.escalate) {
    return wrap(
      `
      <tr><td style="padding:36px 32px 8px 32px;">
        <h1 style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:26px;line-height:1.25;font-weight:500;color:${NAVY};">
          ${recipientName ? `Hi ${esc(recipientName)},` : "Hi there,"}
        </h1>
        <p style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:${TEXT};">
          Thanks for sharing your brief. This project has enough moving parts that we want to scope it properly rather than guess at a number. Let's jump on a short call and we'll come back within a working day with a considered quote.
        </p>
      </td></tr>
      ${ctaRow("Book a call")}
      `,
    );
  }

  const phases: string[] = [];

  if (estimate.pre_production_low > 0 || estimate.pre_production_high > 0) {
    phases.push(
      phaseCard(
        "Pre-production",
        estimate.pre_production_low,
        estimate.pre_production_high,
        estimate.pre_production_description,
      ),
    );
  }

  phases.push(
    phaseCard(
      "Production",
      estimate.production_low,
      estimate.production_high,
      estimate.production_description,
      "Does not include parking or location fees.",
    ),
  );

  phases.push(
    phaseCard(
      "Post-production",
      estimate.post_production_low,
      estimate.post_production_high,
      estimate.post_production_description,
    ),
  );

  return wrap(
    `
    <tr><td style="padding:36px 32px 0 32px;">
      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.3;letter-spacing:2px;text-transform:uppercase;font-weight:500;color:${BLUE_SLATE};">
        Your estimate
      </p>
      <h1 style="margin:8px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:26px;line-height:1.25;font-weight:500;color:${NAVY};">
        ${recipientName ? `Hi ${esc(recipientName)},` : "Hi there,"}
      </h1>
      <p style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:${TEXT};">
        ${esc(estimate.rationale)}
      </p>
    </td></tr>

    <tr><td style="padding:28px 32px 0 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${NAVY};border-radius:10px;">
        <tr><td style="padding:28px 28px 24px 28px;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.3;letter-spacing:2px;text-transform:uppercase;font-weight:500;color:rgba(255,255,255,0.7);">
            ${esc(estimate.scope_band)}
          </p>
          <p style="margin:6px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:30px;line-height:1.1;font-weight:500;color:#ffffff;">
            ${range(estimate.total_low, estimate.total_high)} AUD
          </p>
          <p style="margin:10px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:rgba(255,255,255,0.65);">
            Indicative range. A tighter number comes after a short scoping call.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:24px 32px 0 32px;">
      ${phases.join("")}
    </td></tr>

    ${ctaRow("Book a quote call")}
    `,
  );
}

function phaseCard(
  title: string,
  low: number,
  high: number,
  description: string | null | undefined,
  footnote?: string,
): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BORDER};border-radius:10px;margin-bottom:12px;">
      <tr><td style="padding:20px 22px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.3;letter-spacing:2px;text-transform:uppercase;font-weight:500;color:${BLUE_SLATE};">
              ${esc(title)}${footnote ? "*" : ""}
            </td>
            <td align="right" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.3;font-weight:500;color:${NAVY};white-space:nowrap;">
              ${range(low, high)}
            </td>
          </tr>
        </table>
        ${
          description
            ? `<p style="margin:10px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${TEXT};">${esc(description)}</p>`
            : ""
        }
        ${
          footnote
            ? `<p style="margin:10px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${BLUE_SLATE};">* ${esc(footnote)}</p>`
            : ""
        }
      </td></tr>
    </table>
  `;
}

function ctaRow(buttonText: string): string {
  return `
    <tr><td style="padding:28px 32px 36px 32px;" align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="center" style="border-radius:8px;background:${MINT};">
          <a href="${BOOKING_URL}" style="display:inline-block;padding:14px 28px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
            ${esc(buttonText)} &rarr;
          </a>
        </td></tr>
      </table>
    </td></tr>
  `;
}

function wrap(innerRows: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${OFF_WHITE};">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;border:1px solid ${BORDER};">
      ${innerRows}
      <tr><td style="padding:20px 32px 28px 32px;border-top:1px solid ${BORDER};">
        <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${BLUE_SLATE};">
          Black Iris Films &middot; Sydney, Australia &middot; ABN 13 774 120 626
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
  `.trim();
}
