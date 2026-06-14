"use client";

import { useEffect, useState } from "react";

const googleProfileUrl =
  "https://www.google.com/maps/search/?api=1&query=Black%20Iris%20Films%20Sydney%20Australia";

type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date?: string;
};

const fallbackReviews: Review[] = [
  {
    id: "vicky-barker",
    author: "Vicky Barker",
    rating: 5,
    text: "For our corporate videos, Titus is unparalleled in his filmmaking prowess. His meticulous attention to detail, innate storytelling aptitude, and technical brilliance make him a delight to collaborate with.",
  },
  {
    id: "catherine-allison",
    author: "Catherine Allison",
    rating: 5,
    text: "Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative. Highly recommended and would definitely use them again.",
  },
  {
    id: "ian-lowe",
    author: "Ian Lowe",
    rating: 5,
    text: "I would recommend Black Iris Films unambiguously. This is a group of accessible, really polished professionals that have taken all of our video content to the next level.",
  },
  {
    id: "scott-newton",
    author: "Scott Newton",
    rating: 5,
    text: "I worked with Titus on a shoot for a big launch event. He managed the process with professional ease and captured exciting footage and engaging interviews through warm interactions with the guests.",
  },
  {
    id: "marlon-marescia",
    author: "Marlon Marescia",
    rating: 5,
    text: "Black Iris Films are very energetic and bring an excitement to the projects we work on. They always have new ideas and are always thinking of new ways of achieving goals.",
  },
  {
    id: "jess-smith",
    author: "Jess Smith",
    rating: 5,
    text: "Working with Black Iris Films for our IllumiaSkin 7+1 LED Face Mask video was a game-changer. They expertly brought our vision to life, building and lighting a set inside a studio.",
  },
  {
    id: "leon-matti",
    author: "Leon Matti",
    rating: 5,
    text: "Discovered Black Iris Films online and downloaded their insightful report, which led us to choose them as our principal video supplier. Their team brilliantly crafted a series of videos and social media ads for us.",
  },
  {
    id: "will-aslett",
    author: "Will Aslett",
    rating: 5,
    text: "Black Iris Films have a well-honed professionalism in storytelling through film and video. They have a firm grip on the visual narrative and excel at tailoring content to a target audience.",
  },
  {
    id: "sarah-taylor",
    author: "Sarah Taylor",
    rating: 5,
    text: "Black Iris Films are professional, friendly and thorough. Titus delivered exceptional content on time and within budget.",
  },
  {
    id: "eva-williams",
    author: "Eva Williams",
    rating: 5,
    text: "Black Iris Films consists of experienced filmmakers who use ahead-of-curve marketing strategies and original production to deliver the message of your brand and attract new customers.",
  },
];

type ReviewsResponse = {
  configured?: boolean;
  averageRating?: number;
  totalReviewCount?: number;
  reviews?: Review[];
  message?: string;
};

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function Star({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 ${filled ? "fill-gold text-gold" : "fill-fog text-fog"}`}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function Stars({ rating = 5 }: { rating?: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rounded} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} filled={index < rounded} />
      ))}
    </div>
  );
}

function formatReviewDate(date?: string) {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat("en-AU", {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return null;
  }
}

export function GoogleReviewsBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [averageRating, setAverageRating] = useState(5);
  const [totalReviewCount, setTotalReviewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);

    async function loadReviews() {
      try {
        const response = await fetch("/api/google-reviews", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        const data = (await response.json()) as ReviewsResponse;

        if (response.ok && data.configured && data.reviews?.length) {
          setReviews(data.reviews);
          setAverageRating(data.averageRating || 5);
          setTotalReviewCount(data.totalReviewCount ?? null);
        }
      } catch {
        // Keep the curated reviews visible when live Google data is unavailable.
      } finally {
        window.clearTimeout(timer);
      }
    }

    loadReviews();

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen]);

  return (
    <aside
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] text-navy md:bottom-5 md:left-5"
      aria-label="Google reviews widget"
    >
      {isOpen && (
        <div className="mb-3 w-[342px] max-w-full overflow-hidden rounded-lg border border-fog/80 bg-white/98 shadow-[0_18px_56px_rgba(15,24,38,0.2)] backdrop-blur">
          <div className="flex items-start justify-between gap-4 border-b border-fog/70 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(15,24,38,0.08)]">
                <GoogleMark />
              </span>
              <div>
                <Stars rating={averageRating} />
                <h2 className="mt-1 text-[13px] font-bold leading-tight text-navy">
                  Black Iris Films reviews
                </h2>
                {totalReviewCount ? (
                  <p className="mt-0.5 text-[11px] font-medium leading-tight text-slate">
                    {totalReviewCount} Google reviews
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              aria-label="Close Google reviews"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate transition-colors hover:bg-fog/50 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-[336px] space-y-3 overflow-y-auto px-4 py-4">
            {reviews.map((review) => {
              const date = formatReviewDate(review.date);

              return (
                <figure key={review.id} className="rounded-md bg-off-white px-3 py-3">
                  <div className="mb-2">
                    <Stars rating={review.rating || 5} />
                  </div>
                  <blockquote className="text-[12.5px] leading-relaxed text-navy">
                    &ldquo;{review.text || `Rated ${review.rating || 5} stars on Google.`}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[11px] font-bold text-slate">
                    {review.author}
                    {date ? (
                      <span className="ml-1 font-medium text-slate/75">
                        {date}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="border-t border-fog/70 px-4 py-3">
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-sm bg-mint px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
            >
              View Google profile
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Hide Google reviews" : "Show Google reviews"}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex max-w-full items-center gap-3 rounded-lg border border-fog/80 bg-white/95 px-3.5 py-3 text-left text-navy shadow-[0_14px_40px_rgba(15,24,38,0.18)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(15,24,38,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(15,24,38,0.08)]">
          <GoogleMark />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} filled={index < Math.round(averageRating)} />
            ))}
          </span>
          <span className="mt-1 block text-[12px] font-bold leading-none">
            Google reviews
          </span>
          <span className="mt-1 block text-[11px] font-medium leading-none text-slate">
            {isOpen ? "Hide reviews" : "Read what clients say"}
          </span>
        </span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fog/60 text-slate transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
    </aside>
  );
}
