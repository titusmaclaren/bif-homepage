export type PortfolioItem = {
  vimeoId: string;
  vimeoHash?: string;
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

const V = (url: string) => url;
const VF = (id: string) => `https://vumbnail.com/${id}.jpg`;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    vimeoId: "742487127",
    category: "Brand Hero Video",
    title: "The Power of the Dacxi Chain",
    description:
      "Brand hero film positioning a global crowdfunding network for retail investors.",
    client: "Dacxi Chain",
    industry: "Finance",
    thumb: W("a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg"),
  },
  {
    vimeoId: "776884299",
    category: "Brand Film",
    title: "Find Your Wealth | Wealth 99",
    description:
      "Brand film for a long-term wealth platform built around confidence, clarity and momentum.",
    client: "Wealth 99",
    industry: "Finance",
    thumb: W("a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg"),
  },
  {
    vimeoId: "1109359009",
    vimeoHash: "cdcc241dc9",
    category: "Spec Ad",
    title: "The Last $10 | Mastercard",
    description:
      "A compact spec commercial built around everyday tension, choice and emotional payoff.",
    client: "Mastercard",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/2056872529-eb4aaa80c40c49c5e172b40e8d2bba6cf9b806bc9bc368d95c24f96182a62501-d_640?region=us",
    ),
  },
  {
    vimeoId: "1143349142",
    category: "Product Video",
    title: "Dell Pro Essential Unboxing | Ingram Micro",
    description:
      "Product unboxing content for partner-led technology sales and everyday marketing.",
    client: "Dell / Ingram Micro",
    industry: "Technology",
    thumb: V(
      "https://i.vimeocdn.com/video/2091508822-0e4d4b92b3f6cdd14b457c8e06cc773a5c80ad78c2c340fc7aa832778cbb4f09-d_640?region=us",
    ),
  },
  {
    vimeoId: "1111183751",
    category: "Event Video",
    title: "MaryCon - The Legal Tech Social",
    description:
      "Event coverage shaped for momentum, personality and fast post-event promotion.",
    client: "MaryCon",
    industry: "Legal technology",
    thumb: V(
      "https://i.vimeocdn.com/video/2049109787-1c30b5cb912bb36d3d94f57111c4fa9fa4b1a278513979d94c1073fdfb45a0d7-d_640?region=us",
    ),
  },
  {
    vimeoId: "256497496",
    category: "TV Commercial",
    title: "AIE Learn from the Experts",
    description:
      "Commercial spot for AIE, built around expert-led creative education and career ambition.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: VF("256497496"),
  },
  {
    vimeoId: "842154532",
    category: "Social Media Video",
    title: "The First Deal | Dacxi Chain",
    description:
      "Campaign video announcing a key Dacxi Chain milestone in a simple, shareable format.",
    client: "Dacxi Chain",
    industry: "Finance",
    thumb: W("a2a11d_135680b1145a4b178e98c233cc2acc8e~mv2.png"),
  },
  {
    vimeoId: "333251831",
    category: "Viral Video",
    title: "Sydney Harbour in Flow Motion",
    description:
      "A flow-motion city film turning Sydney Harbour into a fast-moving visual story.",
    client: "Black Iris Films",
    industry: "Tourism",
    thumb: W("a2a11d_131fff6a406146f2bcf37b58020fa1d7~mv2.jpg"),
  },
  {
    vimeoId: "1060728418",
    category: "Animated Explainer",
    title: "New Updates to the Customer Portal | Amplitel",
    description:
      "Animated product update for Australia's largest mobile tower infrastructure provider.",
    client: "Amplitel",
    industry: "Infrastructure",
    thumb: W("a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png"),
  },
  {
    vimeoId: "860013506",
    category: "Corporate Video",
    title: "Global Equity Crowdfunding Network | Dacxi Chain",
    description:
      "Founder-led explainer for the global equity crowdfunding network.",
    client: "Dacxi Chain",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1775261111-548226ab7e62c5e90343b0d552c50caa58bc0643f835f7fa68a0e38e008b6d50-d_640?region=us",
    ),
  },
  {
    vimeoId: "894854950",
    category: "Event Video",
    title: "The Magic Goes On | Little Red Hood",
    description:
      "Event highlights for the immersive moment-design studio behind major Sydney experiences.",
    client: "Little Red Hood",
    industry: "Events",
    thumb: W("a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg"),
  },
  {
    vimeoId: "700347030",
    category: "Social Media Video",
    title: "Cardano joins the Dacxi Platform",
    description:
      "Platform update content translating a crypto listing into a clear social asset.",
    client: "Dacxi",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1416341391-1e632704fe14deed78ccb893ea943ef683eae6212947bd097ebb1fc07ca04481-d_640?region=us",
    ),
  },
  {
    vimeoId: "839000549",
    category: "Interview Video",
    title: "Ian Lowe | Dacxi Chain Presents",
    description:
      "Thought-leadership interview content for the Dacxi Chain Presents series.",
    client: "Dacxi Chain",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1689219824-23de33dbcd3a404950733d9a8659e76421449007b9a0482d44690d95c2a411dd-d_640?region=us",
    ),
  },
  {
    vimeoId: "321724289",
    category: "Client Testimonial Video",
    title: "3 Techsperts' Opinions on ACS",
    description:
      "Client testimonial film shaped around credibility, community and professional momentum.",
    client: "ACS",
    industry: "Technology",
    thumb: W("a2a11d_bc86da95e5544cfb8284e49a4e40b966~mv2.jpg"),
  },
  {
    vimeoId: "558903975",
    category: "Social Media Video",
    title: "Our New Technodolly | AIE",
    description:
      "Recruitment social highlighting AIE's motion-control technodolly and studio capability.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: W("a2a11d_c99348ba9f78404194e482ea98c8ca36~mv2.jpg"),
  },
  {
    vimeoId: "496723120",
    category: "Service Overview Video",
    title: "3D Animation & VFX Course Overview | AIE",
    description:
      "Course overview video introducing AIE's 3D animation and VFX training pathway.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: W("a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg"),
  },
  {
    vimeoId: "295364237",
    category: "Event Video",
    title: "Unbreakable | F45 & Invictus Games",
    description:
      "Event film capturing energy, resilience and community for F45 and Invictus Games.",
    client: "F45 / Invictus Games",
    industry: "Health and fitness",
    thumb: W("a2a11d_ab86965a0cfd4d06a36a1c407e3b0c6a~mv2.jpg"),
  },
  {
    vimeoId: "387582839",
    category: "Launch Video",
    title: "Game Plus Sydney Launch",
    description:
      "Launch event film for the Sydney opening of a games-industry coworking hub.",
    client: "Game Plus",
    industry: "Games",
    thumb: V(
      "https://i.vimeocdn.com/video/850597139-fdac8d00919db4fec47fe16f7f1fb81b336e4ea84804a11af3feb863c06d94dd-d_640?region=us",
    ),
  },
  {
    vimeoId: "344738613",
    category: "Social Media Commercial",
    title: "KPMG Tax Estimator",
    description:
      "Direct-response promotional video for a tax estimator campaign with Independent Reserve and KPMG.",
    client: "Independent Reserve / KPMG",
    industry: "Finance",
    thumb: W("a2a11d_a38f971881434c1993120599d2f3d057~mv2.jpg"),
  },
  {
    vimeoId: "706749897",
    category: "Customer Testimonial Video",
    title: "What did our Members Have to Say | Dacxi Learn",
    description:
      "Member-led testimonial content for Dacxi Learn education and community marketing.",
    client: "Dacxi Learn",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1426531957-216a872056ad554f07bc6824a2fdcbb7beec23e904b42bdd429e8dfbd1b8d01b-d_640?region=us",
    ),
  },
  {
    vimeoId: "356091891",
    category: "Charity Event Video",
    title: "EdApp Hawkesbury Canoe Challenge",
    description:
      "Charity event coverage shaped into a warm, energetic recap for supporters.",
    client: "EdApp",
    industry: "Charity",
    thumb: V(
      "https://i.vimeocdn.com/video/809086939-7ce2a9b006e41cb2e691069d8405721c719b68548fd378640d99d3676b7e80eb-d_640?region=us",
    ),
  },
  {
    vimeoId: "657351049",
    category: "Highlights Video",
    title: "Highlights from 2021 | Dacxi Australia",
    description:
      "Year-in-review highlights video collecting key moments from Dacxi Australia's growth.",
    client: "Dacxi Australia",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1327082007-498ad9105691df9d42a2a457fbbd992a07adfe7f8c63b02db1ac4de6183f35d4-d_640?region=us",
    ),
  },
  {
    vimeoId: "846528202",
    category: "Brand Story Video",
    title: "The Path Thus Far | Dacxi Chain",
    description:
      "Brand story video giving shape to Dacxi Chain's journey, proposition and momentum.",
    client: "Dacxi Chain",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1699510993-177512f4c5711cd37503124596908bfebfab8baa02e9c97d828816895cd3f5de-d_640?region=us",
    ),
  },
  {
    vimeoId: "278879520",
    category: "Charity Video",
    title: "Street Growth",
    description:
      "Charity film built to make the work feel immediate, human and worth supporting.",
    client: "Street Growth",
    industry: "Charity",
    thumb: VF("278879520"),
  },
  {
    vimeoId: "689165776",
    category: "Social Media Video",
    title: "Polygon MATIC joins the Dacxi Platform",
    description:
      "Short platform update turning a crypto listing into useful social content.",
    client: "Dacxi",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1395664009-41e106a8ae88b0012161e268ebf375fa4e3d69a2128a5d3c73cfa1e31c95dd5f-d_640?region=us",
    ),
  },
  {
    vimeoId: "381263461",
    category: "Explainer Video",
    title: "Game Plus",
    description:
      "Explainer video introducing the Game Plus model and its value for game developers.",
    client: "Game Plus",
    industry: "Games",
    thumb: W("a2a11d_5bf50a7c15f64e3b989846e5b591a9d3~mv2.jpg"),
  },
  {
    vimeoId: "792128309",
    category: "Social Media Video",
    title: "The Power of Accumulation with Dollar Cost Averaging",
    description:
      "Education-led social video teaching consistent long-term investing.",
    client: "Wealth 99",
    industry: "Finance",
    thumb: W("a2a11d_9bbe0636b2f84cab82f668122e3b26d7~mv2.jpg"),
  },
  {
    vimeoId: "1181599954",
    category: "Anniversary Video",
    title: "AIE 20th Anniversary",
    description:
      "Anniversary film celebrating two decades of AIE students, staff and creative careers.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: V(
      "https://i.vimeocdn.com/video/2144004787-8ec8b4a841942a5935ccb2531af5c3dd407d28189b5c7764919f70ef722088a4-d_640?region=us",
    ),
  },
  {
    vimeoId: "1181599296",
    category: "Customer Success Story",
    title: "AIE Graduate, Eddie Prickett",
    description:
      "Graduate testimonial for the Academy of Interactive Entertainment recruitment campaign.",
    client: "Academy of Interactive Entertainment",
    industry: "Higher education",
    thumb: V(
      "https://i.vimeocdn.com/video/2144002882-0eadad5ba8f24dd755a43dd6697518393b4d69bcbbe5c1f3e65bc78bad793072-d_640?region=us",
    ),
  },
  {
    vimeoId: "1065385276",
    category: "Service Video",
    title: "Corporate Events | Doltone House",
    description:
      "Premium venue service video showcasing the corporate events experience.",
    client: "Doltone House",
    industry: "Hospitality",
    thumb: W("a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg"),
  },
  {
    vimeoId: "941172837",
    category: "Event Video",
    title: "Gatsby: A Roaring Soiree",
    description:
      "Event highlights film for an immersive, stylised Little Red Hood experience.",
    client: "Little Red Hood",
    industry: "Events",
    thumb: V(
      "https://i.vimeocdn.com/video/1845729625-5749d4450ef375b00d638ea30a9bc9d98e90b3cf05d02cbae78650371a273df7-d_640?region=us",
    ),
  },
  {
    vimeoId: "915048133",
    category: "Event Video",
    title: "Once Upon a Night",
    description:
      "Event highlights shaped around atmosphere, movement and a premium guest experience.",
    client: "Little Red Hood",
    industry: "Events",
    thumb: V(
      "https://i.vimeocdn.com/video/1801927893-9142b38b4bf93db06c529ebb45272bafa476e9a38221547619b9e214398c9602-d_640?region=us",
    ),
  },
  {
    vimeoId: "1001827462",
    category: "Educational Video",
    title: "The Hidden Costs of Work Stress | Lyfy",
    description:
      "Educational video connecting workplace stress to business risk and practical change.",
    client: "Lyfy",
    industry: "Health technology",
    thumb: V(
      "https://i.vimeocdn.com/video/1918091856-c638e99b0d7d16669e30b73b8764d1155158cbd95babc76ffe29617126536dae-d_640?region=us",
    ),
  },
  {
    vimeoId: "766366126",
    category: "Course Promo",
    title: "Game Art Master | AIE Institute",
    description:
      "Course promo for AIE Institute, focused on student ambition and creative craft.",
    client: "AIE Institute",
    industry: "Higher education",
    thumb: V(
      "https://i.vimeocdn.com/video/1538843559-6349727085dfd10154e19b0bd9191bd4d91e969e7b972a86c37c9353fb969002-d_640?region=us",
    ),
  },
  {
    vimeoId: "717795825",
    category: "Educational Video",
    title: "Low Liquidity and Crypto Trading | Dacxi",
    description:
      "Educational finance video explaining a crypto trading concept in an accessible way.",
    client: "Dacxi",
    industry: "Finance",
    thumb: V(
      "https://i.vimeocdn.com/video/1454957417-87ae1bac1d5b5c1a7522f9982ef5d14ed70dfe523b0dcfec5e72488f81f49b6e-d_640?region=us",
    ),
  },
];

/** Get related videos from the approved portfolio list, wrapping the order. */
export function getRelated(currentVimeoId: string, count = 3): PortfolioItem[] {
  const others = PORTFOLIO_ITEMS.filter((p) => p.vimeoId !== currentVimeoId);
  const currentIdx = PORTFOLIO_ITEMS.findIndex(
    (p) => p.vimeoId === currentVimeoId,
  );
  if (currentIdx === -1) return others.slice(0, count);

  const ordered = [
    ...PORTFOLIO_ITEMS.slice(currentIdx + 1),
    ...PORTFOLIO_ITEMS.slice(0, currentIdx),
  ].filter((p) => p.vimeoId !== currentVimeoId);

  return ordered.slice(0, count);
}
