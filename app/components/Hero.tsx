export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Soft radial glow behind headline */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[640px] w-[1100px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, #61B383 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-9 text-[11px] uppercase tracking-[0.2em] text-slate font-medium">
            <span className="h-px w-8 bg-slate/60" />
            Boutique film studio, Sydney
          </div>

          <h1 className="font-light text-navy text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[1.02] tracking-tighter">
            Your customers decide in seconds.
            <br />
            <span className="text-slate">We make those seconds count.</span>
          </h1>

          <p className="mt-9 max-w-2xl text-lg md:text-xl text-slate font-light leading-relaxed">
            Fixed-price, emotion-led video production for Australian SMEs in finance,
            tech and higher education. Sydney-based. 10-day turnaround.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="#estimate"
              className="group inline-flex items-center gap-2.5 rounded-full bg-navy px-7 py-4 text-sm font-medium text-white hover:bg-navy-dusk transition-all"
            >
              Get an estimate in 1 minute
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 text-sm font-medium text-navy hover:text-mint transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15.5" stroke="#29334D" strokeOpacity="0.2"/>
                <path d="M13 11l8 5-8 5V11z" fill="#29334D"/>
              </svg>
              See recent work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
