// Firewatch-ähnlicher Multi-Layer-Parallax mit rAF, Depth, Fog & Sun
type Options = {
  heroSelector?: string;       // Section mit den Parallax-Layern
  maxShiftPx?: number;         // wie weit die nahen Layer vertikal wandern
  maxScale?: number;           // wie stark nahe Layer skalieren
  ease?: (t: number) => number;
};

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function initParallax(opts: Options = {}) {
  const {
    heroSelector = '.hero',
    maxShiftPx = 120,
    maxScale = 1.08,
    ease = easeOutCubic
  } = opts;

  // Respektiere Bewegungs-Reduktion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const hero = document.querySelector<HTMLElement>(heroSelector);
  if (!hero) return;

  const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-depth]'));
  const sun = hero.querySelector<HTMLElement>('[data-sun]');
  const fog = hero.querySelector<HTMLElement>('[data-fog]');

  let heroTop = 0;
  let heroHeight = 1;

  const measure = () => {
    const rect = hero.getBoundingClientRect();
    // offset relativ zum Dokument-Top:
    heroTop = window.scrollY + rect.top;
    heroHeight = Math.max(hero.offsetHeight, window.innerHeight * 0.6);
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY - heroTop;
    // scrollFortschritt nur über dem Hero messen
    const progress = clamp(y / heroHeight, 0, 1);
    const t = ease(progress);

    // Layers: near (depth≈1) bewegt mehr, far (depth≈0.1) nur wenig
    for (const el of layers) {
      const d = parseFloat(el.dataset.depth || '0.5'); // 0.05..1
      const shift = -maxShiftPx * d * t;               // nach oben
      const sc = lerp(1, lerp(1, maxScale, d), t);     // nahe Layer skalieren mehr
      el.style.transform = `translate3d(0, ${shift}px, 0) scale(${sc})`;
      el.style.willChange = 'transform';
    }

    // Sonne: leicht hoch und minimal nach rechts
    if (sun) {
      const sx = lerp(0, 24, t);
      const sy = lerp(0, -36, t);
      const sScale = lerp(1, 0.98, t);
      sun.style.transform = `translate3d(${sx}px, ${sy}px, 0) scale(${sScale})`;
    }

    // Dunst/Fog: blende stärker ein je weiter gescrollt
    if (fog) {
      const op = clamp(lerp(0, 0.8, t));
      fog.style.opacity = String(op);
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  const onResize = () => {
    measure();
    update();
  };

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
}
