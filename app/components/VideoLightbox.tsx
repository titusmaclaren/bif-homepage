"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { PORTFOLIO_ITEMS, getRelated, type PortfolioItem } from "../data/portfolio";

export type VideoSource = {
  vimeoId?: string;
  /** Private/unlisted Vimeo hash, e.g. the `h` value from a Vimeo share URL. */
  vimeoHash?: string;
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
      ? `https://player.vimeo.com/video/${video.vimeoId}?${new URLSearchParams({
          ...(video.vimeoHash ? { h: video.vimeoHash } : {}),
          autoplay: "1",
          title: "0",
          byline: "0",
          portrait: "0",
          dnt: "1",
        }).toString()}`
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
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/80"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={video.title || "Video player"}
        >
          <div
            className="relative w-full max-w-[1100px] max-h-[min(640px,88vh)] bg-[#0c1220] rounded-2xl shadow-2xl border border-white/5 flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/85 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-6 lg:gap-9 min-h-0 flex-1 p-6 md:p-8 lg:p-10">
              {/* Left column: project info */}
              <div className="flex flex-col min-h-0">
                <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                  {video.title && (
                    <h3 className="text-white text-2xl md:text-[28px] lg:text-[32px] font-bold leading-[1.1] tracking-tight">
                      {video.title}
                    </h3>
                  )}
                  {video.category && (
                    <div className="mt-2 text-white/75 text-[17px] md:text-[18px] font-medium leading-tight">
                      {video.category}
                    </div>
                  )}

                  <div className="my-5 lg:my-6 w-12 h-px bg-mint/70" />

                  {video.description && (
                    <>
                      <div className="text-white text-[13px] font-bold mb-1.5">
                        Project Summary
                      </div>
                      <p className="text-white/70 text-[13.5px] leading-relaxed mb-5">
                        {video.description}
                      </p>
                    </>
                  )}

                  {meta.some(([, v]) => v) && (
                    <>
                      <div className="text-white text-[13px] font-bold mb-2">
                        At a glance
                      </div>
                      <dl className="space-y-1.5 text-[13px] leading-snug">
                        {meta.map(([label, value]) =>
                          value ? (
                            <div key={label} className="flex gap-2">
                              <dt className="text-white font-bold shrink-0">{label}:</dt>
                              <dd className="text-white/70">{value}</dd>
                            </div>
                          ) : null,
                        )}
                      </dl>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 mt-4 shrink-0">
                  <a
                    href="https://quiz.blackirisfilms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-mint hover:bg-mint-bright px-5 py-3 text-[12.5px] font-bold uppercase tracking-wider text-white transition-colors"
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
                      className="inline-flex items-center justify-center gap-2 text-mint hover:text-mint-bright text-[12px] font-bold py-1"
                    >
                      Read the full case study
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Right column: video + related strip */}
              <div className="flex flex-col gap-4 min-h-0">
                <div
                  className="bg-black rounded-xl overflow-hidden shadow-xl shrink-0"
                  style={{ width: "100%", aspectRatio: "16 / 9" }}
                >
                  <iframe
                    key={`${video.vimeoId || video.youtubeId || video.src}-${video.vimeoHash || ""}`}
                    src={embedSrc}
                    title={video.title || "Video"}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    className="w-full h-full border-0 block"
                  />
                </div>

                {related.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 min-h-0">
                    {related.map((r) => (
                      <button
                        key={r.vimeoId}
                        type="button"
                        onClick={() => open({ ...r })}
                        className="group block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-md"
                      >
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-white/5 border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={r.thumb}
                            alt={r.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <div className="h-8 w-8 rounded-full bg-mint flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="mt-1.5">
                          <div className="text-white text-[12px] font-bold leading-tight line-clamp-1">
                            {r.title}
                          </div>
                          <div className="text-white/55 text-[11px] mt-0.5 truncate">
                            {r.category}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
