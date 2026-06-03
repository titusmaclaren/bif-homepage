import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { CreativeAlly } from "../components/CreativeAlly";
import { SoundFamiliar } from "../components/SoundFamiliar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Why Black Iris Films?",
  description:
    "See how Black Iris Films helps brands turn strong stories into useful video, photography and social content libraries.",
};

const proofPoints = [
  { value: "15+", label: "years of production experience" },
  { value: "30+", label: "industries helped with story-led content" },
  { value: "1", label: "senior creative partner from brief to delivery" },
];

const comparisonRows = [
  {
    label: "Emotion-first strategy",
    freelancer: "Sometimes",
    inHouse: "Depends on capacity",
    agency: "Often slow",
    bif: "Always",
  },
  {
    label: "Live-action, photography, animation and social assets",
    freelancer: "Rare",
    inHouse: "Limited",
    agency: "Often",
    bif: "Always",
  },
  {
    label: "Works directly with your internal team",
    freelancer: "Sometimes",
    inHouse: "Always",
    agency: "Sometimes",
    bif: "Always",
  },
  {
    label: "Clear production process and fixed-price thinking",
    freelancer: "Sometimes",
    inHouse: "Sometimes",
    agency: "Sometimes",
    bif: "Always",
  },
  {
    label: "Reusable brand assets beyond the hero video",
    freelancer: "Rare",
    inHouse: "Sometimes",
    agency: "Sometimes",
    bif: "Always",
  },
];

const elements = [
  {
    title: "Start with the feeling",
    body: "We begin with what your audience needs to understand, believe and feel before we shape format, visuals or production choices.",
  },
  {
    title: "Build around the channels",
    body: "Homepage films, campaign edits, social clips, website loops and sales assets are planned together so every shoot works harder.",
  },
  {
    title: "Keep the team flexible",
    body: "You get senior creative direction with the right mix of production, post, animation and photography for the brief.",
  },
  {
    title: "Leave a usable library",
    body: "The final delivery is more than a finished video. It is a practical content library your team can keep using.",
  },
];

export default function WhyBlackIrisFilmsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <WhyHero />
        <CreativeAlly />
        <SoundFamiliar />
        <ComparisonSection />
        <ElementsSection />
        <WhyCta />
      </main>
      <Footer />
    </>
  );
}

function WhyHero() {
  return (
    <section className="bg-navy-midnight text-white py-20 md:py-28">
      <div className="mx-auto grid max-w-[1260px] gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
            Why Black Iris Films?
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] md:text-5xl lg:text-6xl">
            We turn strong stories into content your brand can keep using.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/72 md:text-lg">
            Black Iris Films is built for teams who need more than a beautiful video.
            We help you clarify the story, create the work and leave with a practical
            library of assets for websites, campaigns, social and sales.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://quiz.blackirisfilms.com/"
              className="inline-flex items-center rounded-sm bg-mint px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
            >
              Get an estimate
            </a>
            <a
              href="#why-comparison"
              className="inline-flex items-center py-3 text-sm font-semibold text-white/82 transition-colors hover:text-mint"
            >
              See how we work
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {proofPoints.map((point) => (
            <div key={point.label} className="rounded-lg border border-white/12 bg-white/6 p-5">
              <div className="text-3xl font-bold text-mint">{point.value}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/72">{point.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="why-comparison" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
            What changes
          </p>
          <h2 className="text-3xl font-bold leading-[1.08] text-navy md:text-4xl">
            A production partner that thinks beyond the shoot.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-slate">
            The goal is not to add another supplier to your week. It is to give your
            team a clearer story, a smoother production process and more useful assets
            from every project.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-fog/70 bg-off-white">
          <table className="w-full min-w-[780px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-fog/70 bg-white text-navy">
                <th className="px-5 py-4 font-bold">Capability</th>
                <th className="px-5 py-4 font-bold">Freelancer</th>
                <th className="px-5 py-4 font-bold">In-house creator</th>
                <th className="px-5 py-4 font-bold">Large agency</th>
                <th className="px-5 py-4 font-bold text-mint">Black Iris Films</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-fog/60 last:border-b-0">
                  <td className="px-5 py-4 font-bold text-navy">{row.label}</td>
                  <td className="px-5 py-4 text-slate">{row.freelancer}</td>
                  <td className="px-5 py-4 text-slate">{row.inHouse}</td>
                  <td className="px-5 py-4 text-slate">{row.agency}</td>
                  <td className="px-5 py-4 font-bold text-navy">{row.bif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ElementsSection() {
  return (
    <section className="border-y border-fog/60 bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
            The operating system
          </p>
          <h2 className="text-3xl font-bold leading-[1.08] text-navy md:text-4xl">
            Four principles behind stronger content libraries.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {elements.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-fog/70 bg-white p-5">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-mint/12 text-[13px] font-bold text-mint">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold leading-snug text-navy">{item.title}</h3>
              <p className="mt-4 text-[13.5px] leading-relaxed text-slate">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCta() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
          Ready when you are
        </p>
        <h2 className="text-3xl font-bold leading-[1.08] text-navy md:text-4xl">
          Build a content library around your next strong story.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-slate">
          Take the 1-minute estimate quiz and we will help you shape the right production
          scope for your brand, budget and channels.
        </p>
        <a
          href="https://quiz.blackirisfilms.com/"
          className="mt-8 inline-flex items-center rounded-sm bg-mint px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
        >
          Get an estimate
        </a>
      </div>
    </section>
  );
}
