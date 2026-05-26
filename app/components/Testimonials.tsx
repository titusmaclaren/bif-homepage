export function Testimonials() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-5">
            What people say
          </p>
          <h2 className="font-light text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Trusted by brands worldwide.
          </h2>
        </div>

        <div className="rounded-2xl border border-fog/60 bg-off-white p-10 md:p-14 text-center max-w-3xl mx-auto">
          <p className="text-slate text-sm uppercase tracking-[0.18em] mb-6">
            Full testimonials coming through
          </p>
          <p className="text-navy text-xl md:text-2xl font-light italic leading-relaxed">
            &ldquo;Big-agency storytelling skill with boutique-agency care: the same small
            team every time, a fixed bill, and a hands-free process that leaves clients
            stoked with the results.&rdquo;
          </p>
          <a
            href="https://www.blackirisfilms.com/get-a-quote#testimonials"
            className="mt-8 inline-flex items-center gap-2 text-mint hover:text-mint-bright text-sm font-medium"
          >
            Read all testimonials
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
          </a>
        </div>
      </div>
    </section>
  );
}
