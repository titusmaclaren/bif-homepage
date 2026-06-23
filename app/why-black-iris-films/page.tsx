import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "../components/Nav";
import { CreativeAlly } from "../components/CreativeAlly";
import { SoundFamiliar } from "../components/SoundFamiliar";
import { ResearchSection } from "../components/ResearchSection";
import { ContentSystem } from "../components/ContentSystem";
import { Footer } from "../components/Footer";
import { WhyHeroSlideshow } from "../components/WhyHeroSlideshow";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why Black Iris Films?",
  description:
    "See how Black Iris Films helps brands turn strong stories into useful video, photography and social content libraries.",
  path: "/why-black-iris-films",
});

type ComparisonStatus = "Rare" | "Sometimes" | "Always";

const comparisonRows = [
  {
    label: "Emotion-first strategy",
    freelancer: "Sometimes",
    inHouse: "Sometimes",
    agency: "Sometimes",
    bif: "Always",
  },
  {
    label: "Filmmaking shaped by marketing-team experience",
    freelancer: "Sometimes",
    inHouse: "Sometimes",
    agency: "Sometimes",
    bif: "Always",
  },
  {
    label: "Live-action, photography, animation and social assets",
    freelancer: "Rare",
    inHouse: "Sometimes",
    agency: "Always",
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
    label: "Easy, low-friction production process",
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
] satisfies Array<{
  label: string;
  freelancer: ComparisonStatus;
  inHouse: ComparisonStatus;
  agency: ComparisonStatus;
  bif: ComparisonStatus;
}>;

const statusStyles: Record<ComparisonStatus, string> = {
  Rare: "bg-[#F04438]",
  Sometimes: "bg-gold",
  Always: "bg-mint",
};

const elements = [
  {
    title: "Marketing-aware filmmaking",
    body: "The marketing brain shows up before the camera does, from pre-planning and interview questions to lighting, edit choices and delivery formats.",
    image: "/assets/why-principle-marketing.webp",
    alt: "A producer and marketing strategist planning a video shoot together.",
  },
  {
    title: "Authentic marketing",
    body: "We are not interested in tricks or over-polished spin. The work should present your strongest side while still feeling believable and human.",
    image: "/assets/why-principle-authentic.webp",
    alt: "A relaxed interview subject preparing for a film shoot.",
  },
  {
    title: "Hands-free, but tailored",
    body: "We keep the process light for your team while still building a custom solution around your goals, audience and internal workflow.",
    image: "/assets/why-principle-process.webp",
    alt: "A video crew and clients calmly preparing for a tailored shoot.",
  },
  {
    title: "Advice without ego",
    body: "We will bring clear recommendations, but you have to live with the result. Final decisions stay with you, and the process respects that.",
    image: "/assets/why-principle-advice.webp",
    alt: "A director and client collaboratively reviewing visual ideas.",
  },
] satisfies Array<{
  title: string;
  body: string;
  image: string;
  alt: string;
}>;

type WhyTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
};

const whyTestimonials: WhyTestimonial[] = [
  {
    quote:
      "Titus is unparalleled in his filmmaking prowess. His meticulous attention to detail, innate storytelling aptitude, and technical brilliance make him a delight to collaborate with.",
    name: "Vicky Barker",
    role: "CMO",
    company: "Dacxi Chain",
    image: "/testimonials/vicky-barker.png",
  },
  {
    quote:
      "Working with Black Iris Films for our IllumiaSkin 7+1 LED Face Mask video was a game-changer. They expertly brought our vision to life.",
    name: "Jess Smith",
    role: "Chief Marketing Officer",
    company: "Ergo Health",
    image: "https://static.wixstatic.com/media/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg",
  },
  {
    quote:
      "Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative.",
    name: "Catherine Allison",
    role: "Director of Marketing",
    company: "ACS",
    image: "https://static.wixstatic.com/media/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg",
  },
  {
    quote:
      "He managed the process with professional ease and captured exciting footage and engaging interviews through warm interactions with the guests.",
    name: "Scott Newton",
    role: "Marketing Director",
    company: "Game Plus",
    image: "https://static.wixstatic.com/media/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg",
  },
  {
    quote:
      "This is a group of accessible, really polished professionals that have taken all of our video content to the next level.",
    name: "Ian Lowe",
    role: "CEO",
    company: "Dacxi Group",
    image: "https://static.wixstatic.com/media/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg",
  },
  {
    quote:
      "Their team brilliantly crafted a series of videos and social media ads for us.",
    name: "Leon Matti",
    role: "Founder",
    company: "Smart Makeover",
    image: "https://static.wixstatic.com/media/a2a11d_5057b54b50e24496a9250c8b5d3b5a1b~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_5057b54b50e24496a9250c8b5d3b5a1b~mv2.jpg",
  },
];

export default function WhyBlackIrisFilmsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <WhyHero />
        <section className="bg-black px-6 py-7 text-center md:py-8">
          <p className="mx-auto max-w-5xl text-lg font-semibold leading-snug text-white md:text-2xl">
            Great campaigns don&apos;t run on one video. They run on a
            <br className="hidden md:block" /> consistent stream of content across every
            channel.
          </p>
        </section>
        <CreativeAlly />
        <SoundFamiliar />
        <ComparisonSection />
        <ElementsSection />
        <ContentSystem showCta={false} />
        <WhyTestimonials />
        <ResearchSection />
        <PricingCallout />
      </main>
      <Footer />
    </>
  );
}

function WhyHero() {
  return (
    <section className="overflow-hidden bg-off-white pb-16 pt-28 md:h-[66.667svh] md:min-h-[560px] md:pb-6 md:pt-20">
      <div className="mx-auto grid max-w-[1260px] items-center gap-12 px-6 md:h-full lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div className="relative z-10">
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] text-navy md:text-5xl lg:text-6xl">
            One production. A library of content that works harder.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-slate md:text-lg">
            We turn one shoot into a complete suite of video, photography and motion
            assets&mdash;so your story keeps working across every channel.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/estimate/"
              className="inline-flex items-center rounded-sm bg-mint px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
            >
              Get an estimate
            </a>
            <a
              href="#why-comparison"
              className="inline-flex items-center py-3 text-sm font-semibold text-navy/82 transition-colors hover:text-mint"
            >
              See how we work
            </a>
          </div>
        </div>
        <WhyHeroSlideshow />
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

        <div className="grid gap-4 md:hidden">
          {comparisonRows.map((row) => (
            <article key={row.label} className="rounded-lg border border-fog/70 bg-off-white p-4">
              <h3 className="text-[15px] font-bold leading-snug text-navy">{row.label}</h3>
              <div className="mt-4 grid gap-2">
                {([
                  ["Freelancer", row.freelancer],
                  ["In-house creator", row.inHouse],
                  ["Large agency", row.agency],
                  ["Black Iris Films", row.bif],
                ] as Array<[string, ComparisonStatus]>).map(([label, value]) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between gap-4 rounded-md border px-3 py-2.5 ${
                      label === "Black Iris Films"
                        ? "border-mint/35 bg-mint/10"
                        : "border-fog/70 bg-white"
                    }`}
                  >
                    <span className={`font-bold ${label === "Black Iris Films" ? "text-mint" : "text-navy"}`}>
                      {label}
                    </span>
                    <StatusLabel status={value} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-lg border border-fog/70 bg-off-white md:block">
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
                  <td className="px-5 py-4"><StatusLabel status={row.freelancer} /></td>
                  <td className="px-5 py-4"><StatusLabel status={row.inHouse} /></td>
                  <td className="px-5 py-4"><StatusLabel status={row.agency} /></td>
                  <td className="px-5 py-4"><StatusLabel status={row.bif} strong /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatusLabel({
  status,
  strong = false,
}: {
  status: ComparisonStatus;
  strong?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[12px] ${strong ? "font-bold text-navy" : "font-medium text-slate"}`}
    >
      <span
        aria-hidden="true"
        className={`h-3 w-3 rounded-full ${statusStyles[status]}`}
      />
      {status}
    </span>
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
            Four principles behind the way we work.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {elements.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-fog/70 bg-white p-4 shadow-[0_14px_34px_rgba(41,51,77,0.04)] md:p-5">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-md border border-fog/70 bg-off-white">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 768px) 44vw, 88vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy shadow-sm">
                  Principle {index + 1}
                </span>
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

function WhyTestimonials() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
              Client proof
            </p>
            <h2 className="text-3xl font-bold leading-[1.08] text-navy md:text-4xl">
              Senior marketers trust the process.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate">
            A small cross-section from the people who have trusted Black Iris Films
            with launches, campaigns, corporate videos and content systems.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {whyTestimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-lg border border-fog/70 bg-off-white p-5 shadow-[0_14px_34px_rgba(41,51,77,0.04)]"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 shrink-0 rounded-full bg-fog/40 object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <figcaption className="text-[13.5px] font-bold leading-tight text-navy">
                    {testimonial.name}
                  </figcaption>
                  <p className="mt-1 text-[12px] leading-tight text-slate">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <TestimonialStars />
                <blockquote className="mt-4 text-[14px] leading-relaxed text-navy">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialStars() {
  return (
    <div className="flex gap-0.5 text-mint" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function PricingCallout() {
  return (
    <section className="-mt-1 bg-[linear-gradient(to_bottom,#0F1826_0%,#0F1826_50%,#000000_50%,#000000_100%)] px-6 pb-2">
      <div className="mx-auto flex max-w-[940px] flex-col gap-6 rounded-lg border border-[#e8e8e8] bg-white px-6 py-7 shadow-[0_18px_45px_rgba(0,0,0,0.12)] sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold leading-tight text-black">
            Get clarity on your video pricing
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#666666]">
            Answer a 1-minute quiz and see a tailored pricing range for your project.
          </p>
        </div>
        <a
          href="/estimate/"
          className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-sm bg-bif-green px-8 py-3.5 text-[13px] font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-bif-green-hover"
        >
          Start quiz
        </a>
      </div>
    </section>
  );
}
