export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Cinematic glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[1200px] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle, #4b5d8b 0%, transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[540px] w-[540px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #5f4b8b 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-9 text-[11px] uppercase tracking-[0.22em] text-white/55 font-medium">
            <span className="h-px w-8 bg-white/30" />
            Boutique film studio, Sydney
          </div>

          <h1 className="font-light text-white text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[1.02] tracking-tighter">
            Your customers decide
            <br />
            in seconds. <span className="text-white/55">We make those</span>
            <br />
            <span className="text-white/55">seconds count.</span>
          </h1>

          <p className="mt-9 max-w-2xl text-lg md:text-xl text-white/65 font-light leading-relaxed">
            Fixed-price, emotion-led video production for Australian SMEs in finance,
            tech and higher education. Sydney-based. 10-day turnaround.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://quiz.blackirisfilms.com/"
              className="group inline-flex items-center gap-2.5 rounded-sm bg-bif-green hover:bg-bif-green-hover px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
            >
              Get an estimate in 1 minute
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="https://www.blackirisfilms.com/#portfolio"
              className="inline-flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="rgba(255,255,255,0.35)"/>
                <path d="M13 11l8 5-8 5V11z" fill="white"/>
              </svg>
              See recent work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
