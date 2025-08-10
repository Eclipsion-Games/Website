import './style.css';

const layers = document.querySelectorAll('[data-speed]');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

if (layers.length) {
  function parallax() {
    const y = window.scrollY;
    layers.forEach((layer) => {
      const speed = prefersReduced.matches ? 0 : parseFloat(layer.dataset.speed);
      layer.style.transform = `translateY(${-y * speed}px)`;
    });
  }

  window.addEventListener('scroll', parallax);
  parallax();
}
