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
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={video.title || "Video player"}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[10001] flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-[1400px] h-full max-h-full flex flex-col gap-3 md:gap-4 lg:gap-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main row: video + info side-by-side on wide screens, stacked on narrow */}
            <div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6 min-h-0 flex-1">
              {/* Player — aspect-ratio holds 16:9 while max-height pins it inside the row */}
              <div className="flex items-center justify-center min-h-0 lg:flex-1">
                <div
                  className="bg-black rounded-xl overflow-hidden shadow-2xl"
                  style={{ width: "100%", aspectRatio: "16 / 9", maxHeight: "100%" }}
                >
                  <iframe
                    key={video.vimeoId || video.youtubeId || video.src}
                    src={embedSrc}
                    title={video.title || "Video"}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    className="w-full h-full border-0 block"
                  />
                </div>
              </div>

              {/* Info column — scrolls internally if the project description is long */}
              <aside className="lg:w-[340px] xl:w-[380px] lg:shrink-0 flex flex-col gap-3 min-h-0">
                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
                  {video.category && (
                    <div className="text-[10px] uppercase tracking-[0.22em] text-mint font-bold">
                      {video.category}
                    </div>
                  )}
                  {video.title && (
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-tight">
                      {video.title}
                    </h3>
                  )}

                  {meta.some(([, v]) => v) && (
                    <dl className="space-y-1.5 text-[13.5px] leading-snug pt-1">
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
                    <p className="text-white/70 text-[13.5px] leading-relaxed pt-1">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href="https://quiz.blackirisfilms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-mint hover:bg-mint-bright px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors"
                  >
                    Get a pricing range
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                  </a>
                  {video.caseStudyUrl && (
                    <a
                      href={video.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-mint hover:text-mint-bright text-[12.5px] font-bold py-1"
                    >
                      Read the full case study
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10"/>
                      </svg>
                    </a>
                  )}
                </div>
              </aside>
            </div>

            {related.length > 0 && (
              <div className="border-t border-white/10 pt-3 lg:pt-4 shrink-0">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/55 font-bold mb-2 lg:mb-3">
                  More work like this
                </div>
                <div className="grid grid-cols-3 gap-2 lg:gap-3">
                  {related.map((r) => (
                    <button
                      key={r.vimeoId}
                      type="button"
                      onClick={() => open({ ...r })}
                      className="group relative aspect-[16/9] rounded-md overflow-hidden bg-white/5 border border-white/10 text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.thumb}
                        alt={r.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                      <div className="absolute left-2.5 right-2.5 bottom-2">
                        <div className="text-[9px] uppercase tracking-[0.18em] text-white/70 font-bold mb-0.5 truncate">
                          {r.category}
                        </div>
                        <div className="text-white text-[11px] md:text-[12px] font-bold leading-tight line-clamp-2">
                          {r.title}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-9 w-9 rounded-full bg-mint flex items-center justify-center">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
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
