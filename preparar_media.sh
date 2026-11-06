#!/bin/bash
# Prepara los vídeos del portfolio para la web sin tocar las entregas originales.
# Solo reduce tamaño: sin filtros ni retoque de color. Quita los metadatos (GPS, cámara).
# Uso, desde la raíz del proyecto: bash web/portfolio/preparar_media.sh
# Para añadir un trabajo: suma una línea a la lista y otra entrada en sitio/js/datos.js.
# Para generar solo ese trabajo: SOLO=id bash web/portfolio/preparar_media.sh
set -u
source .herramientas/entorno.sh
OUT=web/portfolio/sitio/media
mkdir -p "$OUT/videos" "$OUT/loops" "$OUT/posters" "$OUT/historias"

# Clips de 6 s del inicio a pantalla completa: id | archivo | segundo de inicio.
# Para rehacer solo estos: SOLO_HISTORIAS=1 bash web/portfolio/preparar_media.sh
HISTORIAS='
ep03|proyectos/agencia-2026-10-31-ep03-mansion/entrega-corto/revision-corto.mp4|44.5
sirpita|proyectos/alfa-urban-2026-11-03-lotes-sirpita/entrega/lotes-sirpita_v9.mp4|13.2
supermall|proyectos/alfa-urban-2026-11-05-depa-supermall/entrega/depa-supermall_v6.mp4|1.5
'
echo "$HISTORIAS" | while IFS='|' read -r id src inicio; do
  [ -z "$id" ] && continue
  [ -n "${SOLO:-}" ] && [ "$id" != "$SOLO" ] && continue
  echo ">> historia $id"
  ffmpeg -nostdin -v error -y -ss "$inicio" -t 6 -i "$src" -an -map_metadata -1 \
    -vf "scale=720:-2" -c:v libx264 -preset medium -crf 26 -pix_fmt yuv420p \
    -movflags +faststart "$OUT/historias/$id.mp4"
done
[ "${SOLO_HISTORIAS:-}" = 1 ] && { du -sh "$OUT/historias"; echo LISTO; exit 0; }

# id | archivo | segundo de inicio del bucle de portada | segundo del póster
LISTA='
sirpita|proyectos/alfa-urban-2026-11-03-lotes-sirpita/entrega/lotes-sirpita_v9.mp4|37|39.4
supermall|proyectos/alfa-urban-2026-11-05-depa-supermall/entrega/depa-supermall_v6.mp4|1.5|3.6
santa-rosa|proyectos/alfa-urban-2026-10-30-santa-rosa-colcapirhua/entrega/Dia1_SantaRosa_FINAL.mp4|38|40.1
ep03|proyectos/agencia-2026-10-31-ep03-mansion/entrega-corto/revision-corto.mp4|27|28.8
ep02|proyectos/agencia-2026-10-23-ep02-fotos-urgentes/entrega/revision.mp4|23|25
ep01|proyectos/agencia-2026-10-20-prueba/entrega/revision.mp4|6|8.1
supermall-redes|proyectos/agencia-2026-11-05-supermall-redes/entrega/supermall-redes.mp4|3|5
'

echo "$LISTA" | while IFS='|' read -r id src loop poster; do
  [ -z "$id" ] && continue
  [ -n "${SOLO:-}" ] && [ "$id" != "$SOLO" ] && continue
  echo ">> $id"
  ffmpeg -nostdin -v error -y -i "$src" -map 0:v:0 -map '0:a:0?' -map_metadata -1 \
    -vf "scale=720:-2" -c:v libx264 -preset medium -crf 25 -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart "$OUT/videos/$id.mp4"
  ffmpeg -nostdin -v error -y -ss "$loop" -t 5 -i "$src" -an -map_metadata -1 \
    -vf "scale=480:-2" -c:v libx264 -preset medium -crf 29 -pix_fmt yuv420p \
    -movflags +faststart "$OUT/loops/$id.mp4"
  ffmpeg -nostdin -v error -y -ss "$poster" -i "$src" -frames:v 1 -map_metadata -1 \
    -vf "scale=720:-2" -q:v 3 "$OUT/posters/$id.jpg"
done

ffmpeg -nostdin -v error -y -ss 48.1 -i proyectos/alfa-urban-2026-11-03-lotes-sirpita/entrega/lotes-sirpita_v9.mp4 \
  -frames:v 1 -map_metadata -1 -vf "scale=720:-2" -q:v 3 "$OUT/posters/sirpita-cerca.jpg"
du -sh "$OUT"/*
echo LISTO
