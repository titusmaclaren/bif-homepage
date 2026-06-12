import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/blog";

const SITE_URL = "https://blackirisfilms.com";

const consolidatedRoutes = [
  "/estimate",
  "/photography",
  "/services",
  "/stories",
  "/case-studies",
  "/case-studies/amplitel",
  "/case-studies/dacxi-chain",
  "/case-studies/mary-technology",
  "/the-last-10",
  "/the-social-media-theory-of-everything",
  "/the-social-media-theory-of-everything/media-kit",
  "/animated-video-production-sydney",
  "/brand-film-production-sydney",
  "/corporate-video-production-sydney",
  "/explainer-video-production-sydney",
  "/financial-video-production-sydney",
  "/higher-education-video-production-sydney",
  "/linkedin-video-production-sydney",
  "/startup-video-production-sydney",
  "/tech-video-production-sydney",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/learn",
    "/contact",
    "/why-black-iris-films",
    "/privacy-policy",
    "/partner-with-us",
    ...consolidatedRoutes,
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}${post.urlPath}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...posts];
}
