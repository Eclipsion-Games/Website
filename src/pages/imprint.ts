import { mountLayout, enableStickyHeader } from '../lib/layout';
import '../styles/base.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/components.css';

(async () => {
  await mountLayout();
  enableStickyHeader();
})();
