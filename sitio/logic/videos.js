// Sección de videos: pestañas, explicación de precios, 4 videos y «Ver más».
import {CONFIG, VIDEOS} from './datos.js?v=202611121320';
import {conHover, reproducir, ruta, sinMovimiento} from './util.js?v=202611121320';
import {Explica, Tarjeta} from '../view/videos.js?v=202611121320';
import {prepararContacto} from './contacto.js?v=202611121320';
import {abrirVideo} from './reproductor.js?v=202611121320';

const estado = {filtro: 'todos', abierto: false};

const filtrados = () => (estado.filtro === 'todos' ? VIDEOS : VIDEOS.filter((v) => v.estado === estado.filtro));

function pintar(seccion, animar) {
  const rejilla = seccion.querySelector('[data-rejilla]');
  const explica = seccion.querySelector('[data-explica]');
  const verMas = seccion.querySelector('[data-ver-mas]');
  const lista = filtrados();
  const visibles = estado.abierto ? lista : lista.slice(0, CONFIG.porPagina);

  explica.innerHTML = Explica(estado.filtro);
  explica.hidden = estado.filtro === 'todos';
  rejilla.innerHTML = visibles.map(Tarjeta).join('');
  rejilla.classList.toggle('animar', animar);
  prepararContacto(rejilla);
  if (conHover && !sinMovimiento) previsualizar(rejilla);

  const resto = lista.length - CONFIG.porPagina;
  verMas.hidden = resto <= 0;
  verMas.textContent = estado.abierto ? 'Ver menos' : `Ver más videos (${resto})`;

  seccion.querySelectorAll('[data-filtro]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.filtro === estado.filtro)));
  moverFondo(seccion);
}

function moverFondo(seccion) {
  const activa = seccion.querySelector('[data-filtro][aria-selected="true"]');
  const fondo = seccion.querySelector('.pestanas-fondo');
  if (!activa || !fondo) return;
  fondo.style.width = `${activa.offsetWidth}px`;
  fondo.style.transform = `translateX(${activa.offsetLeft}px)`;
}

// En escritorio, al pasar el ratón la tarjeta reproduce un trozo en bucle.
function previsualizar(rejilla) {
  rejilla.querySelectorAll('.tarjeta-marco').forEach((marco) => {
    let vista = null;
    marco.addEventListener('mouseenter', () => {
      vista = document.createElement('video');
      Object.assign(vista, {muted: true, loop: true, playsInline: true, src: ruta('loops', marco.dataset.video)});
      vista.className = 'tarjeta-vista';
      vista.setAttribute('aria-hidden', 'true');
      marco.prepend(vista);
      reproducir(vista);
    });
    marco.addEventListener('mouseleave', () => { if (vista) vista.remove(); vista = null; });
  });
}

export function iniciarVideos() {
  const seccion = document.querySelector('#videos');
  pintar(seccion, false);
  seccion.addEventListener('click', (e) => {
    const pestana = e.target.closest('[data-filtro]');
    if (pestana) {
      estado.filtro = pestana.dataset.filtro;
      estado.abierto = false;
      pintar(seccion, true);
      return;
    }
    if (e.target.closest('[data-ver-mas]')) {
      const abriendo = !estado.abierto;
      estado.abierto = abriendo;
      pintar(seccion, abriendo);
      if (!abriendo) seccion.scrollIntoView({behavior: sinMovimiento ? 'auto' : 'smooth'});
      return;
    }
    const tarjeta = e.target.closest('[data-video]');
    if (tarjeta) abrirVideo(tarjeta.dataset.video, filtrados());
  });
  window.addEventListener('resize', () => moverFondo(seccion));
  document.fonts?.ready.then(() => moverFondo(seccion));
}
