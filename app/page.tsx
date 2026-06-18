import type { Metadata } from "next";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ClientsStrip } from "./components/ClientsStrip";
import { ResearchStrip } from "./components/ResearchSection";
import { CaseStudies } from "./components/CaseStudies";
import { ProcessSteps } from "./components/ProcessSteps";
import { PortfolioIntro } from "./components/PortfolioIntro";
import { BlogTeasers } from "./components/BlogTeasers";
import { ServicesGrid } from "./components/ServicesGrid";
import { ContentSystem } from "./components/ContentSystem";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { GoogleReviewsBadge } from "./components/GoogleReviewsBadge";
import { DEFAULT_TITLE, createPageMetadata } from "./lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: DEFAULT_TITLE,
  description:
    "Sydney video production agency creating cinematic, emotionally engaging videos for brands, businesses and marketing teams.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Nav showEstimateBar />
      <main className="flex-1">
        <Hero />
        <ClientsStrip />
        <ResearchStrip />
        <CaseStudies />
        <ProcessSteps />
        <PortfolioIntro />
        <BlogTeasers />
        <ServicesGrid />
        <ContentSystem />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <GoogleReviewsBadge />
      <Footer />
    </>
  );
}
