import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AnalyticsEvents } from "./components/AnalyticsEvents";
import { AnalyticsScripts } from "./components/AnalyticsScripts";
import { VideoLightboxProvider } from "./components/VideoLightbox";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  shouldIndexDeployment,
} from "./lib/seo";

const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Montserrat-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Montserrat-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/Montserrat-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Montserrat-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const shouldEnableAnalytics =
  process.env.VERCEL_ENV === "production" &&
  Boolean(process.env.NEXT_PUBLIC_GTM_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "video production sydney",
    "sydney video production agency",
    "brand film",
    "corporate video",
    "fintech video",
    "higher education video",
    "explainer video",
    "Black Iris Films",
  ],
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Sydney video production agency`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
    shortcut: ["/favicon.png"],
  },
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "black-translucent",
  },
  robots: shouldIndexDeployment()
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
  category: "business",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        <AnalyticsScripts />
        <VideoLightboxProvider>{children}</VideoLightboxProvider>
        {shouldEnableAnalytics ? <AnalyticsEvents /> : null}
      </body>
    </html>
  );
}
