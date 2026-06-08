import type { BlogPost } from "../lib/blog";
import { formatPostDate } from "../lib/blog";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { StickyQuizCTA } from "./StickyQuizCTA";

type BlogPostLayoutProps = {
  post: BlogPost;
};

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  return (
    <>
      <Nav showEstimateBar />
      <main className="flex-1" style={{ paddingTop: 108 }}>
        <article>
          <header className="bg-navy-midnight text-white">
            <div className="mx-auto grid max-w-[1260px] gap-9 px-6 py-14 md:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)] md:items-center md:py-18 lg:px-10">
              <div>
                <a
                  href="/learn"
                  className="mb-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-mint transition-colors hover:text-mint-bright"
                >
                  <span aria-hidden="true">&larr;</span>
                  Learn
                </a>

                <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/58">
                  <span>{formatPostDate(post.date)}</span>
                  <span className="text-white/22">/</span>
                  <span>{post.readingTime}</span>
                </div>

                <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] md:text-5xl lg:text-[58px]">
                  {post.title}
                </h1>

                <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/72 md:text-lg">
                  {post.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/78"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[1000/367] overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </header>

          <div className="bg-white px-6 py-14 md:py-16 lg:px-10">
            <div className="mx-auto max-w-[820px]">
              <div
                className="blog-article text-[16px] leading-[1.78] text-navy md:text-[17px]"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </div>
          </div>
        </article>
        <FinalCTA />
      </main>
      <StickyQuizCTA />
      <Footer />
    </>
  );
}
