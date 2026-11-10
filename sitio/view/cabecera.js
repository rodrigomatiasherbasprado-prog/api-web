import {LOGO, ICONOS} from './iconos.js';

export const Cabecera = () => `
<header class="cabecera" data-cabecera>
  <a class="logo" href="#inicio" aria-label="API, inicio">${LOGO}</a>
  <nav class="menu" aria-label="Principal">
    <a href="#videos">Videos</a>
    <a href="#precios">Precios</a>
    <a class="boton boton-claro boton-chico" data-whatsapp>${ICONOS.whatsapp}<span>WhatsApp</span></a>
  </nav>
</header>`;
