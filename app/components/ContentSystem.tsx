import { PORTFOLIO_ITEMS } from "../data/portfolio";

type ContentCard = {
  title: string;
  body: string;
  visual: "strategy" | "direction" | "production" | "multiplication" | "value";
};

const cards: ContentCard[] = [
  {
    title: "Emotion-first strategy",
    body: "We start with the audience, the business goal and the feeling that needs to be evoked. Before we touch a camera, we clarify what people need to understand, believe and feel.",
    visual: "strategy",
  },
  {
    title: "Creative direction",
    body: "We shape the story, format and visual approach around where the content needs to live, from homepage films and brand videos to social edits, founder clips and campaign assets.",
    visual: "direction",
  },
  {
    title: "Premium production, plugged into your team",
    body: "Cinematic live-action, photography, animation and motion graphics, delivered by a flexible creative partner that works with your team, not around it.",
    visual: "production",
  },
  {
    title: "Content multiplication",
    body: "One strong production becomes a practical suite of assets: hero videos, cutdowns, website loops, stills, thumbnails, social clips, GIFs and sales-ready content your team can keep using.",
    visual: "multiplication",
  },
  {
    title: "Built for long-term brand value",
    body: "You leave with more than a finished video. You leave with a stronger visual language, a clearer story and a reusable content library that makes your brand feel more consistent, credible and alive.",
    visual: "value",
  },
];

const thumbs = PORTFOLIO_ITEMS.slice(0, 9).map((item) => item.thumb);

export function ContentSystem() {
  return (
    <section id="content-system" className="bg-off-white py-24 md:py-32 border-y border-fog/60 overflow-hidden">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center mb-14 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-5">
            The Black Iris Content System
          </p>
          <h2 className="font-bold text-navy text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            Turn one strong story into a library of brand assets
          </h2>
          <p className="mt-7 text-lg text-slate font-light leading-relaxed max-w-3xl mx-auto">
            We help brands create emotionally resonant video, photography and social content
            that works across websites, campaigns, sales conversations and everyday marketing,
            so every production delivers more value long after the shoot is over.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5 md:gap-7">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`group overflow-hidden rounded-lg border border-fog/70 bg-white shadow-[0_18px_55px_rgba(41,51,77,0.06)] ${
                index < 3 ? "xl:col-span-2" : "xl:col-span-3"
              }`}
            >
              <div className="p-7 md:p-8 pb-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-mint font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-xl md:text-2xl leading-tight font-bold text-navy">
                  {card.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate">
                  {card.body}
                </p>
              </div>
              <CardVisual type={card.visual} />
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Build your content library
          </a>
        </div>
      </div>
    </section>
  );
}

function CardVisual({ type }: { type: ContentCard["visual"] }) {
  if (type === "strategy") {
    return (
      <div className="mt-8 h-44 md:h-48 bg-slate-ice/45 px-6 py-5">
        <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-4">
          <div className="space-y-3">
            {["Audience", "Business goal", "Feeling"].map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-mint/15 text-mint text-[11px] font-bold grid place-items-center">
                  {index + 1}
                </span>
                <span className="h-2 flex-1 rounded-full bg-white" />
              </div>
            ))}
          </div>
          <ImageTile src={thumbs[0]} alt="" className="h-full rounded-md" />
        </div>
      </div>
    );
  }

  if (type === "direction") {
    return (
      <div className="mt-8 h-44 md:h-48 bg-navy px-5 py-5">
        <div className="grid h-full grid-cols-3 gap-2">
          {[thumbs[1], thumbs[2], thumbs[3]].map((src, index) => (
            <div key={src} className="relative overflow-hidden rounded-md bg-white/10">
              <ImageTile src={src} alt="" className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-x-2 bottom-2 h-2 rounded-full bg-white/75" />
              <div className="absolute left-2 top-2 text-[10px] font-bold text-white/80">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "production") {
    return (
      <div className="mt-8 h-44 md:h-48 bg-black px-5 py-5">
        <div className="grid h-full grid-cols-[1.35fr_0.65fr] gap-3">
          <ImageTile src={thumbs[4]} alt="" className="h-full rounded-md" />
          <div className="grid gap-3">
            <ImageTile src={thumbs[5]} alt="" className="rounded-md" />
            <div className="rounded-md bg-mint p-3 text-navy">
              <div className="h-2 w-12 rounded-full bg-navy/30" />
              <div className="mt-3 h-2 w-20 rounded-full bg-navy/70" />
              <div className="mt-2 h-2 w-14 rounded-full bg-navy/40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "multiplication") {
    const labels = ["Hero", "Cutdown", "Loop", "Still", "Social", "Sales"];
    return (
      <div className="mt-8 h-44 md:h-48 bg-slate-ice/45 p-5">
        <div className="grid h-full grid-cols-3 gap-3">
          {labels.map((label, index) => (
            <div key={label} className="overflow-hidden rounded-md bg-white">
              <div className="relative h-16">
                <ImageTile src={thumbs[index + 2]} alt="" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-navy">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 h-44 md:h-48 bg-navy px-5 py-5">
      <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-3">
        <div className="space-y-3">
          {["Visual language", "Clear story", "Reusable library"].map((label) => (
            <div key={label} className="rounded-md bg-white/10 px-3 py-3">
              <div className="h-2 w-10 rounded-full bg-mint" />
              <div className="mt-3 text-[11px] font-bold text-white">{label}</div>
            </div>
          ))}
        </div>
        <ImageTile src={thumbs[8]} alt="" className="h-full rounded-md" />
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
      className={`${className} block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
      loading="lazy"
    />
  );
}
