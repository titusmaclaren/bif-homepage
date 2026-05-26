const work = [
  {
    title: "When the numbers stop being numbers",
    client: "Financial Services",
    role: "Brand film",
    bg: "from-navy via-navy-dusk to-navy-midnight",
  },
  {
    title: "What a university actually feels like",
    client: "Higher Education",
    role: "Recruitment film",
    bg: "from-slate via-navy to-navy-dusk",
  },
  {
    title: "The product nobody asked for, that everyone needed",
    client: "Tech / SaaS",
    role: "Launch film",
    bg: "from-navy-dusk via-navy to-slate",
  },
  {
    title: "An idea that took three minutes to land",
    client: "Fintech",
    role: "Explainer",
    bg: "from-navy via-slate to-mint",
  },
];

export function Work() {
  return (
    <section id="work" className="bg-off-white py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-mint font-medium mb-5">
              Recent work
            </div>
            <h2 className="font-light text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl">
              Films that earned the next meeting.
            </h2>
          </div>
          <a
            href="#all-work"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-mint transition-colors"
          >
            View all work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {work.map((w, i) => (
            <a
              key={w.title}
              href="#"
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${w.bg} aspect-[16/10] flex items-end p-8 md:p-10 ${i % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : ""}`}
            >
              {/* Play affordance */}
              <div className="absolute top-7 right-7 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-mint transition-all duration-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Grain overlay */}
              <div className="grain absolute inset-0" />

              <div className="relative z-10 max-w-xl">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/60 font-medium mb-3">
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
            href="#all-work"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy"
          >
            View all work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
