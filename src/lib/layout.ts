async function inject(selector: string, url: string) {
  const host = document.querySelector<HTMLElement>(selector);
  if (!host) return;
  const res = await fetch(url, { cache: 'no-store' });
  // Replace the placeholder node entirely so sticky positioning
  // on injected fragments isn't limited by the temporary wrapper
  host.outerHTML = await res.text();
}

export async function mountLayout() {
  await inject('#site-header', '/partials/header.html');
  await inject('#site-footer', '/partials/footer.html');
}

/** Überwacht .site-header und fügt 'is-stuck' hinzu, sobald sie oben klebt */
export function enableStickyHeader() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;

  // Sentinel vor den Header setzen, um "Ankleben" zu erkennen
  const sentinel = document.createElement('div');
  sentinel.setAttribute('data-sticky-sentinel', '');
  header.parentElement?.insertBefore(sentinel, header);

  const io = new IntersectionObserver(([entry]) => {
    // Wenn der Sentinel aus dem View verschwindet, klebt der Header oben
    const stuck = entry.intersectionRatio === 0;
    header.classList.toggle('is-stuck', stuck);
  }, { threshold: [0] });

  io.observe(sentinel);
}
