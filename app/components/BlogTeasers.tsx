"use client";

import { useState } from "react";

const posts = [
  {
    title: "Why Emotionally Connected Customers Spend 2× More",
    href: "https://www.blackirisfilms.com/post/why-emotionally-connected-customers-spend-2-more",
    date: "Oct 21, 2025",
    image: "https://static.wixstatic.com/media/a2a11d_b3f7b3e5b85b446cbe233862e0ac5778~mv2.png/v1/fill/w_420,h_280,al_c,q_85,enc_avif,quality_auto/a2a11d_b3f7b3e5b85b446cbe233862e0ac5778~mv2.png",
  },
  {
    title: "How $8k in Video Marketing Can Earn a Brand $34m ROI",
    href: "https://www.blackirisfilms.com/post/how-8k-in-video-marketing-earned-a-brand-up-to-34m-roi",
    date: "Mar 14, 2024",
    image: "https://static.wixstatic.com/media/a2a11d_b6ce2f081cb840bc9654f9fe49e21b56~mv2.jpg/v1/fill/w_420,h_280,al_c,q_85,enc_avif,quality_auto/a2a11d_b6ce2f081cb840bc9654f9fe49e21b56~mv2.jpg",
  },
  {
    title:
      "Social Media Video Production: A Comprehensive Guide to Captivate and Convert Prospects",
    href: "https://www.blackirisfilms.com/post/social-media-video-production-a-comprehensive-guide-to-captivate-and-convert-prospects",
    date: "Feb 14, 2024",
    image: "https://i.ytimg.com/vi/2AjJhIFTj8E/sddefault.jpg",
    youtubeId: "2AjJhIFTj8E",
  },
];

export function BlogTeasers() {
  const [activeVideoIds, setActiveVideoIds] = useState<Set<string>>(
    () => new Set(),
  );

  const activatePreview = (youtubeId?: string) => {
    if (!youtubeId) return;
    setActiveVideoIds((current) => {
      if (current.has(youtubeId)) return current;
      const next = new Set(current);
      next.add(youtubeId);
      return next;
    });
  };

  return (
    <section id="blog" className="border-y border-fog/60 bg-white py-9 md:py-10">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-mint">
              The thinking behind the work
            </p>
            <h2 className="text-2xl font-bold leading-tight text-navy md:text-[28px]">
              Ideas worth your time.
            </h2>
          </div>

          <a
            href="https://www.blackirisfilms.com/learn"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-navy transition-colors hover:text-mint"
          >
            More articles
            <svg
              aria-hidden="true"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              className="group flex min-h-[104px] gap-3 rounded-lg border border-fog/70 bg-off-white/65 p-2.5 transition-colors hover:border-mint/45 hover:bg-white"
              onMouseEnter={() => activatePreview(post.youtubeId)}
              onFocus={() => activatePreview(post.youtubeId)}
            >
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-fog/50 md:h-24 md:w-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {post.youtubeId && activeVideoIds.has(post.youtubeId) && (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&playlist=${post.youtubeId}&playsinline=1&rel=0&modestbranding=1`}
                    title={`${post.title} preview`}
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.55]"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>

              <div className="min-w-0 py-1">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-mint">
                  {post.date}
                </p>
                <h3 className="line-clamp-3 text-[13px] font-bold leading-snug text-navy transition-colors group-hover:text-mint md:text-[14px]">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
