"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";

export type VideoSource = {
  vimeoId?: string;
  youtubeId?: string;
  src?: string;
  /** Short uppercase category like "BRAND HERO VIDEO" */
  category?: string;
  /** Project / client name. Becomes the primary headline. */
  title?: string;
  /** Optional one-line description of the project. */
  description?: string;
  /** Industry tag, e.g. "Finance", "Higher education". */
  industry?: string;
  /** Optional external link to a full case study. */
  caseStudyUrl?: string;
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

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {video && embedSrc && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={video.title || "Video player"}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute top-5 right-5 md:top-8 md:right-8 z-[10001] flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-[1180px] flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={embedSrc}
                title={video.title || "Video"}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {(video.category || video.title || video.description || video.industry) && (
              <div className="flex flex-wrap items-start gap-x-8 gap-y-3 px-1">
                <div className="flex-1 min-w-0">
                  {video.category && (
                    <div className="text-[10px] uppercase tracking-[0.22em] text-mint font-semibold mb-2">
                      {video.category}
                    </div>
                  )}
                  {video.title && (
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-tight">
                      {video.title}
                    </h3>
                  )}
                  {video.description && (
                    <p className="mt-2 text-white/70 text-[14.5px] leading-relaxed max-w-2xl">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-5 shrink-0 pt-1">
                  {video.industry && (
                    <span className="inline-flex items-center text-[11px] uppercase tracking-[0.16em] text-white/70 font-medium border border-white/20 rounded-full px-3 py-1.5">
                      {video.industry}
                    </span>
                  )}
                  {video.caseStudyUrl && (
                    <a
                      href={video.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-mint hover:text-mint-bright text-sm font-medium"
                    >
                      View case study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7"/>
                      </svg>
                    </a>
                  )}
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
