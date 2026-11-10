// Todos los botones de contacto abren WhatsApp con un mensaje que dice de dónde viene.
import {CONFIG, PRECIOS, VIDEOS} from './datos.js';
import {enlaceWhatsapp, mensajePlan, mensajeVideo} from './util.js';

function preparar(a, mensaje) {
  a.href = enlaceWhatsapp(mensaje);
  a.target = '_blank';
  a.rel = 'noopener';
}

export function prepararContacto(raiz = document) {
  raiz.querySelectorAll('[data-whatsapp]').forEach((a) => preparar(a, CONFIG.mensaje));
  raiz.querySelectorAll('[data-whatsapp-video]').forEach((a) => {
    const v = VIDEOS.find((x) => x.id === a.dataset.whatsappVideo);
    if (v) preparar(a, mensajeVideo(v));
  });
  raiz.querySelectorAll('[data-whatsapp-plan]').forEach((a) => {
    const p = PRECIOS.find((x) => x.id === a.dataset.whatsappPlan);
    if (p) preparar(a, mensajePlan(p));
  });
}
export {preparar as prepararEnlace};
