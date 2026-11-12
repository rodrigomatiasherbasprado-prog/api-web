import {ICONOS} from './iconos.js?v=202611121320';
import {bs, nombreEstado, ruta, tituloVideo} from '../logic/util.js?v=202611121320';

// Pestañas: Todos · Editado · Sin editar. Cada una explica qué incluye y cuánto cuesta.
export const Videos = () => `
<section class="seccion" id="videos">
  <div class="seccion-cabeza" data-aparece>
    <span class="kicker">Nuestros trabajos</span>
    <h2 class="titulo">Videos con DRONE</h2>
    <p class="seccion-texto">Así se ven casas, edificios, lotes y terrenos desde el aire. Elige el video <b>editado</b>, listo para publicar, o el material <b>sin editar</b>, tal como sale del DRONE.</p>
  </div>
  <div class="pestanas" role="tablist" aria-label="Tipo de video" data-pestanas>
    <span class="pestanas-fondo" aria-hidden="true"></span>
    <button type="button" role="tab" class="pestana" data-filtro="todos" aria-selected="true">Todos</button>
    <button type="button" role="tab" class="pestana" data-filtro="editado" aria-selected="false">Editado</button>
    <button type="button" role="tab" class="pestana" data-filtro="crudo" aria-selected="false">Sin editar</button>
  </div>
  <div class="explica" data-explica aria-live="polite"></div>
  <div class="rejilla" data-rejilla></div>
  <div class="ver-mas-caja"><button type="button" class="boton boton-linea-negra" data-ver-mas hidden></button></div>
</section>`;

// Qué es cada paquete, en una frase formal y sin precios (los precios están en la sección «Precios»).
export const Explica = (filtro) => {
  if (filtro === 'editado') {
    return `
    <div class="explica-caja explica-negra">
      <span class="explica-etiqueta">Paquete editado</span>
      <h3>Producción completa</h3>
      <p>Planificamos y grabamos las tomas con DRONE, editamos el video con textos y gráficos y entregamos las fotografías aéreas editadas. En lotes, el video muestra ubicación, medidas y entorno.</p>
    </div>`;
  }
  if (filtro === 'crudo') {
    return `
    <div class="explica-caja">
      <span class="explica-etiqueta">Paquete sin editar</span>
      <h3>Material original</h3>
      <p>Grabamos la propiedad con DRONE y entregamos todas las tomas en video y las fotografías aéreas sin edición.</p>
    </div>`;
  }
  return '';
};

export const Tarjeta = (v, i) => `
<article class="tarjeta" style="--i:${i}">
  <button type="button" class="tarjeta-marco" data-video="${v.id}" aria-label="Ver ${tituloVideo(v)}, ${nombreEstado(v.estado).toLowerCase()}">
    <img src="${ruta('posters', v.id)}" alt="${v.alt}" loading="lazy" decoding="async" width="720" height="1280">
    <span class="insignia insignia-${v.estado}">${nombreEstado(v.estado)}</span>
    <span class="tarjeta-play">${ICONOS.play}</span>
    <span class="tarjeta-pie">
      <span class="tarjeta-kicker">Video de DRONE · ${v.dura}</span>
      <span class="tarjeta-titulo">${v.tipo}</span>
      <span class="tarjeta-lugar">${v.lugar}</span>
    </span>
  </button>
  <div class="tarjeta-accion">
    <span class="tarjeta-precio">${bs(v.precio)}</span>
    <a class="boton boton-negro boton-chico" data-whatsapp-video="${v.id}">${ICONOS.whatsapp}Quiero uno así</a>
  </div>
</article>`;
