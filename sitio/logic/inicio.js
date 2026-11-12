// Inicio: fotos aéreas de fondo que se funden y palabra del titular que cambia.
import {FONDO_INICIO, PALABRAS} from './datos.js?v=202611121320';
import {sinMovimiento} from './util.js?v=202611121320';

export function iniciarInicio() {
  const fondo = document.querySelector('[data-fondo]');
  const seccion = document.querySelector('.inicio');
  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(seccion);
  }
  const activo = () => visible && !document.hidden;

  // Fondo: fotos que se funden cada 5 s con un acercamiento lento. Cada foto se carga justo antes de mostrarse.
  const fotos = FONDO_INICIO.map((archivo, i) => {
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.className = 'inicio-foto' + (i === 0 ? ' activa' : '');
    if (i < 2) img.src = `media/inicio/${archivo}`;
    fondo.appendChild(img);
    return {archivo, img};
  });
  let actual = 0;
  if (!sinMovimiento) {
    setInterval(() => {
      if (!activo()) return;
      const sig = (actual + 1) % fotos.length;
      const despues = fotos[(sig + 1) % fotos.length];
      if (!despues.img.getAttribute('src')) despues.img.src = `media/inicio/${despues.archivo}`;
      fotos[sig].img.classList.add('activa');
      fotos[actual].img.classList.remove('activa');
      actual = sig;
    }, 5000);
  }

  // Palabra que cambia
  const caja = document.querySelector('[data-rotador]');
  if (!caja || sinMovimiento) return;
  let n = 0;
  setInterval(() => {
    if (!activo()) return;
    n = (n + 1) % PALABRAS.length;
    const vieja = caja.querySelector('.rotador-palabra');
    const nueva = document.createElement('span');
    nueva.className = 'rotador-palabra entra';
    nueva.textContent = PALABRAS[n];
    vieja.classList.add('sale');
    caja.appendChild(nueva);
    setTimeout(() => vieja.remove(), 650);
  }, 2400);
}
