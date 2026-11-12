# Pone un número de versión nuevo en todos los archivos de la web (?v=...), para que los celulares
# descarguen los cambios al momento y no usen los que guardaron antes.
# Ejecútalo antes de cada publicación: python3 web/portfolio/version.py
import pathlib
import re
import time

SITIO = pathlib.Path(__file__).parent / 'sitio'
V = time.strftime('%Y%m%d%H%M')

def marcar(texto):
    # style/x.css, logic/x.js, ./x.js, ../view/x.js, con o sin ?v= anterior
    return re.sub(r"((?:style|logic|view|\.\.?)/[\w/.-]+\.(?:css|js))(\?v=\w+)?(['\"])", rf"\1?v={V}\3", texto)

archivos = [SITIO / 'index.html'] + sorted((SITIO / 'logic').glob('*.js')) + sorted((SITIO / 'view').glob('*.js'))
for f in archivos:
    t = f.read_text(encoding='utf8')
    n = marcar(t)
    if n != t:
        f.write_text(n, encoding='utf8')
print('versión', V)
