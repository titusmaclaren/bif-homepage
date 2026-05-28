export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate font-medium mb-6">
              Home
            </p>
            <h1 className="font-bold text-navy text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.05] tracking-tight">
              Your customers decide in seconds. <span className="font-light text-slate">We make those seconds count.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg md:text-xl text-slate font-light leading-relaxed">
              Fixed-price emotion-led video production for Australian SMEs in finance,
              tech and higher education. Sydney-based. 10-day turnaround.
            </p>
            <div className="mt-10">
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

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy/5 border border-fog/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://static.wixstatic.com/media/a2a11d_135680b1145a4b178e98c233cc2acc8e~mv2.png/v1/fill/w_960,h_1200,fp_0.6_0.38,q_90,enc_avif,quality_auto/a2a11d_135680b1145a4b178e98c233cc2acc8e~mv2.png"
                alt="Black Iris Films production"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
