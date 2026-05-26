const services = [
  {
    title: "Financial Services",
    blurb: "Compliance-aware video for banks, super funds, advisers and fintechs.",
    accent: "navy",
  },
  {
    title: "Higher Education",
    blurb: "Course films, research stories and recruitment campaigns for Go8 and beyond.",
    accent: "slate",
  },
  {
    title: "Technology",
    blurb: "Product films, founder stories and category-defining brand work.",
    accent: "navy",
  },
  {
    title: "Corporate",
    blurb: "Internal comms, leadership messages and culture pieces that people actually watch.",
    accent: "slate",
  },
  {
    title: "Explainer",
    blurb: "Clear, considered explainers that make the complicated feel obvious.",
    accent: "navy",
  },
  {
    title: "Animated",
    blurb: "2D and motion design for when live action is not the right tool.",
    accent: "slate",
  },
  {
    title: "Brand Films",
    blurb: "The film at the top of your About page. The one that earns you the meeting.",
    accent: "navy",
  },
  {
    title: "Startup & Scaleup",
    blurb: "Series A to listed. Founder-led video that scales with the company.",
    accent: "slate",
  },
  {
    title: "LinkedIn & B2B Social",
    blurb: "Short-form vertical and landscape, built for buyers, not feeds.",
    accent: "navy",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 mb-16">
          <div className="md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-mint font-medium mb-5">
              Services
            </div>
            <h2 className="font-light text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Nine ways we tell your story.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg text-slate font-light leading-relaxed">
              We work across nine specialised areas, but the approach is always the same.
              Strategy first. Story second. Polished craft third. Fixed price, always.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fog/70 border border-fog/70 rounded-2xl overflow-hidden">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-white p-8 md:p-10 hover:bg-off-white transition-colors"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="h-10 w-10 rounded-full border border-navy/15 flex items-center justify-center group-hover:border-mint group-hover:bg-mint transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy group-hover:text-white transition-colors">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-navy mb-3">{s.title}</h3>
              <p className="text-[15px] text-slate leading-relaxed">{s.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
