"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
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
          speed="42s"
          hoverSpeed="96s"
        />
        <PortfolioMarqueeRow
          items={bottomPortfolioItems}
          speed="68s"
          hoverSpeed="132s"
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
  speed: string;
  hoverSpeed: string;
}) {
  const loopedItems = useMemo(() => [...items, ...items], [items]);
  const style = {
    "--portfolio-speed": speed,
    "--portfolio-hover-speed": hoverSpeed,
  } as CSSProperties;

  return (
    <div
      className="portfolio-marquee-row overflow-hidden px-6 lg:px-10"
      style={style}
    >
      <div className="portfolio-marquee-track flex w-max gap-4">
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

        <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-4 md:bottom-4 md:left-4 md:right-4">
          <span className="min-w-0">
            <span
              className={[
                "block font-bold leading-tight text-white",
                isLarge ? "text-lg md:text-[22px]" : "line-clamp-2 text-sm",
              ].join(" ")}
            >
              {item.title}
            </span>
            {isLarge && (
              <span className="mt-1.5 block text-[12px] font-medium text-white/68">
                {item.client}
              </span>
            )}
          </span>

          <span
            className={[
              "grid shrink-0 place-items-center rounded-full bg-mint text-white shadow-xl transition-transform duration-300 group-hover:scale-105",
              isLarge ? "h-11 w-11 md:h-12 md:w-12" : "h-9 w-9",
            ].join(" ")}
            aria-hidden="true"
          >
            <svg
              width={isLarge ? 16 : 12}
              height={isLarge ? 16 : 12}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </span>
    </VideoTrigger>
  );
}
