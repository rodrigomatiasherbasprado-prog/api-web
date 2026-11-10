// Recuadro negro con las marcas en blanco que pasan de izquierda a derecha.
const Marca = (m) => (m.logo
  ? `<li class="marca"><img src="media/marcas/${m.logo}" alt="${m.nombre}" decoding="async"></li>`
  : `<li class="marca marca-texto">${m.nombre}</li>`);

export const Marcas = (marcas) => {
  // Se repite la lista hasta llenar la cinta y se duplica para que el bucle no tenga corte.
  const vueltas = Math.max(3, Math.ceil(8 / marcas.length));
  const tira = Array.from({length: vueltas}, () => marcas.map(Marca).join('')).join('');
  return `
<section class="seccion seccion-marcas" id="marcas" aria-labelledby="titulo-marcas">
  <div class="marcas" data-aparece>
    <h2 class="marcas-titulo" id="titulo-marcas">Marcas con las que hemos trabajado</h2>
    <div class="cinta" data-cinta>
      <div class="cinta-pista">
        <ul class="cinta-grupo">${tira}</ul>
        <ul class="cinta-grupo" aria-hidden="true">${tira}</ul>
      </div>
    </div>
  </div>
</section>`;
};
