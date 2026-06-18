import type { MetadataRoute } from "next";
import { SITE_URL, shouldIndexDeployment } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!shouldIndexDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
