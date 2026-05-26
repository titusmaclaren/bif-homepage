export function CTA() {
  return (
    <section id="estimate" className="relative bg-navy-midnight overflow-hidden">
      <div className="grain absolute inset-0" />

      {/* Subtle mint glow */}
      <div
        aria-hidden
        className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #61B383 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-mint font-medium mb-7">
            The next step
          </div>
          <h2 className="font-light text-white text-[clamp(2.2rem,5.2vw,4.5rem)] leading-[1.05] tracking-tighter">
            Tell us what you need.
            <br />
            <span className="text-sky-pale/80">Get a fixed price in 1 minute.</span>
          </h2>

          <p className="mt-9 max-w-xl text-lg text-sky-pale/80 font-light leading-relaxed">
            One short form. Real numbers. No discovery call required to find out
            whether we are the right fit.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://blackirisfilms.com/get-an-estimate"
              className="group inline-flex items-center gap-2.5 rounded-full bg-mint px-7 py-4 text-sm font-medium text-white hover:bg-mint-bright transition-all"
            >
              Get an estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="mailto:titus@blackirisfilms.com"
              className="inline-flex items-center gap-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Or just email Titus directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
