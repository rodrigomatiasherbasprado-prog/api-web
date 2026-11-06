(function () {
  'use strict';

  var config = window.API_CONFIG;
  var trabajos = window.API_TRABAJOS;
  var base = document.body.dataset.base || '';
  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conexion = navigator.connection || {};
  var ahorroDatos = Boolean(conexion.saveData);
  var conHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function porId(id) {
    return trabajos.find(function (t) { return t.id === id; });
  }
  function ruta(tipo, id) {
    return tipo === 'posters' ? base + 'media/posters/' + id + '.jpg' : base + 'media/' + tipo + '/' + id + '.mp4';
  }
  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  }

  // Contacto: todos los botones abren WhatsApp.
  function enlaceContacto(mensaje) {
    return 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(mensaje || config.mensaje);
  }
  function prepararContacto(a, mensaje) {
    a.href = enlaceContacto(mensaje);
    a.target = '_blank';
    a.rel = 'noopener';
  }
  document.querySelectorAll('[data-contacto]').forEach(function (a) { prepararContacto(a); });

  // Reproductor
  var dialogo = crear('dialog', 'reproductor');
  dialogo.setAttribute('aria-label', 'Reproductor de vídeo');
  dialogo.innerHTML =
    '<div class="rep-caja">' +
      '<div class="rep-video"><video controls playsinline preload="metadata"></video></div>' +
      '<div class="rep-info">' +
        '<span class="etiqueta rep-cliente"></span>' +
        '<h2 class="rep-titulo"></h2>' +
        '<div class="rep-acciones">' +
          '<a class="boton boton-claro rep-contacto">Quiero uno así</a>' +
          '<a class="rep-caso" hidden>Ver el caso</a>' +
        '</div>' +
        '<div class="rep-pasos">' +
          '<button type="button" class="rep-paso" data-paso="-1" aria-label="Vídeo anterior"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"></path></svg></button>' +
          '<button type="button" class="rep-paso" data-paso="1" aria-label="Vídeo siguiente"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg></button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<button type="button" class="rep-cerrar" aria-label="Cerrar el vídeo"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>';
  document.body.appendChild(dialogo);

  var video = dialogo.querySelector('video');
  var actual = null;

  function mostrar(id) {
    var t = porId(id);
    if (!t) return;
    actual = t;
    video.poster = ruta('posters', t.id);
    video.src = ruta('videos', t.id);
    video.setAttribute('aria-label', t.titulo);
    dialogo.querySelector('.rep-cliente').textContent = t.cliente;
    dialogo.querySelector('.rep-titulo').textContent = t.titulo;
    prepararContacto(dialogo.querySelector('.rep-contacto'), 'Hola, vi «' + t.titulo + '» en su portfolio y quiero uno así.');
    var caso = dialogo.querySelector('.rep-caso');
    var enCaso = t.caso && location.pathname.indexOf(t.caso) === -1;
    caso.hidden = !enCaso;
    if (enCaso) caso.href = base + t.caso;
    if (!dialogo.open) dialogo.showModal();
    document.documentElement.classList.add('con-reproductor');
    history.replaceState(null, '', '#v=' + t.id);
    var intento = video.play();
    if (intento) intento.catch(function () {});
  }
  function limpiar() {
    if (!actual) return;
    video.pause();
    video.removeAttribute('src');
    video.load();
    actual = null;
    document.documentElement.classList.remove('con-reproductor');
    history.replaceState(null, '', location.pathname + location.search);
  }
  function cerrar() {
    if (dialogo.open) dialogo.close();
    limpiar();
  }
  function paso(n) {
    var i = trabajos.indexOf(actual);
    mostrar(trabajos[(i + n + trabajos.length) % trabajos.length].id);
  }

  dialogo.addEventListener('close', limpiar);
  dialogo.addEventListener('click', function (e) {
    if (e.target === dialogo || e.target.classList.contains('rep-caja')) cerrar();
    var botonPaso = e.target.closest('.rep-paso');
    if (botonPaso) paso(Number(botonPaso.dataset.paso));
    if (e.target.closest('.rep-cerrar')) cerrar();
  });
  dialogo.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') paso(1);
    if (e.key === 'ArrowLeft') paso(-1);
  });

  document.addEventListener('click', function (e) {
    var boton = e.target.closest('[data-video]');
    if (boton) mostrar(boton.dataset.video);
  });

  // Inicio: los vídeos pasan solos, como historias, y se paran cuando no se ven.
  var portada = document.querySelector('[data-historias]');
  if (portada) {
    var DURACION = 6000;
    var abrir = portada.querySelector('.historia-abrir');
    var barras = portada.querySelector('.historia-barras');
    var rotulo = portada.querySelector('.historia-rotulo');
    var rotuloTexto = rotulo.querySelector('span');
    var botonPausa = portada.querySelector('.historia-pausa');
    var conVideo = !sinMovimiento && !ahorroDatos;
    var indice = 0;
    var transcurrido = 0;
    var ultimo = 0;
    var pausada = sinMovimiento;
    var enPantalla = true;

    var historias = window.API_HISTORIAS.map(porId).filter(Boolean).map(function (t, i) {
      var v = crear('video', 'historia-video');
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'none';
      v.poster = ruta('posters', t.id);
      v.setAttribute('aria-hidden', 'true');
      abrir.appendChild(v);

      var barra = crear('button', 'historia-barra');
      barra.type = 'button';
      barra.setAttribute('aria-label', 'Ir a ' + t.titulo);
      var relleno = crear('span');
      barra.appendChild(relleno);
      barra.addEventListener('click', function () { ir(i); });
      barras.appendChild(barra);
      return {trabajo: t, video: v, barra: barra, relleno: relleno};
    });

    function cargar(i) {
      var h = historias[i];
      if (conVideo && !h.video.getAttribute('src')) h.video.src = ruta('historias', h.trabajo.id);
    }
    function reproducir(v) {
      var intento = v.play();
      if (intento) intento.catch(function () {});
    }
    function pintarBarras() {
      historias.forEach(function (h, i) {
        var avance = i < indice ? 1 : i > indice ? 0 : transcurrido / DURACION;
        h.relleno.style.transform = 'scaleX(' + avance + ')';
      });
    }
    function ir(i) {
      var n = historias.length;
      indice = (i + n) % n;
      transcurrido = 0;
      var h = historias[indice];
      historias.forEach(function (otra, j) {
        otra.video.classList.toggle('activa', j === indice);
        otra.barra.toggleAttribute('aria-current', j === indice);
        if (j !== indice) otra.video.pause();
      });
      cargar(indice);
      cargar((indice + 1) % n);
      h.video.currentTime = 0;
      if (conVideo && debeAvanzar()) reproducir(h.video);
      abrir.dataset.video = h.trabajo.id;
      abrir.setAttribute('aria-label', 'Ver ' + h.trabajo.titulo + ', ' + h.trabajo.cliente);
      rotulo.dataset.video = h.trabajo.id;
      rotuloTexto.textContent = h.trabajo.titulo;
      pintarBarras();
    }
    function debeAvanzar() {
      return !pausada && enPantalla && !dialogo.open && !document.hidden;
    }
    function latido() {
      var ahora = performance.now();
      var dt = Math.min(ahora - ultimo, 100);
      ultimo = ahora;
      var video = historias[indice].video;
      if (debeAvanzar()) {
        if (conVideo && video.paused) reproducir(video);
        transcurrido += dt;
        if (transcurrido >= DURACION) ir(indice + 1);
        else pintarBarras();
      } else if (!video.paused) {
        video.pause();
      }
    }

    botonPausa.hidden = sinMovimiento;
    botonPausa.addEventListener('click', function () {
      pausada = !pausada;
      botonPausa.setAttribute('aria-label', pausada ? 'Reanudar los vídeos' : 'Pausar los vídeos');
      botonPausa.classList.toggle('en-pausa', pausada);
    });

    var inicioToque = null;
    abrir.addEventListener('touchstart', function (e) { inicioToque = e.changedTouches[0].clientX; }, {passive: true});
    abrir.addEventListener('touchend', function (e) {
      if (inicioToque === null) return;
      var distancia = e.changedTouches[0].clientX - inicioToque;
      inicioToque = null;
      if (Math.abs(distancia) > 40) {
        e.preventDefault();
        ir(indice + (distancia < 0 ? 1 : -1));
      }
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entradas) {
        enPantalla = entradas[0].isIntersecting;
        var barraSuperior = document.querySelector('.barra-flotante');
        if (barraSuperior) barraSuperior.classList.toggle('solida', entradas[0].intersectionRatio < 0.9);
      }, {threshold: [0, 0.9]}).observe(portada);
    }

    ir(0);
    ultimo = performance.now();
    setInterval(latido, 33);
  }

  // Trabajos
  var rejilla = document.querySelector('[data-rejilla]');
  if (rejilla) {
    trabajos.forEach(function (t) {
      var boton = crear('button', 'tarjeta');
      boton.type = 'button';
      boton.dataset.video = t.id;
      boton.dataset.etiquetas = t.etiquetas.join(' ');

      var marco = crear('span', 'marco');
      var img = crear('img');
      img.src = ruta('posters', t.id);
      img.alt = t.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 720;
      img.height = 1280;
      marco.appendChild(img);

      var texto = crear('span', 'tarjeta-texto');
      texto.appendChild(crear('span', 'tarjeta-titulo', t.titulo));
      texto.appendChild(crear('span', 'tarjeta-datos', t.cliente + ' · ' + t.dura));
      boton.appendChild(marco);
      boton.appendChild(texto);
      rejilla.appendChild(boton);

      if (conHover && !sinMovimiento) {
        var vista = null;
        boton.addEventListener('mouseenter', function () {
          vista = crear('video');
          vista.muted = true;
          vista.loop = true;
          vista.playsInline = true;
          vista.src = ruta('loops', t.id);
          vista.setAttribute('aria-hidden', 'true');
          marco.appendChild(vista);
          var intento = vista.play();
          if (intento) intento.catch(function () {});
        });
        boton.addEventListener('mouseleave', function () {
          if (vista) vista.remove();
          vista = null;
        });
      }
    });

    var aviso = document.querySelector('[data-aviso-filtro]');
    document.querySelectorAll('[data-filtro]').forEach(function (boton, _, botones) {
      boton.addEventListener('click', function () {
        var filtro = boton.dataset.filtro;
        botones.forEach(function (b) { b.setAttribute('aria-pressed', String(b === boton)); });
        var visibles = 0;
        rejilla.querySelectorAll('.tarjeta').forEach(function (tarjeta) {
          var ver = filtro === 'todo' || tarjeta.dataset.etiquetas.split(' ').indexOf(filtro) !== -1;
          tarjeta.hidden = !ver;
          if (ver) visibles += 1;
        });
        if (aviso) aviso.textContent = visibles + ' trabajos';
      });
    });
  }

  // En el teléfono, el botón fijo se quita donde ya hay un botón de contacto a la vista.
  var fijo = document.querySelector('.fijo-movil');
  if (fijo && !('IntersectionObserver' in window)) fijo.classList.remove('oculto');
  if (fijo && 'IntersectionObserver' in window) {
    var conBoton = new Set();
    var vigilante = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) conBoton.add(entrada.target);
        else conBoton.delete(entrada.target);
      });
      fijo.classList.toggle('oculto', conBoton.size > 0);
    });
    document.querySelectorAll('.cierre, .portada-botones').forEach(function (zona) { vigilante.observe(zona); });
  }

  // Enlace directo a un vídeo: página#v=sirpita
  function abrirDesdeEnlace() {
    var coincide = location.hash.match(/^#v=([\w-]+)$/);
    if (coincide) mostrar(coincide[1]);
  }
  window.addEventListener('hashchange', abrirDesdeEnlace);
  abrirDesdeEnlace();
})();
