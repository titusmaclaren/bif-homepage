import Image from "next/image";

const columns = [
  {
    title: "Work",
    links: [
      { label: "Video", href: "#" },
      { label: "Photography", href: "#" },
      { label: "AI Imagery", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Financial Services", href: "#" },
      { label: "Higher Education", href: "#" },
      { label: "Technology", href: "#" },
      { label: "Brand Films", href: "#" },
      { label: "Explainer", href: "#" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "#about" },
      { label: "Learn", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Get an estimate", href: "#estimate" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Image
              src="/logos/bif-text-white.png"
              alt="Black Iris Films"
              width={220}
              height={44}
              className="h-9 w-auto mb-7"
            />
            <p className="text-sky-pale/80 font-light leading-relaxed max-w-sm">
              Boutique video production studio. Sydney based. Working in finance,
              tech and higher education across Australia.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a
                href="mailto:titus@blackirisfilms.com"
                className="block text-white hover:text-mint transition-colors"
              >
                titus@blackirisfilms.com
              </a>
              <a
                href="tel:+61402640727"
                className="block text-sky-pale/80 hover:text-mint transition-colors"
              >
                (+61) 0402 640 727
              </a>
              <p className="text-sky-pale/60 pt-1">Paddington, Sydney</p>
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-mint font-medium mb-5">
                {c.title}
              </div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-sky-pale/80 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="text-[11px] uppercase tracking-[0.18em] text-mint font-medium mb-5">
              Social
            </div>
            <ul className="space-y-3 text-sm text-sky-pale/80">
              <li><a href="https://www.linkedin.com/in/titusmaclaren" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/blackirisfilms" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://www.youtube.com/@blackirisfilms" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row justify-between gap-4 text-xs text-sky-pale/50">
          <p>© {year} Black Iris Films. ABN 87 678 543 219. Titus Maclaren trading as Black Iris Films.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
