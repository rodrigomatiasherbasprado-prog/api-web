// Carrusel infinito de marcas.
// Antes: una tira CSS muy ancha (30 logos) con máscara, filtro en cada logo y will-change. En el iPhone esa capa
// superaba el tamaño que Safari puede pintar: se quedaba en negro, se trababa y al reiniciar saltaba.
// Ahora: un solo grupo medido de verdad, copiado solo las veces necesarias para cubrir la pantalla, y movido
// píxel a píxel; cuando avanza un grupo entero vuelve al inicio sin que se note. Se para fuera de pantalla.
import {sinMovimiento} from './util.js?v=202611121320';

const VELOCIDAD = 42; // píxeles por segundo

export function iniciarMarcas() {
  const cinta = document.querySelector('[data-cinta]');
  const pista = cinta?.querySelector('[data-pista]');
  if (!pista) return;
  const base = pista.querySelector('.cinta-grupo');
  let ancho = 0;
  let pos = 0;
  let visible = true;
  let encima = false;
  let ultimo = 0;

  function preparar() {
    pista.querySelectorAll('.cinta-grupo[aria-hidden]').forEach((g) => g.remove());
    ancho = base.getBoundingClientRect().width;
    if (!ancho) return;
    const copias = Math.ceil(cinta.clientWidth / ancho) + 1;
    for (let i = 0; i < copias; i += 1) {
      const g = base.cloneNode(true);
      g.setAttribute('aria-hidden', 'true');
      g.querySelectorAll('img').forEach((img) => { img.alt = ''; });
      pista.appendChild(g);
    }
    pos %= ancho;
    pintar();
  }
  function pintar() {
    // Izquierda a derecha: la pista empieza un grupo a la izquierda y avanza hasta volver al mismo punto.
    pista.style.transform = `translate3d(${(pos - ancho).toFixed(2)}px, 0, 0)`;
  }
  function paso(ahora) {
    const dt = Math.min((ahora - ultimo) / 1000, 0.1);
    ultimo = ahora;
    if (ancho && visible && !encima && !document.hidden && !sinMovimiento) {
      pos = (pos + VELOCIDAD * dt) % ancho;
      pintar();
    }
    requestAnimationFrame(paso);
  }

  // Se mide cuando los logos ya cargaron, para que el ancho no cambie a mitad del recorrido.
  const imagenes = [...base.querySelectorAll('img')];
  Promise.all(imagenes.map((img) => (img.complete ? Promise.resolve() : new Promise((ok) => { img.onload = ok; img.onerror = ok; }))))
    .then(() => Promise.all(imagenes.map((img) => (img.decode ? img.decode().catch(() => {}) : null))))
    .then(preparar);

  let espera;
  window.addEventListener('resize', () => { clearTimeout(espera); espera = setTimeout(preparar, 150); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cinta);
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cinta.addEventListener('mouseenter', () => { encima = true; });
    cinta.addEventListener('mouseleave', () => { encima = false; });
  }
  ultimo = performance.now();
  requestAnimationFrame(paso);
}
