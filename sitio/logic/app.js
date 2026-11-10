// Arranque: pinta las vistas con los datos y conecta la lógica de cada sección.
import {CONFIG, MARCAS, PAGO, PALABRAS, PRECIOS, RAMAS} from './datos.js';
import {Cabecera} from '../view/cabecera.js';
import {Inicio} from '../view/inicio.js';
import {Videos} from '../view/videos.js';
import {Precios} from '../view/precios.js';
import {Marcas} from '../view/marcas.js';
import {Ramas} from '../view/ramas.js';
import {Pie} from '../view/pie.js';
import {FijoMovil, Reproductor} from '../view/reproductor.js';
import {prepararContacto} from './contacto.js';
import {iniciarInicio} from './inicio.js';
import {iniciarVideos} from './videos.js';
import {iniciarReproductor} from './reproductor.js';
import {iniciarAnimaciones} from './animaciones.js';

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
document.documentElement.classList.add('listo');

// Enlace a una sección (apiagencia.com/#precios): las vistas se pintan después de cargar, así que se baja aquí.
const destino = /^#[\w-]+$/.test(location.hash) && document.querySelector(location.hash);
if (destino) requestAnimationFrame(() => destino.scrollIntoView({behavior: 'instant'}));
