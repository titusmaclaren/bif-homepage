import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/blog";

const SITE_URL = "https://blackirisfilms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/learn", "/contact", "/why-black-iris-films"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}${post.urlPath}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...posts];
}
