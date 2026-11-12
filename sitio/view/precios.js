import {ICONOS} from './iconos.js?v=202611121320';
import {bs} from '../logic/util.js?v=202611121320';

export const Precios = (precios, pago) => `
<section class="seccion seccion-gris" id="precios">
  <div class="seccion-cabeza" data-aparece>
    <span class="kicker">Precios</span>
    <h2 class="titulo">Elige tu paquete</h2>
    <p class="seccion-texto">Todos incluyen fotos aéreas. Lo editado es la producción completa: grabación, edición y fotos editadas.</p>
  </div>
  <div class="planes">
    ${precios.map((p, i) => `
    <article class="plan${p.destacado ? ' plan-destacado' : ''}" data-aparece style="--i:${i}">
      ${p.destacado ? '<span class="plan-cinta">Producción completa</span>' : ''}
      <span class="plan-nombre">${p.nombre}</span>
      <strong class="plan-precio">${bs(p.precio)}</strong>
      <span class="plan-para">${p.para}</span>
      <p class="plan-resumen">${p.resumen}</p>
      <ul class="plan-lista">${p.incluye.map((x) => `<li>${ICONOS.check}${x}</li>`).join('')}</ul>
      <a class="boton ${p.destacado ? 'boton-claro' : 'boton-negro'}" data-whatsapp-plan="${p.id}">${ICONOS.whatsapp}Quiero este</a>
    </article>`).join('')}
  </div>
  <p class="pago" data-aparece>${pago}</p>
</section>`;
