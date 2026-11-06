// Servidor local para probar la web, con soporte para avanzar y retroceder en los vídeos.
// Uso, desde la raíz del proyecto: node web/portfolio/servidor.mjs
import {createServer} from 'node:http';
import {createReadStream, statSync} from 'node:fs';
import {dirname, extname, join, normalize, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), 'sitio');
const PUERTO = 8096;
const TIPOS = {'.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8'};

createServer((req, res) => {
  let ruta;
  try {
    ruta = normalize(join(RAIZ, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)));
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (ruta !== RAIZ && !ruta.startsWith(RAIZ + sep)) {
    res.writeHead(403).end();
    return;
  }
  let info;
  try {
    info = statSync(ruta);
    if (info.isDirectory()) {
      ruta = join(ruta, 'index.html');
      info = statSync(ruta);
    }
  } catch {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'}).end('No encontrado');
    return;
  }
  const cabeceras = {'Content-Type': TIPOS[extname(ruta)] ?? 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache'};
  const rango = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
  if (rango && (rango[1] || rango[2])) {
    const inicio = rango[1] ? Number(rango[1]) : Math.max(0, info.size - Number(rango[2]));
    const fin = rango[1] && rango[2] ? Math.min(Number(rango[2]), info.size - 1) : info.size - 1;
    if (inicio > fin) {
      res.writeHead(416, {'Content-Range': `bytes */${info.size}`}).end();
      return;
    }
    res.writeHead(206, {...cabeceras, 'Content-Range': `bytes ${inicio}-${fin}/${info.size}`, 'Content-Length': fin - inicio + 1});
    createReadStream(ruta, {start: inicio, end: fin}).pipe(res);
    return;
  }
  res.writeHead(200, {...cabeceras, 'Content-Length': info.size});
  createReadStream(ruta).pipe(res);
}).listen(PUERTO, () => console.log(`Web lista en http://localhost:${PUERTO}`));
