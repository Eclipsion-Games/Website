import { mountLayout, enableStickyHeader } from '../lib/layout';
import { initParallax } from '../lib/parallax';
import '../styles/base.css';
import '../styles/header.css';
import '../styles/grid.css';
import '../styles/footer.css';
import '../styles/hero.css';
import '../styles/landing.css';
import '../styles/components.css';
import '../styles/cards.css';

(async () => {
  await mountLayout();
  enableStickyHeader();  // <— sticky Navi aktiv
  initParallax({
    heroSelector: '.hero',
    maxShiftPx: 140,
    maxScale: 1.10
  });
})();
