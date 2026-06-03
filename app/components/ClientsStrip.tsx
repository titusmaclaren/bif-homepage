"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Real client logos pulled from the BIF Wix logos gallery.
const logoBase = (id: string) =>
  `https://static.wixstatic.com/media/${id}/v1/fit/w_240,h_240,q_90,enc_avif,quality_auto/${id}`;

const logoIds = [
  "a2a11d_7c1ef1b67917431fba2b701d0e4de99f~mv2.png",
  "a2a11d_85bf428cf9644fc08155f10d6d391781~mv2.png",
  "a2a11d_010a5517d770400eac46c837e5d22b80~mv2.png",
  "a2a11d_0983d6e674f747929af1fe782d330184~mv2.png",
  "a2a11d_0a6b39e45f2a4a29958918c9d87c6a46~mv2.png",
  "a2a11d_c740ef8502ff4977b7cf7a1748cb2be0~mv2.png",
  "a2a11d_47785c83baaf40d5b66f50885be58e4c~mv2.png",
  "a2a11d_90eb2306ffe344e5ac09075298d78b9c~mv2.png",
  "a2a11d_943505bac67b4b4896db99ae830d5562~mv2.png",
  "a2a11d_1484aad847004412bb32b0a397cbf05f~mv2.png",
  "a2a11d_8b88894d81d94044a62a8abb128a2d69~mv2.png",
  "a2a11d_5e176653a98249ba996d5411578be9de~mv2.png",
  "a2a11d_80528256e6004ee69c80ff819aff90da~mv2.png",
  "a2a11d_92cb3ce0b0fa4e1cbc32a60808a0025f~mv2.png",
  "a2a11d_9d771740bb14488db9fda6106cbd16d3~mv2.png",
  "a2a11d_f35cb6752b8948709c0628796de09b91~mv2.png",
  "a2a11d_9f42bc16cc1b41cd8cf400205a3bd195~mv2.jpg",
  "a2a11d_7cfcafd25c004e749ba4171f0c83225a~mv2.png",
];

const logos = logoIds.map(logoBase);

type ClientSnippet = {
  quote: string;
  name: string;
  role: string;
  image?: string;
  initials?: string;
};

const regularSnippets: ClientSnippet[] = [
  {
    quote:
      "Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative.",
    name: "Catherine Allison",
    role: "Director of Marketing, ACS",
    image: "https://static.wixstatic.com/media/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg",
  },
  {
    quote:
      "He captured exciting footage and engaging interviews through warm interactions with the guests.",
    name: "Scott Newton",
    role: "Marketing Director, Game Plus",
    image: "https://static.wixstatic.com/media/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg",
  },
  {
    quote:
      "Working with Black Iris Films for our IllumiaSkin 7+1 LED Face Mask video was a game-changer.",
    name: "Jess Smith",
    role: "Chief Marketing Officer, Ergo Health",
    image: "https://static.wixstatic.com/media/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg",
  },
];

const dacxiSnippets: ClientSnippet[] = [
  {
    quote:
      "This is a group of accessible, really polished professionals that have taken all of our video content to the next level.",
    name: "Ian Lowe",
    role: "CEO, Dacxi Group",
    image: "https://static.wixstatic.com/media/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg",
  },
  {
    quote: "For our corporate videos, Titus is unparalleled in his filmmaking prowess.",
    name: "Vicky Barker",
    role: "CMO, Dacxi Chain",
    image: "https://dacxichain.com/wp-content/uploads/2024/02/1237@2x.png",
  },
];

const CLIENT_SNIPPETS_VISIBLE = 3;
const SNIPPET_GAP_PX = 16;

export function ClientsStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dacxiVariant, setDacxiVariant] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(CLIENT_SNIPPETS_VISIBLE);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const secondSlideRef = useRef<HTMLDivElement>(null);

  const snippets = useMemo(
    () => [dacxiSnippets[dacxiVariant], ...regularSnippets],
    [dacxiVariant],
  );

  const loopedSnippets = useMemo(
    () => [...snippets, ...snippets.slice(0, cardsPerView)],
    [cardsPerView, snippets],
  );

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.matchMedia("(min-width: 768px)").matches ? CLIENT_SNIPPETS_VISIBLE : 1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    const measureSlideOffset = () => {
      if (!firstSlideRef.current || !secondSlideRef.current) return;
      setSlideOffset(secondSlideRef.current.offsetLeft - firstSlideRef.current.offsetLeft);
    };

    measureSlideOffset();

    const resizeObserver =
      typeof window.ResizeObserver === "function" ? new window.ResizeObserver(measureSlideOffset) : null;

    if (viewportRef.current) resizeObserver?.observe(viewportRef.current);
    window.addEventListener("resize", measureSlideOffset);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureSlideOffset);
    };
  }, [cardsPerView]);

  useEffect(() => {
    if (!isTransitioning) {
      const frame = window.requestAnimationFrame(() => setIsTransitioning(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((current) => current + 1);
    }, 5600);

    return () => window.clearInterval(interval);
  }, []);

  const slideBasis =
    cardsPerView === 1
      ? "100%"
      : `calc((100% - ${(cardsPerView - 1) * SNIPPET_GAP_PX}px) / ${cardsPerView})`;

  function handleTransitionEnd() {
    if (activeIndex >= snippets.length) {
      setIsTransitioning(false);
      setActiveIndex(0);
      setDacxiVariant((current) => (current + 1) % dacxiSnippets.length);
    }
  }

  return (
    <section id="clients" className="bg-off-white border-y border-fog/60 py-8 md:py-10 overflow-hidden">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10 mb-6">
        <p className="text-center text-slate text-[13px] md:text-sm font-light tracking-wide">
          Trusted by 30+ industries | 15+ years experience | Fixed price, every time
        </p>
      </div>

      <div className="relative" aria-label="Black Iris Films client logos">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{ background: "linear-gradient(to right, #FAFAF8, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{ background: "linear-gradient(to left, #FAFAF8, transparent)" }}
        />

        <div className="flex w-max animate-marquee">
          {[...logos, ...logos].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              aria-hidden={i >= logos.length}
              className="h-10 md:h-12 w-auto object-contain shrink-0 mx-6 md:mx-8"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-[1120px] px-6 lg:px-10">
        <div ref={viewportRef} className="overflow-hidden" aria-live="off">
          <div
            className={`flex items-stretch will-change-transform ${
              isTransitioning ? "transition-transform duration-700 ease-out" : ""
            }`}
            style={{
              gap: `${SNIPPET_GAP_PX}px`,
              transform: `translate3d(-${activeIndex * slideOffset}px, 0, 0)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopedSnippets.map((snippet, index) => (
              <div
                key={`${snippet.name}-${index}`}
                ref={index === 0 ? firstSlideRef : index === 1 ? secondSlideRef : undefined}
                className="shrink-0"
                style={{ flexBasis: slideBasis }}
              >
                <ClientSnippetCard snippet={snippet} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.blackirisfilms.com/get-a-quote#testimonials"
          className="text-[12px] uppercase tracking-[0.18em] text-mint hover:text-mint-bright font-medium"
        >
          What else our clients say
        </a>
      </div>
    </section>
  );
}

function ClientSnippetCard({ snippet }: { snippet: ClientSnippet }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-fog/70 bg-white p-5 shadow-[0_12px_32px_rgba(41,51,77,0.04)]">
      <div className="flex items-center gap-3">
        {snippet.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={snippet.image}
            alt={snippet.name}
            className="h-11 w-11 shrink-0 rounded-full bg-fog/40 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint/12 text-[13px] font-bold text-mint">
            {snippet.initials}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[13px] font-bold leading-tight text-navy">{snippet.name}</div>
          <div className="mt-1 text-[12px] leading-tight text-slate">{snippet.role}</div>
        </div>
      </div>
      <Stars />
      <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-navy">
        &ldquo;{snippet.quote}&rdquo;
      </blockquote>
    </figure>
  );
}

function Stars() {
  return (
    <div className="mt-4 flex gap-0.5 text-mint" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
