/**
 * Industry-targeted portfolio.
 *
 * Each item maps to a confirmed Vimeo video on the public blackirisfilms
 * channel. Categories, project names and thumbnail URLs come from the Wix
 * Pro Gallery (`4a848975-b310-4b2d-ac69-6288a25524c5`). Client / industry
 * fields are populated where the project name makes the client obvious.
 *
 * `goal` and `platforms` are left optional — only fill them where you have
 * the real campaign brief data, otherwise the lightbox simply hides them.
 */
export type PortfolioItem = {
  vimeoId: string;
  category: string;
  title: string;
  description: string;
  client: string;
  industry: string;
  thumb: string;
  goal?: string;
  platforms?: string;
};

const W = (id: string) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_1200,h_675,q_90,enc_avif,quality_auto/${id}`;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    vimeoId: "742487127",
    category: "Brand Hero Video",
    title: "The Power of the Dacxi Chain",
    description:
      "Brand hero film positioning a global crowdfunding network for retail investors.",
    client: "Dacxi",
    industry: "Finance",
    thumb: W("a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg"),
  },
  {
    vimeoId: "860013506",
    category: "Corporate Video",
    title: "Dacxi Chain eCF Pitch",
    description:
      "Founder-led explainer for the global equity crowdfunding network.",
    client: "Dacxi",
    industry: "Finance",
    thumb: W("a2a11d_859e588ef5974cdb86fc050b7e04b838~mv2.png"),
  },
  {
    vimeoId: "776884299",
    category: "Brand Hero Video",
    title: "Find Your Wealth | Wealth 99",
    description: "Brand film for the long-term wealth-building platform.",
    client: "Wealth 99",
    industry: "Finance",
    thumb: W("a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg"),
  },
  {
    vimeoId: "792128309",
    category: "Social Media Video",
    title: "The Power of Dollar Cost Averaging",
    description:
      "Education-led social spot teaching consistent long-term investing.",
    client: "Wealth 99",
    industry: "Finance",
    thumb: W("a2a11d_9bbe0636b2f84cab82f668122e3b26d7~mv2.jpg"),
  },
  {
    vimeoId: "1060728418",
    category: "Animated Explainer",
    title: "Amplitel Customer Portal",
    description:
      "Animated rollout for the customer portal of Australia's largest mobile tower infrastructure provider.",
    client: "Amplitel",
    industry: "Tech",
    thumb: W("a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png"),
  },
  {
    vimeoId: "911075713",
    category: "Corporate Video",
    title: "Microsoft Dynamics CRM at SSW",
    description: "Software consultancy positioning film for SSW's CRM practice.",
    client: "SSW",
    industry: "Tech",
    thumb:
      "https://i.vimeocdn.com/video/1795386634-17a47cd317abd949c98caec92d74d61fa57093cdc7785cfbc0892321d33dacbb-d_640",
  },
  {
    vimeoId: "1181599296",
    category: "Customer Success Story",
    title: "Eddie Prickett | AIE Graduate",
    description:
      "Graduate testimonial for the Academy of Interactive Entertainment recruitment campaign.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: W("a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg"),
  },
  {
    vimeoId: "558903975",
    category: "Social Media Video",
    title: "AIE's New Technodolly",
    description:
      "Recruitment social highlighting AIE's cutting-edge motion-capture robotic arm.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: W("a2a11d_c99348ba9f78404194e482ea98c8ca36~mv2.jpg"),
  },
  {
    vimeoId: "1065385276",
    category: "Service Video",
    title: "Doltone House Corporate Events",
    description:
      "Premium-venue brand piece showcasing the corporate events experience.",
    client: "Doltone House",
    industry: "Corporate",
    thumb: W("a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg"),
  },
  {
    vimeoId: "1054733425",
    category: "Brand Film",
    title: "The Magic Goes On | Little Red Hood",
    description:
      "Brand film for the immersive moment-design studio behind major Sydney events.",
    client: "Little Red Hood",
    industry: "Events",
    thumb: W("a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg"),
  },
  {
    vimeoId: "714348702",
    category: "Product Video",
    title: "IllumiaSkin 7+1 LED Face Mask",
    description:
      "Studio product film for the 7+1 colour LED mask, combining live action, projection and graphics.",
    client: "Ergo Health",
    industry: "Product",
    thumb: W("a2a11d_847e8f6b74824140b4c41d4bb683665b~mv2.jpg"),
  },
  {
    vimeoId: "898505109",
    category: "Social Media Commercial",
    title: "Smart Makeover | Kitchen Makeovers",
    description:
      "Direct-response commercial driving leads for the home renovation specialist.",
    client: "Smart Makeover",
    industry: "Home services",
    thumb: W("a2a11d_e3854cb838164f3fb8e9431cc381aa52~mv2.png"),
  },
];

/** Get 3 related videos, wrapping the list. Used by the lightbox. */
export function getRelated(currentVimeoId: string, count = 3): PortfolioItem[] {
  const others = PORTFOLIO_ITEMS.filter((p) => p.vimeoId !== currentVimeoId);
  // Pick the 3 immediately following the current item, wrapping around.
  const currentIdx = PORTFOLIO_ITEMS.findIndex(
    (p) => p.vimeoId === currentVimeoId,
  );
  if (currentIdx === -1) return others.slice(0, count);
  const ordered = [
    ...PORTFOLIO_ITEMS.slice(currentIdx + 1),
    ...PORTFOLIO_ITEMS.slice(0, currentIdx),
  ];
  return ordered.slice(0, count);
}
