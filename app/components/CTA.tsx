export function CTA() {
  return (
    <section id="estimate" className="relative bg-black overflow-hidden border-t border-white/5">
      <div className="grain absolute inset-0" />

      <div
        aria-hidden
        className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #3d9e5f 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #4b5d8b 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10 py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-bif-green font-medium mb-7">
            The next step
          </div>
          <h2 className="font-light text-white text-[clamp(2.2rem,5.2vw,4.5rem)] leading-[1.05] tracking-tighter">
            Tell us what you need.
            <br />
            <span className="text-white/55">Get a fixed price in 1 minute.</span>
          </h2>

          <p className="mt-9 max-w-xl text-lg text-white/65 font-light leading-relaxed">
            One short form. Real numbers. No discovery call required to find out
            whether we are the right fit.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://quiz.blackirisfilms.com/"
              className="group inline-flex items-center gap-2.5 rounded-sm bg-bif-green hover:bg-bif-green-hover px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
            >
              Get an estimate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="mailto:info@blackirisfilms.com?subject=Video%20Enquiry"
              className="inline-flex items-center gap-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Or email us directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
