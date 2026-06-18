import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { GoogleReviewsBadge } from "../components/GoogleReviewsBadge";
import { Nav } from "../components/Nav";
import { SERVICE_TILES } from "../components/ServicesGrid";
import { PORTFOLIO_ITEMS } from "../data/portfolio";
import { createPageMetadata } from "../lib/seo";
import { PortfolioExplorer } from "./PortfolioExplorer";
import { ServiceCarousel } from "./ServiceCarousel";

export const metadata: Metadata = createPageMetadata({
  title: "Video Portfolio",
  description:
    "Explore the Black Iris Films video portfolio by video type and industry, including brand films, explainers, product videos, event films and social content.",
  path: "/portfolio",
  image: "/assets/hero-brand-generated.png",
});

export default function PortfolioPage() {
  return (
    <>
      <Nav showEstimateBar />
      <main className="flex-1 bg-off-white pt-[108px]">
        <section className="border-b border-fog/70 bg-white">
          <div className="mx-auto max-w-[980px] px-6 py-16 text-center md:py-24 lg:px-10">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.24em] text-mint">
              Portfolio
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.03] text-navy md:text-6xl">
              Video work for brands that need the idea to land.
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base font-light leading-relaxed text-slate md:text-lg">
              Browse through our catalogue of live action & animated marketing
              videos, social media videos, passion projects, corporate videos &
              TV Commercials.
            </p>
          </div>
        </section>

        <PortfolioExplorer items={PORTFOLIO_ITEMS} />

        <ServiceCarousel items={SERVICE_TILES} />

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
