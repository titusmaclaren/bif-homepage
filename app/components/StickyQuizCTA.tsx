"use client";

import { useEffect, useRef, useState } from "react";

export function StickyQuizCTA() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    function getHalfwayScrollPoint() {
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      return scrollableHeight * 0.4;
    }

    function updateSticky() {
      if (!triggeredRef.current && window.scrollY >= getHalfwayScrollPoint()) {
        triggeredRef.current = true;
      }

      const pricingCallout = document.querySelector(".pricing-callout-section");
      const pricingVisible = pricingCallout
        ? pricingCallout.getBoundingClientRect().top < window.innerHeight - 80
        : false;

      setVisible(triggeredRef.current && !pricingVisible && !dismissed);
    }

    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    window.addEventListener("resize", updateSticky);

    return () => {
      window.removeEventListener("scroll", updateSticky);
      window.removeEventListener("resize", updateSticky);
    };
  }, [dismissed]);

  return (
    <aside
      className={`quiz-sticky ${visible ? "quiz-sticky-visible" : ""}`}
      aria-label="Pricing quiz"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="quiz-sticky-media"
        src="/blog/estimate-lightbulb.jpg"
        alt=""
      />
      <div className="quiz-sticky-content">
        <button
          type="button"
          className="quiz-sticky-close"
          aria-label="Hide pricing quiz"
          onClick={() => setDismissed(true)}
        >
          &times;
        </button>
        <h3>1-minute video estimate</h3>
        <p>
          Answer a few quick questions and get a tailored estimate for your
          video.
        </p>
        <a href="/estimate/" className="quiz-sticky-link">
          <span className="quiz-sticky-label">Start quiz</span>
          <span className="quiz-sticky-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </aside>
  );
}
