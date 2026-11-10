#!/bin/bash
# Prepara los vídeos del portfolio para la web sin tocar las entregas originales.
# Solo reduce tamaño: sin filtros ni retoque de color. Quita los metadatos (GPS, cámara).
# Uso, desde la raíz del proyecto: bash web/portfolio/preparar_media.sh
# Solo videos de DRONE (editados y en crudo). Para añadir uno: suma una línea a la lista y otra entrada en sitio/logic/datos.js.
# Para generar solo ese trabajo: SOLO=id bash web/portfolio/preparar_media.sh
set -u
source .herramientas/entorno.sh
OUT=web/portfolio/sitio/media
mkdir -p "$OUT/videos" "$OUT/loops" "$OUT/posters" "$OUT/historias"

# Funde cada corte brusco en 0,3 s sin cambiar duración ni audio (pedido del creador: nada de cortes de golpe).
suavizar() {
  python3 web/portfolio/suavizar.py "$1" "$1.tmp.mp4" 9 "$2" && mv "$1.tmp.mp4" "$1"
}

# Fotos del inicio: fotos aéreas originales, sin edición. Solo se reducen a 1600 px y se les quita el GPS.
# Para rehacer solo estas: SOLO_FOTOS=1 bash web/portfolio/preparar_media.sh
mkdir -p "$OUT/inicio"
FOTOS='
foto-1|brutos/alfa-urban/depa-supermall/DJI_0352.JPG
foto-2|brutos/alfa-urban/depa-supermall/DJI_0342.JPG
foto-3|brutos/alfa-urban/lotes-sirpita/DJI_0316.JPG
foto-4|brutos/alfa-urban/depa-supermall/DJI_0349.JPG
foto-5|brutos/alfa-urban/lotes-sirpita/DJI_0296.JPG
foto-6|brutos/alfa-urban/depa-supermall/DJI_0331.JPG
'
echo "$FOTOS" | while IFS='|' read -r id src; do
  [ -z "$id" ] && continue
  ffmpeg -nostdin -v error -y -i "$src" -map_metadata -1 -vf "scale=1600:-2:flags=lanczos" -q:v 7 "$OUT/inicio/$id.jpg"
done
[ "${SOLO_FOTOS:-}" = 1 ] && { du -sh "$OUT/inicio"; echo LISTO; exit 0; }

# id | archivo | segundo de inicio del bucle de portada | segundo del póster
LISTA='
sirpita|proyectos/alfa-urban-2026-11-03-lotes-sirpita/entrega/lotes-sirpita_v9.mp4|37|39.4
supermall|proyectos/alfa-urban-2026-11-05-depa-supermall/entrega/depa-supermall_v6.mp4|1.5|3.6
casa|motion/public/gancho-drone/v3/mansion.mp4|6|8
terreno|motion/public/gancho-drone/v3/sacaba.mp4|4|6
edificio-crudo|motion/public/gancho-drone/v6/supermall-completo.mp4|8|10
lote-crudo|motion/public/gancho-drone/v6/lotes-completo.mp4|10|12
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
  suavizar "$OUT/videos/$id.mp4" 22
  suavizar "$OUT/loops/$id.mp4" 27
done

du -sh "$OUT"/*
echo LISTO
