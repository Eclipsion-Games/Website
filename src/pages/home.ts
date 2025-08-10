import { mountLayout } from '../lib/layout';
import { initParallax } from '../lib/parallax';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/components.css';

(async () => {
  await mountLayout();
  initParallax({
    heroSelector: '.hero',
    maxShiftPx: 140,  // etwas dramatischer
    maxScale: 1.10
  });
})();
