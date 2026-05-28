"use client";

import { VideoTrigger } from "./VideoLightbox";

// Curated portfolio items from the Wix Pro Gallery, with Vimeo IDs matched from
// the public blackirisfilms Vimeo channel where confident. Items without a confirmed
// Vimeo match fall back to the live Wix work page link.
const items: Array<{
  title: string;
  description: string;
  thumb: string;
  vimeoId?: string;
  fallbackUrl?: string;
}> = [
  {
    title: "BRAND HERO VIDEO",
    description: "The Power of the Dacxi Chain",
    thumb: "https://static.wixstatic.com/media/a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg",
    vimeoId: "977299657",
  },
  {
    title: "ANIMATED EXPLAINER",
    description: "Amplitel",
    thumb: "https://static.wixstatic.com/media/a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png",
    vimeoId: "1060728418",
  },
  {
    title: "SERVICE VIDEO",
    description: "Doltone House Corporate Events",
    thumb: "https://static.wixstatic.com/media/a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg",
    vimeoId: "1065385276",
  },
  {
    title: "CORPORATE VIDEO",
    description: "Dacxi Chain eCF Pitch",
    thumb: "https://static.wixstatic.com/media/a2a11d_859e588ef5974cdb86fc050b7e04b838~mv2.png/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_859e588ef5974cdb86fc050b7e04b838~mv2.png",
    vimeoId: "860013506",
  },
  {
    title: "SOCIAL MEDIA COMMERCIAL",
    description: "Smart Makeover | Kitchen Makeovers",
    thumb: "https://static.wixstatic.com/media/a2a11d_e3854cb838164f3fb8e9431cc381aa52~mv2.png/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_e3854cb838164f3fb8e9431cc381aa52~mv2.png",
    vimeoId: "898505109",
  },
  {
    title: "EVENT VIDEO",
    description: "The Magic Goes On | Little Red Hood",
    thumb: "https://static.wixstatic.com/media/a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg/v1/fill/w_900,h_507,q_90,enc_avif,quality_auto/a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg",
    vimeoId: "894854950",
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
            <PortfolioCard key={it.description} item={it} />
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

type Item = {
  title: string;
  description: string;
  thumb: string;
  vimeoId?: string;
  fallbackUrl?: string;
};

function PortfolioCard({ item }: { item: Item }) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumb}
        alt={item.description}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute top-5 right-5 h-12 w-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-mint transition-all duration-300">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="absolute left-5 bottom-5 right-5 text-left">
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-semibold mb-1.5">
          {item.title}
        </div>
        <div className="text-white text-base md:text-lg font-medium leading-tight">
          {item.description}
        </div>
      </div>
    </>
  );

  const className =
    "group relative aspect-[16/9] rounded-xl overflow-hidden bg-fog/40 border border-fog/60 block w-full text-left";

  if (item.vimeoId) {
    return (
      <VideoTrigger
        video={{ vimeoId: item.vimeoId, title: `${item.title} — ${item.description}` }}
        className={className}
      >
        {inner}
      </VideoTrigger>
    );
  }

  return (
    <a
      href={item.fallbackUrl || "https://www.blackirisfilms.com/work"}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  );
}
