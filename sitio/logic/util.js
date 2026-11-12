// Ayudas comunes.
import {CONFIG} from './datos.js?v=202611121320';

export const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const ahorroDatos = Boolean((navigator.connection || {}).saveData);
export const conHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const ruta = (tipo, id) => (tipo === 'posters' ? `media/posters/${id}.jpg` : `media/${tipo}/${id}.mp4`);
export const bs = (n) => `Bs ${n}`;
export const enlaceWhatsapp = (mensaje) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje || CONFIG.mensaje)}`;
export const nombreEstado = (estado) => (estado === 'editado' ? 'Editado' : 'Sin editar');
export const tituloVideo = (v) => `Video de DRONE · ${v.tipo}`;
const articulo = (tipo) => (tipo === 'Casa' ? 'de la' : 'del');
export const mensajeVideo = (v) => `Hola, vi en su web el video ${articulo(v.tipo)} ${v.tipo.toLowerCase()} en ${v.lugar} (${nombreEstado(v.estado).toLowerCase()}) y quisiera uno así.`;
export const mensajePlan = (p) => `Hola, vi su web y quiero más información sobre el paquete ${p.nombre} (${bs(p.precio)}).`;

export function reproducir(video) {
  const intento = video.play();
  if (intento) intento.catch(() => {});
}
