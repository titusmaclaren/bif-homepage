/* ============================================================
   Black Iris Films — shared site shell (markup + behaviour)

   Injects the canonical header, top CTA bar, footer, Google
   reviews widget, sticky quiz CTA and pricing callout into any
   page that loads it. Pair with bif-shell.css.

   Per-page options (set on <body>):
     data-bif-sticky="off"   -> skip the sticky quiz CTA
     data-bif-callout="off"  -> skip the pricing callout
     data-bif-offset         -> pad content below the fixed header
   ============================================================ */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  var STAR = '<svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
  var STARS = '<div class="bif-stars" aria-label="5 out of 5 stars">' + STAR + STAR + STAR + STAR + STAR + '</div>';
  var GOOGLE_MARK = '<svg class="bif-google-mark" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>';

  var SERVICES = [
    ["/corporate-video-production-sydney", "Corporate Video Production Sydney"],
    ["/financial-video-production-sydney", "Finance Video Production Sydney"],
    ["/higher-education-video-production-sydney", "Higher Education Video Production Sydney"],
    ["/explainer-video-production-sydney", "Explainer Video Production Sydney"],
    ["/tech-video-production-sydney", "Tech &amp; SaaS Video Production Sydney"],
    ["/animated-video-production-sydney", "Animated Video Production Sydney"],
    ["/brand-film-production-sydney", "Brand Film Production Sydney"],
    ["/startup-video-production-sydney", "Startup &amp; Scaleup Video Production Sydney"],
    ["/linkedin-video-production-sydney", "LinkedIn &amp; B2B Social Video Production Sydney"]
  ];

  function servicesLinks() {
    return SERVICES.map(function (s) { return '<a href="' + s[0] + '">' + s[1] + '</a>'; }).join("");
  }

  var LOGO_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 698.93 170.24" aria-hidden="true">' +
      '<defs>' +
        '<clipPath id="bif-shell-cp-1"><rect width="159.33" height="159.48"/></clipPath>' +
        '<clipPath id="bif-shell-cp-2"><path d="M27.09,45.50C25.32,46.06,22.55,49.42,22.55,49.42L23.39,75.98A15,15,0,0,0,32.70,81.98C39.81,83.54,37.60,80.55,55.50,75.20L55.30,47.32C44.37,44.43,38.99,43.43,35.52,43.43S30.45,44.41,27.09,45.50Z"/></clipPath>' +
        '<linearGradient id="bif-shell-grad-1" x1="-33.17" y1="-139.91" x2="-33.02" y2="-139.91" gradientTransform="matrix(0, -258.5, -258.5, 0, -36127.06, -8491.93)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#131316"/><stop offset="0.5" stop-color="#2c2d2f"/><stop offset="1" stop-color="#131316"/></linearGradient>' +
        '<clipPath id="bif-shell-cp-3"><path d="M25.07,77.86L23.39,75.98A4.68,4.68,0,0,0,25.07,77.86M32.74,79.75C28.74,79.75,26.39,78.80,25.05,77.86L49.79,105.57C50.14,105.94,51.85,107.87,53.47,108.19A12.67,12.67,0,0,0,58.31,108.19C60.31,107.57,145.31,78.06,145.31,78.06A3.68,3.68,0,0,0,146.84,76.98L146.81,76.64A1.87,1.87,0,0,0,145.81,76.16L102.83,61.72Z"/></clipPath>' +
        '<linearGradient id="bif-shell-grad-2" x1="-31.34" y1="-140.75" x2="-31.18" y2="-140.75" gradientTransform="matrix(819.76, 0, 0, -819.76, 25727.96, -115279.36)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#303c59"/><stop offset="0.03" stop-color="#303c59"/><stop offset="0.13" stop-color="#4b5d8b"/><stop offset="0.28" stop-color="#495a87"/><stop offset="0.44" stop-color="#42527a"/><stop offset="0.61" stop-color="#364364"/><stop offset="0.77" stop-color="#273047"/><stop offset="0.92" stop-color="#151a26"/><stop offset="1" stop-color="#151a26"/></linearGradient>' +
        '<clipPath id="bif-shell-cp-4"><path d="M145.23,78.12H145.23M22.55,49.42L23.34,48.52A5.18,5.18,0,0,0,22.55,49.42M48.61,19.59L23.34,48.52C24.56,47.37,27.32,45.52,32.75,45.35C43,45.05,135.13,73.13,144.86,76.06C147.14,76.75,145.35,78.05,145.23,78.12A2.61,2.61,0,0,0,147.30,75.38L148.19,48.43C148.19,46.51,147.76,46.13,145.92,45.54L57.20,15.89C53.91,16.15,50.96,16.77,48.61,19.59Z"/></clipPath>' +
        '<linearGradient id="bif-shell-grad-3" x1="-29.81" y1="-139.5" x2="-29.66" y2="-139.5" gradientTransform="matrix(0, -832.34, -832.34, 0, -116032.28, -24683.14)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3d3159"/><stop offset="0.03" stop-color="#443764"/><stop offset="0.09" stop-color="#53427a"/><stop offset="0.16" stop-color="#5c4987"/><stop offset="0.22" stop-color="#5f4b8b"/><stop offset="0.36" stop-color="#5b4785"/><stop offset="0.55" stop-color="#503d75"/><stop offset="0.76" stop-color="#3d2b5b"/><stop offset="0.99" stop-color="#241336"/><stop offset="1" stop-color="#213"/></linearGradient>' +
      '</defs>' +
      '<text style="font-size:42px;fill:#f5f6f8;font-family:var(--bif-font);font-weight:800;letter-spacing:.22em" transform="translate(196.41 78.44)">' +
        '<tspan>BLACK </tspan><tspan style="font-weight:300" x="207.86" y="0">IRIS</tspan><tspan x="314.91" y="0"> </tspan><tspan style="font-weight:500" x="336.58" y="0">FILMS</tspan>' +
      '</text>' +
      '<g clip-path="url(#bif-shell-cp-1)">' +
        '<g clip-path="url(#bif-shell-cp-2)"><rect fill="url(#bif-shell-grad-1)" x="22.55" y="43.41" width="32.95" height="40.15"/></g>' +
        '<g clip-path="url(#bif-shell-cp-3)"><rect fill="url(#bif-shell-grad-2)" x="18.91" y="42.77" width="120.94" height="119.83" transform="translate(-43.44 67.32) rotate(-44.41)"/></g>' +
        '<g clip-path="url(#bif-shell-cp-4)"><rect fill="url(#bif-shell-grad-3)" x="47.13" y="1.08" width="65" height="126.99" transform="translate(19.05 125.18) rotate(-88.73)"/></g>' +
      '</g>' +
    '</svg>';

  var HEADER_HTML =
    '<div class="bif-top-cta">' +
      '<div class="bif-top-cta-inner">' +
        '<span class="bif-top-cta-copy">' +
          '<span class="bif-top-cta-mobile">&#9889; Get your 1-min video pricing estimate</span>' +
          '<span class="bif-top-cta-desktop">&#9889;&#65039; Get your video pricing estimate, tailored to your goals, in 1 minute</span>' +
        '</span>' +
        '<a class="bif-top-cta-link" href="/estimate">Start quiz &longrightarrow;</a>' +
      '</div>' +
    '</div>' +
    '<header class="bif-header">' +
      '<div class="bif-header-inner">' +
        '<a class="bif-logo" href="/" aria-label="Black Iris Films">' + LOGO_SVG + '</a>' +
        '<nav class="bif-nav" aria-label="Site navigation">' +
          '<a class="bif-nav-link" href="/#blog">Learn</a>' +
          '<a class="bif-nav-link" href="/#faq">FAQ</a>' +
          '<div class="bif-services-menu-wrap">' +
            '<button class="bif-services-trigger" type="button" aria-haspopup="true">Services</button>' +
            '<div class="bif-services-menu" aria-label="Services">' + servicesLinks() + '</div>' +
          '</div>' +
          '<a class="bif-nav-link" href="/#portfolio">Work</a>' +
          '<a class="bif-nav-link" href="/why-black-iris-films">About</a>' +
        '</nav>' +
        '<a class="bif-header-cta" href="/contact">Get in touch</a>' +
        '<button class="bif-menu-toggle" type="button" aria-label="Menu" aria-expanded="false" data-bif-menu-toggle>&#9776;</button>' +
      '</div>' +
    '</header>' +
    '<nav class="bif-mobile-menu" aria-label="Mobile navigation" data-bif-mobile-menu>' +
      '<a class="bif-mobile-link" href="/#blog">Learn</a>' +
      '<a class="bif-mobile-link" href="/#faq">FAQ</a>' +
      '<details>' +
        '<summary class="bif-mobile-summary">Services</summary>' +
        '<div class="bif-mobile-services">' + servicesLinks() + '</div>' +
      '</details>' +
      '<a class="bif-mobile-link" href="/#portfolio">Work</a>' +
      '<a class="bif-mobile-link" href="/why-black-iris-films">About</a>' +
      '<a class="bif-mobile-cta" href="/contact">Get in touch</a>' +
    '</nav>';

  function review(text, name) {
    return '<figure class="bif-review">' + STARS +
      '<blockquote>&ldquo;' + text + '&rdquo;</blockquote>' +
      '<figcaption>' + name + '</figcaption></figure>';
  }

  var GOOGLE_HTML =
    '<aside class="bif-google-widget" aria-label="Google reviews widget" data-bif-google-widget>' +
      '<div class="bif-google-panel" data-bif-google-panel>' +
        '<div class="bif-google-panel-head">' +
          '<div class="bif-google-title-group">' +
            '<span class="bif-google-mark-wrap" aria-hidden="true">' + GOOGLE_MARK + '</span>' +
            '<div>' + STARS + '<h2>Black Iris Films reviews</h2></div>' +
          '</div>' +
          '<button class="bif-google-close" type="button" aria-label="Close Google reviews" data-bif-google-close>&times;</button>' +
        '</div>' +
        '<div class="bif-google-reviews">' +
          review("Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative.", "Catherine Allison") +
          review("Working with Black Iris Films for our IllumiaSkin 7+1 LED Face Mask video was a game-changer.", "Jess Smith") +
          review("He captured exciting footage and engaging interviews through warm interactions with the guests.", "Scott Newton") +
        '</div>' +
        '<div class="bif-google-panel-foot">' +
          '<a class="bif-google-profile" href="https://www.google.com/maps/search/?api=1&amp;query=Black%20Iris%20Films%20Sydney%20Australia" target="_blank" rel="noopener noreferrer">View Google profile</a>' +
        '</div>' +
      '</div>' +
      '<button class="bif-google-trigger" type="button" aria-expanded="false" aria-label="Show Google reviews" data-bif-google-trigger>' +
        '<span class="bif-google-mark-wrap" aria-hidden="true">' + GOOGLE_MARK + '</span>' +
        '<span class="bif-google-trigger-copy">' +
          '<span class="bif-stars" aria-hidden="true">' + STAR + STAR + STAR + STAR + STAR + '</span>' +
          '<span class="bif-google-label">Google reviews</span>' +
          '<span class="bif-google-sub" data-bif-google-sub>Read what clients say</span>' +
        '</span>' +
        '<span class="bif-google-chevron" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>' +
        '</span>' +
      '</button>' +
    '</aside>';

  var STICKY_HTML =
    '<aside class="quiz-sticky" aria-label="Pricing quiz" data-bif-quiz-sticky>' +
      '<img class="quiz-sticky-media" src="/assets/sticky-estimate-portrait.png" alt="">' +
      '<div class="quiz-sticky-content">' +
        '<button type="button" class="quiz-sticky-close" aria-label="Hide pricing quiz" data-bif-quiz-close>&times;</button>' +
        '<h3>1-minute video estimate</h3>' +
        '<p>Answer a few quick questions and get a tailored estimate for your video.</p>' +
        '<a href="/estimate/" class="quiz-sticky-link"><span class="quiz-sticky-label">Start quiz</span> <span class="quiz-sticky-arrow" aria-hidden="true">&rarr;</span></a>' +
      '</div>' +
    '</aside>';

  var CALLOUT_HTML =
    '<section class="pricing-callout-section" data-bif-pricing-callout>' +
      '<div class="pricing-callout">' +
        '<div>' +
          '<h2>Get clarity on your video pricing</h2>' +
          '<p>Answer a 1-minute quiz and see a tailored pricing range for your project.</p>' +
        '</div>' +
        '<a href="/estimate/" class="btn-green">Start quiz</a>' +
      '</div>' +
    '</section>';

  var FOOTER_HTML =
    '<footer class="bif-footer">' +
      '<div class="bif-footer-inner">' +
        '<div class="bif-footer-left">' +
          '<nav class="bif-footer-nav" aria-label="Footer navigation">' +
            '<a href="/contact">Contact us</a>' +
            '<a href="/#portfolio">Portfolio</a>' +
            '<a href="/#testimonials">Testimonials</a>' +
            '<a href="/case-studies/">Case Studies</a>' +
            '<a href="/#blog">Blog</a>' +
          '</nav>' +
          '<div class="bif-footer-meta">' +
            '<p>&copy; 2018 - <span data-bif-year>2026</span> Black Iris Films.</p>' +
            '<p>Sydney, Australia</p>' +
            '<p>Video Production Agency</p>' +
            '<p>ABN: 13774120626</p>' +
            '<a class="bif-privacy" href="/privacy-policy">Privacy Policy</a>' +
          '</div>' +
        '</div>' +
        '<div class="bif-footer-right">' +
          '<div class="bif-footer-contact">' +
            '<a href="tel:+610282013504">Contact: (02) 8201 3504</a>' +
            '<a href="mailto:info@blackirisfilms.com?subject=Video%20Enquiry">Email: info@blackirisfilms.com</a>' +
          '</div>' +
          '<div class="bif-socials" aria-label="Social links">' +
            '<a href="https://vimeo.com/blackirisfilms" target="_blank" rel="noopener noreferrer" aria-label="Vimeo"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.404 0-2.59-1.297-3.553-3.892L5.322 11.4C4.603 8.806 3.834 7.508 3.01 7.508c-.179 0-.806.378-1.881 1.132L0 7.226c1.185-1.04 2.355-2.082 3.51-3.124 1.587-1.371 2.777-2.093 3.572-2.165 1.875-.18 3.031 1.106 3.461 3.86.466 2.974.79 4.823.97 5.547.541 2.452 1.137 3.678 1.787 3.678.504 0 1.262-.795 2.273-2.385 1.01-1.59 1.55-2.801 1.622-3.628.144-1.376-.396-2.065-1.622-2.065-.577 0-1.171.131-1.78.394 1.18-3.866 3.434-5.745 6.762-5.638 2.467.073 3.63 1.671 3.493 4.796z"/></svg></a>' +
            '<a href="https://www.facebook.com/blackirisfilms" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z"/></svg></a>' +
            '<a href="https://www.instagram.com/blackirisfilms/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg></a>' +
            '<a href="https://www.youtube.com/channel/UCHmhhExvQyjn5lnbt4m3Wrw" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>' +
            '<a href="https://www.linkedin.com/company/black-iris-films/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
          '</div>' +
          '<p class="bif-partner">Interested in becoming a partner? <a href="/contact"><strong>CLICK HERE</strong></a></p>' +
        '</div>' +
      '</div>' +
    '</footer>';

  ready(function () {
    var body = document.body;
    if (!body || body.hasAttribute("data-bif-shell-mounted")) return;
    body.setAttribute("data-bif-shell-mounted", "");

    var wantSticky = body.getAttribute("data-bif-sticky") !== "off";
    var wantCallout = body.getAttribute("data-bif-callout") !== "off";

    // Header chrome at the very top of the body.
    if (!document.querySelector(".bif-header")) {
      body.insertAdjacentHTML("afterbegin", HEADER_HTML);
    }

    // Tail: pricing callout (optional) immediately before the footer,
    // then the fixed Google widget + sticky CTA (out of flow).
    var tail = "";
    if (wantCallout) tail += CALLOUT_HTML;
    tail += FOOTER_HTML;
    tail += GOOGLE_HTML;
    if (wantSticky) tail += STICKY_HTML;
    body.insertAdjacentHTML("beforeend", tail);

    // Current year.
    var year = document.querySelector("[data-bif-year]");
    if (year) year.textContent = String(new Date().getFullYear());

    // Mobile menu toggle.
    var toggle = document.querySelector("[data-bif-menu-toggle]");
    var menu = document.querySelector("[data-bif-mobile-menu]");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.innerHTML = isOpen ? "&times;" : "&#9776;";
      });
      menu.addEventListener("click", function (event) {
        if (event.target && event.target.tagName === "A") {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.innerHTML = "&#9776;";
        }
      });
    }

    // Google reviews widget.
    var widget = document.querySelector("[data-bif-google-widget]");
    var gTrigger = document.querySelector("[data-bif-google-trigger]");
    var gClose = document.querySelector("[data-bif-google-close]");
    var gSub = document.querySelector("[data-bif-google-sub]");
    function setReviewsOpen(isOpen) {
      if (!widget || !gTrigger) return;
      widget.classList.toggle("is-open", isOpen);
      gTrigger.setAttribute("aria-expanded", String(isOpen));
      gTrigger.setAttribute("aria-label", isOpen ? "Hide Google reviews" : "Show Google reviews");
      if (gSub) gSub.textContent = isOpen ? "Hide reviews" : "Read what clients say";
    }
    if (gTrigger) gTrigger.addEventListener("click", function () {
      setReviewsOpen(!(widget && widget.classList.contains("is-open")));
    });
    if (gClose) gClose.addEventListener("click", function () { setReviewsOpen(false); });

    // Sticky quiz CTA: appears past the halfway scroll point, hides
    // near the pricing callout, stays gone once dismissed.
    if (wantSticky) {
      var sticky = document.querySelector("[data-bif-quiz-sticky]");
      var stickyClose = document.querySelector("[data-bif-quiz-close]");
      var callout = document.querySelector("[data-bif-pricing-callout]");
      var dismissed = false;
      var triggered = false;

      if (stickyClose) stickyClose.addEventListener("click", function () {
        dismissed = true;
        body.classList.remove("show-quiz-sticky");
      });

      function halfway() {
        return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0) * 0.5;
      }
      function update() {
        if (!triggered && window.scrollY >= halfway()) triggered = true;
        var calloutVisible = callout ? callout.getBoundingClientRect().top < window.innerHeight - 80 : false;
        body.classList.toggle("show-quiz-sticky", triggered && !calloutVisible && !dismissed);
      }
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    }
  });
})();
