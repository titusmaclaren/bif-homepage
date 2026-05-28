// Industry-and-format service grid. Image fills each tile, label sits in the
// bottom-left, and the image gently zooms on hover. Imagery is reused from
// the Wix Pro Gallery thumbnails as representative samples per category.

const W = (id: string, w = 800, h = 600) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_90,enc_avif,quality_auto/${id}`;

type Tile = {
  label: string;
  href: string;
  image: string;
};

const tiles: Tile[] = [
  {
    label: "Financial Services",
    href: "https://services.blackirisfilms.com/financial-video-production-sydney",
    image: W("a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg"),
  },
  {
    label: "Higher Education",
    href: "https://services.blackirisfilms.com/higher-education-video-production-sydney",
    image: W("a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg"),
  },
  {
    label: "Tech & SaaS",
    href: "https://services.blackirisfilms.com/tech-video-production-sydney",
    image: W("a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png"),
  },
  {
    label: "Corporate",
    href: "https://services.blackirisfilms.com/corporate-video-production-sydney",
    image: W("a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg"),
  },
  {
    label: "Explainer",
    href: "https://services.blackirisfilms.com/explainer-video-production-sydney",
    image: W("a2a11d_5bf50a7c15f64e3b989846e5b591a9d3~mv2.jpg"),
  },
  {
    label: "Animated",
    href: "https://services.blackirisfilms.com/animated-video-production-sydney",
    image: W("a2a11d_1711d8d900c341e09e80ee76d8da4062~mv2.jpg"),
  },
  {
    label: "Brand Films",
    href: "https://services.blackirisfilms.com/brand-film-production-sydney",
    image: W("a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg"),
  },
  {
    label: "Startup & Scaleup",
    href: "https://services.blackirisfilms.com/startup-video-production-sydney",
    image: W("a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg"),
  },
  {
    label: "LinkedIn & B2B Social",
    href: "https://services.blackirisfilms.com/linkedin-video-production-sydney",
    image: W("a2a11d_9bbe0636b2f84cab82f668122e3b26d7~mv2.jpg"),
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-5">
            Our services
          </p>
          <h2 className="font-bold text-navy text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
            Strategic video, photography, graphic design, AI imagery, copy and animation.
          </h2>
          <p className="mt-7 text-lg text-slate font-light leading-relaxed max-w-3xl mx-auto">
            We go beyond video. Our creative content services span Financial Services,
            Tech, Higher Education and everything else.{" "}
            <span className="text-navy font-medium">From $1,500 excl. GST.</span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
          {tiles.map((t) => (
            <a
              key={t.label}
              href={t.href}
              className="group relative block aspect-[4/3] rounded-xl overflow-hidden bg-fog/40 border border-fog/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="text-white text-lg md:text-xl font-bold leading-tight drop-shadow-sm">
                  {t.label}
                </h3>
              </div>
              <div className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
          </a>
        </div>
      </div>
    </section>
  );
}
