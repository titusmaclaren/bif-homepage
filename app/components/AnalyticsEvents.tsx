"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

function getInternalPath(anchor: HTMLAnchorElement) {
  const rawHref = anchor.getAttribute("href");
  if (!rawHref) return null;

  try {
    const url = new URL(rawHref, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return `${url.pathname}${url.hash}`;
  } catch {
    return rawHref.startsWith("/") ? rawHref : null;
  }
}

function getLinkText(anchor: HTMLAnchorElement) {
  return anchor.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) || undefined;
}

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const path = getInternalPath(anchor);
      if (!path) return;

      const normalisedPath = path.replace(/\/$/, "");
      const linkText = getLinkText(anchor);

      if (normalisedPath === "/estimate") {
        trackEvent("quote_cta_click", {
          link_text: linkText,
          destination: path,
        });
      }

      if (
        normalisedPath.startsWith("/case-studies/") &&
        normalisedPath !== "/case-studies"
      ) {
        trackEvent("case_study_click", {
          link_text: linkText,
          destination: path,
        });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
