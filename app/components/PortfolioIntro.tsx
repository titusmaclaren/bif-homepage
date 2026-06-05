"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import { VideoTrigger } from "./VideoLightbox";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "../data/portfolio";

const topPortfolioItems = PORTFOLIO_ITEMS.slice(0, 12);
const middlePortfolioItems = PORTFOLIO_ITEMS.slice(12, 25);
const bottomPortfolioItems = PORTFOLIO_ITEMS.slice(25);

export function PortfolioIntro() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-black py-14 text-white md:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-5 md:grid-cols-[minmax(0,0.78fr)_minmax(300px,0.42fr)] md:items-end">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
              Portfolio
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-[1.06] text-white md:text-4xl">
              Selected work, in motion.
            </h2>
          </div>
          <p className="max-w-xl text-sm font-light leading-relaxed text-white/68 md:text-right">
            Brand films, commercials, explainers, event videos and social content.
            Click any thumbnail to watch the project.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4 md:mt-9 md:space-y-5">
        <SteppedPortfolioRow items={topPortfolioItems} />
        <PortfolioMarqueeRow
          items={middlePortfolioItems}
          speed={48}
          hoverSpeed={18}
        />
        <PortfolioMarqueeRow
          items={bottomPortfolioItems}
          speed={58}
          hoverSpeed={22}
        />
      </div>

      <div className="mx-auto mt-8 flex max-w-[1440px] justify-center px-6 lg:px-10">
        <a
          href="https://quiz.blackirisfilms.com/"
          className="inline-flex items-center gap-2.5 rounded-sm bg-mint px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-navy transition-colors hover:bg-mint-bright"
        >
          Get an estimate in 1-min
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

function SteppedPortfolioRow({ items }: { items: PortfolioItem[] }) {
  const loopedItems = useMemo(() => [...items, ...items], [items]);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [isInstant, setIsInstant] = useState(false);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const firstCard = firstCardRef.current;
      if (!track || !firstCard) return;

      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      setStep(firstCard.getBoundingClientRect().width + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!step || !items.length) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, 3900);

    return () => window.clearInterval(timer);
  }, [items.length, step]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (index < items.length) return;

    setIsInstant(true);
    setIndex(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsInstant(false));
    });
  };

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max gap-4 px-6 md:gap-5 lg:px-10"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translate3d(-${index * step}px, 0, 0)`,
          transition: isInstant
            ? "none"
            : "transform 740ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        {loopedItems.map((item, itemIndex) => (
          <div
            key={`${item.vimeoId}-${itemIndex}`}
            ref={itemIndex === 0 ? firstCardRef : undefined}
            className="shrink-0"
          >
            <PortfolioThumbCard item={item} size="large" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioMarqueeRow({
  items,
  speed,
  hoverSpeed,
}: {
  items: PortfolioItem[];
  speed: number;
  hoverSpeed: number;
}) {
  const loopedItems = useMemo(() => [...items, ...items], [items]);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    let frameId = 0;
    let lastTime = performance.now();
    let offset = 0;
    let currentSpeed = speed;
    let loopWidth = track.scrollWidth / 2;

    const measure = () => {
      loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0) offset %= loopWidth;
    };

    const resizeObserver =
      typeof window.ResizeObserver === "function"
        ? new window.ResizeObserver(measure)
        : null;

    resizeObserver?.observe(track);
    window.addEventListener("resize", measure);
    measure();

    const tick = (time: number) => {
      const deltaSeconds = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const targetSpeed = isHoveringRef.current ? hoverSpeed : speed;
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      if (loopWidth > 0) {
        offset = (offset + currentSpeed * deltaSeconds) % loopWidth;
        track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, [hoverSpeed, speed, items.length]);

  return (
    <div
      className="portfolio-marquee-row overflow-hidden px-6 lg:px-10"
      onMouseEnter={() => {
        isHoveringRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false;
      }}
    >
      <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
        {loopedItems.map((item, itemIndex) => (
          <PortfolioThumbCard
            key={`${item.vimeoId}-${itemIndex}`}
            item={item}
            size="medium"
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioThumbCard({
  item,
  size,
}: {
  item: PortfolioItem;
  size: "large" | "medium";
}) {
  const isLarge = size === "large";

  return (
    <VideoTrigger
      video={item}
      className={[
        "group block shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint",
        isLarge
          ? "w-[78vw] sm:w-[540px] lg:w-[660px]"
          : "w-[260px] sm:w-[320px] lg:w-[360px]",
      ].join(" ")}
      aria-label={`Play ${item.category}: ${item.title}`}
    >
      <span
        className={[
          "relative block aspect-[16/9] overflow-hidden rounded-[14px] border border-white/10 bg-navy-midnight shadow-[0_18px_50px_rgba(0,0,0,0.26)]",
          isLarge ? "md:rounded-2xl" : "",
        ].join(" ")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.thumb}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-black/0" />
        <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/18" />

        <span className="absolute left-3 top-3 rounded-full bg-white/88 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-navy shadow-sm md:left-4 md:top-4">
          {item.category}
        </span>

        <span
          className={[
            "absolute right-3 top-3 grid shrink-0 place-items-center rounded-full bg-white/82 text-slate shadow-sm transition-colors duration-300 group-hover:bg-mint group-hover:text-white md:right-4 md:top-4",
            isLarge ? "h-8 w-8 md:h-9 md:w-9" : "h-7 w-7",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg
            width={isLarge ? 11 : 9}
            height={isLarge ? 11 : 9}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>

        <span className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
          <span className="min-w-0">
            <span
              className={[
                "block font-bold leading-tight text-white",
                isLarge ? "text-base md:text-lg" : "line-clamp-2 text-[12px] md:text-[13px]",
              ].join(" ")}
            >
              {item.client}
            </span>
          </span>
        </span>
      </span>
    </VideoTrigger>
  );
}
