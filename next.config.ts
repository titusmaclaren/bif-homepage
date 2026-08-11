import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const serviceSlugs = [
  "animated-video-production-sydney",
  "brand-film-production-sydney",
  "corporate-video-production-sydney",
  "event-video-production-sydney",
  "explainer-video-production-sydney",
  "financial-video-production-sydney",
  "higher-education-video-production-sydney",
  "linkedin-video-production-sydney",
  "startup-video-production-sydney",
  "tech-video-production-sydney",
];

// Keep the legacy blog URLs working without accidentally treating static
// /blog image files as articles. New posts are picked up at build time.
const blogDirectory = path.join(process.cwd(), "content", "blog");
const blogSlugs = fs
  .readdirSync(blogDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => fs.readFileSync(path.join(blogDirectory, file), "utf8"))
  .map((content) => content.match(/^slug:\s*["']?([^\r\n"']+)/m)?.[1]?.trim())
  .filter((slug): slug is string => Boolean(slug));

const alternateDomains = [
  "blackirisfilms.com",
  "blackirisfilms.com.au",
  "www.blackirisfilms.com.au",
  "services.blackirisfilms.com",
  "stories.blackirisfilms.com",
  "titusmaclaren.com",
  "www.titusmaclaren.com",
];

const isPreviewDeployment =
  Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";

const isProductionBuild = process.env.NODE_ENV === "production";
const hasGoogleAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const hasGoogleTagManager = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const usesGoogleAnalyticsStack = hasGoogleAnalytics || hasGoogleTagManager;

// Plain-English header notes:
// - X-Content-Type-Options stops browsers from guessing file types.
// - Referrer-Policy limits how much URL information is sent to other sites.
// - Permissions-Policy turns off browser features this marketing site does not use.
// - Content-Security-Policy limits where scripts, frames, fonts, images and forms can load from.
// - Strict-Transport-Security asks browsers to keep using HTTPS after the first secure visit.
//
// This CSP is intentionally practical rather than strict. The imported static
// pages still use inline scripts/styles and the homepage hero loads Vimeo JSONP,
// so removing 'unsafe-inline' or vimeo.com from script-src would break real pages.
const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    ...(isProductionBuild ? [] : ["'unsafe-eval'"]),
    "https://vimeo.com",
    ...(usesGoogleAnalyticsStack ? ["https://www.googletagmanager.com"] : []),
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  [
    "img-src",
    "'self'",
    "data:",
    "blob:",
    "https://i.vimeocdn.com",
    "https://i.ytimg.com",
    "https://img.youtube.com",
    "https://lh3.googleusercontent.com",
    "https://*.googleusercontent.com",
    ...(usesGoogleAnalyticsStack
      ? ["https://www.googletagmanager.com", "https://www.google-analytics.com"]
      : []),
  ].join(" "),
  "media-src 'self' blob:",
  [
    "connect-src",
    "'self'",
    ...(usesGoogleAnalyticsStack
      ? [
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://region1.google-analytics.com",
        ]
      : []),
  ].join(" "),
  [
    "frame-src",
    "'self'",
    "https://player.vimeo.com",
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    ...(hasGoogleTagManager ? ["https://www.googletagmanager.com"] : []),
  ].join(" "),
  "worker-src 'self' blob:",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  ...(isPreviewDeployment
    ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
    : []),
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.vimeocdn.com" },
    ],
  },
  async redirects() {
    return [
      ...alternateDomains.map((domain) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: domain }],
        destination: "https://www.blackirisfilms.com/:path*",
        permanent: true,
      })),
      { source: "/copy-of-home-2", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/about", destination: "/why-black-iris-films", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us-1", destination: "/contact", permanent: true },
      { source: "/blog", destination: "/learn", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      {
        source: "/bondi-to-coogee-walk-in-one-minute",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/how-aie-succeeded-through-covid-19",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/service-page/meeting-creative-brainstorm",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/service-page/phone-call-creative-brainstorm",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/service-page/:path*",
        destination: "/contact",
        permanent: true,
      },
      ...blogSlugs.flatMap((slug) => [
        { source: `/blog/${slug}`, destination: `/post/${slug}`, permanent: true },
        { source: `/single-post/${slug}`, destination: `/post/${slug}`, permanent: true },
      ]),
    ];
  },
  async rewrites() {
    return [
      ...serviceSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/legacy/services/${slug}.html`,
      })),
      { source: "/services", destination: "/legacy/services/index.html" },
      { source: "/services/thank-you", destination: "/legacy/services/thank-you.html" },
      { source: "/stories", destination: "/legacy/stories/index.html" },
      {
        source: "/the-social-media-theory-of-everything",
        destination: "/legacy/stories/the-social-media-theory-of-everything.html",
      },
      { source: "/report-thank-you", destination: "/legacy/stories/report-thank-you.html" },
      { source: "/case-studies", destination: "/case-studies/index.html" },
      { source: "/case-studies/:slug", destination: "/case-studies/:slug.html" },
      {
        source: "/ai-powered-content-studio-v2",
        destination: "/ai-powered-content-studio-v2/index.html",
      },
      { source: "/the-last-10", destination: "/the-last-10/index.html" },
      { source: "/the-last-10/contact", destination: "/the-last-10/contact.html" },
      {
        source: "/the-social-media-theory-of-everything/media-kit",
        destination: "/the-social-media-theory-of-everything/media-kit/index.html",
      },
      {
        source: "/the-social-media-theory-of-everything/9389162002",
        destination: "/the-social-media-theory-of-everything/9389162002/index.html",
      },
      { source: "/photography", destination: "/photography/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/the-social-media-theory-of-everything/9389162002/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/the-last-10/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/ai-powered-content-studio-v2/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
