"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { PORTFOLIO_ITEMS, getRelated, type PortfolioItem } from "../data/portfolio";

export type VideoSource = {
  vimeoId?: string;
  youtubeId?: string;
  src?: string;
  /** Short uppercase category like "Brand Hero Video". */
  category?: string;
  /** Project / client name. Becomes the primary headline. */
  title?: string;
  /** Short one-line description. */
  description?: string;
  /** Client name. Rendered as "Client: ...". */
  client?: string;
  /** Industry tag, e.g. "Finance", "Higher education". */
  industry?: string;
  /** Campaign goal. Optional. */
  goal?: string;
  /** Platforms the piece was deployed on. Optional. */
  platforms?: string;
  /** Optional external link to a full case study. */
  caseStudyUrl?: string;
  /**
   * If undefined and this is a portfolio video, the lightbox shows 3
   * related portfolio items. Set to `null` to suppress related items.
   */
  related?: PortfolioItem[] | null;
};

type LightboxContextValue = {
  open: (video: VideoSource) => void;
  close: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useVideoLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useVideoLightbox must be used inside <VideoLightboxProvider>");
  return ctx;
}

export function VideoLightboxProvider({ children }: { children: React.ReactNode }) {
  const [video, setVideo] = useState<VideoSource | null>(null);

  const open = useCallback((v: VideoSource) => setVideo(v), []);
  const close = useCallback(() => setVideo(null), []);

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [video, close]);

  const embedSrc = video
    ? video.vimeoId
      ? `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
      : video.youtubeId
      ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
      : video.src
    : null;

  // Resolve related: explicit > null (suppress) > auto from portfolio.
  const related =
    video?.related === null
      ? []
      : video?.related ??
        (video?.vimeoId && PORTFOLIO_ITEMS.some((p) => p.vimeoId === video.vimeoId)
          ? getRelated(video.vimeoId)
          : []);

  const meta: Array<[string, string | undefined]> = video
    ? [
        ["Client", video.client],
        ["Industry", video.industry],
        ["Video format", video.category],
        ["Goal", video.goal],
        ["Platforms", video.platforms],
      ]
    : [];

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {video && embedSrc && (
        <div
          className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto p-4 md:p-10 bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={video.title || "Video player"}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="fixed top-5 right-5 md:top-8 md:right-8 z-[10001] flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-[1180px] my-auto flex flex-col gap-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Player */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                key={video.vimeoId || video.youtubeId || video.src}
                src={embedSrc}
                title={video.title || "Video"}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Info row */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 px-1">
              <div className="md:col-span-7">
                {video.category && (
                  <div className="text-[10px] uppercase tracking-[0.22em] text-mint font-bold mb-2">
                    {video.category}
                  </div>
                )}
                {video.title && (
                  <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                    {video.title}
                  </h3>
                )}

                {meta.some(([, v]) => v) && (
                  <dl className="mt-6 space-y-2 text-[14.5px] leading-relaxed">
                    {meta.map(([label, value]) =>
                      value ? (
                        <div key={label} className="flex gap-2">
                          <dt className="text-white font-bold shrink-0">{label}:</dt>
                          <dd className="text-white/75">{value}</dd>
                        </div>
                      ) : null,
                    )}
                  </dl>
                )}

                {video.description && (
                  <p className="mt-5 text-white/70 text-[14.5px] leading-relaxed max-w-2xl">
                    {video.description}
                  </p>
                )}
              </div>

              <div className="md:col-span-5 flex flex-col gap-4">
                <a
                  href="https://quiz.blackirisfilms.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
                >
                  Get a pricing range
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </a>
                {video.caseStudyUrl && (
                  <a
                    href={video.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-mint hover:text-mint-bright text-sm font-bold py-2"
                  >
                    Read the full case study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {related.length > 0 && (
              <div className="px-1 pb-2 border-t border-white/10 pt-7">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 font-bold mb-4">
                  More work like this
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {related.map((r) => (
                    <button
                      key={r.vimeoId}
                      type="button"
                      onClick={() => open({ ...r })}
                      className="group relative aspect-[16/9] rounded-lg overflow-hidden bg-white/5 border border-white/10 text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.thumb}
                        alt={r.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute left-3 right-3 bottom-2.5 md:bottom-3">
                        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/70 font-bold mb-0.5 truncate">
                          {r.category}
                        </div>
                        <div className="text-white text-[12px] md:text-[13px] font-bold leading-tight line-clamp-2">
                          {r.title}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-10 w-10 rounded-full bg-mint flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

type VideoTriggerProps = React.HTMLAttributes<HTMLButtonElement> & {
  video: VideoSource;
  className?: string;
  children: React.ReactNode;
};

export function VideoTrigger({ video, className, children, ...rest }: VideoTriggerProps) {
  const { open } = useVideoLightbox();
  return (
    <button
      type="button"
      onClick={() => open(video)}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}
