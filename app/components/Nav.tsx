"use client";

import Image from "next/image";
import { useState } from "react";

const services = [
  { href: "/corporate-video-production-sydney", label: "Corporate Video Production Sydney" },
  { href: "/event-video-production-sydney", label: "Event Video Production Sydney" },
  { href: "/financial-video-production-sydney", label: "Finance Video Production Sydney" },
  { href: "/higher-education-video-production-sydney", label: "Higher Education Video Production Sydney" },
  { href: "/explainer-video-production-sydney", label: "Explainer Video Production Sydney" },
  { href: "/tech-video-production-sydney", label: "Tech & SaaS Video Production Sydney" },
  { href: "/animated-video-production-sydney", label: "Animated Video Production Sydney" },
  { href: "/brand-film-production-sydney", label: "Brand Film Production Sydney" },
  { href: "/startup-video-production-sydney", label: "Startup & Scaleup Video Production Sydney" },
  { href: "/linkedin-video-production-sydney", label: "LinkedIn & B2B Social Video Production Sydney" },
];

type NavProps = {
  showEstimateBar?: boolean;
};

export function Nav({ showEstimateBar = false }: NavProps) {
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<"services" | "work" | null>(
    null,
  );

  const closeMenu = () => setOpen(false);
  const closeDesktopMenu = () => setDesktopMenu(null);
  const headerTopClass = showEstimateBar ? "top-9" : "top-0";
  const mobileTopClass = showEstimateBar
    ? "top-[108px] max-h-[calc(100vh-108px)]"
    : "top-[72px] max-h-[calc(100vh-72px)]";

  return (
    <>
      {showEstimateBar && (
        <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-[#0f1826] border-b border-white/10 text-white">
          <div className="max-w-[1260px] mx-auto h-full px-6 flex items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.02em] md:text-[13px]">
            <span className="min-w-0 truncate text-left md:hidden">
              ⚡ Get your 1-min video pricing estimate
            </span>
            <span className="hidden min-w-0 truncate text-left md:inline">
              ⚡️ Get your video pricing estimate, tailored to your goals, in 1 minute
            </span>
            <a
              href="/estimate"
              className="shrink-0 text-mint hover:text-mint-bright transition-colors"
            >
              Start quiz ⟶
            </a>
          </div>
        </div>
      )}

      <header className={`fixed ${headerTopClass} left-0 right-0 z-50 bg-black h-[72px]`}>
        <div className="max-w-[1260px] mx-auto px-6 h-full flex items-center justify-between">
          <a
            href="/"
            className="flex items-center shrink-0 leading-none"
            aria-label="Black Iris Films"
          >
            <Image
              src="/assets/black-iris-play-ribbon-logo-white-text.svg"
              alt="Black Iris Films"
              width={4952}
              height={613}
              priority
              className="h-auto w-[196px] -translate-y-px sm:w-[242px]"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Site">
            <a href="/learn" className="nav-link">LEARN</a>
            <a href="/#faq" className="nav-link">FAQ</a>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setDesktopMenu("services")}
              onMouseLeave={closeDesktopMenu}
              onFocus={() => setDesktopMenu("services")}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  closeDesktopMenu();
                }
              }}
            >
              <button
                type="button"
                className="nav-link cursor-default"
                aria-haspopup="true"
                aria-expanded={desktopMenu === "services"}
                aria-controls="desktop-services-menu"
              >
                SERVICES
              </button>
              <div
                id="desktop-services-menu"
                className={`absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-[360px] p-2.5 bg-[#050505] border border-white/10 rounded-lg shadow-2xl transition-all duration-200 z-[1001] before:content-[''] before:absolute before:left-0 before:right-0 before:-top-[22px] before:h-[22px] ${
                  desktopMenu === "services" ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {services.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="block px-3.5 py-3 rounded-md text-white text-xs leading-tight font-semibold hover:bg-[#111] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setDesktopMenu("work")}
              onMouseLeave={closeDesktopMenu}
              onFocus={() => setDesktopMenu("work")}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  closeDesktopMenu();
                }
              }}
            >
              <button
                type="button"
                className="nav-link cursor-default"
                aria-haspopup="true"
                aria-expanded={desktopMenu === "work"}
                aria-controls="desktop-work-menu"
              >
                WORK
              </button>
              <div
                id="desktop-work-menu"
                className={`absolute top-[calc(100%+20px)] left-1/2 w-[210px] -translate-x-1/2 rounded-lg border border-white/10 bg-[#050505] p-2.5 shadow-2xl transition-all duration-200 z-[1001] before:absolute before:-top-[22px] before:left-0 before:right-0 before:h-[22px] before:content-[''] ${
                  desktopMenu === "work" ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <a href="/portfolio" className="block rounded-md px-3.5 py-3 text-xs font-semibold leading-tight text-white transition-colors hover:bg-[#111]">VIDEO PORTFOLIO</a>
                <a href="/photography" className="block rounded-md px-3.5 py-3 text-xs font-semibold leading-tight text-white transition-colors hover:bg-[#111]">PHOTOGRAPHY</a>
                <a href="/ai-imagery" className="block rounded-md px-3.5 py-3 text-xs font-semibold leading-tight text-white transition-colors hover:bg-[#111]">AI IMAGERY</a>
              </div>
            </div>
            <a href="/why-black-iris-films" className="nav-link">ABOUT</a>
          </nav>

          <a
            href="/contact"
            className="hidden lg:inline-flex items-center bg-bif-green hover:bg-bif-green-hover text-white text-[13px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors shrink-0"
          >
            GET IN TOUCH
          </a>

          <button
            className="lg:hidden text-white text-[26px] p-1"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {open && (
        <nav
          id="mobile-navigation"
          className={`fixed ${mobileTopClass} left-0 right-0 bg-black px-6 py-5 pb-7 flex flex-col gap-4 z-[999] lg:hidden border-b border-white/10 overflow-y-auto`}
          aria-label="Mobile navigation"
        >
          <a href="/learn" className="mobile-link" onClick={closeMenu}>LEARN</a>
          <a href="/#faq" className="mobile-link" onClick={closeMenu}>FAQ</a>
          <details>
            <summary className="mobile-link list-none cursor-pointer">SERVICES</summary>
            <div className="grid gap-2.5 mt-3.5 pt-3.5 pb-0.5 pl-3.5 border-l border-white/15">
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="text-[13px] leading-tight text-slate-300 hover:text-white"
                  onClick={closeMenu}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </details>
          <details>
            <summary className="mobile-link list-none cursor-pointer">WORK</summary>
            <div className="grid gap-2.5 mt-3.5 pt-3.5 pb-0.5 pl-3.5 border-l border-white/15">
              <a href="/portfolio" className="text-[13px] leading-tight text-slate-300 hover:text-white" onClick={closeMenu}>VIDEO PORTFOLIO</a>
              <a href="/photography" className="text-[13px] leading-tight text-slate-300 hover:text-white" onClick={closeMenu}>PHOTOGRAPHY</a>
              <a href="/ai-imagery" className="text-[13px] leading-tight text-slate-300 hover:text-white" onClick={closeMenu}>AI IMAGERY</a>
            </div>
          </details>
          <a href="/why-black-iris-films" className="mobile-link" onClick={closeMenu}>ABOUT</a>
          <a
            href="/contact"
            className="inline-block text-center bg-bif-green hover:bg-bif-green-hover text-white text-[13px] font-bold uppercase tracking-wider px-5 py-3 rounded-sm transition-colors mt-2"
            onClick={closeMenu}
          >
            GET IN TOUCH
          </a>
        </nav>
      )}

      <style>{`
        .nav-link {
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s;
          background: none;
          border: 0;
          padding: 0;
        }
        .nav-link:hover { opacity: 0.7; }
        .mobile-link {
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
