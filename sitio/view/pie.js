import {LOGO, ICONOS} from './iconos.js';

// Cierre con llamada a la acción y barra animada con «API · Contáctanos · número».
export const Pie = (telefono) => {
  const tramo = `<span class="ticker-tramo">${LOGO}<span>Contáctanos</span><i></i><span>${telefono}</span><i></i></span>`;
  return `
<footer class="pie" id="contacto">
  <div class="pie-cierre" data-aparece>
    <h2>¿Grabamos lo tuyo?</h2>
    <p>Escríbenos y agendamos la grabación con DRONE.</p>
    <a class="boton boton-claro boton-grande" data-whatsapp>${ICONOS.whatsapp}Escríbenos por WhatsApp</a>
  </div>
  <a class="ticker" data-whatsapp aria-label="Contáctanos por WhatsApp al ${telefono}">
    <span class="ticker-pista">${tramo.repeat(6)}</span>
    <span class="ticker-pista" aria-hidden="true">${tramo.repeat(6)}</span>
  </a>
  <div class="pie-legal"><span>© ${new Date().getFullYear()} API · Cochabamba, Bolivia</span><a data-whatsapp>${telefono}</a></div>
</footer>`;
};
