"use client";

const posts = [
  {
    title: "Why Emotionally Connected Customers Spend 2× More",
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
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14 items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-5">
              The thinking behind the work
            </p>
            <h2 className="font-light text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
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

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((p, i) => (
            <a
              key={i}
              href={p.href}
              className="group block"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-fog/40 border border-fog/60 mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-navy text-lg md:text-xl font-medium leading-snug group-hover:text-mint transition-colors">
                {p.title}
              </h3>
            </a>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-12 gap-10 items-center bg-off-white rounded-2xl p-8 md:p-10 border border-fog/60">
          <div className="md:col-span-7">
            <h3 className="text-navy text-2xl md:text-3xl font-light leading-tight tracking-tight">
              Get notified about new posts.
            </h3>
            <p className="text-slate mt-3 text-[15px]">
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

        <div className="mt-12 rounded-2xl border border-mint/30 bg-mint/5 p-6 md:p-8 flex gap-5 items-start">
          <div className="text-2xl">💡</div>
          <p className="text-navy text-[15px] md:text-base leading-relaxed">
            <span className="font-medium">Tips &amp; Tricks.</span> IPA &ldquo;Power of Emotion&rdquo;
            report (2025, 1,400+ campaigns) shows emotion-led campaigns are roughly twice
            as likely to drive very large profit growth compared with purely rational campaigns.
          </p>
        </div>
      </div>
    </section>
  );
}
