"use client";

type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    bifAnalytics?: { trackEvent: (eventName: string, params?: AnalyticsParams) => void };
    bifAnalyticsQueue?: Array<{ eventName: string; params?: AnalyticsParams }>;
  }
}

/** Queue events until the shared /analytics.js runtime is ready. */
export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  if (window.bifAnalytics) {
    window.bifAnalytics.trackEvent(eventName, params);
    return;
  }

  window.bifAnalyticsQueue = window.bifAnalyticsQueue || [];
  window.bifAnalyticsQueue.push({ eventName, params });
}
