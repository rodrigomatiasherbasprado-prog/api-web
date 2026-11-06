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

## Logo

El logo es «api» en Poppins ExtraBold convertido a trazos. Los archivos están en `branding/logo-api-negro.svg` y `branding/logo-api-blanco.svg`. En la web va dentro del HTML para que tome el color de la barra.

## Enlace directo a un vídeo

Añade `#v=` y el id al final de la dirección, por ejemplo `tudominio.com/#v=sirpita`. Sirve para mandar un vídeo concreto por WhatsApp.

## Publicar cambios

Web: https://rodrigomatiasherbasprado-prog.github.io/api-web/
Repositorio: https://github.com/rodrigomatiasherbasprado-prog/api-web

La web se publica sola con GitHub Pages cada vez que se sube un cambio a la rama `main`. El proceso está en `.github/workflows/publicar.yml` y solo publica la carpeta `sitio/`. Tarda uno o dos minutos. Desde `web/portfolio/`:

```bash
git add -A
git commit -m "Describe el cambio"
git push
```

El historial de git está en `~/.api-web.git`, fuera de iCloud, para que no se corrompa. En otro ordenador basta con clonar el repositorio. Los vídeos originales no están en el repositorio: `preparar_media.sh` los toma del proyecto completo.

## Pendientes

- Revisa los textos del caso Sirpita y añade los resultados reales: el bloque está comentado en `sitio/trabajos/lotes-sirpita.html`.
- Con el dominio definitivo, cambia la dirección de `og:url` y `og:image` en `sitio/index.html`.
