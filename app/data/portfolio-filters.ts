import type { PortfolioItem } from "./portfolio";

type PortfolioFilter = {
  label: string;
  matches: (item: PortfolioItem) => boolean;
};

const textFor = (item: PortfolioItem) =>
  [
    item.category,
    item.title,
    item.description,
    item.client,
    item.industry,
  ]
    .join(" ")
    .toLowerCase();

const includesAny = (item: PortfolioItem, terms: string[]) => {
  const text = textFor(item);
  return terms.some((term) => text.includes(term.toLowerCase()));
};

export const VIDEO_TYPE_FILTERS: PortfolioFilter[] = [
  {
    label: "Brand films and commercials",
    matches: (item) =>
      includesAny(item, [
        "brand hero",
        "brand film",
        "brand story",
        "spec ad",
        "commercial",
        "campaign",
      ]),
  },
  {
    label: "Product and platform videos",
    matches: (item) =>
      includesAny(item, [
        "product",
        "platform",
        "service overview",
        "service video",
        "launch video",
        "portal",
        "unboxing",
        "real estate",
        "video tour",
      ]),
  },
  {
    label: "Explainers and animation",
    matches: (item) =>
      includesAny(item, [
        "explainer",
        "animated",
        "animation",
        "vfx",
        "course overview",
      ]),
  },
  {
    label: "Events and highlights",
    matches: (item) =>
      includesAny(item, [
        "event",
        "highlights",
        "anniversary",
        "launch",
        "soiree",
      ]),
  },
  {
    label: "Testimonials and interviews",
    matches: (item) =>
      includesAny(item, [
        "testimonial",
        "interview",
        "customer success",
        "graduate",
        "member",
      ]),
  },
  {
    label: "Social and education",
    matches: (item) =>
      includesAny(item, [
        "social",
        "educational",
        "education",
        "course promo",
        "promotional",
        "viral",
        "charity",
        "behind the scenes",
        "behind-the-scenes",
        "bts",
        "passion project",
      ]),
  },
];

export const INDUSTRY_FILTERS: PortfolioFilter[] = [
  {
    label: "Finance and fintech",
    matches: (item) =>
      includesAny(item, [
        "finance",
        "fintech",
        "wealth",
        "dacxi",
        "mastercard",
        "kpmg",
        "independent reserve",
      ]),
  },
  {
    label: "Technology and SaaS",
    matches: (item) =>
      includesAny(item, [
        "technology",
        "legal technology",
        "infrastructure",
        "games",
        "saas",
        "software",
        "portal",
        "app",
        "amplitel",
      ]),
  },
  {
    label: "Education and training",
    matches: (item) =>
      includesAny(item, [
        "higher education",
        "academy of interactive entertainment",
        "aie",
        "training",
        "course",
        "graduate",
      ]),
  },
  {
    label: "Events and hospitality",
    matches: (item) =>
      includesAny(item, [
        "events",
        "event",
        "hospitality",
        "tourism",
        "doltone",
        "little red hood",
      ]),
  },
  {
    label: "Health and wellbeing",
    matches: (item) =>
      includesAny(item, [
        "health",
        "fitness",
        "aged-care",
        "aged care",
        "manad",
        "lyfy",
        "invictus",
      ]),
  },
  {
    label: "Community and charity",
    matches: (item) =>
      includesAny(item, ["charity", "community", "street growth", "edapp"]),
  },
  {
    label: "Lifestyle, beauty and property",
    matches: (item) =>
      includesAny(item, [
        "fashion",
        "beauty",
        "cartier",
        "instyle",
        "mimi",
        "real estate",
        "property",
        "home improvement",
        "smart makeover",
        "ray white",
      ]),
  },
  {
    label: "Creative and passion projects",
    matches: (item) =>
      includesAny(item, [
        "creative services",
        "black iris films",
        "passion project",
        "flow motion",
      ]),
  },
];

export function getVideoTypeGroups(item: PortfolioItem) {
  const matches = VIDEO_TYPE_FILTERS.filter((filter) => filter.matches(item)).map(
    (filter) => filter.label,
  );
  return matches.length > 0 ? matches : [item.category];
}

export function getIndustryGroups(item: PortfolioItem) {
  const matches = INDUSTRY_FILTERS.filter((filter) => filter.matches(item)).map(
    (filter) => filter.label,
  );
  return matches.length > 0 ? matches : [item.industry];
}
