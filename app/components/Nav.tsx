"use client";

import { useState } from "react";

const services = [
  { href: "https://services.blackirisfilms.com/corporate-video-production-sydney", label: "Corporate Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/financial-video-production-sydney", label: "Finance Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/higher-education-video-production-sydney", label: "Higher Education Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/explainer-video-production-sydney", label: "Explainer Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/tech-video-production-sydney", label: "Tech & SaaS Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/animated-video-production-sydney", label: "Animated Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/brand-film-production-sydney", label: "Brand Film Production Sydney" },
  { href: "https://services.blackirisfilms.com/startup-video-production-sydney", label: "Startup & Scaleup Video Production Sydney" },
  { href: "https://services.blackirisfilms.com/linkedin-video-production-sydney", label: "LinkedIn & B2B Social Video Production Sydney" },
];

function BifLogoSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 698.93 170.24"
      height="52"
      style={{ height: 48, width: "auto", display: "block", transform: "translateY(7px)" }}
      aria-label="Black Iris Films"
    >
      <defs>
        <clipPath id="bif-cp-1"><rect width="159.33" height="159.48" /></clipPath>
        <clipPath id="bif-cp-2">
          <path d="M27.09,45.50C25.32,46.06,22.55,49.42,22.55,49.42L23.39,75.98A15,15,0,0,0,32.70,81.98C39.81,83.54,37.60,80.55,55.50,75.20L55.30,47.32C44.37,44.43,38.99,43.43,35.52,43.43S30.45,44.41,27.09,45.50Z" />
        </clipPath>
        <linearGradient id="bif-grad-1" x1="-33.17" y1="-139.91" x2="-33.02" y2="-139.91" gradientTransform="matrix(0, -258.5, -258.5, 0, -36127.06, -8491.93)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#131316" />
          <stop offset="0.5" stopColor="#2c2d2f" />
          <stop offset="1" stopColor="#131316" />
        </linearGradient>
        <clipPath id="bif-cp-3">
          <path d="M25.07,77.86L23.39,75.98A4.68,4.68,0,0,0,25.07,77.86M32.74,79.75C28.74,79.75,26.39,78.80,25.05,77.86L49.79,105.57C50.14,105.94,51.85,107.87,53.47,108.19A12.67,12.67,0,0,0,58.31,108.19C60.31,107.57,145.31,78.06,145.31,78.06A3.68,3.68,0,0,0,146.84,76.98L146.81,76.64A1.87,1.87,0,0,0,145.81,76.16L102.83,61.72Z" />
        </clipPath>
        <linearGradient id="bif-grad-2" x1="-31.34" y1="-140.75" x2="-31.18" y2="-140.75" gradientTransform="matrix(819.76, 0, 0, -819.76, 25727.96, -115279.36)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#303c59" />
          <stop offset="0.03" stopColor="#303c59" />
          <stop offset="0.13" stopColor="#4b5d8b" />
          <stop offset="0.28" stopColor="#495a87" />
          <stop offset="0.44" stopColor="#42527a" />
          <stop offset="0.61" stopColor="#364364" />
          <stop offset="0.77" stopColor="#273047" />
          <stop offset="0.92" stopColor="#151a26" />
          <stop offset="1" stopColor="#151a26" />
        </linearGradient>
        <clipPath id="bif-cp-4">
          <path d="M145.23,78.12H145.23M22.55,49.42L23.34,48.52A5.18,5.18,0,0,0,22.55,49.42M48.61,19.59L23.34,48.52C24.56,47.37,27.32,45.52,32.75,45.35C43,45.05,135.13,73.13,144.86,76.06C147.14,76.75,145.35,78.05,145.23,78.12A2.61,2.61,0,0,0,147.30,75.38L148.19,48.43C148.19,46.51,147.76,46.13,145.92,45.54L57.20,15.89C53.91,16.15,50.96,16.77,48.61,19.59Z" />
        </clipPath>
        <linearGradient id="bif-grad-3" x1="-29.81" y1="-139.5" x2="-29.66" y2="-139.5" gradientTransform="matrix(0, -832.34, -832.34, 0, -116032.28, -24683.14)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3d3159" />
          <stop offset="0.03" stopColor="#443764" />
          <stop offset="0.09" stopColor="#53427a" />
          <stop offset="0.16" stopColor="#5c4987" />
          <stop offset="0.22" stopColor="#5f4b8b" />
          <stop offset="0.36" stopColor="#5b4785" />
          <stop offset="0.55" stopColor="#503d75" />
          <stop offset="0.76" stopColor="#3d2b5b" />
          <stop offset="0.99" stopColor="#241336" />
          <stop offset="1" stopColor="#213" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <text
            style={{
              fontSize: 42,
              fill: "#f5f6f8",
              fontFamily: "var(--font-montserrat), Arial, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.22em",
            }}
            transform="translate(196.41 78.44)"
          >
            <tspan>BLACK </tspan>
            <tspan style={{ fontWeight: 300 }} x="207.86" y="0">IRIS</tspan>
            <tspan x="314.91" y="0"> </tspan>
            <tspan style={{ fontWeight: 500 }} x="336.58" y="0">FILMS</tspan>
          </text>
          <g clipPath="url(#bif-cp-1)">
            <g clipPath="url(#bif-cp-2)"><rect fill="url(#bif-grad-1)" x="22.55" y="43.41" width="32.95" height="40.15" /></g>
            <g clipPath="url(#bif-cp-3)"><rect fill="url(#bif-grad-2)" x="18.91" y="42.77" width="120.94" height="119.83" transform="translate(-43.44 67.32) rotate(-44.41)" /></g>
            <g clipPath="url(#bif-cp-4)"><rect fill="url(#bif-grad-3)" x="47.13" y="1.08" width="65" height="126.99" transform="translate(19.05 125.18) rotate(-88.73)" /></g>
          </g>
        </g>
      </g>
    </svg>
  );
}

type NavProps = {
  showEstimateBar?: boolean;
};

export function Nav({ showEstimateBar = false }: NavProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const headerTopClass = showEstimateBar ? "top-9" : "top-0";
  const mobileTopClass = showEstimateBar
    ? "top-[108px] max-h-[calc(100vh-108px)]"
    : "top-[72px] max-h-[calc(100vh-72px)]";

  return (
    <>
      {showEstimateBar && (
        <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-[#0f1826] border-b border-white/10 text-white">
          <div className="max-w-[1260px] mx-auto h-full px-6 flex items-center justify-between gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.02em]">
            <span className="min-w-0 truncate text-left">
              ⚡️ Get your video pricing estimate, tailored to your goals, in 1 minute
            </span>
            <a
              href="https://quiz.blackirisfilms.com"
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
            <BifLogoSvg />
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Site">
            <a href="/#blog" className="nav-link">LEARN</a>
            <a href="/#faq" className="nav-link">FAQ</a>

            <div className="group relative flex items-center">
              <button type="button" className="nav-link cursor-default" aria-haspopup="true">
                SERVICES
              </button>
              <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-[360px] p-2.5 bg-[#050505] border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-[1001] before:content-[''] before:absolute before:left-0 before:right-0 before:-top-[22px] before:h-[22px]">
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

            <a href="/#portfolio" className="nav-link">WORK</a>
            <a href="/why-black-iris-films" className="nav-link">ABOUT</a>
            <a href="/contact" className="nav-link">CONTACT</a>
          </nav>

          <a
            href="/contact"
            className="hidden lg:inline-flex items-center bg-bif-green hover:bg-bif-green-hover text-white text-[13px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition-colors shrink-0"
          >
            GET IN TOUCH
          </a>

          <button
            className="lg:hidden text-white text-[26px] p-1"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {open && (
        <nav className={`fixed ${mobileTopClass} left-0 right-0 bg-black px-6 py-5 pb-7 flex flex-col gap-4 z-[999] lg:hidden border-b border-white/10 overflow-y-auto`}>
          <a href="/#blog" className="mobile-link" onClick={closeMenu}>LEARN</a>
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
          <a href="/#portfolio" className="mobile-link" onClick={closeMenu}>WORK</a>
          <a href="/why-black-iris-films" className="mobile-link" onClick={closeMenu}>ABOUT</a>
          <a href="/contact" className="mobile-link" onClick={closeMenu}>CONTACT</a>
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
