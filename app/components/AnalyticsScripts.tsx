import Script from "next/script";

const isProductionDeployment = process.env.VERCEL_ENV === "production";

export function AnalyticsScripts() {
  if (!isProductionDeployment) return null;

  return (
    <>
      <Script id="bif-analytics-queue" strategy="beforeInteractive">
        {`window.bifAnalyticsQueue = window.bifAnalyticsQueue || [];
          window.bifAnalytics = window.bifAnalytics || { trackEvent: function (eventName, params) {
            window.bifAnalyticsQueue.push({ eventName: eventName, params: params || {} });
          }};`}
      </Script>
      <Script id="bif-analytics-runtime" src="/analytics.js" strategy="afterInteractive" />
    </>
  );
}
