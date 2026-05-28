const footerNav = [
  { href: "https://www.blackirisfilms.com/get-a-quote", label: "Contact us" },
  { href: "https://www.blackirisfilms.com/#portfolio", label: "Portfolio" },
  { href: "https://www.blackirisfilms.com/get-a-quote#testimonials", label: "Testimonials" },
  { href: "https://stories.blackirisfilms.com/case-studies/", label: "Case Studies" },
  { href: "https://www.blackirisfilms.com/learn", label: "Blog" },
];

const socials = [
  {
    href: "https://vimeo.com/blackirisfilms",
    label: "Vimeo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.404 0-2.59-1.297-3.553-3.892L5.322 11.4C4.603 8.806 3.834 7.508 3.01 7.508c-.179 0-.806.378-1.881 1.132L0 7.226c1.185-1.04 2.355-2.082 3.51-3.124 1.587-1.371 2.777-2.093 3.572-2.165 1.875-.18 3.031 1.106 3.461 3.86.466 2.974.79 4.823.97 5.547.541 2.452 1.137 3.678 1.787 3.678.504 0 1.262-.795 2.273-2.385 1.01-1.59 1.55-2.801 1.622-3.628.144-1.376-.396-2.065-1.622-2.065-.577 0-1.171.131-1.78.394 1.18-3.866 3.434-5.745 6.762-5.638 2.467.073 3.63 1.671 3.493 4.796z"/></svg>
    ),
  },
  {
    href: "http://www.facebook.com/blackirisfilms",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z"/></svg>
    ),
  },
  {
    href: "https://www.instagram.com/blackirisfilms/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.142 0-3.515.012-4.756.069-1.054.048-1.624.218-2.005.36-.504.196-.864.43-1.243.808-.378.378-.612.738-.808 1.242-.142.382-.312.952-.36 2.006-.057 1.24-.069 1.614-.069 4.756s.012 3.515.069 4.756c.048 1.054.218 1.624.36 2.005.196.504.43.864.808 1.242.378.378.738.612 1.242.808.382.142.952.312 2.006.36 1.24.057 1.614.069 4.756.069s3.515-.012 4.756-.069c1.054-.048 1.624-.218 2.005-.36.504-.196.864-.43 1.242-.808.378-.378.612-.738.808-1.242.142-.382.312-.952.36-2.006.057-1.24.069-1.614.069-4.756s-.012-3.515-.069-4.756c-.048-1.054-.218-1.624-.36-2.005-.196-.504-.43-.864-.808-1.243-.378-.378-.738-.612-1.242-.808-.382-.142-.952-.312-2.006-.36-1.24-.057-1.614-.069-4.756-.069zm0 3.131A5.868 5.868 0 1 1 12 17.87a5.868 5.868 0 0 1 0-10.738zm0 9.673a3.805 3.805 0 1 0 0-7.61 3.805 3.805 0 0 0 0 7.61zm6.103-9.882a1.371 1.371 0 1 1 0-2.742 1.371 1.371 0 0 1 0 2.742z"/></svg>
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCHmhhExvQyjn5lnbt4m3Wrw",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/black-iris-films/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white/60 pt-14 pb-10 text-sm">
      <div className="max-w-[1160px] mx-auto px-6 flex flex-wrap justify-between gap-12">
        <div className="flex-1 min-w-[300px]">
          <nav className="flex flex-wrap gap-6 mb-6">
            {footerNav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="space-y-0.5">
            <p className="text-white/45 text-[13px]">© 2018 - {new Date().getFullYear()} Black Iris Films.</p>
            <p className="text-white/45 text-[13px]">Sydney, Australia</p>
            <p className="text-white/45 text-[13px]">Video Production Agency</p>
            <p className="text-white/45 text-[13px]">ABN: 13774120626</p>
            <a
              href="https://www.blackirisfilms.com/privacy-policy"
              className="text-white/50 hover:text-white text-[13px] inline-block mt-1"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="flex-none text-right md:text-right max-md:text-left">
          <div className="mb-5 space-y-1">
            <p>
              <a href="tel:+610282013504" className="text-white/70 hover:text-white transition-colors">
                Contact: (02) 8201 3504
              </a>
            </p>
            <p>
              <a
                href="mailto:info@blackirisfilms.com?subject=Video%20Enquiry"
                className="text-white/70 hover:text-white transition-colors"
              >
                Email: info@blackirisfilms.com
              </a>
            </p>
          </div>

          <div className="flex gap-3 mb-5 justify-end max-md:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center w-[34px] h-[34px] text-white/60 hover:text-white transition-opacity"
              >
                <span className="w-5 h-5">{s.icon}</span>
              </a>
            ))}
          </div>

          <div className="text-[13px] text-white/45">
            <p>
              Interested in becoming a partner?{" "}
              <a
                href="https://www.blackirisfilms.com/partner-with-us"
                className="text-bif-green font-semibold hover:underline"
              >
                CLICK HERE
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
