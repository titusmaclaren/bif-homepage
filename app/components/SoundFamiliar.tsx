const quotes = [
  "We struggle to explain our service clearly.",
  "Our landing page isn’t converting.",
  "Our social content isn’t reaching audiences.",
  "We heard Titus talking about video marketing and we want to get started now.",
  "We need to boost sales.",
  "We need better ROI on ad spend.",
  "Our event coverage feels flat.",
  "I’ve been burned before by other agencies.",
  "Our brand isn’t standing out.",
  "How do we boost our email campaign click-through rates?",
  "Our story isn’t connecting with customers.",
  "We need an agency we can trust.",
];

export function SoundFamiliar() {
  return (
    <section className="bg-off-white py-24 md:py-32 border-y border-fog/60">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="max-w-4xl mb-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-5">
            Common marketing challenges
          </p>
          <h2 className="font-bold text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Sound familiar?
          </h2>
          <p className="mt-7 text-lg text-slate font-light leading-relaxed">
            Boost your return on ad spend. Level up your content quality. Turn browsers
            into buyers. We help brands tell the right story, to the right people, in
            the right way so your marketing actually moves the needle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="bg-white border border-fog/70 rounded-2xl p-6 md:p-7 text-navy text-[15px] leading-relaxed italic relative"
            >
              <span className="text-mint text-4xl font-serif leading-none absolute top-3 left-5 opacity-40">&ldquo;</span>
              <p className="relative pl-3">{q}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Let&apos;s solve your marketing problems
          </a>
        </div>
      </div>
    </section>
  );
}
