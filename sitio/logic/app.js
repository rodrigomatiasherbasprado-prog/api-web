// Arranque: pinta las vistas con los datos y conecta la lógica de cada sección.
import {CONFIG, MARCAS, PAGO, PALABRAS, PRECIOS, RAMAS} from './datos.js?v=202611121320';
import {Cabecera} from '../view/cabecera.js?v=202611121320';
import {Inicio} from '../view/inicio.js?v=202611121320';
import {Videos} from '../view/videos.js?v=202611121320';
import {Precios} from '../view/precios.js?v=202611121320';
import {Marcas} from '../view/marcas.js?v=202611121320';
import {Ramas} from '../view/ramas.js?v=202611121320';
import {Pie} from '../view/pie.js?v=202611121320';
import {FijoMovil, Reproductor} from '../view/reproductor.js?v=202611121320';
import {prepararContacto} from './contacto.js?v=202611121320';
import {iniciarInicio} from './inicio.js?v=202611121320';
import {iniciarVideos} from './videos.js?v=202611121320';
import {iniciarReproductor} from './reproductor.js?v=202611121320';
import {iniciarAnimaciones} from './animaciones.js?v=202611121320';
import {iniciarMarcas} from './marcas.js?v=202611121320';

const app = document.querySelector('#app');
app.innerHTML = [
  Cabecera(),
  '<main>',
  Inicio({palabras: PALABRAS}),
  Videos(),
  Precios(PRECIOS, PAGO),
  Marcas(MARCAS),
  Ramas(RAMAS),
  '</main>',
  Pie(CONFIG.telefono),
  Reproductor(),
  FijoMovil(),
].join('');

prepararContacto();
iniciarReproductor();
iniciarInicio();
iniciarVideos();
iniciarAnimaciones();
iniciarMarcas();
document.documentElement.classList.add('listo');

// Enlace a una sección (apiagencia.com/#precios): las vistas se pintan después de cargar, así que se baja aquí.
const destino = /^#[\w-]+$/.test(location.hash) && document.querySelector(location.hash);
if (destino) requestAnimationFrame(() => destino.scrollIntoView({behavior: 'instant'}));
