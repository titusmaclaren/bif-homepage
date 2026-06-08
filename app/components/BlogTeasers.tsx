import { getFeaturedPosts } from "../lib/blog";
import { BlogCard } from "./BlogCard";

export function BlogTeasers() {
  const posts = getFeaturedPosts(3);

  if (posts.length === 0) {
    return null;
  }

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
            href="/learn"
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
            <BlogCard key={post.slug} post={post} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
