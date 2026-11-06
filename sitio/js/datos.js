// Lo único que hace falta editar para mantener la web al día.

window.API_CONFIG = {
  // WhatsApp con código de país y sin espacios ni signos.
  whatsapp: '59161844664',
  mensaje: 'Hola, vi su portfolio y quiero más información.',
};

// Para añadir un trabajo: copia un bloque y pon sus archivos en media/ con el mismo id.
// etiquetas: drone, edicion (deciden en qué filtros aparece).
// caso: ruta de su página de detalle, si tiene una.
window.API_TRABAJOS = [
  {id: 'sirpita', titulo: 'Lotes en Sirpita', cliente: 'Alfa Urban', dura: '1:10', etiquetas: ['drone', 'edicion'], caso: 'trabajos/lotes-sirpita.html', alt: 'Toma aérea de un lote en Sirpita con su contorno marcado'},
  {id: 'supermall', titulo: 'Departamentos junto al Supermall', cliente: 'Alfa Urban', dura: '0:56', etiquetas: ['drone', 'edicion'], alt: 'Toma aérea de un edificio en la avenida Blanco Galindo'},
  {id: 'santa-rosa', titulo: 'Día 1 · Santa Rosa', cliente: 'Alfa Urban', dura: '1:32', etiquetas: ['edicion'], alt: 'Gráfico de una casa con 309 metros cuadrados de terreno'},
  {id: 'ep03', titulo: 'Ep. 03 · La mansión', cliente: 'Serie «Acompáñame»', dura: '0:57', etiquetas: ['drone'], alt: 'Toma aérea de una mansión con piscina y cancha'},
  {id: 'ep02', titulo: 'Ep. 02 · Fotos urgentes', cliente: 'Serie «Acompáñame»', dura: '0:45', etiquetas: ['drone'], alt: 'Manos con el mando del drone y el drone despegando'},
  {id: 'ep01', titulo: 'Ep. 01 · Sacaba', cliente: 'Serie «Acompáñame»', dura: '0:18', etiquetas: ['drone'], alt: 'Manos sujetando la maleta verde del drone'},
  {id: 'supermall-redes', titulo: 'Supermall para redes', cliente: 'API Inmo', dura: '1:07', etiquetas: ['drone', 'edicion'], alt: 'Grabación del edificio junto al Supermall'},
];

// Vídeos que pasan solos en el inicio, en este orden. Sus clips van en media/historias/.
window.API_HISTORIAS = ['ep03', 'sirpita', 'supermall'];
