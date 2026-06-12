"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// lottie-react pulls in lottie-web which depends on window. Load client-side only.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieJson = Record<string, unknown>;

/**
 * Shown on step 7 while /api/estimate is still in flight. The ResultStep
 * takes over once the estimate resolves. The Lottie JSON is fetched as a
 * static asset rather than bundled so it stays out of the main JS chunk.
 */
export function LoadingStep() {
  const [animation, setAnimation] = useState<LottieJson | null>(null);

  useEffect(() => {
    fetch("/lottie/estimator-loading.json")
      .then((r) => r.json())
      .then((data: LottieJson) => setAnimation(data))
      .catch(() => setAnimation(null));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-28">
      <div className="w-[240px] h-[80px]">
        {animation ? (
          <Lottie animationData={animation} loop autoplay />
        ) : (
          // Minimal CSS fallback if the JSON fetch fails.
          <div className="flex h-full items-center justify-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--color-navy)]" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--color-blue-slate)] [animation-delay:150ms]" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--color-mint)] [animation-delay:300ms]" />
          </div>
        )}
      </div>
      <p className="mt-4 text-sm uppercase tracking-[0.2em] font-medium text-[var(--color-navy)]/70">
        Putting this together
      </p>
      <p className="mt-3 max-w-sm text-center text-base text-[var(--color-text-primary)]/80">
        We&apos;re shaping a realistic range for your brief. Usually under 10 seconds.
      </p>
    </div>
  );
}
