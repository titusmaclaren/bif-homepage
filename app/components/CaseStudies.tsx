const cases = [
  {
    intro: "A tech conference needed to prove its value to partners. Here's what happened.",
    results: [
      "+ 11.9% organic engagement rate (≈4× LinkedIn average)",
      "+ 2% engagement rate on paid boost (above B2B benchmark)",
      "+ High comment activity and reshares from partners and attendees",
    ],
    href: "https://stories.blackirisfilms.com/case-studies/",
    image: "https://static.wixstatic.com/media/a2a11d_847e8f6b74824140b4c41d4bb683665b~mv2.jpg/v1/fill/w_960,h_540,fp_0.43_0.32,q_90,enc_avif,quality_auto/a2a11d_847e8f6b74824140b4c41d4bb683665b~mv2.jpg",
  },
  {
    intro: "Amplitel needed content that could hold its own at the executive level.",
    results: [
      "+ 3× engagement uplift vs. pre-video baseline",
      "+ Up to ~15% internal engagement on top-performing posts",
      "+ Content reshared by CEO and senior leadership",
    ],
    href: "https://stories.blackirisfilms.com/case-studies/",
    image: "https://static.wixstatic.com/media/a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png/v1/fit/w_960,h_541,q_90,enc_avif,quality_auto/a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png",
  },
  {
    intro: "Dacxi Chain was launching globally. The story had to land with investors.",
    results: [
      "+ 2–15× uplift in LinkedIn engagement vs. prior content",
      "+ Improved brand credibility across investor and founder communities",
      "+ Supported successful funding continuation and global platform launch",
    ],
    href: "https://stories.blackirisfilms.com/case-studies/",
    image: "https://static.wixstatic.com/media/a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg/v1/fit/w_960,h_541,q_90,enc_avif,quality_auto/a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg",
  },
];

export function CaseStudies() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <h2 className="font-light text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl mb-14">
          Results that speak for themselves
        </h2>

        <div className="grid gap-10 md:gap-14">
          {cases.map((c, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-fog/40 border border-fog/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-light text-navy leading-snug tracking-tight">
                  {c.intro}
                </p>
                <ul className="mt-6 space-y-3 text-slate text-[15px] leading-relaxed">
                  {c.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <a
                  href={c.href}
                  className="mt-7 inline-flex items-center gap-2 text-mint hover:text-mint-bright font-medium text-sm"
                >
                  → View full case study
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
