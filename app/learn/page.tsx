import type { Metadata } from "next";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import { LearnVideoSeries } from "../components/LearnVideoSeries";
import { Nav } from "../components/Nav";
import { StickyQuizCTA } from "../components/StickyQuizCTA";
import { getAllPosts } from "../lib/blog";
import { learnSeriesVideos } from "../lib/learn-video-series";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Video marketing insights, practical production guidance and brand storytelling thinking from Black Iris Films.",
  alternates: {
    canonical: "/learn",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Black Iris Films Learn",
    description:
      "Practical video marketing and production thinking from Black Iris Films.",
    url: "/learn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Iris Films Learn",
    description:
      "Practical video marketing and production thinking from Black Iris Films.",
  },
};

export default function LearnPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav showEstimateBar />
      <main className="flex-1" style={{ paddingTop: 108 }}>
        <section className="bg-navy-midnight text-white">
          <div className="mx-auto max-w-[1260px] px-6 py-14 md:py-18 lg:px-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
              Black Iris Films Learn
            </p>
            <div className="grid gap-6 md:grid-cols-[minmax(0,0.78fr)_minmax(260px,0.42fr)] md:items-end">
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] md:text-5xl lg:text-[58px]">
                Simple, useful thinking for video marketing.
              </h1>
              <p className="max-w-xl text-base font-light leading-relaxed text-white/72">
                Practical notes on story, strategy, production and the small
                creative choices that make people care.
              </p>
            </div>
          </div>
        </section>

        <LearnVideoSeries videos={learnSeriesVideos} />

        <section className="bg-off-white px-6 py-12 md:py-16 lg:px-10">
          <div className="mx-auto max-w-[1260px]">
            <div className="mb-7 flex flex-col gap-3 border-b border-fog/70 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-mint">
                  Latest article
                </p>
                <h2 className="text-2xl font-bold leading-tight text-navy md:text-3xl">
                  Ideas worth your time.
                </h2>
              </div>
              <a
                href="/rss.xml"
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-navy transition-colors hover:text-mint"
              >
                RSS feed
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="grid gap-5">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <StickyQuizCTA />
      <Footer />
    </>
  );
}
