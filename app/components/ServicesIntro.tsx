export function ServicesIntro() {
  return (
    <section id="services" className="bg-navy text-white py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #61B383 0%, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-5">
              Our services
            </p>
            <h2 className="font-bold text-white text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Strategic video, photography, graphic design, AI imagery, copy, animation...
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg text-white/80 font-light leading-relaxed">
              We go beyond video. Our diverse range of creative content services, whether
              it&apos;s in Financial Services, Tech, Higher Education or anything else,
              starts at an accessible <span className="text-white font-medium">$1,500 excl. GST</span>.
            </p>
            <div className="mt-8">
              <a
                href="https://quiz.blackirisfilms.com/"
                className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors"
              >
                Get an estimate in 1-min
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
