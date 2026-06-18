import type { Metadata } from "next";

export const SITE_URL = "https://blackirisfilms.com";

export const SITE_NAME = "Black Iris Films";

export const DEFAULT_TITLE = "Black Iris Films | Sydney Video Production Agency";

export const DEFAULT_DESCRIPTION =
  "Sydney video production agency creating cinematic, emotionally engaging videos for brands, businesses and marketing teams.";

export const DEFAULT_OG_IMAGE = "/assets/hero-brand-generated.png";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path.replace("https://www.blackirisfilms.com", SITE_URL);
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function shouldIndexDeployment() {
  return process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
