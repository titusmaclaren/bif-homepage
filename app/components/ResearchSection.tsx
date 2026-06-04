const stats = [
  { value: "742", label: "videos" },
  { value: "48", label: "brands" },
  { value: "5", label: "sectors" },
  { value: "2.1x", label: "more likely\nto break out" },
];

export function ResearchSection() {
  return (
    <section
      id="social-media-theory-of-everything"
      className="bg-navy-midnight text-white py-16 md:py-20 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-24 right-0 h-[360px] w-[360px] rounded-full opacity-18 blur-3xl"
        style={{ background: "radial-gradient(circle, #E8B82F 0%, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-4">
              New original research
            </p>
            <h2 className="font-bold text-white text-3xl md:text-4xl leading-[1.08]">
              The (Social Media)
              <br />
              <span className="text-gold">Theory of Everything</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/75 font-light leading-relaxed">
              We analysed 742 social videos across 48 brands and 5 sectors to find out
              what actually drives engagement. The clearest finding: emotion-led posts
              were 2.1x more likely to break out.
            </p>

            <div className="mt-7 grid grid-cols-4 gap-4 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-light text-gold">{s.value}</div>
                  <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-white/55 whitespace-pre-line">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="https://stories.blackirisfilms.com/theory-of-everything/"
                className="inline-flex items-center gap-2.5 rounded-sm bg-gold hover:bg-[#FFD700] px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-navy-midnight transition-colors"
              >
                Read the study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
              <span className="text-white/55 text-[13px]">Free report, key findings and CMO takeaways.</span>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://static.wixstatic.com/media/a2a11d_5fcc85e25e9e472d9286ef2f850f88c2~mv2.png/v1/crop/x_24,y_0,w_627,h_900/fill/w_623,h_900,al_c,q_90,enc_avif,quality_auto/EmotionStudy_PromoGraphic_v1.png"
                alt="The (Social Media) Theory of Everything study"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResearchStrip() {
  return (
    <section className="border-y border-white/10 bg-navy-midnight text-white">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            New original research
          </p>
          <p className="mt-1 text-[13px] font-medium leading-snug text-white/78 md:text-sm">
            The (Social Media) Theory of Everything: 742 videos, 48 brands, 5 sectors.
            Emotion-led posts were 2.1x more likely to break out.
          </p>
        </div>

        <a
          href="/why-black-iris-films#social-media-theory-of-everything"
          className="inline-flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold transition-colors hover:text-[#FFD700]"
        >
          See the research
          <svg
            aria-hidden="true"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
