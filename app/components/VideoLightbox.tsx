"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";

type VideoSource = {
  vimeoId?: string;
  youtubeId?: string;
  src?: string;
  title?: string;
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
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-sm"
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
            className="relative w-full max-w-[1280px] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedSrc}
              title={video.title || "Video"}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {video.title && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wide z-[10001]">
              {video.title}
            </p>
          )}
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
