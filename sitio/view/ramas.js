import {ICONOS} from './iconos.js?v=202611121320';

export const Ramas = (ramas) => `
<section class="seccion seccion-sin-arriba" id="ramas" aria-labelledby="titulo-ramas">
  <div class="seccion-cabeza seccion-cabeza-fila" data-aparece>
    <h2 class="titulo-medio" id="titulo-ramas">Un ecosistema de marcas</h2>
    <p class="seccion-texto">Cada rubro comunica distinto. Por eso API se divide en ramas especializadas.</p>
  </div>
  <div class="ramas">
    ${ramas.map((r, i) => `
    <div class="rama${r.activa ? ' rama-activa' : ''}" data-aparece style="--i:${i}">
      ${ICONOS[r.icono]}
      <span class="rama-nombre">${r.nombre}</span>
      <span class="rama-estado">${r.activa ? '<i></i>Activo' : 'Próximamente'}</span>
    </div>`).join('')}
  </div>
</section>`;
