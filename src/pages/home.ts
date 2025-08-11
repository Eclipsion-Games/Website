import { mountLayout, enableStickyHeader } from '../lib/layout';
import { initParallax } from '../lib/parallax';
import '../styles/base.css';
import '../styles/layout.css';
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
