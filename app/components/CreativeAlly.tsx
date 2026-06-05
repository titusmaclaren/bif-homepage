export function CreativeAlly() {
  return (
    <section id="about" className="bg-off-white py-16 md:py-20 border-y border-fog/60">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-4">
              Emotional engagement
            </p>
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate font-medium mb-4">
              Professional video production
            </div>
            <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.08]">
              Your Creative Ally in Storytelling.
            </h2>

            <div className="mt-6 overflow-hidden rounded-lg border border-fog/70 bg-navy-midnight shadow-xl">
              <div className="relative aspect-video">
                <iframe
                  src="https://player.vimeo.com/video/981278175?title=0&byline=0&portrait=0&color=61B383&dnt=1"
                  title="Black Iris Films brand video"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 space-y-4 text-slate text-base font-light leading-relaxed">
            <p>
              At Black Iris Films, we partner with you to turn complex ideas into engaging,
              emotionally intelligent videos that get results. Based in Sydney, we deliver
              a premium production experience without the big agency overheads.
            </p>
            <p>
              With over a decade of experience across 30+ industries, we&apos;ve seen it
              all and solved for it. From brand films to social campaigns, we bring
              strategic thinking and high production value to every project, keeping things
              smooth, stress-free, and tailored to you.
            </p>
            <p>
              We plug straight into your team, adapt to your workflow, and keep you in the
              loop from kickoff to final cut. Always bringing a sharp eye, clear
              communication, and creative solutions.
            </p>
            <ul className="pt-1 space-y-1.5 text-navy">
              <li className="flex items-start gap-3"><span className="text-mint">-</span> Stand out with considered visuals.</li>
              <li className="flex items-start gap-3"><span className="text-mint">-</span> Connect with tailored messaging.</li>
              <li className="flex items-start gap-3"><span className="text-mint">-</span> Win hearts and minds with emotional storytelling.</li>
            </ul>
            <p className="pt-2">
              Your success is our North Star. We&apos;re here to make your vision real and
              make you look great doing it.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://quiz.blackirisfilms.com/"
                className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-colors"
              >
                Let&apos;s start your project
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-navy hover:text-mint text-sm font-medium py-3"
              >
                Book a free consultation. Let&apos;s talk video.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
