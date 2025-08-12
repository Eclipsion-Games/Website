// Firewatch-ähnlicher Multi-Layer-Parallax mit rAF, Depth, Fog & Sun
export type Options = {
  heroSelector?: string;       // Section mit den Parallax-Layern
  maxShiftPx?: number;         // wie weit die nahen Layer vertikal wandern
  maxScale?: number;           // wie stark nahe Layer skalieren (nur .layer)
  ease?: (t: number) => number;
};

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export class Parallax {
  private nodes: HTMLElement[];   // alle [data-depth] außer [data-fixed]
  private sun?: HTMLElement;
  private fog?: HTMLElement;
  private heroTop = 0;
  private heroHeight = 1;
  private ticking = false;

  constructor(private hero: HTMLElement, private opts: Required<Options>) {
    // Zielknoten: alles mit data-depth, aber NICHT data-fixed
    this.nodes = Array.from(
      hero.querySelectorAll<HTMLElement>('[data-depth]:not([data-fixed])')
    );
    this.sun = hero.querySelector<HTMLElement>('[data-sun]') || undefined;
    this.fog = hero.querySelector<HTMLElement>('[data-fog]') || undefined;

    // Sicherheits-Cleanup: alte Inline-Transforms im Hero entfernen
    hero.querySelectorAll<HTMLElement>('.layer, [data-depth], [data-sun], [data-fog]')
        .forEach(el => { el.style.transform = ''; el.style.willChange = ''; });

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);

    this.measure();
    this.update();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize);
  }

  private measure() {
    const rect = this.hero.getBoundingClientRect();
    this.heroTop = window.scrollY + rect.top;
    this.heroHeight = Math.max(this.hero.offsetHeight, window.innerHeight * 0.6);
  }

  private update() {
    this.ticking = false;
    const y = window.scrollY - this.heroTop;
    const progress = clamp(y / this.heroHeight, 0, 1);
    const t = this.opts.ease(progress);

    for (const el of this.nodes) {
      const d = parseFloat(el.dataset.depth || '0.5');
      const shift = this.opts.maxShiftPx * d * t;

      if (el.classList.contains('layer')) {
        // Nur Grafik-Layer skalieren
        const sc = lerp(1, lerp(1, this.opts.maxScale, d), t);
        el.style.transform = `translate3d(0, ${shift}px, 0) scale(${sc})`;
        el.style.willChange = 'transform';
      } else {
        // Text/Overlay: nur verschieben
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
        el.style.willChange = 'transform';
      }
    }

    // Sonne sanft bewegen
    if (this.sun) {
      const sx = lerp(0, 24, t);
      const sy = lerp(0, -36, t);
      const sScale = lerp(1, 0.98, t);
      this.sun.style.transform = `translate3d(${sx}px, ${sy}px, 0) scale(${sScale})`;
    }

    // Nebel einblenden
    if (this.fog) {
      const op = clamp(lerp(0, 0.8, t));
      this.fog.style.opacity = String(op);
    }
  }

  private onScroll() {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  }

  private onResize() {
    this.measure();
    this.update();
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}

export function initParallax(opts: Options = {}) {
  const { heroSelector = '.hero', maxShiftPx = 120, maxScale = 1.08, ease = easeOutCubic } = opts;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  const hero = document.querySelector<HTMLElement>(heroSelector);
  if (!hero) return;
  return new Parallax(hero, { heroSelector, maxShiftPx, maxScale, ease });
}
