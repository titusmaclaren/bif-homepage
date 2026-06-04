const posts = [
  {
    title: "Why Emotionally Connected Customers Spend 2× More",
    href: "https://www.blackirisfilms.com/post/why-emotionally-connected-customers-spend-2-more",
    date: "Oct 21, 2025",
    image:
      "https://static.wixstatic.com/media/a2a11d_b3f7b3e589f34c80a46758bf2b775a22~mv2.png/v1/fill/w_454,h_340,fp_0.50_0.50,q_90,enc_avif,quality_auto/a2a11d_b3f7b3e589f34c80a46758bf2b775a22~mv2.webp",
  },
  {
    title: "How $8k in Video Marketing Can Earn a Brand $34m ROI",
    href: "https://www.blackirisfilms.com/post/how-8k-in-video-marketing-earned-a-brand-up-to-34m-roi",
    date: "Mar 14, 2024",
    image:
      "https://static.wixstatic.com/media/a2a11d_b6ce2f083033435e88a3e2f8f1c4063e~mv2.jpg/v1/fill/w_454,h_340,fp_0.50_0.50,q_90,enc_avif,quality_auto/a2a11d_b6ce2f083033435e88a3e2f8f1c4063e~mv2.webp",
  },
  {
    title:
      "Social Media Video Production: A Comprehensive Guide to Captivate and Convert Prospects",
    href: "https://www.blackirisfilms.com/post/social-media-video-production-a-comprehensive-guide-to-captivate-and-convert-prospects",
    date: "Feb 14, 2024",
    image: "https://i.ytimg.com/vi/2AjJhIFTj8E/sddefault.jpg",
  },
];

export function BlogTeasers() {
  return (
    <section className="border-y border-fog/60 bg-white py-9 md:py-10">
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
            >
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-fog/50 md:h-24 md:w-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
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
