"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ServiceTile } from "../components/ServicesGrid";

type ServiceCarouselProps = {
  items: ServiceTile[];
};

export function ServiceCarousel({ items }: ServiceCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLAnchorElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const card = firstCardRef.current;
    if (!viewport || !card) return;

    const trackStyles = window.getComputedStyle(card.parentElement as HTMLElement);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    const nextStep = card.getBoundingClientRect().width + gap;
    const visibleCount = Math.max(
      1,
      Math.floor((viewport.getBoundingClientRect().width + gap) / nextStep),
    );
    const nextMaxIndex = Math.max(0, items.length - visibleCount);

    setStep(nextStep);
    setMaxIndex(nextMaxIndex);
    setActiveIndex((current) => Math.min(current, nextMaxIndex));
  }, [items.length]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }, [maxIndex]);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }, [maxIndex]);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = window.setInterval(goNext, 5000);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, maxIndex]);

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
            Service pages
          </p>
          <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl">
            Find the format or sector that fits.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-slate">
            Explore the main service pages for process notes, examples and FAQs
            tailored to each kind of work.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div ref={viewportRef} className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * step}px)`,
              }}
            >
              {items.map((item, index) => (
                <a
                  key={item.href}
                  ref={index === 0 ? firstCardRef : undefined}
                  href={item.href}
                  className="group block min-w-0 shrink-0 basis-[82%] overflow-hidden rounded-md border border-fog bg-off-white text-left shadow-[0_12px_30px_rgba(15,24,38,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,24,38,0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mint sm:basis-[48%] lg:basis-[31%] xl:basis-[24%]"
                >
                  <span className="relative block aspect-[16/9] overflow-hidden bg-navy-midnight">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      style={
                        item.objectPosition
                          ? { objectPosition: item.objectPosition }
                          : undefined
                      }
                      loading="lazy"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
                  </span>
                  <span className="block p-4">
                    <span className="block text-base font-bold leading-tight text-navy">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate">
                      {item.description}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              className="grid h-11 w-11 place-items-center rounded-full border border-fog bg-white text-navy transition-colors hover:border-mint hover:text-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              aria-label="Previous service"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <span className="min-w-16 text-center text-xs font-bold text-slate">
              {activeIndex + 1} / {maxIndex + 1}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="grid h-11 w-11 place-items-center rounded-full border border-fog bg-white text-navy transition-colors hover:border-mint hover:text-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              aria-label="Next service"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
