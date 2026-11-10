// Inicio: clips de fondo que se funden cada 6 s y palabra del titular que cambia.
import {FONDO_INICIO, PALABRAS} from './datos.js';
import {ahorroDatos, reproducir, ruta, sinMovimiento} from './util.js';

export function iniciarInicio() {
  const fondo = document.querySelector('[data-fondo]');
  const seccion = document.querySelector('.inicio');
  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(seccion);
  }
  const activo = () => visible && !document.hidden;

  // Fondo
  const clips = FONDO_INICIO.map((id, i) => {
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = i === 0 ? 'auto' : 'none';
    v.poster = ruta('posters', id);
    v.className = 'inicio-clip' + (i === 0 ? ' activo' : '');
    if (!sinMovimiento && !ahorroDatos && i === 0) v.src = ruta('historias', id);
    fondo.appendChild(v);
    return {id, v};
  });
  let actual = 0;
  if (!sinMovimiento && !ahorroDatos) {
    reproducir(clips[0].v);
    setInterval(() => {
      if (!activo()) { clips[actual].v.pause(); return; }
      const sig = (actual + 1) % clips.length;
      const c = clips[sig];
      if (!c.v.getAttribute('src')) c.v.src = ruta('historias', c.id);
      c.v.currentTime = 0;
      reproducir(c.v);
      c.v.classList.add('activo');
      clips[actual].v.classList.remove('activo');
      const anterior = clips[actual].v;
      setTimeout(() => anterior.pause(), 900);
      actual = sig;
    }, 6000);
    document.addEventListener('visibilitychange', () => { if (activo()) reproducir(clips[actual].v); });
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
