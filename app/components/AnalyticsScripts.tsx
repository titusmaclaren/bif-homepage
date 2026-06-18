import Script from "next/script";

const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isProductionDeployment = process.env.VERCEL_ENV === "production";

export function AnalyticsScripts() {
  if (!isProductionDeployment) return null;

  // If GTM is configured, do not also load GA directly. That avoids duplicate
  // pageviews when GA4 is managed inside Google Tag Manager.
  if (googleTagManagerId) {
    return (
      <>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          `}
        </Script>
        <Script
          id="google-tag-manager-loader"
          src={`https://www.googletagmanager.com/gtm.js?id=${googleTagManagerId}`}
          strategy="afterInteractive"
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      </>
    );
  }

  if (googleAnalyticsId) {
    return (
      <>
        <Script
          id="google-analytics-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });
          `}
        </Script>
      </>
    );
  }

  return null;
}
