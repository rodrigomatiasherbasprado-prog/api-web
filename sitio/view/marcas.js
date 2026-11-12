// Recuadro negro con las marcas en blanco que pasan de izquierda a derecha.
// Aquí solo va un grupo con cada marca una vez; logic/marcas.js lo copia las veces justas y lo mueve sin fin.
const Marca = (m) => (m.logo
  ? `<li class="marca"><img src="media/marcas/${m.logo}" alt="${m.nombre}" decoding="async" draggable="false"></li>`
  : `<li class="marca marca-texto">${m.nombre}</li>`);

export const Marcas = (marcas) => `
<section class="seccion seccion-marcas" id="marcas" aria-labelledby="titulo-marcas">
  <div class="marcas" data-aparece>
    <h2 class="marcas-titulo" id="titulo-marcas">Marcas con las que hemos trabajado</h2>
    <div class="cinta" data-cinta>
      <div class="cinta-pista" data-pista>
        <ul class="cinta-grupo">${marcas.map(Marca).join('')}</ul>
      </div>
    </div>
  </div>
</section>`;
