import type { NextConfig } from "next";

const serviceSlugs = [
  "animated-video-production-sydney",
  "brand-film-production-sydney",
  "corporate-video-production-sydney",
  "explainer-video-production-sydney",
  "financial-video-production-sydney",
  "higher-education-video-production-sydney",
  "linkedin-video-production-sydney",
  "startup-video-production-sydney",
  "tech-video-production-sydney",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "video.wixstatic.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/copy-of-home-2", destination: "/", permanent: true },
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
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
