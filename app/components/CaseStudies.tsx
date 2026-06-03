const cases = [
  {
    intro: "A tech conference needed to prove its value to partners. Here's what happened.",
    results: [
      "+ 11.9% organic engagement rate (~4x LinkedIn average)",
      "+ 2% engagement rate on paid boost (above B2B benchmark)",
      "+ High comment activity and reshares from partners and attendees",
    ],
    href: "https://stories.blackirisfilms.com/case-studies/mary-technology/",
    image:
      "https://i.vimeocdn.com/video/2049109787-1c30b5cb912bb36d3d94f57111c4fa9fa4b1a278513979d94c1073fdfb45a0d7-d_1280x720?region=us",
  },
  {
    intro: "Amplitel needed content that could hold its own at the executive level.",
    results: [
      "+ 3x engagement uplift vs. pre-video baseline",
      "+ Up to ~15% internal engagement on top-performing posts",
      "+ Content reshared by CEO and senior leadership",
    ],
    href: "https://stories.blackirisfilms.com/case-studies/amplitel/",
    image:
      "https://i.vimeocdn.com/video/1990519941-714cc02560dca03123e774a1ffdf1e76daa2f6ddbda1dd258aea2fd5ed72c221-d_1280x720?region=us",
  },
  {
    intro: "Dacxi Chain was launching globally. The story had to land with investors.",
    results: [
      "+ 2-15x uplift in LinkedIn engagement vs. prior content",
      "+ Improved brand credibility across investor and founder communities",
      "+ Supported successful funding continuation and global platform launch",
    ],
    href: "https://stories.blackirisfilms.com/case-studies/dacxi-chain/",
    image:
      "https://i.vimeocdn.com/video/2123011417-b6cf3188070de14c1df1e52d81d292a6833ac93962415f17fd1b1c409b5155e0-d_1280x720?region=us",
  },
];

export function CaseStudies() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <h2 className="font-bold text-navy text-4xl md:text-5xl leading-[1.05] max-w-3xl mb-14">
          Results that speak for themselves
        </h2>

        <div className="grid gap-10 md:gap-14">
          {cases.map((c, i) => (
            <div
              key={c.href}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[16/9] rounded-lg overflow-hidden bg-fog/40 border border-fog/60 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </a>
              <div>
                <p className="text-xl md:text-2xl font-bold text-navy leading-snug">
                  {c.intro}
                </p>
                <ul className="mt-6 space-y-3 text-slate text-[15px] leading-relaxed">
                  {c.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-mint hover:text-mint-bright font-bold text-sm"
                >
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                  View full case study
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
