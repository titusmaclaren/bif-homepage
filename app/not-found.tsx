import Image from "next/image";
import { Footer } from "./components/Footer";
import { GoogleReviewsBadge } from "./components/GoogleReviewsBadge";
import { Nav } from "./components/Nav";

const helpfulLinks = [
  { href: "/estimate", label: "Get a 1-minute estimate" },
  { href: "/contact", label: "Start a project conversation" },
  { href: "/#portfolio", label: "Watch recent work" },
  { href: "/ai-powered-content-studio-v2", label: "AI Powered Content Studio" },
  { href: "/learn", label: "Read the Black Iris blog" },
];

export default function NotFound() {
  return (
    <>
      <Nav showEstimateBar />
      <main className="flex-1 bg-[#07090d] pt-[108px] text-white">
        <section className="relative isolate min-h-[calc(100svh-108px)] overflow-hidden">
          <Image
            src="/assets/thumb-working-bif.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.34]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,14,0.96)_0%,rgba(5,8,14,0.83)_42%,rgba(5,8,14,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(97,179,131,0.24),transparent_34%),radial-gradient(circle_at_18%_78%,rgba(75,107,139,0.28),transparent_32%)]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-108px)] max-w-[1260px] items-center gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-mint">
                404 / Missing frame
              </p>
              <h1 className="max-w-[10ch] text-5xl font-bold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-[86px]">
                This page fell out of the edit.
              </h1>
              <p className="mt-7 max-w-[58ch] text-base font-light leading-relaxed text-white/78 sm:text-lg">
                The link may have moved, or the scene was cut. Head back to the
                site, price a video, or get in touch and we&apos;ll point you in
                the right direction.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm bg-mint px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
                >
                  Back to home
                </a>
                <a
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/28 px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:border-mint hover:text-mint"
                >
                  Contact us
                </a>
              </div>
            </div>

            <aside className="border border-white/12 bg-black/48 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
                Useful routes
              </p>
              <nav className="mt-5 grid gap-2" aria-label="Helpful links">
                {helpfulLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex min-h-12 items-center justify-between gap-4 border-t border-white/10 py-3 text-sm font-semibold text-white/82 transition-colors hover:text-mint"
                  >
                    <span>{link.label}</span>
                    <span className="text-lg leading-none transition-transform group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        </section>
      </main>
      <GoogleReviewsBadge />
      <Footer />
    </>
  );
}
