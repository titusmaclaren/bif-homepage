import type { BlogPost } from "../lib/blog";
import { formatPostDate } from "../lib/blog";

type BlogCardProps = {
  post: BlogPost;
  compact?: boolean;
};

export function BlogCard({ post, compact = false }: BlogCardProps) {
  return (
    <a
      href={post.urlPath}
      className={
        compact
          ? "group flex min-h-[116px] gap-3 rounded-lg border border-fog/70 bg-off-white/65 p-2.5 transition-colors hover:border-mint/45 hover:bg-white"
          : "group grid overflow-hidden rounded-lg border border-fog/70 bg-white shadow-[0_18px_50px_rgba(15,24,38,0.06)] transition-colors hover:border-mint/50 md:grid-cols-[0.8fr_1fr]"
      }
    >
      <div
        className={
          compact
            ? "relative h-24 w-28 shrink-0 overflow-hidden rounded-md bg-navy-midnight"
            : "relative min-h-[230px] overflow-hidden bg-navy-midnight"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      <div className={compact ? "min-w-0 py-1" : "p-6 md:p-8"}>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-mint">
          <span>{formatPostDate(post.date)}</span>
          <span className="text-fog">/</span>
          <span>{post.readingTime}</span>
        </div>

        <h3
          className={
            compact
              ? "line-clamp-3 text-[13px] font-bold leading-snug text-navy transition-colors group-hover:text-mint md:text-[14px]"
              : "text-xl font-bold leading-tight text-navy transition-colors group-hover:text-mint md:text-2xl"
          }
        >
          {post.title}
        </h3>

        {!compact && (
          <p className="mt-3 text-sm leading-relaxed text-slate md:text-[15px]">
            {post.description}
          </p>
        )}

        {!compact && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-ice/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-navy"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
