export function About() {
  return (
    <section id="about" className="bg-[#111] py-28 md:py-36">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-bif-green font-medium mb-5">
              The principle
            </div>
            <h2 className="font-light text-white text-4xl md:text-5xl leading-[1.05] tracking-tight">
              People decide
              <br />
              emotionally.
              <br />
              <span className="text-white/55">They justify logically.</span>
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7 space-y-7 text-lg text-white/70 font-light leading-relaxed">
            <p>
              Black Iris is a boutique film studio in Sydney working with finance,
              fintech, tech and higher education clients across Australia.
            </p>
            <p>
              We make films that move the buyer one step closer. Considered composition.
              Honest interviews. Restrained craft. The third edit, not the first.
            </p>
            <p>
              Founded by{" "}
              <span className="text-white font-medium">Titus Maclaren</span> after 15 years
              behind the camera, every project is led personally. No agency middlemen,
              no junior switch, no surprise invoices.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-x-8 gap-y-4 text-[12px] uppercase tracking-[0.18em] font-medium text-white/55 border-t border-white/10 mt-8 pt-7">
              <span>Sydney based</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Founder led</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Fixed price</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
