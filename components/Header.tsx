import { BOOKING_URL, CONTACT } from "@/lib/links";

/**
 * Quiz-page header. Stripped back from the full site chrome: logo on
 * the left, phone line + "Book Intro Call" on the right. Black
 * background per brand. The wider nav (Learn/FAQ/Services/Work/About)
 * was removed because this is a single-purpose quote tool — every
 * competing link is a funnel leak.
 *
 * Styles live in app/globals.css under the "site-header" and
 * "btn-book-intro" blocks.
 */
export function Header() {
  // Strip everything except digits and leading + so the tel: href works
  // whether CONTACT.phone is formatted with spaces, parens, or a country code.
  const telHref = `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="/"
          className="header-logo"
          aria-label="Black Iris Films"
        >
          <span className="nav-logo-svg" aria-label="Black Iris Films">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 698.93 170.24"
              height="52"
            >
              <defs>
                <style>{`.cls-1{fill:none;}.cls-2{font-size:42px;fill:#f5f6f8;font-family:'Montserrat',Arial,sans-serif;font-weight:800;letter-spacing:0.22em;}.cls-3{font-family:'Montserrat',Arial,sans-serif;font-weight:300;}.cls-3,.cls-5{letter-spacing:0.22em;}.cls-4{letter-spacing:0.22em;}.cls-5{font-family:'Montserrat',Arial,sans-serif;font-weight:500;}.cls-6{clip-path:url(#clip-path);}.cls-7{clip-path:url(#clip-path-2);}.cls-8{fill:url(#linear-gradient);}.cls-9{clip-path:url(#clip-path-3);}.cls-10{fill:url(#linear-gradient-2);}.cls-11{clip-path:url(#clip-path-4);}.cls-12{fill:url(#linear-gradient-3);}`}</style>
                <clipPath id="clip-path" transform="translate(5.74 -17.57)">
                  <rect className="cls-1" width="159.33" height="159.48" />
                </clipPath>
                <clipPath id="clip-path-2" transform="translate(5.74 -17.57)">
                  <path
                    className="cls-1"
                    d="M21.35,63.07c-1.77.56-4.54,3.92-4.54,3.92l.84,26.56a15,15,0,0,0,9.31,6c7.11,1.56,4.9-1.43,22.8-6.78l-.2-27.88C38.63,62,33.25,61,29.78,61s-5.07,1-8.43,2.09"
                  />
                </clipPath>
                <linearGradient
                  id="linear-gradient"
                  x1="-33.17"
                  y1="-139.91"
                  x2="-33.02"
                  y2="-139.91"
                  gradientTransform="matrix(0, -258.5, -258.5, 0, -36127.06, -8491.93)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#131316" />
                  <stop offset="0.5" stopColor="#2c2d2f" />
                  <stop offset="1" stopColor="#131316" />
                </linearGradient>
                <clipPath id="clip-path-3" transform="translate(5.74 -17.57)">
                  <path
                    className="cls-1"
                    d="M19.33,95.43l-1.68-1.88a4.68,4.68,0,0,0,1.68,1.88M27,97.32c-4,0-6.34-.95-7.68-1.89l24.74,27.71c.35.37,2.06,2.3,3.68,2.62a12.67,12.67,0,0,0,4.84,0c2-.62,87-30.13,87-30.13a3.68,3.68,0,0,0,1.53-1.08l0-.34a1.87,1.87,0,0,0-1-.48L97.09,79.29Z"
                  />
                </clipPath>
                <linearGradient
                  id="linear-gradient-2"
                  x1="-31.34"
                  y1="-140.75"
                  x2="-31.18"
                  y2="-140.75"
                  gradientTransform="matrix(819.76, 0, 0, -819.76, 25727.96, -115279.36)"
                  gradientUnits="userSpaceOnUse"
                >
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
                <clipPath id="clip-path-4" transform="translate(5.74 -17.57)">
                  <path
                    className="cls-1"
                    d="M139.49,95.69h0M16.81,67l.79-.9a5.18,5.18,0,0,0-.79.9M42.87,37.16,17.6,66.09c1.22-1.15,4-3,9.41-3.17,10.25-.3,102.39,27.78,112.12,30.71,2.28.69.49,2,.37,2.05a2.61,2.61,0,0,0,2.07-2.74L142.45,66c0-1.92-.43-2.3-2.27-2.89L51.46,33.46c-3.29.26-6.24.88-8.59,3.7"
                  />
                </clipPath>
                <linearGradient
                  id="linear-gradient-3"
                  x1="-29.81"
                  y1="-139.5"
                  x2="-29.66"
                  y2="-139.5"
                  gradientTransform="matrix(0, -832.34, -832.34, 0, -116032.28, -24683.14)"
                  gradientUnits="userSpaceOnUse"
                >
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
              {/* SVG <title> omitted on purpose — browsers render it as a
                  hover tooltip. Accessibility is handled by aria-label on
                  the wrapping anchor and span. */}
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <text className="cls-2" transform="translate(196.41 78.44)">
                    BLACK{" "}
                    <tspan className="cls-3" x="207.86" y="0">
                      IRIS
                    </tspan>
                    <tspan className="cls-4" x="314.91" y="0">
                      {" "}
                    </tspan>
                    <tspan className="cls-5" x="336.58" y="0">
                      FILM
                    </tspan>
                    <tspan className="cls-5" x="469.18" y="0">
                      S
                    </tspan>
                  </text>
                  <g className="cls-6">
                    <g className="cls-7">
                      <rect
                        className="cls-8"
                        x="22.55"
                        y="43.41"
                        width="32.95"
                        height="40.15"
                      />
                    </g>
                    <g className="cls-9">
                      <rect
                        className="cls-10"
                        x="18.91"
                        y="42.77"
                        width="120.94"
                        height="119.83"
                        transform="translate(-43.44 67.32) rotate(-44.41)"
                      />
                    </g>
                    <g className="cls-11">
                      <rect
                        className="cls-12"
                        x="47.13"
                        y="1.08"
                        width="65"
                        height="126.99"
                        transform="translate(19.05 125.18) rotate(-88.73)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
        </a>

        <div className="header-right">
          <span className="header-contact">
            Ready to meet now?{" "}
            <a href={telHref} className="header-contact-phone">
              Call us on {CONTACT.phone}
            </a>
          </span>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-book-intro"
          >
            Book Intro Call
          </a>
        </div>
      </div>
    </header>
  );
}
