const work = [
  {
    title: "When the numbers stop being numbers",
    client: "Financial Services",
    role: "Brand film",
    bg: "from-[#1a2236] via-[#0F1826] to-black",
  },
  {
    title: "What a university actually feels like",
    client: "Higher Education",
    role: "Recruitment film",
    bg: "from-[#2a3658] via-[#1a2236] to-black",
  },
  {
    title: "The product nobody asked for, that everyone needed",
    client: "Tech / SaaS",
    role: "Launch film",
    bg: "from-[#0F1826] via-[#1a2236] to-[#3d3159]",
  },
  {
    title: "An idea that took three minutes to land",
    client: "Fintech",
    role: "Explainer",
    bg: "from-[#1a2236] via-[#2c4a5c] to-[#3d9e5f]",
  },
];

export function Work() {
  return (
    <section id="portfolio" className="bg-black py-28 md:py-36">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-bif-green font-medium mb-5">
              Recent work
            </div>
            <h2 className="font-light text-white text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl">
              Films that earned
              <br />
              the next meeting.
            </h2>
          </div>
          <a
            href="https://stories.blackirisfilms.com/case-studies/"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            View case studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {work.map((w, i) => (
            <a
              key={w.title}
              href="https://stories.blackirisfilms.com/case-studies/"
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${w.bg} aspect-[16/10] flex items-end p-8 md:p-10 border border-white/5 ${i % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : ""}`}
            >
              <div className="absolute top-7 right-7 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-bif-green transition-all duration-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <div className="grain absolute inset-0" />

              <div className="relative z-10 max-w-xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-3">
                  {w.client} · {w.role}
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-light leading-tight tracking-tight">
                  {w.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div className="md:hidden mt-10 text-center">
          <a
            href="https://stories.blackirisfilms.com/case-studies/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            View case studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
