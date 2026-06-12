import type { Metadata } from "next";
import Image from "next/image";
import { AiImageryContactForm } from "../components/AiImageryContactForm";
import { Footer } from "../components/Footer";
import { GoogleReviewsBadge } from "../components/GoogleReviewsBadge";
import { Nav } from "../components/Nav";

export const metadata: Metadata = {
  title: "AI Imagery for Business",
  description:
    "Custom AI imagery for campaigns, websites, reports, presentations and social content, created by Black Iris Films in Sydney.",
  alternates: { canonical: "/ai-imagery" },
  openGraph: {
    title: "AI Imagery for Business | Black Iris Films",
    description:
      "Custom AI imagery for campaigns, websites, reports, presentations and social content.",
    url: "/ai-imagery",
    images: ["/ai-imagery/hero-collage.jpg"],
  },
};

const challenges = [
  "Updating the website regularly is expensive and hard to keep fresh.",
  "We need better ad creative without another stock image compromise.",
  "The content team needs visual options that feel specific to our brand.",
  "We spend too much time searching stock sites for almost-right images.",
  "We need product or concept visuals before production exists.",
  "Our reports, decks and learning material need images people remember.",
];

const prices = [
  { count: "1", label: "AI Image", price: "$100", save: "" },
  { count: "5", label: "AI Images", price: "$400", save: "Save $100" },
  { count: "10", label: "AI Images", price: "$600", save: "Save $400" },
  { count: "20", label: "AI Images", price: "$1100", save: "Save $900" },
  { count: "25", label: "AI Images", price: "$1500", save: "Save $1000" },
];

type ImagePanelProps = {
  src: string;
  alt: string;
  className?: string;
};

function ImagePanel({ src, alt, className = "aspect-square" }: ImagePanelProps) {
  return (
    <figure className={`relative overflow-hidden rounded-lg bg-fog shadow-[0_18px_48px_rgba(15,24,38,0.14)] ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 38vw" className="object-cover" />
      <figcaption className="absolute bottom-3.5 left-3.5 rounded-sm bg-navy-midnight/75 px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
        Created with AI
      </figcaption>
    </figure>
  );
}

export default function AiImageryPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative min-h-[610px] overflow-hidden bg-navy-midnight text-white">
          <Image
            src="/ai-imagery/hero-collage.jpg"
            alt="A colourful series of AI-generated landscapes"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,24,38,0.94),rgba(15,24,38,0.58)_52%,rgba(15,24,38,0.12))]" />
          <div className="relative mx-auto flex min-h-[610px] max-w-[1260px] items-end px-6 py-16 lg:px-10 lg:py-20">
            <div className="max-w-[760px]">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-mint">AI imagery for business</p>
              <h1 className="text-[38px] font-bold leading-[1.06] text-white md:text-[56px]">
                Affordable AI imagery, made with a filmmaker&apos;s eye
              </h1>
              <p className="mt-6 max-w-[620px] text-base font-light leading-relaxed text-white/84 md:text-xl">
                Custom images for campaigns, websites, reports, presentations and social content. Specific to the idea, the audience and the brand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-mint px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-bif-green">Get my images</a>
                <a href="#pricing" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-navy transition-colors hover:bg-fog">View packs</a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1160px] px-6 lg:px-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate">Common marketing challenges</p>
            <h2 className="max-w-[850px] text-3xl font-bold leading-[1.12] text-navy md:text-[40px]">Hard problems we can solve with AI imagery</h2>
            <p className="mt-5 max-w-[760px] text-base leading-relaxed text-slate">
              Clear creative direction changes the result. We shape the image around the business, message and channel, rather than forcing the idea to fit what a stock library happens to have.
            </p>
            <div className="mt-9 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map((challenge) => (
                <blockquote key={challenge} className="min-h-[126px] rounded-lg border border-fog bg-off-white p-5 text-[14px] leading-relaxed text-navy">
                  &ldquo;{challenge}&rdquo;
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-fog/70 bg-off-white py-16 md:py-20">
          <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 lg:px-10">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate">Unique</p>
              <h2 className="text-3xl font-bold leading-[1.14] text-navy">Your competitors will not find these images on stock sites</h2>
              <p className="mt-5 text-base leading-relaxed text-slate">
                Stop settling for imagery that feels close enough. We create a visual set around the specific business, audience, emotion and channel you need it for.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ImagePanel src="/ai-imagery/college-students.jpg" alt="AI-generated image of students learning technology" />
              <ImagePanel src="/ai-imagery/animated-report.jpg" alt="AI-generated promotional illustration for a report" />
            </div>
          </div>
        </section>

        <section className="relative min-h-[470px] overflow-hidden px-6 py-20">
          <Image src="/ai-imagery/snow-petals.jpg" alt="AI-generated cinematic scene with snow and flower petals" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy-midnight/56" />
          <div className="relative mx-auto max-w-[650px] rounded-lg bg-white/95 p-7 text-navy shadow-[0_22px_70px_rgba(0,0,0,0.24)] md:p-8">
            <blockquote className="text-lg italic leading-relaxed md:text-[22px]">
              &ldquo;It would take a conceptual artist days to create one of these images and then we would begin rounds of changes. This way I had 10 to choose from in less than a day and it was super affordable. Plus we had a 10% CTR!&rdquo;
            </blockquote>
            <p className="mt-5 text-[12px] font-bold text-slate">Lyna Duong | Little Red Hood</p>
          </div>
        </section>

        <section className="border-t border-fog/70 bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[1.22fr_0.78fr] lg:gap-14 lg:px-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <ImagePanel src="/ai-imagery/burning-earth.jpg" alt="AI-generated environmental campaign concept" />
              <ImagePanel src="/ai-imagery/call-centre.jpg" alt="AI-generated image of a person in a contact centre" />
            </div>
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate">Branded</p>
              <h2 className="text-3xl font-bold leading-[1.14] text-navy">Images that match your visual world</h2>
              <p className="mt-5 text-base leading-relaxed text-slate">
                We work from your brand notes, campaign message and references, then shape a direction that can sit comfortably across web, social, print and pitch material.
              </p>
            </div>
          </div>
        </section>

        <section className="relative min-h-[470px] overflow-hidden px-6 py-20">
          <Image src="/ai-imagery/kitchen-variants.jpg" alt="AI-generated variations of the same kitchen design" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy-midnight/56" />
          <div className="relative mx-auto max-w-[650px] rounded-lg bg-white/95 p-7 text-navy shadow-[0_22px_70px_rgba(0,0,0,0.24)] md:p-8">
            <blockquote className="text-lg italic leading-relaxed md:text-[22px]">
              &ldquo;We were able to show what the same kitchen would look like in multiple designs, which was a real advantage for our kitchen makeover business. We could not find anything like that on stock sites.&rdquo;
            </blockquote>
            <p className="mt-5 text-[12px] font-bold text-slate">Leon Matti | Smart Makeover</p>
          </div>
        </section>

        <section className="border-t border-fog/70 bg-off-white py-16 md:py-20">
          <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-10">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate">Useful everywhere</p>
              <h2 className="text-3xl font-bold leading-[1.14] text-navy">A picture can carry the whole idea</h2>
              <p className="mt-5 text-base leading-relaxed text-slate">
                Use AI imagery for banners, ads, presentations, websites, posters, social posts, brochures, ebooks, reports and internal communication. The point is clarity, speed and a more exact feeling.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
              <ImagePanel src="/ai-imagery/deforestation.jpg" alt="AI-generated environmental campaign image" className="min-h-[520px]" />
              <div className="grid gap-4">
                <ImagePanel src="/ai-imagery/superhero.jpg" alt="AI-generated original superhero character" />
                <ImagePanel src="/ai-imagery/titus-headshot.jpg" alt="AI-generated portrait-style headshot" />
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden py-16 md:py-20">
          <Image src="/ai-imagery/particle-banner.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-white/82" />
          <div className="relative mx-auto max-w-[1160px] px-6 lg:px-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate">Credit packs</p>
            <h2 className="max-w-[850px] text-3xl font-bold leading-[1.12] text-navy md:text-[40px]">Start with one image, or build a campaign library</h2>
            <p className="mt-5 max-w-[760px] text-base leading-relaxed text-slate">Each pack includes two rounds of feedback, leaving room to tune the direction before final delivery.</p>
            <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
              {prices.map((price) => (
                <article key={price.count} className="flex min-h-[214px] flex-col justify-between rounded-lg border border-fog bg-white/95 p-5">
                  <div>
                    <p className="text-[54px] font-light leading-none text-navy">{price.count}</p>
                    <p className="mt-2 text-[12px] font-bold uppercase text-slate">{price.label}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-2xl font-bold text-navy">{price.price}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase text-slate">AUD*</p>
                    {price.save ? <p className="mt-2 text-[12px] font-bold text-bif-green">{price.save}</p> : null}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 max-w-[780px] text-[11px] leading-relaxed text-slate">* Prices exclusive of GST. Credit packs must be used within 6 months of purchase. Terms and conditions apply.</p>
          </div>
        </section>

        <section className="border-t border-fog/70 bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:px-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <ImagePanel src="/ai-imagery/data-flow.jpg" alt="AI-generated data flow concept" />
              <ImagePanel src="/ai-imagery/big-data.jpg" alt="AI-generated big data concept" />
            </div>
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate">Library thinking</p>
              <h2 className="text-3xl font-bold leading-[1.14] text-navy">Give the design team the image set they keep asking for</h2>
              <p className="mt-5 text-base leading-relaxed text-slate">Build a compact library with consistent tone, colour and subject matter for launch decks, sales assets, social posts and landing pages.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden py-16 md:py-20">
          <Image src="/ai-imagery/final-collage.jpg" alt="A collage of AI-generated landscape images" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,24,38,0.94),rgba(15,24,38,0.68))]" />
          <div className="relative mx-auto grid max-w-[1160px] gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 lg:px-10">
            <div className="text-white">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-mint">Speak with us</p>
              <h2 className="text-3xl font-bold leading-[1.12] text-white md:text-[40px]">Tell us what you need to show</h2>
              <p className="mt-5 text-base font-light leading-relaxed text-white/80">Send the use case, choose a credit pack and we will come back with the clearest next step.</p>
            </div>
            <AiImageryContactForm />
          </div>
        </section>
      </main>
      <GoogleReviewsBadge />
      <Footer />
    </>
  );
}
