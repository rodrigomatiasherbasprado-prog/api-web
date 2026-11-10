# Web del portfolio de API

La web está en `sitio/`. Es HTML, CSS y JavaScript sin instalación: esa carpeta es lo único que se sube.

## Verla en tu Mac

```bash
node web/portfolio/servidor.mjs
```

Luego abre http://localhost:8096

## Cómo está organizado el código

El código está separado en tres partes, como en una app:

| Carpeta | Qué hay | Cuándo tocarla |
|---|---|---|
| `sitio/style/` | Cómo se ve: un CSS por sección (`base`, `cabecera`, `inicio`, `videos`, `precios`, `marcas`, `ramas`, `pie`, `reproductor`) | Colores, tamaños, animaciones |
| `sitio/view/` | Qué se muestra: una función por sección que devuelve su HTML | Textos fijos y estructura |
| `sitio/logic/` | Cómo funciona: datos, pestañas, «Ver más», reproductor, WhatsApp, animaciones al hacer scroll | Comportamiento |

`sitio/index.html` solo carga los estilos y `logic/app.js`, que pinta las vistas y conecta la lógica.

## Lo que se edita a diario: `sitio/logic/datos.js`

- `CONFIG`: WhatsApp, número visible y cuántos videos se ven antes de «Ver más» (4).
- `PRECIOS`: los tres paquetes (Sin editar Bs 150, Editado Bs 300, Editado lotes Bs 400) y qué incluye cada uno.
- `VIDEOS`: solo videos de DRONE. `tipo` es lo que se muestra (Lote, Casa, Edificio, Terreno), `estado` es `editado` o `crudo`.
- `FONDO_INICIO`: fotos aéreas sin edición que pasan de fondo en el inicio (`media/inicio/`).
- `PALABRAS`: palabras que cambian en el titular.
- `MARCAS`: logos en blanco con fondo transparente en `media/marcas/`.
- `RAMAS`: la activa (`activa: true`) sale en negro; el resto, en plomo «Próximamente».

## Añadir un video

1. Suma una línea a `LISTA` en `preparar_media.sh` y genera solo ese video desde la raíz del proyecto, cambiando `mi-id` por su `id`:

   ```bash
   SOLO=mi-id bash web/portfolio/preparar_media.sh
   ```

2. Copia un bloque en `VIDEOS` de `sitio/logic/datos.js`, con el mismo `id`.

Si ejecutas el script sin `SOLO`, vuelve a generar todos los vídeos. El script solo reduce tamaño y quita metadatos. No aplica filtros ni retoque de color.

## Cambiar las fotos del inicio

El inicio pasa fotos aéreas **sin edición** (`media/inicio/`). Elige los archivos en `FOTOS`, dentro de `preparar_media.sh`, ponlos en `FONDO_INICIO` y ejecuta:

```bash
SOLO_FOTOS=1 bash web/portfolio/preparar_media.sh
```

## Logo

El logo es «api» en Poppins ExtraBold convertido a trazos. Los archivos están en `branding/logo-api-negro.svg` y `branding/logo-api-blanco.svg`. En la web va dentro del HTML para que tome el color de la barra.

## Enlace directo a un vídeo

Añade `#v=` y el id al final de la dirección, por ejemplo `apiagencia.com/#v=sirpita`. Sirve para mandar un vídeo concreto por WhatsApp.

## Publicar cambios

Web: https://apiagencia.com/
Repositorio: https://github.com/rodrigomatiasherbasprado-prog/api-web

La web se publica sola con GitHub Pages cada vez que se sube un cambio a la rama `main`. El proceso está en `.github/workflows/publicar.yml` y solo publica la carpeta `sitio/`. Tarda uno o dos minutos. Desde `web/portfolio/`:

```bash
git add -A
git commit -m "Describe el cambio"
git push
```

El historial de git está en `~/.api-web.git`, fuera de iCloud, para que no se corrompa. En otro ordenador basta con clonar el repositorio. Los vídeos originales no están en el repositorio: `preparar_media.sh` los toma del proyecto completo.

## Dominio

`apiagencia.com` está comprado en Cloudflare, con renovación anual. Sus registros DNS apuntan a GitHub Pages y deben quedarse en «DNS only», sin proxy.

## Pendientes

- Revisa los textos del caso Sirpita y añade los resultados reales: el bloque está comentado en `sitio/trabajos/lotes-sirpita.html`.
