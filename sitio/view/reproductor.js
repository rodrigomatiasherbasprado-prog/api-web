import {ICONOS} from './iconos.js';

export const Reproductor = () => `
<dialog class="reproductor" aria-label="Reproductor de video">
  <div class="rep-caja">
    <div class="rep-video"><video controls playsinline preload="metadata"></video></div>
    <div class="rep-info">
      <span class="insignia rep-estado"></span>
      <h2 class="rep-titulo"></h2>
      <p class="rep-lugar"></p>
      <p class="rep-explica"></p>
      <strong class="rep-precio"></strong>
      <a class="boton boton-claro rep-whatsapp">${ICONOS.whatsapp}Quiero uno así</a>
      <div class="rep-pasos">
        <button type="button" class="rep-boton" data-paso="-1" aria-label="Video anterior">${ICONOS.izq}</button>
        <button type="button" class="rep-boton" data-paso="1" aria-label="Video siguiente">${ICONOS.der}</button>
      </div>
    </div>
  </div>
  <button type="button" class="rep-boton rep-cerrar" aria-label="Cerrar el video">${ICONOS.cerrar}</button>
</dialog>`;

export const FijoMovil = () => `<a class="boton fijo-movil oculto" data-whatsapp>${ICONOS.whatsapp}Escríbenos por WhatsApp</a>`;
