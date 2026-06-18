"use client";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, AnalyticsValue>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const hasGoogleTagManager = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const hasGoogleAnalytics = !hasGoogleTagManager && Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

function cleanParams(params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  );
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const payload = cleanParams({
    page_path: window.location.pathname,
    ...params,
  });

  if (hasGoogleTagManager) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
    return;
  }

  if (hasGoogleAnalytics && typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}
