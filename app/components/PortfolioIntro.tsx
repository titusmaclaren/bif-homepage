"use client";

import { VideoTrigger } from "./VideoLightbox";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "../data/portfolio";

export function PortfolioIntro() {
  return (
    <section id="portfolio" className="bg-black text-white py-24 md:py-32 relative overflow-hidden">
      {/* Soft accent glow at the top */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[1100px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #61B383 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="max-w-4xl mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-5">
            Recent work
          </p>
          <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
            Marketing videos, social media videos, brand films, corporate videos and TV commercials.
          </h2>
          <p className="mt-7 text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            We use video marketing science to cut through the noise and connect with
            your customers. You focus on what you do best. We&apos;ll make sure people
            get why it matters. Click any thumbnail to watch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.vimeoId} item={item} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="https://www.blackirisfilms.com/work"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
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
      className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-white/5 border border-white/10 block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
      aria-label={`Play ${item.category}: ${item.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumb}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        loading="lazy"
      />

      {/* Default state: subtle bottom gradient so play affordance reads. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

      {/* Hover state: dark veil + caption + central play button. */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-16 w-16 rounded-full bg-mint flex items-center justify-center shadow-xl">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute left-5 right-5 bottom-5 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/85 font-bold mb-1.5">
          {item.category}
        </div>
        <div className="text-white text-base md:text-lg font-bold leading-tight">
          {item.title}
        </div>
      </div>
    </VideoTrigger>
  );
}
