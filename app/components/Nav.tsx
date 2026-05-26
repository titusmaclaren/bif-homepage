import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#learn", label: "Learn" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-fog/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Black Iris Films home">
          <Image
            src="/logos/bif-text-black.png"
            alt="Black Iris Films"
            width={180}
            height={36}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium tracking-wide uppercase text-navy/75 hover:text-navy transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#estimate"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-[13px] font-medium text-white tracking-wide hover:bg-mint-bright transition-colors"
        >
          Get an estimate
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
