const services = [
  {
    title: "Financial Services",
    blurb: "Compliance-aware video for banks, super funds, advisers and fintechs.",
    href: "https://services.blackirisfilms.com/financial-video-production-sydney",
  },
  {
    title: "Higher Education",
    blurb: "Course films, research stories and recruitment for Go8 and beyond.",
    href: "https://services.blackirisfilms.com/higher-education-video-production-sydney",
  },
  {
    title: "Technology & SaaS",
    blurb: "Product films, founder stories and category-defining brand work.",
    href: "https://services.blackirisfilms.com/tech-video-production-sydney",
  },
  {
    title: "Corporate",
    blurb: "Internal comms, leadership messages and culture pieces that get watched.",
    href: "https://services.blackirisfilms.com/corporate-video-production-sydney",
  },
  {
    title: "Explainer",
    blurb: "Clear, considered explainers that make the complicated feel obvious.",
    href: "https://services.blackirisfilms.com/explainer-video-production-sydney",
  },
  {
    title: "Animated",
    blurb: "2D and motion design for when live action is not the right tool.",
    href: "https://services.blackirisfilms.com/animated-video-production-sydney",
  },
  {
    title: "Brand Films",
    blurb: "The film at the top of your About page. The one that earns the meeting.",
    href: "https://services.blackirisfilms.com/brand-film-production-sydney",
  },
  {
    title: "Startup & Scaleup",
    blurb: "Series A to listed. Founder-led video that scales with the company.",
    href: "https://services.blackirisfilms.com/startup-video-production-sydney",
  },
  {
    title: "LinkedIn & B2B Social",
    blurb: "Short-form vertical and landscape, built for buyers, not feeds.",
    href: "https://services.blackirisfilms.com/linkedin-video-production-sydney",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[#111] py-28 md:py-36 relative">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 mb-16">
          <div className="md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bif-green font-medium mb-5">
              Services
            </div>
            <h2 className="font-light text-white text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Nine ways we tell
              <br />
              your story.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg text-white/70 font-light leading-relaxed">
              We work across nine specialised areas, but the approach is always
              the same. Strategy first. Story second. Polished craft third.
              Fixed price, always.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {services.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative bg-[#111] p-8 md:p-10 hover:bg-[#171717] transition-colors"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-bif-green group-hover:bg-bif-green transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{s.title}</h3>
              <p className="text-[15px] text-white/60 leading-relaxed">{s.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
