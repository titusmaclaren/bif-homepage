"use client";

import { useEffect, useRef, useState } from "react";
import type { LearnSeriesVideo } from "../lib/learn-video-series";

type LearnVideoSeriesProps = {
  videos: LearnSeriesVideo[];
};

type YouTubePlayer = {
  destroy: () => void;
  mute: () => void;
  playVideo: () => void;
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady: (event: { target: YouTubePlayer }) => void;
        onStateChange: (event: { data: number }) => void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: { PLAYING: number };
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const existingReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existingReadyHandler?.();
      if (window.YT?.Player) resolve(window.YT);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-learn-youtube-api="true"]',
    );
    if (existingScript) {
      existingScript.addEventListener(
        "error",
        () => reject(new Error("The YouTube player could not load.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.dataset.learnYoutubeApi = "true";
    script.addEventListener(
      "error",
      () => reject(new Error("The YouTube player could not load.")),
      { once: true },
    );
    document.head.append(script);
  });

  return youtubeApiPromise;
}

function LearnVideoCard({ video }: { video: LearnSeriesVideo }) {
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!hasStarted || !playerHostRef.current || playerRef.current) return;

    let cancelled = false;
    loadYouTubeApi()
      .then((youtube) => {
        if (cancelled || !playerHostRef.current) return;

        playerRef.current = new youtube.Player(playerHostRef.current, {
          videoId: video.id,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            mute: 1,
            origin: window.location.origin,
            playsinline: 1,
            playlist: video.id,
            rel: 0,
          },
          events: {
            onReady: ({ target }) => {
              target.mute();
              target.playVideo();
            },
            onStateChange: ({ data }) => {
              if (data === youtube.PlayerState.PLAYING) setIsPlaying(true);
            },
          },
        });
      })
      .catch(() => {
        // Keep the neutral black loading state rather than exposing YouTube UI.
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [hasStarted, video.id]);

  const startPreview = () => setHasStarted(true);

  return (
    <a
      href={video.href}
      className="group block min-w-0"
      onFocus={startPreview}
      onMouseEnter={startPreview}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg border border-fog/80 bg-black shadow-[0_16px_42px_rgba(15,24,38,0.1)]">
        {hasStarted && (
          <div
            ref={playerHostRef}
            className="pointer-events-none absolute -inset-[8%] h-[116%] w-[116%] [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
            aria-hidden="true"
          />
        )}
        {/* Keep YouTube's loading and branding screen behind a plain black layer. */}
        <span
          className={`pointer-events-none absolute inset-0 z-20 bg-black transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt=""
          className={`absolute inset-0 z-10 h-full w-full object-cover transition duration-200 ${
            hasStarted ? "scale-[1.02] opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        {!hasStarted && (
          <>
            <span className="absolute right-2 top-2 z-30 rounded-full bg-black/58 px-2 py-1 text-[10px] font-bold leading-none text-white backdrop-blur-sm">
              {video.duration}
            </span>
            <span
              className="absolute left-2 top-2 z-30 grid h-7 w-7 place-items-center rounded-full bg-white/86 text-navy shadow-sm transition-colors group-hover:bg-mint group-hover:text-white"
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
}

export function LearnVideoSeries({ videos }: LearnVideoSeriesProps) {
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
          {videos.map((video) => (
            <LearnVideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
