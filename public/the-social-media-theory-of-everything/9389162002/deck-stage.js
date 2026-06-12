class DeckStage extends HTMLElement {
  constructor() {
    super();
    this.index = 0;
    this.slides = [];
    this.aspectWidth = 1920;
    this.aspectHeight = 1080;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.wheelLocked = false;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.initialize = this.initialize.bind(this);
    this.initialized = false;
  }

  connectedCallback() {
    this.parseAspect();
    this.installBaseStyles();
    this.installControls();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.initialize, { once: true });
    } else {
      this.initialize();
    }
  }

  disconnectedCallback() {
    document.removeEventListener('DOMContentLoaded', this.initialize);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('resize', this.onResize);
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('wheel', this.onWheel);
    this.removeEventListener('touchstart', this.onTouchStart);
    this.removeEventListener('touchend', this.onTouchEnd);
  }

  initialize() {
    if (this.initialized) return;

    this.slides = Array.from(this.querySelectorAll('section'));
    if (!this.slides.length) {
      window.setTimeout(this.initialize, 0);
      return;
    }

    this.initialized = true;
    this.index = this.getInitialIndex();

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('resize', this.onResize);
    this.addEventListener('click', this.onClick);
    this.addEventListener('wheel', this.onWheel, { passive: false });
    this.addEventListener('touchstart', this.onTouchStart, { passive: true });
    this.addEventListener('touchend', this.onTouchEnd, { passive: true });
    this.render();
  }

  parseAspect() {
    const aspect = this.getAttribute('aspect') || '16/9';
    const [w, h] = aspect.split('/').map((part) => Number.parseFloat(part));
    if (w > 0 && h > 0) {
      this.aspectWidth = 1920;
      this.aspectHeight = Math.round((this.aspectWidth * h) / w);
    }
  }

  installBaseStyles() {
    if (document.getElementById('deck-stage-runtime-styles')) return;
    const style = document.createElement('style');
    style.id = 'deck-stage-runtime-styles';
    style.textContent = `
      deck-stage {
        display: block;
        position: relative;
        width: 100vw;
        height: 100vh;
        min-height: 100vh;
        overflow: hidden;
        background: var(--deck-bg, #000);
      }

      deck-stage > section {
        transform-origin: top left;
      }

      @media print {
        deck-stage {
          width: auto;
          height: auto;
          overflow: visible;
        }

        deck-stage > section,
        deck-stage > section.is-active {
          position: relative !important;
          display: block;
          transform: none !important;
          page-break-after: always;
        }
      }
    `;
    document.head.appendChild(style);
  }

  installControls() {
    if (this.shadowRoot) return;
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { pointer-events: auto; }
        slot { display: block; }
        .counter {
          position: fixed;
          right: 22px;
          bottom: 18px;
          z-index: 20;
          color: rgba(255,255,255,0.72);
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 8px 12px;
          font: 600 12px/1.1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          letter-spacing: 0.08em;
          user-select: none;
          backdrop-filter: blur(10px);
        }
        .nav {
          position: fixed;
          top: 50%;
          z-index: 21;
          width: 48px;
          height: 64px;
          transform: translateY(-50%);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 6px;
          background: rgba(0,0,0,0.38);
          color: rgba(255,255,255,0.86);
          font: 400 38px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          cursor: pointer;
          user-select: none;
          backdrop-filter: blur(10px);
        }
        .nav:hover {
          background: rgba(232,184,47,0.92);
          color: #0b1120;
        }
        .nav:focus-visible {
          outline: 2px solid #e8b82f;
          outline-offset: 3px;
        }
        .nav:disabled {
          opacity: 0.25;
          cursor: default;
        }
        .nav:disabled:hover {
          background: rgba(0,0,0,0.38);
          color: rgba(255,255,255,0.86);
        }
        .prev { left: 18px; }
        .next { right: 18px; }
        @media (max-width: 720px) {
          .nav {
            top: auto;
            bottom: 18px;
            width: 44px;
            height: 44px;
            transform: none;
            font-size: 30px;
          }
          .prev { left: 16px; }
          .next { right: 72px; }
          .counter { right: 16px; bottom: 70px; }
        }
      </style>
      <slot></slot>
      <button class="nav prev" type="button" aria-label="Previous page" title="Previous page">‹</button>
      <button class="nav next" type="button" aria-label="Next page" title="Next page">›</button>
      <div class="counter" part="counter" aria-live="polite"></div>
    `;
    this.counter = shadow.querySelector('.counter');
    this.prevButton = shadow.querySelector('.prev');
    this.nextButton = shadow.querySelector('.next');
    this.prevButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.go(-1);
    });
    this.nextButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.go(1);
    });
  }

  getInitialIndex() {
    const params = new URLSearchParams(window.location.search);
    const slideParam = params.get('slide') || params.get('page');
    const hashMatch = window.location.hash.match(/(?:slide|page)?-?(\d+)/i);
    const requested = Number.parseInt(slideParam || (hashMatch ? hashMatch[1] : ''), 10);

    if (Number.isFinite(requested)) {
      return Math.min(Math.max(requested - 1, 0), this.slides.length - 1);
    }

    return 0;
  }

  onKeyDown(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;

    const key = event.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(key)) {
      event.preventDefault();
      this.go(1);
    } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(key)) {
      event.preventDefault();
      this.go(-1);
    } else if (key === 'Home') {
      event.preventDefault();
      this.setIndex(0);
    } else if (key === 'End') {
      event.preventDefault();
      this.setIndex(this.slides.length - 1);
    } else if (key.toLowerCase() === 'r') {
      event.preventDefault();
      this.setIndex(0);
    }
  }

  onResize() {
    this.render();
  }

  onClick(event) {
    if (event.composedPath().some((node) => node && node.closest && node.closest('a, button, input, textarea, select'))) return;
    const x = event.clientX;
    if (x > window.innerWidth * 0.68) this.go(1);
    if (x < window.innerWidth * 0.32) this.go(-1);
  }

  onWheel(event) {
    if (this.wheelLocked || Math.abs(event.deltaY) < 24) return;
    event.preventDefault();
    this.wheelLocked = true;
    this.go(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      this.wheelLocked = false;
    }, 420);
  }

  onTouchStart(event) {
    const touch = event.changedTouches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  onTouchEnd(event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    this.go(deltaX < 0 ? 1 : -1);
  }

  go(delta) {
    this.setIndex(this.index + delta);
  }

  setIndex(nextIndex) {
    if (!this.slides.length) return;
    this.index = Math.min(Math.max(nextIndex, 0), this.slides.length - 1);
    this.render();
  }

  render() {
    if (!this.slides.length) return;

    const scale = Math.min(window.innerWidth / this.aspectWidth, window.innerHeight / this.aspectHeight);
    const left = Math.max((window.innerWidth - this.aspectWidth * scale) / 2, 0);
    const top = Math.max((window.innerHeight - this.aspectHeight * scale) / 2, 0);

    this.slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === this.index;
      slide.style.display = isActive ? 'block' : 'none';
      slide.style.position = 'absolute';
      slide.style.top = '0';
      slide.style.left = '0';
      slide.style.transformOrigin = 'top left';
      slide.style.transform = isActive ? `translate(${left}px, ${top}px) scale(${scale})` : 'none';
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    if (this.counter) {
      this.counter.textContent = `${String(this.index + 1).padStart(2, '0')} / ${String(this.slides.length).padStart(2, '0')}`;
    }

    if (this.prevButton) this.prevButton.disabled = this.index === 0;
    if (this.nextButton) this.nextButton.disabled = this.index === this.slides.length - 1;
  }
}

customElements.define('deck-stage', DeckStage);
