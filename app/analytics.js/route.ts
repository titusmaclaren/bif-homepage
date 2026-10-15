import { analyticsRuntime } from "../lib/analytics-runtime";

export const dynamic = "force-dynamic";

function runtimeConfig() {
  const production = process.env.VERCEL_ENV === "production";
  // Bracket access keeps these values in the request-time route bundle instead
  // of baking public analytics identifiers into its source at build time.
  const tagManagerId = process.env["NEXT_PUBLIC_GTM_ID"];
  const measurementId = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"];

  if (!production) return { enabled: false };
  if (tagManagerId) {
    return { enabled: /^GTM-[A-Z0-9]+$/.test(tagManagerId), mode: "gtm", id: tagManagerId };
  }
  if (measurementId) {
    return { enabled: /^G-[A-Z0-9]+$/.test(measurementId), mode: "ga", id: measurementId };
  }
  return { enabled: false };
}

export function GET() {
  const config = JSON.stringify(runtimeConfig()).replace(/</g, "\\u003c");
  return new Response(
    "window.__BIF_ANALYTICS_CONFIG__ = " + config + ";\n" + analyticsRuntime,
    {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
