export function FinalCTA() {
  return (
    <section id="estimate" className="bg-navy text-white py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[640px] w-[1100px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #61B383 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-6">
          Let&apos;s do this
        </p>
        <h2 className="font-light text-white text-[clamp(2.2rem,5.2vw,4.5rem)] leading-[1.05] tracking-tighter max-w-4xl mx-auto">
          We can&apos;t wait to hear from you.
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
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

        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left md:text-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">
              Call us
            </div>
            <a
              href="tel:+610282013504"
              className="text-white text-2xl md:text-3xl font-light hover:text-mint transition-colors"
            >
              (02) 8201 3504
            </a>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">
              Email us
            </div>
            <a
              href="mailto:info@blackirisfilms.com?subject=Video%20Enquiry"
              className="text-white text-2xl md:text-3xl font-light hover:text-mint transition-colors break-all"
            >
              info@blackirisfilms.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
