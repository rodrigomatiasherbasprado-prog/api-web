# Web del portfolio de API

La web está en `sitio/`. Es HTML, CSS y JavaScript sin instalación: esa carpeta es lo único que se sube.

## Verla en tu Mac

```bash
node web/portfolio/servidor.mjs
```

Luego abre http://localhost:8096

## Cambiar el WhatsApp

Todos los botones de contacto abren WhatsApp. El número va en `whatsapp`, en `sitio/js/datos.js`, con el código de país y sin espacios. El número visible está escrito en `sitio/index.html` (cierre y aviso `noscript`): cámbialo también ahí.

## Cambiar los vídeos del inicio

`API_HISTORIAS`, en `sitio/js/datos.js`, decide qué trabajos pasan en el inicio y en qué orden. Cada uno necesita su clip de 6 s en `sitio/media/historias/`: elige el archivo y el segundo de inicio en `HISTORIAS`, dentro de `preparar_media.sh`, y ejecuta desde la raíz del proyecto:

```bash
SOLO_HISTORIAS=1 bash web/portfolio/preparar_media.sh
```

## Añadir un trabajo

1. Suma una línea a `LISTA` en `preparar_media.sh` y genera solo ese trabajo desde la raíz del proyecto, cambiando `mi-id` por su `id`:

   ```bash
   SOLO=mi-id bash web/portfolio/preparar_media.sh
   ```

2. Copia un bloque en `API_TRABAJOS` de `sitio/js/datos.js`, con el mismo `id`.

Si ejecutas el script sin `SOLO`, vuelve a generar todos los vídeos.

El script solo reduce tamaño y quita metadatos. No aplica filtros ni retoque de color.

## Enlace directo a un vídeo

Añade `#v=` y el id al final de la dirección, por ejemplo `tudominio.com/#v=sirpita`. Sirve para mandar un vídeo concreto por WhatsApp.

## Publicar cambios

La web se publica sola con GitHub Pages cada vez que se sube un cambio a la rama `main`. El proceso está en `.github/workflows/publicar.yml` y solo publica la carpeta `sitio/`. Tarda uno o dos minutos.

## Pendientes

- Confirma el frente del Lote F de Sirpita: el vídeo y el plano dicen 20,02 m, y el anuncio 19,92 m.
- Cambia el logo de texto por el archivo original.
- Revisa los textos del caso Sirpita y añade los resultados reales: el bloque está comentado en `sitio/trabajos/lotes-sirpita.html`.
- Con el dominio definitivo, añade una imagen para compartir (`og:image`) en `sitio/index.html`.
