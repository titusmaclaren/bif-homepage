export function FinalCTA() {
  return (
    <section
      id="estimate"
      className="pricing-callout-section px-6 pb-2"
      style={{
        background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 50%, #000000 50%, #000000 100%)",
      }}
    >
      <div className="mx-auto flex max-w-[940px] flex-col gap-6 rounded-lg border border-[#e8e8e8] bg-white px-6 py-6 shadow-[0_18px_45px_rgba(0,0,0,0.12)] sm:px-8 md:flex-row md:items-center md:justify-between md:gap-7">
        <div>
          <h2 className="m-0 text-2xl font-bold leading-tight text-black">
            Get clarity on your video pricing
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#666666]">
            Answer a 1-minute quiz and see a tailored pricing range for your project.
          </p>
        </div>
        <a
          href="https://quiz.blackirisfilms.com/"
          className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-[3px] bg-[#3d9e5f] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#348a52]"
        >
          Start quiz
        </a>
      </div>
    </section>
  );
}
