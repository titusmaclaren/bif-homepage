"use client";

const posts = [
  {
    title: "Why Emotionally Connected Customers Spend 2x More",
    href: "https://www.blackirisfilms.com/learn",
    image: "https://static.wixstatic.com/media/a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg/v1/fit/w_600,h_338,q_90,enc_avif,quality_auto/a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg",
  },
  {
    title: "How $8k in Video Marketing Can Earn a Brand $34m ROI",
    href: "https://www.blackirisfilms.com/learn",
    image: "https://static.wixstatic.com/media/a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg/v1/fit/w_600,h_338,q_90,enc_avif,quality_auto/a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg",
  },
  {
    title: "Social Media Video Production: A Comprehensive Guide to Captivate and Convert Prospects",
    href: "https://www.blackirisfilms.com/learn",
    image: "https://static.wixstatic.com/media/a2a11d_7f2a248b99324297b3b77fa4e88928ed~mv2.jpg/v1/fit/w_600,h_338,q_90,enc_avif,quality_auto/a2a11d_7f2a248b99324297b3b77fa4e88928ed~mv2.jpg",
  },
];

export function BlogTeasers() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-9 items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-4">
              The thinking behind the work
            </p>
            <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.08]">
              Ideas worth your time.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href="https://www.blackirisfilms.com/learn"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-mint"
            >
              See more articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {posts.map((p) => (
            <a key={p.title} href={p.href} className="group block">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-fog/40 border border-fog/60 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-navy text-base md:text-lg font-medium leading-snug group-hover:text-mint transition-colors">
                {p.title}
              </h3>
            </a>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-12 gap-6 items-center bg-off-white rounded-lg p-6 md:p-7 border border-fog/60">
          <div className="md:col-span-7">
            <h3 className="text-navy text-xl md:text-2xl font-bold leading-tight">
              Get notified about new posts.
            </h3>
            <p className="text-slate mt-3 text-[14px]">
              Ideas on video marketing, emotion-led storytelling and how the best brands use both.
            </p>
          </div>
          <form
            className="md:col-span-5 flex gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-sm border border-fog px-4 py-3 text-sm bg-white text-navy placeholder:text-mist focus:outline-none focus:border-mint"
            />
            <button
              type="submit"
              className="rounded-sm bg-mint hover:bg-mint-bright px-5 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-lg border border-mint/30 bg-mint/5 p-5 md:p-6 flex gap-4 items-start">
          <div className="text-mint text-xl font-bold">!</div>
          <p className="text-navy text-[14px] md:text-[15px] leading-relaxed">
            <span className="font-medium">Tips &amp; Tricks.</span> IPA &ldquo;Power of Emotion&rdquo;
            report (2025, 1,400+ campaigns) shows emotion-led campaigns are roughly twice
            as likely to drive very large profit growth compared with purely rational campaigns.
          </p>
        </div>
      </div>
    </section>
  );
}
