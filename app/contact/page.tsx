import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { InTheirWords } from "../components/InTheirWords";
import { Nav } from "../components/Nav";

export const metadata: Metadata = {
  title: "Contact Black Iris Films",
  description:
    "Contact Black Iris Films about video production, photography, animation and content projects in Sydney and across Australia.",
  alternates: { canonical: "/contact" },
};

const testimonialVideos = [
  {
    brand: "Dacxi Global",
    vimeoId: "754222312",
  },
  {
    brand: "Academy of Interactive Entertainment",
    vimeoId: "516023386",
  },
  {
    brand: "Little Red Hood",
    vimeoId: "930195266",
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="bg-navy-midnight py-16 text-white md:py-20">
          <div className="mx-auto grid max-w-[1260px] gap-10 px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(480px,1fr)] lg:items-start lg:px-10">
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
                Contact Black Iris Films
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] md:text-5xl">
                How can we help?
              </h1>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/72">
                Start your journey to impactful video content today. Our team
                is ready to bring your vision to life!
              </p>

              <div className="mt-9 space-y-5 border-t border-white/12 pt-7">
                <a
                  href="mailto:info@blackirisfilms.com?subject=Video%20Enquiry"
                  className="group flex items-center gap-4 text-white"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-mint transition-colors group-hover:border-mint">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4.5 w-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="m4 6 8 6 8-6" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/48">
                      Email
                    </span>
                    <span className="mt-1 block text-sm font-semibold">
                      info@blackirisfilms.com
                    </span>
                  </span>
                </a>

                <a
                  href="tel:+610282013504"
                  className="group flex items-center gap-4 text-white"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-mint transition-colors group-hover:border-mint">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4.5 w-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/48">
                      Phone
                    </span>
                    <span className="mt-1 block text-sm font-semibold">
                      (02) 8201 3504
                    </span>
                  </span>
                </a>
              </div>

              <div className="mt-9 border-t border-white/12 pt-7">
                <p className="text-sm leading-relaxed text-white/65">
                  Need a useful price range before a conversation?
                </p>
                <a
                  href="/estimate/"
                  className="mt-4 inline-flex items-center gap-2.5 rounded-sm bg-mint px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
                >
                  Get a 1-minute estimate
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
            <div className="mb-8 max-w-3xl">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
                Working with Black Iris Films
              </p>
              <h2 className="text-3xl font-bold leading-[1.08] text-navy md:text-4xl">
                Hear directly from the teams we work with.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {testimonialVideos.map((video) => (
                <article key={video.vimeoId}>
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-fog/70 bg-black shadow-[0_16px_40px_rgba(15,24,38,0.12)]">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0&color=61B383&dnt=1`}
                      title={`${video.brand} on working with Black Iris Films`}
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-navy">{video.brand}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <InTheirWords />
      </main>
      <Footer />
    </>
  );
}
