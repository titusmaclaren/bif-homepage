const quotes = [
  "We struggle to explain our service clearly.",
  "Our landing page isn't converting.",
  "Our social content isn't reaching audiences.",
  "We heard Titus talking about video marketing and we want to get started now.",
  "We need to boost sales.",
  "We need better ROI on ad spend.",
  "Our event coverage feels flat.",
  "I've been burned before by other agencies.",
  "Our brand isn't standing out.",
  "How do we boost our email campaign click-through rates?",
  "Our story isn't connecting with customers.",
  "We need an agency we can trust.",
];

export function SoundFamiliar() {
  return (
    <section className="bg-off-white py-16 md:py-20 border-y border-fog/60">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="max-w-4xl mb-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-4">
            Common marketing challenges
          </p>
          <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.08]">
            Sound familiar?
          </h2>
          <p className="mt-5 text-base text-slate font-light leading-relaxed">
            Boost your return on ad spend. Level up your content quality. Turn browsers
            into buyers. We help brands tell the right story, to the right people, in
            the right way so your marketing actually moves the needle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {quotes.map((q) => (
            <div
              key={q}
              className="bg-white border border-fog/70 rounded-lg p-4 md:p-5 text-navy text-[13.5px] leading-relaxed italic relative"
            >
              <span className="text-mint text-3xl font-serif leading-none absolute top-2.5 left-4 opacity-35">&ldquo;</span>
              <p className="relative pl-3">{q}</p>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href="/estimate/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Let&apos;s solve your marketing problems
          </a>
        </div>
      </div>
    </section>
  );
}
