export function FinalCTA() {
  return (
    <section id="estimate" className="bg-navy text-white py-16 md:py-20 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[360px] w-[720px] rounded-full opacity-16 blur-3xl"
        style={{ background: "radial-gradient(circle, #61B383 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-4">
          Let&apos;s do this
        </p>
        <h2 className="font-bold text-white text-3xl md:text-4xl leading-[1.06] max-w-4xl mx-auto">
          We can&apos;t wait to hear from you.
        </h2>

        <div className="mt-7 flex flex-wrap justify-center gap-5">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="mt-9 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left md:text-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">
              Call us
            </div>
            <a
              href="tel:+610282013504"
              className="text-white text-xl md:text-2xl font-light hover:text-mint transition-colors"
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
              className="text-white text-xl md:text-2xl font-light hover:text-mint transition-colors break-all"
            >
              info@blackirisfilms.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
