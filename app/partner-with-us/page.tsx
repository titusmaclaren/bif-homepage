import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Whitelabel agreements, joint ventures and strategic partnerships with Black Iris Films.",
  alternates: {
    canonical: "/partner-with-us",
  },
};

const partnerCopy = [
  "If you’re reading this, you’re probably running some sort of marketing agency - be it web design, PR, digital media, advertising etc.",
  "If you share the same target market as us, with no competitive crossover, and you’re interested in exploring a strategic partnership or joint venture opportunity, we’d love to hear from you!",
  "We regularly white label for agencies and even other production companies, and also provide an affiliate partnership program. This is great for those looking to add video to their offering, or those who simply want to recommend someone they can rely on. We run an end-to-end production service and our partners find that means it’s a headache free zone.",
  "We've created multiple successful partnerships with national & international businesses and are always keen to explore new opportunities. If you’re interested, fill out the form below and we'll be in touch shortly to discuss the potential of creating a mutually beneficial partnership.",
];

export default function PartnerWithUsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-off-white">
        <section className="bg-navy-midnight px-6 pb-14 pt-32 text-white md:pb-16 md:pt-36 lg:px-10">
          <div className="mx-auto max-w-[980px]">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
              Partnerships
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] md:text-5xl">
              Whitelabel Agreements, Joint Ventures &amp; Strategic Partnerships
            </h1>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16 lg:px-10">
          <article className="mx-auto max-w-[980px] rounded-lg border border-fog/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,24,38,0.08)] md:p-10">
            <div className="space-y-5">
              {partnerCopy.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-slate md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
