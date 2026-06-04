type ContentCard = {
  title: string;
  body: string;
  visual: "strategy" | "direction" | "production" | "multiplication" | "value";
  icon: "heart" | "board" | "camera" | "layers" | "chart";
};

const cards: ContentCard[] = [
  {
    title: "Emotion-first strategy",
    body: "We start with the audience, the business goal and the feeling that needs to be evoked. Before we touch a camera, we clarify what people need to understand, believe and feel.",
    visual: "strategy",
    icon: "heart",
  },
  {
    title: "Creative direction",
    body: "We shape the story, format and visual approach around where the content needs to live, from homepage films and brand videos to social edits, founder clips and campaign assets.",
    visual: "direction",
    icon: "board",
  },
  {
    title: "Premium production, plugged into your team",
    body: "Cinematic live-action, photography, animation and motion graphics, delivered by a flexible creative partner that works with your team, not around it.",
    visual: "production",
    icon: "camera",
  },
  {
    title: "Content multiplication",
    body: "One strong production becomes a practical suite of assets: hero videos, cutdowns, website loops, stills, thumbnails, social clips, GIFs and sales-ready content your team can keep using.",
    visual: "multiplication",
    icon: "layers",
  },
  {
    title: "Built for long-term brand value",
    body: "You leave with more than a finished video. You leave with a stronger visual language, a clearer story and a reusable content library that makes your brand feel more consistent, credible and alive.",
    visual: "value",
    icon: "chart",
  },
];

const visuals: Record<ContentCard["visual"], { src: string; alt: string }> = {
  strategy: {
    src: "/content-system/strategy.png",
    alt: "Cinematic portrait used to represent emotion-first story strategy.",
  },
  direction: {
    src: "/content-system/creative-direction.png",
    alt: "Storyboards and creative references arranged on a production desk.",
  },
  production: {
    src: "/content-system/production.png",
    alt: "Film crew capturing an interview in a studio.",
  },
  multiplication: {
    src: "/content-system/multiplication.png",
    alt: "A library of video, social and audio assets created from one production.",
  },
  value: {
    src: "/content-system/library.png",
    alt: "A content library dashboard with organised video and brand assets.",
  },
};

export function ContentSystem({ showCta = true }: { showCta?: boolean } = {}) {
  return (
    <section id="content-system" className="bg-off-white py-16 md:py-20 border-y border-fog/60 overflow-hidden">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center mb-9">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-4">
            The Black Iris Content System
          </p>
          <h2 className="font-bold text-navy text-3xl md:text-4xl lg:text-[42px] leading-[1.06]">
            Turn one strong story into a library of brand assets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 md:gap-5">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`group flex flex-col rounded-lg border border-fog/70 bg-white p-4 shadow-[0_14px_42px_rgba(41,51,77,0.05)] md:p-5 ${
                index < 3 ? "xl:col-span-2" : "xl:col-span-3"
              }`}
            >
              <div className="flex h-full flex-col gap-4">
                <div>
                  <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                    <IconBubble icon={card.icon} />
                    <div>
                      <h3 className="max-w-[22rem] text-[16px] leading-snug font-bold text-navy md:text-[17px]">
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-[34rem] text-[12.5px] leading-[1.58] text-slate">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <CardVisual type={card.visual} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {showCta && (
          <div className="mt-9 text-center">
            <a
              href="/why-black-iris-films"
              className="inline-flex items-center gap-3 rounded-sm bg-mint hover:bg-mint-bright px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors"
            >
              Learn more
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function CardVisual({ type }: { type: ContentCard["visual"] }) {
  if (type === "strategy") {
    return (
      <div className="rounded-md bg-slate-ice/55 p-1.5">
        <div className="relative aspect-[3/1] overflow-hidden rounded-md">
          <ImageTile src={visuals.strategy.src} alt={visuals.strategy.alt} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-y-0 left-0 flex w-[32%] items-center bg-gradient-to-r from-navy/88 to-navy/10 px-3">
            <p className="max-w-24 text-[10px] font-bold leading-snug text-white md:text-[11px]">What do we want them to feel?</p>
          </div>
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            {["Audience", "Goal", "Feeling"].map((label, index) => (
              <span key={label} className="inline-flex items-center gap-1 rounded-md bg-white/92 px-2 py-1 text-[8.5px] font-bold text-navy shadow-[0_8px_18px_rgba(41,51,77,0.12)]">
                <MiniMetricIcon index={index} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "direction") {
    return (
      <div className="rounded-md bg-white p-1.5">
        <div className="relative aspect-[3/1] overflow-hidden rounded-md border border-fog/70">
          <ImageTile src={visuals.direction.src} alt={visuals.direction.alt} className="absolute inset-0 h-full w-full" />
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
            {["Homepage film", "Founder clips", "Campaign assets"].map((label) => (
              <span key={label} className="rounded-md bg-slate-ice/90 px-2 py-1 text-[8.5px] font-bold leading-tight text-navy shadow-[0_8px_18px_rgba(41,51,77,0.12)]">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "production") {
    return (
      <div className="rounded-md bg-navy p-1.5">
        <div className="relative aspect-[3/1] overflow-hidden rounded-md">
          <ImageTile src={visuals.production.src} alt={visuals.production.alt} className="absolute inset-0 h-full w-full" />
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
            {["Live-action", "Photography", "Animation", "Motion graphics"].map((label) => (
              <span key={label} className="rounded-md bg-white/92 px-2 py-1 text-[8.5px] font-bold text-navy">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "multiplication") {
    return (
      <div className="rounded-md bg-slate-ice/55 p-1.5">
        <div className="relative aspect-[3/1] overflow-hidden rounded-md border border-fog/70 bg-white">
          <ImageTile src={visuals.multiplication.src} alt={visuals.multiplication.alt} className="absolute inset-0 h-full w-full" />
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            {["Hero", "Cutdowns", "Loops", "Stills"].map((label) => (
              <span key={label} className="rounded-md bg-white/92 px-2 py-1 text-[8.5px] font-bold text-navy shadow-[0_8px_18px_rgba(41,51,77,0.12)]">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white p-1.5">
      <div className="relative aspect-[3/1] overflow-hidden rounded-md border border-fog/70 bg-white">
        <ImageTile src={visuals.value.src} alt={visuals.value.alt} className="absolute inset-0 h-full w-full" />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
          {["Hero videos", "Social clips", "Stills", "Audio"].map((label) => (
            <span key={label} className="rounded-md bg-white/92 px-2 py-1 text-[8.5px] font-bold text-navy shadow-[0_8px_18px_rgba(41,51,77,0.12)]">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageTile({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`block h-full w-full object-cover ${className} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
      loading="lazy"
    />
  );
}

function IconBubble({ icon }: { icon: ContentCard["icon"] }) {
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/12 text-mint">
      <IconGlyph icon={icon} />
    </span>
  );
}

function IconGlyph({ icon }: { icon: ContentCard["icon"] }) {
  const common = "h-4 w-4";

  if (icon === "heart") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 4.6a5.2 5.2 0 0 0-7.4 0L12 6l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 20.8l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z" />
      </svg>
    );
  }

  if (icon === "board") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5h14v14H5z" />
        <path d="m8 9 3-2 5 3" />
        <path d="M8 14h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  if (icon === "camera") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8h4l1.5-2h5L16 8h4v13H4z" />
        <circle cx="12" cy="14" r="3.4" />
      </svg>
    );
  }

  if (icon === "layers") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 20V10" />
      <path d="M10 20V6" />
      <path d="M15 20v-8" />
      <path d="M20 20V4" />
      <path d="M3 20h19" />
    </svg>
  );
}

function MiniMetricIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 20v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="m16 8 3-3" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.8 4.6a5.2 5.2 0 0 0-7.4 0L12 6l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 20.8l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z" />
    </svg>
  );
}
