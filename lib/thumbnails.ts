/**
 * Video-type thumbnail map. Files live in /public/thumbs/ and are Vimeo stills
 * pulled from vimeo.com/blackirisfilms via oEmbed, cached locally.
 *
 * To refresh: re-run scripts/fetch-vimeo-thumbs (or just re-run the curl block
 * documented in the README) and drop new JPGs in with the same filenames.
 */

export type ThumbKey =
  | "founder"
  | "brand"
  | "testimonial"
  | "explainer"
  | "event"
  | "animated"
  | "generic";

export const THUMBS: Record<ThumbKey, { src: string; alt: string; vimeoId: string }> = {
  founder: {
    src: "/thumbs/founder.jpg",
    alt: "Humanity First, Facts Second. Black Iris Films thought leadership piece.",
    vimeoId: "980518651",
  },
  brand: {
    src: "/thumbs/brand.jpg",
    alt: "Brand film for Little Red Hood Moment Designers.",
    vimeoId: "1054733425",
  },
  testimonial: {
    src: "/thumbs/testimonial.jpg",
    alt: "AIE Graduate customer success story with Eddie Prickett.",
    vimeoId: "1181599296",
  },
  explainer: {
    src: "/thumbs/explainer.jpg",
    alt: "What is Asset Tokenisation, explainer for Dacxi.",
    vimeoId: "977299657",
  },
  event: {
    src: "/thumbs/event.jpg",
    alt: "Corporate events coverage at Doltone House.",
    vimeoId: "1065385276",
  },
  animated: {
    src: "/thumbs/animated.jpg",
    alt: "Customer portal updates, software explainer for Amplitel.",
    vimeoId: "1060728418",
  },
  generic: {
    src: "/thumbs/generic.jpg",
    alt: "Emotional Marketing, Black Iris Films brand piece.",
    vimeoId: "981278175",
  },
};

/** Map video-type option labels to a thumbnail key. */
export function thumbForVideoType(label: string): ThumbKey {
  const lower = label.toLowerCase();
  if (lower.includes("founder") || lower.includes("thought")) return "founder";
  if (lower.includes("brand")) return "brand";
  if (lower.includes("testimonial") || lower.includes("case")) return "testimonial";
  if (lower.includes("product") || lower.includes("explainer")) return "explainer";
  if (lower.includes("event")) return "event";
  if (lower.includes("animated") || lower.includes("animation")) return "animated";
  return "generic";
}
