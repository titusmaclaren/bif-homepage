import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { GoogleReviewsBadge } from "../components/GoogleReviewsBadge";
import { Nav } from "../components/Nav";
import { PORTFOLIO_ITEMS } from "../data/portfolio";
import { PortfolioExplorer } from "./PortfolioExplorer";

export const metadata: Metadata = {
  title: "Video portfolio",
  description:
    "Explore the Black Iris Films video portfolio by video type and industry, including brand films, explainers, product videos, event films and social content.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Black Iris Films video portfolio",
    description:
      "Filter Black Iris Films work by video type and industry, then watch each project in a lightbox.",
    url: "/portfolio",
    type: "website",
  },
};

const serviceLinks = [
  { href: "/corporate-video-production-sydney", label: "Corporate video" },
  { href: "/financial-video-production-sydney", label: "Finance video" },
  { href: "/higher-education-video-production-sydney", label: "Higher education" },
  { href: "/explainer-video-production-sydney", label: "Explainer video" },
  { href: "/tech-video-production-sydney", label: "Tech and SaaS" },
  { href: "/animated-video-production-sydney", label: "Animated video" },
  { href: "/brand-film-production-sydney", label: "Brand films" },
  { href: "/startup-video-production-sydney", label: "Startup and scaleup" },
  { href: "/linkedin-video-production-sydney", label: "LinkedIn and B2B social" },
];

export default function PortfolioPage() {
  return (
    <>
      <Nav showEstimateBar />
      <main className="flex-1 bg-off-white pt-[108px]">
        <section className="border-b border-fog/70 bg-white">
          <div className="mx-auto grid max-w-[1260px] gap-8 px-6 py-14 md:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.45fr)] lg:items-end lg:px-10">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-mint">
                Portfolio
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.03] text-navy md:text-6xl">
                Video work for brands that need the idea to land.
              </h1>
            </div>
            <div className="max-w-xl lg:justify-self-end">
              <p className="text-base font-light leading-relaxed text-slate md:text-lg">
                Browse the full Black Iris Films portfolio by video format or
                industry. Every thumbnail opens in the same project lightbox used
                across the homepage.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 border-y border-fog/70 py-4 text-center">
                <Stat value={PORTFOLIO_ITEMS.length} label="projects" />
                <Stat
                  value={new Set(PORTFOLIO_ITEMS.map((item) => item.category)).size}
                  label="formats"
                />
                <Stat
                  value={new Set(PORTFOLIO_ITEMS.map((item) => item.industry)).size}
                  label="industries"
                />
              </div>
            </div>
          </div>
        </section>

        <PortfolioExplorer items={PORTFOLIO_ITEMS} />

        <section className="bg-white py-12 md:py-14">
          <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:items-start">
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
                  Service pages
                </p>
                <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl">
                  Looking for a specific kind of video?
                </h2>
                <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-slate">
                  These pages explain how we approach common formats and sectors,
                  with examples, process notes and FAQs.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {serviceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex min-h-14 items-center justify-between gap-4 border border-fog bg-off-white px-4 py-3 text-sm font-bold text-navy transition-colors hover:border-mint hover:bg-white"
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-mint transition-transform group-hover:translate-x-1"
                    >
                      -&gt;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_50%,#000000_50%,#000000_100%)] pb-2">
          <div className="mx-auto flex max-w-[940px] flex-col gap-5 rounded-lg border border-fog bg-white px-6 py-7 shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-black">
                Get clarity on your video pricing
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Answer a 1-minute quiz and see a tailored pricing range for your
                project.
              </p>
            </div>
            <a
              href="/estimate"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-sm bg-bif-green px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-bif-green-hover"
            >
              Start quiz
            </a>
          </div>
        </section>
      </main>
      <GoogleReviewsBadge />
      <Footer />
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold leading-none text-navy">{value}</div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate">
        {label}
      </div>
    </div>
  );
}
