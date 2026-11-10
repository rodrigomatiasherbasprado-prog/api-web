import {ICONOS} from './iconos.js';

// Inicio: clips de DRONE de fondo y titular con la palabra que cambia.
export const Inicio = ({palabras}) => `
<section class="inicio" id="inicio">
  <div class="inicio-fondo" data-fondo aria-hidden="true"></div>
  <div class="inicio-velo" aria-hidden="true"></div>
  <div class="inicio-contenido">
    <h1 class="inicio-titulo" data-aparece>
      <span class="linea">Tu <span class="rotador" data-rotador aria-live="polite"><span class="rotador-palabra">${palabras[0]}</span></span></span>
      <span class="linea">desde el aire.</span>
    </h1>
    <p class="inicio-texto" data-aparece>Grabamos tu propiedad con DRONE y te la entregamos editada, lista para vender, o en crudo.</p>
    <div class="inicio-botones" data-aparece>
      <a class="boton boton-claro" href="#videos">Ver videos ${ICONOS.abajo}</a>
      <a class="boton boton-linea" data-whatsapp>${ICONOS.whatsapp}Escríbenos</a>
    </div>
  </div>
</section>`;
