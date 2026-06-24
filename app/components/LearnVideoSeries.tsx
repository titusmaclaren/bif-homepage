"use client";

import { useEffect, useRef, useState } from "react";
import type { LearnSeriesVideo } from "../lib/learn-video-series";

type LearnVideoSeriesProps = {
  videos: LearnSeriesVideo[];
};

export function LearnVideoSeries({ videos }: LearnVideoSeriesProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [revealedVideoId, setRevealedVideoId] = useState<string | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
    };
  }, []);

  const activatePreview = (videoId: string) => {
    if (activeVideoId === videoId) return;
    if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
    setActiveVideoId(videoId);
    setRevealedVideoId(null);
    // Let YouTube start behind the thumbnail so its unavoidable startup
    // controls have time to disappear before the moving preview is revealed.
    revealTimerRef.current = window.setTimeout(() => {
      setRevealedVideoId(videoId);
    }, 1400);
  };

  return (
    <section className="bg-white px-6 py-12 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1260px]">
        <div className="mb-8 grid gap-5 border-b border-fog/70 pb-6 md:grid-cols-[minmax(0,0.78fr)_minmax(280px,0.42fr)] md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-mint">
              Video marketing tips & tricks
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-[1.05] text-navy md:text-4xl lg:text-[44px]">
              Watch the practical video series.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate md:text-[15px]">
            Fifteen short lessons on audience attention, story, structure,
            social media and the small creative choices that make business
            videos work harder.
          </p>
        </div>

        <div className="grid gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {videos.map((video) => {
            const isActive = activeVideoId === video.id;
            const isRevealed = revealedVideoId === video.id;

            return (
              <a
                key={video.id}
                href={video.href}
                className="group block min-w-0"
                onFocus={() => activatePreview(video.id)}
                onMouseEnter={() => activatePreview(video.id)}
              >
                <div className="relative aspect-video overflow-hidden rounded-lg border border-fog/80 bg-navy-midnight shadow-[0_16px_42px_rgba(15,24,38,0.1)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                      isRevealed ? "scale-[1.03] opacity-0" : "opacity-100"
                    }`}
                    loading="lazy"
                  />
                  {isActive && (
                    <iframe
                      title={`Preview: ${video.title}`}
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${video.id}&autohide=1&showinfo=0`}
                      className="pointer-events-none absolute -inset-[8%] h-[116%] w-[116%] max-w-none border-0"
                      allow="autoplay; encrypted-media"
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  )}
                  {!isActive && (
                    <>
                      <span className="absolute right-2 top-2 z-10 rounded-full bg-black/58 px-2 py-1 text-[10px] font-bold leading-none text-white backdrop-blur-sm">
                        {video.duration}
                      </span>
                      <span
                        className="absolute left-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/86 text-navy shadow-sm transition-colors group-hover:bg-mint group-hover:text-white"
                        aria-hidden="true"
                      >
                        <span className="ml-[2px] h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-3 line-clamp-3 min-h-[3.05rem] text-[13px] font-bold leading-snug text-navy transition-colors group-hover:text-mint md:text-[14px]">
                  {video.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
