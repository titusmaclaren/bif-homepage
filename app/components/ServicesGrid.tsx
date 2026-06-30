// Industry-and-format service grid. Image fills each tile, label sits in the
// centre, and the image gently zooms on hover.

import Image from "next/image";

const W = (id: string, w = 800, h = 600) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_90,enc_avif,quality_auto/${id}`;

export type ServiceTile = {
  label: string;
  href: string;
  image: string;
  objectPosition?: string;
  description: string;
};

export const SERVICE_TILES: ServiceTile[] = [
  {
    label: "Financial Services",
    href: "/financial-video-production-sydney",
    image: W("a2a11d_70dc6df59e59410ea533f798ee4dc342~mv2.jpg"),
    description: "Video for finance, fintech and investment brands.",
  },
  {
    label: "Higher Education",
    href: "/higher-education-video-production-sydney",
    image: W("a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg"),
    description: "Recruitment, graduate stories and course content.",
  },
  {
    label: "Tech & SaaS",
    href: "/tech-video-production-sydney",
    image: W("a2a11d_5a7993d17bef4c758695eeb784c53ca5~mv2.png"),
    description: "Product stories, platform explainers and sales content.",
  },
  {
    label: "Corporate",
    href: "/corporate-video-production-sydney",
    image: W("a2a11d_68ec1497b8d44019a8e015af33a89475~mv2.jpg"),
    description: "Useful content for internal and external audiences.",
  },
  {
    label: "Events",
    href: "/event-video-production-sydney",
    image: "/assets/portfolio-home-marycon.webp",
    description: "Highlights, launches, galas and post-event content.",
  },
  {
    label: "Explainer",
    href: "/explainer-video-production-sydney",
    image: W("a2a11d_5bf50a7c15f64e3b989846e5b591a9d3~mv2.jpg"),
    description: "Make complex ideas clear without flattening them.",
  },
  {
    label: "Animated",
    href: "/animated-video-production-sydney",
    image: W("a2a11d_1711d8d900c341e09e80ee76d8da4062~mv2.jpg"),
    description: "Motion-led content for abstract or hard-to-film ideas.",
  },
  {
    label: "Brand Films",
    href: "/brand-film-production-sydney",
    image: W("a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg"),
    description: "Campaign films built around emotion and proof.",
  },
  {
    label: "Startup & Scaleup",
    href: "/startup-video-production-sydney",
    image: W("a2a11d_547a7a386bff4519965fcf165a33fba6~mv2.jpg"),
    description: "Launch, raise and growth-stage video.",
  },
  {
    label: "LinkedIn & B2B Social",
    href: "/linkedin-video-production-sydney",
    image: W("a2a11d_9bbe0636b2f84cab82f668122e3b26d7~mv2.jpg"),
    description: "Short-form content for considered buyers.",
  },
  {
    label: "AI Powered Content Studio",
    href: "/ai-powered-content-studio-v2",
    image: "/services/ai-powered-content-studio-character-sheet.png",
    objectPosition: "50% 34%",
    description: "AI-assisted imagery systems and campaign assets.",
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto mb-9">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-4">
            Our services
          </p>
          <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.08]">
            Video production for brands that need people to care
          </h2>
          <p className="mt-5 text-base text-slate font-light leading-relaxed max-w-3xl mx-auto">
            From brand films and explainers to social content, photography and animation,
            we create polished assets that help your message feel clear, credible and human.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {SERVICE_TILES.map((t) => (
            <a
              key={t.label}
              href={t.href}
              className="group relative block h-[72px] md:h-20 rounded-lg overflow-hidden bg-fog/40 border border-fog/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <Image
                src={t.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                style={t.objectPosition ? { objectPosition: t.objectPosition } : undefined}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/45 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center px-3 text-center">
                <h3 className="text-white text-[13px] md:text-sm font-bold leading-tight drop-shadow-sm">
                  {t.label}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href="/estimate/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
          </a>
        </div>
      </div>
    </section>
  );
}
