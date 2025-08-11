import { mountLayout, enableStickyHeader } from './layout';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/components.css';

export async function bootstrapPage(options: { parallax?: boolean } = {}) {
  await mountLayout();
  enableStickyHeader();
  if (options.parallax) {
    const { initParallax } = await import('./parallax');
    initParallax({
      heroSelector: '.hero',
      maxShiftPx: 140,
      maxScale: 1.10
    });
  }
}
