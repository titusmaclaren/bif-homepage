"use client";

/**
 * Hero: spherical video mosaic.
 *
 * Ported from the BIF Hero animation handoff. Tiles sit on a single sphere
 * (rotateY × rotateX × translateZ(-R)) inside a 1920×1080 base canvas that
 * cover-fits the viewport. Bands counter-rotate; hover pauses the row and
 * zooms the thumbnail; click opens the shared VideoLightbox so we get the
 * structured info + related cards consistently with the portfolio.
 *
 * The portfolio is used as initial thumbnails (so the mosaic is full and
 * on-brand on first paint); a JSONP call to Vimeo's public feed for user
 * 10691654 then replaces them with the live channel.
 */

import { useEffect, useRef } from "react";
import { useVideoLightbox, type VideoSource } from "./VideoLightbox";
import { PORTFOLIO_ITEMS } from "../data/portfolio";

const VIMEO_USER = "10691654";

// Sphere geometry (in the 1920×1080 base canvas).
const R = 1500;
const TILE_W = 520;
const PERSP = 900;
const DEG = Math.PI / 180;
const WORLD_PITCH = 11;
const BAND_SPEEDS = [0.060, -0.082, 0.052, -0.074, 0.064, -0.090, 0.056];
const BAND_LATS = [-30, -18, -6, 6, 18, 30, 42];

type Video = { id: string; title: string; thumb: string };

const INITIAL_VIDEOS: Video[] = PORTFOLIO_ITEMS.map((p) => ({
  id: p.vimeoId,
  title: p.title,
  thumb: p.thumb,
}));

function mulberry32(seed: number) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  const rng = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Vimeo's default thumb is ~640 wide. Bump to 960 for crispness. Handles
 *  both `..._640?region=us` and legacy `..._640x360.jpg` URLs. */
function biggerThumb(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  return url
    .replace(/_\d{2,4}x\d{2,4}(\.(jpg|webp))/i, "_960$1")
    .replace(/_\d{2,4}(?=(\?|$))/i, "_960");
}

function jsonp(url: string, timeout = 7000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const cb = "bif_cb_" + Math.random().toString(36).slice(2);
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, timeout);
    const cleanup = () => {
      clearTimeout(timer);
      delete (window as unknown as Record<string, unknown>)[cb];
      script.remove();
    };
    (window as unknown as Record<string, unknown>)[cb] = (data: unknown) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("script error"));
    };
    script.src = url + (url.includes("?") ? "&" : "?") + "callback=" + cb;
    document.head.appendChild(script);
  });
}

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const { open } = useVideoLightbox();

  useEffect(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const sphere = sphereRef.current;
    if (!world || !stage || !canvas || !sphere) return;

    // Strict-mode guard: if the world already has tiles, skip rebuild.
    if (world.children.length > 0) return;

    world.style.transform = `rotateX(${WORLD_PITCH}deg) translateZ(${PERSP}px)`;

    type Tile = {
      el: HTMLDivElement;
      face: HTMLDivElement;
      img: HTMLImageElement;
      ttl: HTMLDivElement;
      thetaDeg: number;
    };
    type Band = {
      el: HTMLDivElement;
      tiles: Tile[];
      spin: number;
      speed: number;
      paused: boolean;
      hoverCount: number;
    };

    const hStep = (latDeg: number) => {
      const rH = R * Math.cos(latDeg * DEG);
      const ang = (2 * Math.atan(TILE_W / 2 / rH)) / DEG;
      return ang + 2.4;
    };

    const bands: Band[] = [];

    BAND_LATS.forEach((latDeg, bi) => {
      const bandEl = document.createElement("div");
      bandEl.className = "bif-hero-band";
      bandEl.dataset.band = String(bi);
      world.appendChild(bandEl);

      const stepDeg = hStep(latDeg);
      const count = Math.max(8, Math.round(360 / stepDeg));
      const stagger = (bi % 2) * (stepDeg / 2);
      const speed = BAND_SPEEDS[bi % BAND_SPEEDS.length];

      const tiles: Tile[] = [];
      for (let i = 0; i < count; i++) {
        const theta = i * (360 / count) + stagger;
        const tile = document.createElement("div");
        tile.className = "bif-hero-tile";
        tile.style.transform = `rotateY(${theta}deg) rotateX(${latDeg}deg) translateZ(${-R}px)`;

        const face = document.createElement("div");
        face.className = "bif-hero-face";
        face.innerHTML =
          '<img alt="" loading="eager" decoding="async" draggable="false" />' +
          '<div class="bif-hero-play" aria-hidden="true"></div>' +
          '<div class="bif-hero-ttl"></div>';
        tile.appendChild(face);
        bandEl.appendChild(tile);

        tiles.push({
          el: tile,
          face,
          img: face.querySelector("img") as HTMLImageElement,
          ttl: face.querySelector(".bif-hero-ttl") as HTMLDivElement,
          thetaDeg: theta,
        });
      }

      bands.push({
        el: bandEl,
        tiles,
        spin: (bi * 23) % 360,
        speed,
        paused: false,
        hoverCount: 0,
      });
    });

    const fillTiles = (list: Video[]) => {
      if (!list || !list.length) return;
      const G = shuffled(list, 4242);
      const n = G.length;
      const maxSlots = Math.max(...bands.map((s) => s.tiles.length));
      const usedInBand = bands.map(() => new Set<string>());
      let p = 0;

      const assign = (t: Tile, v: Video) => {
        t.face.dataset.vid = v.id;
        t.face.dataset.title = v.title;
        t.ttl.textContent = v.title || "";
        if (t.img.getAttribute("src") !== v.thumb) t.img.src = v.thumb;
      };

      for (let slot = 0; slot < maxSlots; slot++) {
        for (let bi = 0; bi < bands.length; bi++) {
          const t = bands[bi].tiles[slot];
          if (!t) continue;
          let v: Video | null = null;
          let tries = 0;
          while (tries < n) {
            const cand = G[p % n];
            p++;
            if (!usedInBand[bi].has(cand.id)) {
              v = cand;
              break;
            }
            tries++;
          }
          if (!v) {
            v = G[p % n];
            p++;
          }
          usedInBand[bi].add(v.id);
          assign(t, v);
        }
      }
    };

    fillTiles(INITIAL_VIDEOS);

    // Live Vimeo feed (no-auth public JSONP). Replaces placeholders when it lands.
    // On mobile, keep the curated first set so we avoid a second wave of thumbnail loads.
    let cancelled = false;
    const useLiveVimeoFeed = !window.matchMedia("(max-width: 767px)").matches;
    if (useLiveVimeoFeed) {
      (async () => {
        const out: Video[] = [];
        for (let page = 1; page <= 3; page++) {
          try {
            const data = (await jsonp(
              `https://vimeo.com/api/v2/user${VIMEO_USER}/videos.json?page=${page}`,
            )) as Array<{ id: number | string; title: string; thumbnail_large?: string; thumbnail_medium?: string }>;
            if (cancelled) return;
            if (!Array.isArray(data) || !data.length) break;
            for (const item of data) {
              const thumb = biggerThumb(item.thumbnail_large || item.thumbnail_medium);
              if (item.id && thumb) {
                out.push({ id: String(item.id), title: item.title || "", thumb });
              }
            }
            if (data.length < 20) break;
          } catch {
            break;
          }
        }
        if (!cancelled && out.length) fillTiles(out);
      })();
    }

    // Animation loop: spin each band, cull back-hemisphere tiles, fade near the edge.
    let rafId = 0;
    let lastT = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - lastT) / 16.6667;
      lastT = now;
      for (const s of bands) {
        if (!s.paused) s.spin += s.speed * dt;
        s.el.style.transform = `rotateY(${s.spin}deg)`;
        for (const t of s.tiles) {
          const a = (t.thetaDeg + s.spin) * DEG;
          const c = Math.cos(a);
          const behind = c < 0.16;
          if (behind !== t.el.classList.contains("bif-hero-behind")) {
            t.el.classList.toggle("bif-hero-behind", behind);
          }
          if (!behind) {
            const o = Math.min(1, (c - 0.16) / 0.22);
            t.el.style.opacity = o.toFixed(3);
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Hover: pause the row + zoom-on-face. Uses mouseover/mouseout for proper
    // delegated bubbling without re-firing on internal element transitions.
    const onOver = (e: MouseEvent) => {
      const face = (e.target as Element).closest(".bif-hero-face") as HTMLElement | null;
      if (!face) return;
      const bandEl = face.closest(".bif-hero-band") as HTMLElement | null;
      if (!bandEl) return;
      const s = bands[Number(bandEl.dataset.band)];
      s.hoverCount++;
      s.paused = true;
      face.classList.add("bif-hero-hover");
    };
    const onOut = (e: MouseEvent) => {
      const face = (e.target as Element).closest(".bif-hero-face") as HTMLElement | null;
      if (!face) return;
      const related = (e.relatedTarget as Element | null)?.closest?.(".bif-hero-face");
      const sameBand = related && related.closest(".bif-hero-band") === face.closest(".bif-hero-band");
      const bandEl = face.closest(".bif-hero-band") as HTMLElement | null;
      if (!bandEl) return;
      const s = bands[Number(bandEl.dataset.band)];
      s.hoverCount = Math.max(0, s.hoverCount - 1);
      if (s.hoverCount === 0 && !sameBand) s.paused = false;
      face.classList.remove("bif-hero-hover");
    };
    world.addEventListener("mouseover", onOver);
    world.addEventListener("mouseout", onOut);

    // Click → existing VideoLightbox. If the video is in our portfolio, open
    // with full structured info; otherwise show minimal info plus the first
    // three portfolio items as related so the user has somewhere to go next.
    const onClick = (e: MouseEvent) => {
      const face = (e.target as Element).closest(".bif-hero-face") as HTMLElement | null;
      if (!face || !face.dataset.vid) return;
      const vid = face.dataset.vid;
      const portfolioMatch = PORTFOLIO_ITEMS.find((p) => p.vimeoId === vid);
      const video: VideoSource = portfolioMatch
        ? { ...portfolioMatch }
        : {
            vimeoId: vid,
            title: face.dataset.title || undefined,
            related: PORTFOLIO_ITEMS.slice(0, 3),
          };
      open(video);
    };
    world.addEventListener("click", onClick);

    // Cover-fit the 1920×1080 base canvas to the viewport (no letterbox bars).
    const fit = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const s = Math.max(w / 1920, h / 1080);
      canvas.style.setProperty("--bif-s", String(s));
      canvas.style.setProperty("--bif-tx", `${(w - 1920 * s) / 2}px`);
      canvas.style.setProperty("--bif-ty", `${(h - 1080 * s) / 2}px`);
    };
    fit();
    window.addEventListener("resize", fit);

    // Subtle cursor parallax on the sphere's perspective origin.
    let tx = 50, ty = 50, cx = 50, cy = 50;
    const onMove = (e: MouseEvent) => {
      tx = 50 + (e.clientX / window.innerWidth - 0.5) * 5;
      ty = 50 + (e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener("mousemove", onMove);
    let parallaxId = 0;
    const parallax = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      sphere.style.perspectiveOrigin = `${cx}% ${cy}%`;
      parallaxId = requestAnimationFrame(parallax);
    };
    parallaxId = requestAnimationFrame(parallax);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(parallaxId);
      world.removeEventListener("mouseover", onOver);
      world.removeEventListener("mouseout", onOut);
      world.removeEventListener("click", onClick);
      window.removeEventListener("resize", fit);
      window.removeEventListener("mousemove", onMove);
      world.innerHTML = "";
    };
  }, [open]);

  return (
    <section className="bif-hero" aria-label="Black Iris Films showreel">
      <div ref={stageRef} className="bif-hero-stage">
        <div ref={canvasRef} className="bif-hero-canvas">
          <div ref={sphereRef} className="bif-hero-sphere">
            <div ref={worldRef} className="bif-hero-world" />
          </div>
          <div className="bif-hero-scrim" />
          <div className="bif-hero-vignette" />
          <div className="bif-hero-grain" />
        </div>

        <div className="bif-hero-copy">
          <h1 className="bif-hero-h1">Your customers decide fast. Make it count.</h1>
          <p className="bif-hero-support">
            Emotion-led video production for finance, tech and higher education brands.
          </p>
          <a
            className="bif-hero-cta"
            href="https://quiz.blackirisfilms.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get a 1-minute estimate</span>
            <span className="bif-hero-arrow" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
