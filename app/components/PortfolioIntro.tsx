"use client";

import { VideoTrigger, type VideoSource } from "./VideoLightbox";

// Industry-targeted portfolio. Each item maps to a confirmed Vimeo video on the
// blackirisfilms channel. Categories and project names come from the Wix Pro
// Gallery item metadata (gallery 4a848975-b310-4b2d-ac69-6288a25524c5).
type PortfolioItem = VideoSource & {
  thumb: string;
};

const items: PortfolioItem[] = [
  {
    category: "BRAND HERO VIDEO",
    title: "The Power of the Dacxi Chain",
    description: "Brand hero film positioning a global crowdfunding network for retail investors.",
    industry: "Finance",
    thumb: "https://static.wixstatic.com/media/a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg",
    vimeoId: "742487127",
  },
  {
    category: "CORPORATE VIDEO",
    title: "Dacxi Chain eCF Pitch",
    description: "Founder-led explainer for the global equity crowdfunding network.",
    industry: "Finance",
    thumb: "https://static.wixstatic.com/media/a2a11d_859e588ef5974cdb86fc050b7e04b838~mv2.png/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_859e588ef5974cdb86fc050b7e04b838~mv2.png",
    vimeoId: "860013506",
  },
  {
    category: "ANIMATED EXPLAINER",
    title: "Amplitel Customer Portal",
    description: "Animated rollout video for the customer portal of Australia's largest mobile tower infrastructure provider.",
    industry: "Tech",
    thumb: "https://static.wixstatic.com/media/a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png",
    vimeoId: "1060728418",
  },
  {
    category: "BRAND HERO VIDEO",
    title: "Find Your Wealth | Wealth 99",
    description: "Brand film for the long-term wealth-building platform.",
    industry: "Finance",
    thumb: "https://static.wixstatic.com/media/a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg",
    vimeoId: "776884299",
  },
  {
    category: "CUSTOMER SUCCESS STORY",
    title: "Eddie Prickett | AIE Graduate",
    description: "Graduate testimonial for the Academy of Interactive Entertainment recruitment campaign.",
    industry: "Higher education",
    thumb: "https://static.wixstatic.com/media/a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg",
    vimeoId: "1181599296",
  },
  {
    category: "CORPORATE VIDEO",
    title: "Microsoft Dynamics CRM at SSW",
    description: "Software consultancy positioning film for SSW's Dynamics CRM practice.",
    industry: "Tech",
    thumb: "https://static.wixstatic.com/media/a2a11d_a38f971881434c1993120599d2f3d057~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_a38f971881434c1993120599d2f3d057~mv2.jpg",
    vimeoId: "911075713",
  },
];

export function PortfolioIntro() {
  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="max-w-4xl mb-12">
          <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.15] tracking-tight">
            Marketing videos, social media videos, passion projects, corporate videos & TV Commercials
          </h2>
          <p className="mt-7 text-lg text-slate font-light leading-relaxed">
            We use video marketing science to cut through the noise and connect with your
            customers. You focus on what you do best, we&apos;ll make sure people get why it
            matters. Click the thumbnails below to see our work (more available on request).
          </p>
          <div className="mt-8">
            <a
              href="https://quiz.blackirisfilms.com/"
              className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors"
            >
              Get an estimate in 1-min
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((it) => (
            <PortfolioCard key={it.vimeoId || it.title} item={it} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.blackirisfilms.com/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-mint"
          >
            View the full portfolio
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <VideoTrigger
      video={item}
      className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-fog/40 border border-fog/60 block w-full text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumb}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute top-5 right-5 h-12 w-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-mint transition-all duration-300">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {item.industry && (
        <span className="absolute top-5 left-5 inline-flex items-center text-[10px] uppercase tracking-[0.18em] text-white/85 font-semibold bg-black/35 backdrop-blur-md rounded-full px-3 py-1">
          {item.industry}
        </span>
      )}
      <div className="absolute left-5 bottom-5 right-5 text-left">
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/75 font-semibold mb-1.5">
          {item.category}
        </div>
        <div className="text-white text-base md:text-lg font-bold leading-tight">
          {item.title}
        </div>
      </div>
    </VideoTrigger>
  );
}
