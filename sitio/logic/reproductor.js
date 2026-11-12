// Reproductor a pantalla completa con flechas para pasar de video y botón de WhatsApp.
import {PRECIOS, VIDEOS} from './datos.js?v=202611121320';
import {bs, mensajeVideo, nombreEstado, reproducir, ruta, tituloVideo} from './util.js?v=202611121320';
import {prepararEnlace} from './contacto.js?v=202611121320';

let dialogo;
let video;
let lista = VIDEOS;
let actual = null;

const textoEstado = (v) => {
  if (v.estado === 'crudo') return 'Video y fotos aéreas sin editar, tal como salen del DRONE.';
  const extra = v.tipo === 'Lote' ? ' Con los lotes marcados sobre la toma.' : '';
  return `Producción completa: grabación, edición con textos y gráficos, y fotos aéreas editadas.${extra}`;
};

export function abrirVideo(id, enLista) {
  const v = VIDEOS.find((x) => x.id === id);
  if (!v) return;
  if (enLista) lista = enLista;
  actual = v;
  video.poster = ruta('posters', v.id);
  video.src = ruta('videos', v.id);
  video.setAttribute('aria-label', tituloVideo(v));
  const estado = dialogo.querySelector('.rep-estado');
  estado.textContent = nombreEstado(v.estado);
  estado.className = `insignia rep-estado insignia-${v.estado}`;
  dialogo.querySelector('.rep-titulo').textContent = tituloVideo(v);
  dialogo.querySelector('.rep-lugar').textContent = v.lugar;
  dialogo.querySelector('.rep-explica').textContent = textoEstado(v);
  dialogo.querySelector('.rep-precio').textContent = bs(v.precio);
  prepararEnlace(dialogo.querySelector('.rep-whatsapp'), mensajeVideo(v));
  if (!dialogo.open) dialogo.showModal();
  document.documentElement.classList.add('con-reproductor');
  history.replaceState(null, '', `#v=${v.id}`);
  reproducir(video);
}

function limpiar() {
  if (!actual) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
  actual = null;
  document.documentElement.classList.remove('con-reproductor');
  history.replaceState(null, '', location.pathname + location.search);
}
function cerrar() {
  if (dialogo.open) dialogo.close();
  limpiar();
}
function paso(n) {
  const i = lista.indexOf(actual);
  abrirVideo(lista[(i + n + lista.length) % lista.length].id);
}

export function iniciarReproductor() {
  dialogo = document.querySelector('.reproductor');
  video = dialogo.querySelector('video');
  dialogo.addEventListener('close', limpiar);
  dialogo.addEventListener('click', (e) => {
    if (e.target === dialogo || e.target.classList.contains('rep-caja')) cerrar();
    const b = e.target.closest('[data-paso]');
    if (b) paso(Number(b.dataset.paso));
    if (e.target.closest('.rep-cerrar')) cerrar();
  });
  dialogo.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') paso(1);
    if (e.key === 'ArrowLeft') paso(-1);
  });
  const desdeEnlace = () => {
    const m = location.hash.match(/^#v=([\w-]+)$/);
    if (m) abrirVideo(m[1], VIDEOS);
  };
  window.addEventListener('hashchange', desdeEnlace);
  desdeEnlace();
}
