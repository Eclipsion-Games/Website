import { mountLayout, enableStickyHeader } from '../lib/layout';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/components.css';

(async () => {
  await mountLayout();
  enableStickyHeader();
})();
