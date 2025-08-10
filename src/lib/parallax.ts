export function initParallax() {
  const layers = document.querySelectorAll<HTMLElement>('[data-speed]');
  const update = () => {
    const y = window.scrollY;
    layers.forEach(el => {
      const speed = parseFloat(el.dataset.speed || '0');
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}
