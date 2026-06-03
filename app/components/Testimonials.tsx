"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  rating: number;
  text: string;
  name: string;
  jobTitle: string;
  company: string;
  image: string;
  link?: string;
};

const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative. Highly recommended and would definitely use them again.",
    name: "Catherine Allison",
    jobTitle: "Director of Marketing",
    company: "ACS",
    image: "https://static.wixstatic.com/media/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg",
  },
  {
    rating: 5,
    text: "I would recommend Black Iris Films unambiguously. This is a group of accessible, really polished professionals that have taken all of our video content to the next level and what we've been able to achieve with that result has been just fantastic.",
    name: "Ian Lowe",
    jobTitle: "CEO",
    company: "Dacxi Group",
    image: "https://static.wixstatic.com/media/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg",
  },
  {
    rating: 5,
    text: "I worked with Titus on a shoot for a big launch event. He managed the process with professional ease. We met beforehand, discussed the vision for the film and scouted out the space and, on the night, he captured exciting footage and engaging interviews through warm interactions with the guests.",
    name: "Scott Newton",
    jobTitle: "Marketing Director",
    company: "Game Plus",
    image: "https://static.wixstatic.com/media/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg",
  },
  {
    rating: 5,
    text: "Black Iris Films are very energetic and bring an excitement to the projects we work on. They always have new ideas and are always thinking of new ways of achieving goals.",
    name: "Marlon Marescia",
    jobTitle: "Facebook Ads Strategist",
    company: "Sales Driven",
    image: "https://static.wixstatic.com/media/a2a11d_fc338e0ac17e49af8a93a0c8f1bf7a55~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_fc338e0ac17e49af8a93a0c8f1bf7a55~mv2.jpeg",
  },
  {
    rating: 5,
    text: "Working with Black Iris Films for our IllumiaSkin 7+1 LED Face Mask video was a game-changer. They expertly brought our vision to life, building and lighting a set inside a studio.",
    name: "Jess Smith",
    jobTitle: "Chief Marketing Officer",
    company: "Ergo Health",
    image: "https://static.wixstatic.com/media/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg",
  },
  {
    rating: 5,
    text: "Discovered Black Iris Films online and downloaded their insightful report, which led us to choose them as our principal video supplier. Their team brilliantly crafted a series of videos and social media ads for us.",
    name: "Leon Matti",
    jobTitle: "Founder",
    company: "Smart Makeover",
    image: "https://static.wixstatic.com/media/a2a11d_5057b54b50e24496a9250c8b5d3b5a1b~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_5057b54b50e24496a9250c8b5d3b5a1b~mv2.jpg",
  },
  {
    rating: 5,
    text: "Black Iris Films have a well-honed professionalism in storytelling through film and video. They have a firm grip on the visual narrative and excel at tailoring content to a target audience.",
    name: "Will Aslett",
    jobTitle: "Development Executive",
    company: "Freelance",
    image: "https://static.wixstatic.com/media/a2a11d_bc4e8ccb07cc4dd596f77cd89a6f5af0~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_bc4e8ccb07cc4dd596f77cd89a6f5af0~mv2.jpg",
  },
  {
    rating: 5,
    text: "Black Iris Films are professional, friendly and thorough. I needed someone who was able to film and produce an interactive video series and Titus delivered exceptional content on time and within budget.",
    name: "Sarah Taylor",
    jobTitle: "Owner / Director",
    company: "Meetings Into Minutes",
    image: "https://static.wixstatic.com/media/a2a11d_bd0c317419aa45f2aaf662033c85597a~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_bd0c317419aa45f2aaf662033c85597a~mv2.jpg",
  },
  {
    rating: 5,
    text: "Black Iris Films is a video production company that consists of experienced filmmakers. They use ahead-of-curve marketing strategies along with original production to deliver the message of your brand and attract new customers.",
    name: "Eva Williams",
    jobTitle: "Journalist",
    company: "FixThePhoto.com",
    image: "https://static.wixstatic.com/media/a2a11d_3ec815283fe140b292cde5f503ad4c4b~mv2.png/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_3ec815283fe140b292cde5f503ad4c4b~mv2.png",
    link: "https://fixthephoto.com/black-iris-films-review.html",
  },
];

const REEL_VIMEO_ID = "943964025";
const DESKTOP_VISIBLE_TESTIMONIALS = 3;
const SLIDE_GAP_PX = 20;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          className={i < rating ? "text-mint" : "text-fog"}
          aria-hidden
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  const inner = (
    <div className="flex h-full flex-col rounded-lg border border-fog/60 bg-off-white p-5 md:p-6 transition-colors hover:border-fog">
      <Stars rating={t.rating} />
      <p className="mt-4 flex-1 text-navy text-[14px] leading-relaxed">&ldquo;{t.text}&rdquo;</p>
      <div className="mt-5 pt-4 border-t border-fog/60 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover bg-fog/40 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="text-navy font-bold text-[13.5px] leading-tight truncate">
            {t.name}
          </div>
          <div className="text-slate text-[12px] mt-0.5 leading-tight truncate">
            {t.jobTitle}
            {t.company ? <span className="text-slate/70">, {t.company}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );

  if (t.link) {
    return (
      <a
        href={t.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`Read the full review by ${t.name}, ${t.company}`}
      >
        {inner}
      </a>
    );
  }

  return inner;
}

export function Testimonials() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const secondSlideRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(DESKTOP_VISIBLE_TESTIMONIALS);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const loopedTestimonials = useMemo(
    () => [...testimonials, ...testimonials.slice(0, cardsPerView)],
    [cardsPerView],
  );

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.matchMedia("(min-width: 768px)").matches ? DESKTOP_VISIBLE_TESTIMONIALS : 1);
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
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const slideBasis =
    cardsPerView === 1
      ? "100%"
      : `calc((100% - ${(cardsPerView - 1) * SLIDE_GAP_PX}px) / ${cardsPerView})`;

  const activeDot = activeIndex % testimonials.length;

  function goToPrevious() {
    if (activeIndex === 0) {
      setIsTransitioning(false);
      setActiveIndex(testimonials.length);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitioning(true);
          setActiveIndex(testimonials.length - 1);
        });
      });
      return;
    }

    setIsTransitioning(true);
    setActiveIndex((current) => current - 1);
  }

  function goToNext() {
    setIsTransitioning(true);
    setActiveIndex((current) => current + 1);
  }

  function handleTransitionEnd() {
    if (activeIndex >= testimonials.length) {
      setIsTransitioning(false);
      setActiveIndex(0);
    }
  }

  return (
    <section id="testimonials" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-4">
            What people say
          </p>
          <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.08]">
            Trusted by brands worldwide.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-9">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-fog/60 bg-navy-midnight shadow-xl">
            <iframe
              src={`https://player.vimeo.com/video/${REEL_VIMEO_ID}?title=0&byline=0&portrait=0&color=61B383&dnt=1`}
              title="Working with Black Iris Films: What our clients had to say"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <p className="text-center text-slate text-[12.5px] mt-3 italic">
            Two minutes with the clients we&apos;ve built films for, on what working together was actually like.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            type="button"
            onClick={goToPrevious}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fog text-navy hover:border-mint hover:text-mint transition-colors"
            aria-label="Previous testimonials"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setActiveIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeDot === index ? "w-8 bg-mint" : "w-2.5 bg-fog hover:bg-mint/55"
                }`}
                aria-label={`Start at testimonial ${index + 1}`}
                aria-current={activeDot === index}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goToNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fog text-navy hover:border-mint hover:text-mint transition-colors"
            aria-label="Next testimonials"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>

        <div ref={viewportRef} className="overflow-hidden" aria-live="off">
          <div
            className={`flex items-stretch will-change-transform ${
              isTransitioning ? "transition-transform duration-700 ease-out" : ""
            }`}
            style={{
              gap: `${SLIDE_GAP_PX}px`,
              transform: `translate3d(-${activeIndex * slideOffset}px, 0, 0)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopedTestimonials.map((t, index) => (
              <div
                key={`${t.name}-${index}`}
                ref={index === 0 ? firstSlideRef : index === 1 ? secondSlideRef : undefined}
                className="shrink-0"
                style={{ flexBasis: slideBasis }}
              >
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 text-center">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
          </a>
        </div>
      </div>
    </section>
  );
}
