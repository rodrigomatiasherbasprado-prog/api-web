# Suaviza los cortes bruscos de un video con un fundido corto, sin cambiar su duración ni mover el audio.
# En cada corte, los últimos K fotogramas de la toma que sale se funden con los primeros K de la que entra.
# Sin filtros de color: solo mezcla de fotogramas en los cortes.
# Uso: python3 web/portfolio/suavizar.py entrada.mp4 salida.mp4 [K=9] [crf=20]
import collections
import subprocess
import sys

import numpy as np

src, dst = sys.argv[1], sys.argv[2]
K = int(sys.argv[3]) if len(sys.argv) > 3 else 9
CRF = sys.argv[4] if len(sys.argv) > 4 else '20'


def probe(campos):
    r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', f'stream={campos}', '-of', 'csv=p=0', src], capture_output=True, text=True)
    return r.stdout.strip().split(',')


w, h, tasa = probe('width,height,r_frame_rate')
w, h = int(w), int(h)
num, den = map(int, tasa.split('/'))
fps = num / den

# Cortes: cambio de escena fuerte.
r = subprocess.run(['ffmpeg', '-nostdin', '-hide_banner', '-i', src, '-vf', "select='gt(scene,0.32)',showinfo", '-an', '-f', 'null', '-'], capture_output=True, text=True)
tiempos = [float(x.split('pts_time:')[1].split()[0]) for x in r.stderr.splitlines() if 'pts_time:' in x]
cortes = []
for t in tiempos:
    c = round(t * fps)
    if c > K and (not cortes or c - cortes[-1] > 2 * K):
        cortes.append(c)
inicio_fundido = {c - K + k: (c, k) for c in cortes for k in range(K)}

tiene_audio = bool(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout.strip())
dec = subprocess.Popen(['ffmpeg', '-nostdin', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
cmd = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{w}x{h}', '-r', tasa, '-i', '-', '-i', src,
       '-map', '0:v:0'] + (['-map', '1:a:0', '-c:a', 'copy'] if tiene_audio else []) + \
      ['-c:v', 'libx264', '-preset', 'medium', '-crf', CRF, '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
       '-movflags', '+faststart', '-map_metadata', '-1', dst]
enc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

tam = w * h * 3
buf = collections.OrderedDict()
siguiente = 0  # próximo fotograma a escribir


def escribir(j):
    a = buf[j]
    if j in inicio_fundido:
        c, k = inicio_fundido[j]
        b = buf.get(c + k)
        if b is not None:
            x = (k + 1) / (K + 1)
            x = x * x * (3 - 2 * x)  # entrada y salida suaves
            a = (a.astype(np.float32) * (1 - x) + b.astype(np.float32) * x).round().astype(np.uint8)
    enc.stdin.write(a.tobytes())


i = 0
while True:
    datos = dec.stdout.read(tam)
    if len(datos) < tam:
        break
    buf[i] = np.frombuffer(datos, np.uint8).reshape(h, w, 3)
    while siguiente <= i - K:
        escribir(siguiente)
        siguiente += 1
    for viejo in [n for n in buf if n < siguiente - 1]:
        del buf[viejo]
    i += 1
while siguiente < i:
    escribir(siguiente)
    siguiente += 1
enc.stdin.close()
enc.wait()
dec.wait()
print(f'{dst}: {len(cortes)} cortes suavizados')
