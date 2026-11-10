// Animaciones al hacer scroll, barra superior y botón fijo del teléfono.
import {sinMovimiento} from './util.js';

export function iniciarAnimaciones() {
  const elementos = document.querySelectorAll('[data-aparece]');
  if (sinMovimiento || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visible'));
  } else {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, {threshold: 0.15, rootMargin: '0px 0px -40px 0px'});
    elementos.forEach((el) => obs.observe(el));
  }

  const cabecera = document.querySelector('[data-cabecera]');
  const alScroll = () => cabecera.classList.toggle('solida', window.scrollY > 40);
  window.addEventListener('scroll', alScroll, {passive: true});
  alScroll();

  // El botón fijo se esconde donde ya hay un botón de WhatsApp a la vista.
  const fijo = document.querySelector('.fijo-movil');
  if (!fijo || !('IntersectionObserver' in window)) return;
  const vistas = new Set();
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? vistas.add(e.target) : vistas.delete(e.target)));
    fijo.classList.toggle('oculto', vistas.size > 0);
  });
  document.querySelectorAll('.inicio, .pie').forEach((z) => obs.observe(z));
}
