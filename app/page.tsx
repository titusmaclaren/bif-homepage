import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ClientsStrip } from "./components/ClientsStrip";
import { ResearchSection } from "./components/ResearchSection";
import { CaseStudies } from "./components/CaseStudies";
import { ProcessSteps } from "./components/ProcessSteps";
import { PortfolioIntro } from "./components/PortfolioIntro";
import { SoundFamiliar } from "./components/SoundFamiliar";
import { BlogTeasers } from "./components/BlogTeasers";
import { ServicesIntro } from "./components/ServicesIntro";
import { Testimonials } from "./components/Testimonials";
import { CreativeAlly } from "./components/CreativeAlly";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ClientsStrip />
        <ResearchSection />
        <CaseStudies />
        <ProcessSteps />
        <PortfolioIntro />
        <SoundFamiliar />
        <BlogTeasers />
        <ServicesIntro />
        <Testimonials />
        <CreativeAlly />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
