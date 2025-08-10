async function inject(selector: string, url: string) {
  const host = document.querySelector<HTMLElement>(selector);
  if (!host) return;
  const res = await fetch(url, { cache: 'no-store' });
  host.innerHTML = await res.text();
}

export async function mountLayout() {
  await inject('#site-header', '/partials/header.html');
  await inject('#site-footer', '/partials/footer.html');
}
