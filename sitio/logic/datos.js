// Datos de la web. Es lo único que hace falta editar para mantenerla al día.

export const CONFIG = {
  whatsapp: '59157756942', // con código de país, sin espacios ni signos
  telefono: '+591 57756942',
  // Mensajes de WhatsApp: botones generales, cada video y cada paquete (los de video y paquete se arman en logic/util.js).
  mensaje: 'Hola, vi su web y quiero más información sobre la grabación con DRONE.',
  porPagina: 4, // videos visibles antes de «Ver más»
};

// Precios de API Inmo. «editado» = producción completa (grabación, edición y fotos editadas).
export const PRECIOS = [
  {
    id: 'crudo', nombre: 'Sin editar', precio: 150, para: 'Casas, edificios, lotes y terrenos',
    resumen: 'El material aéreo original, sin procesar, para que lo uses o lo edites a tu manera.',
    incluye: [
      'Vuelo y grabación con DRONE en tu propiedad',
      'Todas las tomas aéreas en video, sin edición',
      'Fotografías aéreas en su versión original',
      'Entrega digital de todo el material',
    ],
  },
  {
    id: 'editado', nombre: 'Editado', precio: 300, para: 'Casas, departamentos y edificios', destacado: true,
    resumen: 'La producción completa: del vuelo al video terminado, listo para tus anuncios y redes.',
    incluye: [
      'Planificación de tomas y grabación con DRONE',
      'Edición profesional con textos y gráficos animados',
      'Video en formato vertical, listo para publicar',
      'Fotografías aéreas editadas',
    ],
  },
  {
    id: 'lotes', nombre: 'Editado · Lotes', precio: 400, para: 'Lotes, loteos y terrenos',
    resumen: 'La producción completa pensada para vender lotes: que el cliente entienda el terreno de un vistazo.',
    incluye: [
      'Todo lo del paquete Editado',
      'Ubicación, medidas y entorno explicados en el video',
      'Lotes resaltados sobre la toma aérea',
      'Fotografías aéreas editadas',
    ],
  },
];
export const PAGO = '50 % para agendar y 50 % después de la grabación.';

// Videos. estado: 'editado' o 'crudo'. precio: el del paquete que muestra.
// Archivos en media/videos, media/loops y media/posters con el mismo id (los prepara preparar_media.sh).
export const VIDEOS = [
  {id: 'sirpita', tipo: 'Lote', lugar: 'Sirpita, Tiquipaya', estado: 'editado', precio: 400, dura: '1:10', alt: 'Toma aérea de lotes con su contorno marcado'},
  {id: 'supermall', tipo: 'Edificio', lugar: 'Av. Blanco Galindo', estado: 'editado', precio: 300, dura: '0:56', alt: 'Toma aérea de un edificio de departamentos'},
  {id: 'casa', tipo: 'Casa', lugar: 'Cochabamba', estado: 'crudo', precio: 150, dura: '0:26', alt: 'Toma aérea de una casa con piscina y cancha'},
  {id: 'terreno', tipo: 'Terreno', lugar: 'Sacaba', estado: 'crudo', precio: 150, dura: '0:22', alt: 'Toma cenital de un terreno entre casas'},
  {id: 'edificio-crudo', tipo: 'Edificio', lugar: 'Av. Blanco Galindo', estado: 'crudo', precio: 150, dura: '0:56', alt: 'Toma aérea en crudo de un edificio'},
  {id: 'lote-crudo', tipo: 'Lote', lugar: 'Sirpita, Tiquipaya', estado: 'crudo', precio: 150, dura: '1:10', alt: 'Toma aérea en crudo de unos lotes'},
];

// Fotos aéreas sin edición que pasan de fondo en el inicio (media/inicio). Sin GPS ni retoque.
export const FONDO_INICIO = ['foto-1.jpg', 'foto-2.jpg', 'foto-3.jpg', 'foto-4.jpg', 'foto-5.jpg', 'foto-6.jpg'];
// Palabras que cambian en el titular.
export const PALABRAS = ['lote', 'casa', 'edificio', 'terreno', 'proyecto'];

// Marcas con las que se ha trabajado. logo: archivo en media/marcas (en blanco); sin logo se escribe el nombre.
export const MARCAS = [
  {nombre: 'Alfa Urban', logo: 'alfa-urban.png'},
  {nombre: 'Century 21 Prime Terranova', logo: 'century21.png'},
  {nombre: 'Inmobiliaria Urkupiña', logo: 'urkupina.png'},
  {nombre: 'Club Always Ready', logo: 'car.png'},
  {nombre: 'Alfa Home', logo: 'alfa-home.png'},
];

export const RAMAS = [
  {nombre: 'API Inmo', icono: 'inmo', activa: true},
  {nombre: 'API Health', icono: 'health'},
  {nombre: 'API Tech', icono: 'tech'},
  {nombre: 'API Business', icono: 'business'},
  {nombre: 'API Commerce', icono: 'commerce'},
  {nombre: 'API Food', icono: 'food'},
];
