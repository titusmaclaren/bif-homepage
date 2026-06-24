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
 * A deliberate subset of the portfolio provides the thumbnails, so the
 * homepage reel remains stable even when new Vimeo uploads are published.
 */

import { useEffect, useRef } from "react";
import { useVideoLightbox, type VideoSource } from "./VideoLightbox";
import { PORTFOLIO_ITEMS } from "../data/portfolio";
import { trackEvent } from "../lib/analytics";

// The homepage reel is intentionally curated. Keep this separate from the
// wider portfolio so new Vimeo uploads do not appear here by surprise.
const HERO_VIDEO_IDS = new Set([
  "742487127", "776884299", "1109359009", "1143355482", "1143349142",
  "1111183751", "256497496", "842154532", "1060728418", "860013506",
  "894854950", "700347030", "839000549", "321724289", "558903975",
  "496723120", "295364237", "387582839", "344738613", "706749897",
  "356091891", "137334907", "657351049", "137334669", "846528202",
  "278879520", "689165776", "381263461", "792128309", "1181599954",
  "1181599296", "1065385276", "941172837", "915048133", "1001827462",
  "766366126", "717795825", "680771973",
]);

// Sphere geometry (in the 1920×1080 base canvas).
const R = 1500;
const TILE_W = 520;
const PERSP = 900;
const DEG = Math.PI / 180;
const WORLD_PITCH = 11;
const VISIBLE_ARC_CUTOFF = 0.4;
const PRELOAD_ARC_CUTOFF = 0.16;
const BAND_SPEEDS = [0.060, -0.082, 0.052, -0.074, 0.064, -0.090];
const BAND_LATS = [-30, -18, -6, 6, 18, 30];

type Video = { id: string; title: string; thumb: string };

const INITIAL_VIDEOS: Video[] = PORTFOLIO_ITEMS.filter((p) => HERO_VIDEO_IDS.has(p.vimeoId)).map(
  (p) => ({
    id: p.vimeoId,
    title: p.title,
    thumb: p.thumb,
  }),
);

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
      hoverCount: number;
    };

    const hStep = (latDeg: number) => {
      const rH = R * Math.cos(latDeg * DEG);
      const ang = (2 * Math.atan(TILE_W / 2 / rH)) / DEG;
      return ang + 2.4;
    };

    const bands: Band[] = [];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCompactViewport = window.matchMedia("(max-width: 767px)").matches;
    // The desktop latitude spacing leaves intentional air between six bands.
    // With only three on a phone, use a tighter arc so black gaps do not open
    // up between otherwise full-width cards.
    const activeBandLats = isCompactViewport ? [-11, 0, 11] : BAND_LATS;

    activeBandLats.forEach((latDeg, bi) => {
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
        face.setAttribute("role", "button");
        face.tabIndex = 0;
        face.innerHTML =
          '<img alt="" loading="lazy" decoding="async" fetchpriority="low" draggable="false" width="520" height="292" />' +
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
        hoverCount: 0,
      });
    });

    let videos: Video[] = [];
    let deck: Video[] = [];
    let deckIndex = 0;
    let deckNumber = 0;
    let lastId = "";

    const assign = (t: Tile, v: Video) => {
      t.face.dataset.vid = v.id;
      t.face.dataset.title = v.title;
      t.face.setAttribute("aria-label", `Play ${v.title || "video"}`);
      t.ttl.textContent = v.title || "";
      // Native lazy loading does not reliably understand this 3D scene. Keep
      // initial sources off the DOM until their tiles are approaching the viewer.
      if (t.img.dataset.src !== v.thumb) {
        t.img.dataset.src = v.thumb;
      }
    };

    const nextVideo = (excludedIds = new Set<string>()) => {
      let fallback: Video | undefined;
      for (let attempt = 0; attempt < videos.length; attempt++) {
        if (deckIndex >= deck.length) {
          deckNumber++;
          deck = shuffled(videos, 4242 + deckNumber * 7919);
          if (deck.length > 1 && deck[0].id === lastId) {
            deck = [...deck.slice(1), deck[0]];
          }
          deckIndex = 0;
        }
        const candidate = deck[deckIndex++];
        fallback ??= candidate;
        if (!excludedIds.has(candidate.id)) {
          lastId = candidate.id;
          return candidate;
        }
      }
      return fallback as Video;
    };

    const fillTiles = (list: Video[]) => {
      if (!list || !list.length) return;
      videos = Array.from(new Map(list.map((video) => [video.id, video])).values());
      if (!videos.length) return;
      deck = shuffled(videos, 4242);
      deckIndex = 0;
      deckNumber = 0;
      lastId = "";
      const maxSlots = Math.max(...bands.map((s) => s.tiles.length));

      for (let slot = 0; slot < maxSlots; slot++) {
        for (let bi = 0; bi < bands.length; bi++) {
          const tile = bands[bi].tiles[slot];
          if (tile) assign(tile, nextVideo());
        }
      }
    };

    fillTiles(INITIAL_VIDEOS);

    // Animation loop: spin each band, cull back-hemisphere tiles, fade near the edge.
    let rafId = 0;
    let lastT = performance.now();
    const loadThumbnail = (t: Tile, priority: "high" | "low") => {
      const src = t.img.dataset.src;
      if (!src || t.img.getAttribute("src") === src) return;
      t.img.loading = "eager";
      t.img.fetchPriority = priority;
      t.img.src = src;
    };
    const renderBands = (dt: number) => {
      const tilesInView: Array<{ tile: Tile; c: number }> = [];
      for (const s of bands) {
        const speedMultiplier = !isCompactViewport && s.hoverCount > 0 ? 0.25 : 1;
        s.spin += s.speed * dt * speedMultiplier;
        s.el.style.transform = `rotateY(${s.spin}deg)`;
        for (const t of s.tiles) {
          const a = (t.thetaDeg + s.spin) * DEG;
          const c = Math.cos(a);
          tilesInView.push({ tile: t, c });
        }
      }

      // There are more physical tile positions than curated projects. Give
      // every card that is actually visible a unique video, and refresh a
      // collision while it is still hidden at the edge of the sphere.
      const visibleIds = new Set<string>();
      for (const { tile, c } of tilesInView) {
        if (c < VISIBLE_ARC_CUTOFF) continue;
        if (visibleIds.has(tile.face.dataset.vid || "")) {
          assign(tile, nextVideo(visibleIds));
        }
        if (tile.face.dataset.vid) visibleIds.add(tile.face.dataset.vid);
      }

      for (const { tile, c } of tilesInView) {
        const behind = c < VISIBLE_ARC_CUTOFF;
        if (behind !== tile.el.classList.contains("bif-hero-behind")) {
          tile.el.classList.toggle("bif-hero-behind", behind);
        }
        if (!behind) {
          // Load what is visible first, then quietly warm the next cards.
          loadThumbnail(tile, c > 0.78 ? "high" : "low");
          const o = Math.min(1, (c - VISIBLE_ARC_CUTOFF) / 0.22);
          tile.el.style.opacity = o.toFixed(3);
        } else if (c > PRELOAD_ARC_CUTOFF) {
          loadThumbnail(tile, "low");
        }
      }
    };
    const tick = (now: number) => {
      const dt = Math.min(50, now - lastT) / 16.6667;
      lastT = now;
      renderBands(dt);
      rafId = requestAnimationFrame(tick);
    };
    if (prefersReducedMotion) {
      renderBands(0);
    } else {
      rafId = requestAnimationFrame(tick);
    }

    // Hover: slow the desktop row + zoom-on-face. Uses mouseover/mouseout for proper
    // delegated bubbling without re-firing on internal element transitions.
    const onOver = (e: MouseEvent) => {
      if (isCompactViewport) return;
      const face = (e.target as Element).closest(".bif-hero-face") as HTMLElement | null;
      if (!face) return;
      const fromFace = (e.relatedTarget as Element | null)?.closest?.(".bif-hero-face");
      if (fromFace === face) return;
      const bandEl = face.closest(".bif-hero-band") as HTMLElement | null;
      if (!bandEl) return;
      const s = bands[Number(bandEl.dataset.band)];
      if (fromFace?.closest(".bif-hero-band") !== bandEl) s.hoverCount++;
      face.classList.add("bif-hero-hover");
    };
    const onOut = (e: MouseEvent) => {
      if (isCompactViewport) return;
      const face = (e.target as Element).closest(".bif-hero-face") as HTMLElement | null;
      if (!face) return;
      const related = (e.relatedTarget as Element | null)?.closest?.(".bif-hero-face");
      if (related === face) return;
      const bandEl = face.closest(".bif-hero-band") as HTMLElement | null;
      if (!bandEl) return;
      const s = bands[Number(bandEl.dataset.band)];
      if (related?.closest(".bif-hero-band") !== bandEl) {
        s.hoverCount = Math.max(0, s.hoverCount - 1);
      }
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
      trackEvent("view_reel_click", {
        video_title: video.title,
        vimeo_id: video.vimeoId,
        source: "homepage_hero",
      });
      open(video);
    };
    world.addEventListener("click", onClick);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const face = (e.target as Element).closest(".bif-hero-face") as HTMLElement | null;
      if (!face || !face.dataset.vid) return;
      e.preventDefault();
      face.click();
    };
    world.addEventListener("keydown", onKeyDown);

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
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMove);
    }
    let parallaxId = 0;
    const parallax = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      sphere.style.perspectiveOrigin = `${cx}% ${cy}%`;
      parallaxId = requestAnimationFrame(parallax);
    };
    if (!prefersReducedMotion) {
      parallaxId = requestAnimationFrame(parallax);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (parallaxId) cancelAnimationFrame(parallaxId);
      world.removeEventListener("mouseover", onOver);
      world.removeEventListener("mouseout", onOut);
      world.removeEventListener("click", onClick);
      world.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", fit);
      if (!prefersReducedMotion) {
        window.removeEventListener("mousemove", onMove);
      }
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
            href="/estimate"
          >
            <span>Get a 1-minute estimate</span>
            <span className="bif-hero-arrow" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
