// Iconos y logo en SVG (trazos que heredan el color del texto).
export const LOGO = '<svg class="logo-svg" viewBox="0 0 1545 1083" aria-hidden="true" focusable="false"><path fill="currentColor" d="M0 534Q0 447 32 382Q63 317 118 282Q172 247 239 247L239 247Q297 247 339 270Q381 293 404 332L404 332L404 254L600 254L600 815L404 815L404 737Q381 776 339 799Q296 822 239 822L239 822Q172 822 118 787Q63 752 32 687Q0 621 0 534L0 534ZM404 534Q404 480 375 449Q345 418 302 418L302 418Q258 418 229 449Q200 479 200 534L200 534Q200 588 229 620Q258 651 302 651L302 651Q345 651 375 620Q404 589 404 534L404 534ZM878 332Q901 293 943 270Q985 247 1042 247L1042 247Q1109 247 1164 282Q1218 317 1250 382Q1281 447 1281 534L1281 534Q1281 621 1250 687Q1218 752 1164 787Q1109 822 1042 822L1042 822Q985 822 944 799Q902 776 878 737L878 737L878 1083L682 1083L682 254L878 254L878 332ZM1082 534Q1082 479 1053 449Q1023 418 980 418L980 418Q937 418 908 449Q878 480 878 534L878 534Q878 589 908 620Q937 651 980 651L980 651Q1023 651 1053 620Q1082 588 1082 534L1082 534ZM1431 202Q1379 202 1348 174Q1316 145 1316 102L1316 102Q1316 58 1348 29Q1379 0 1431 0L1431 0Q1482 0 1514 29Q1545 58 1545 102L1545 102Q1545 145 1514 174Q1482 202 1431 202L1431 202ZM1332 254L1528 254L1528 815L1332 815L1332 254Z"/></svg>';

const trazo = (d, vb = 24) => `<svg class="ico" viewBox="0 0 ${vb} ${vb}" aria-hidden="true" focusable="false">${d}</svg>`;

export const ICONOS = {
  play: '<svg class="ico ico-relleno" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2v12l10-6z"/></svg>',
  whatsapp: trazo('<path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6z"/><path d="M9.2 8.6c.3 2.3 2.1 4.4 4.6 5.2l1.2-1.3 2 .9-.4 1.8c-4.1.2-8.7-4.2-8.6-8.4l1.8-.4.9 2z"/>'),
  check: trazo('<path d="M5 12.5l4.2 4L19 7"/>'),
  flecha: trazo('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  abajo: trazo('<path d="M6 9l6 6 6-6"/>'),
  cerrar: trazo('<path d="M6 6l12 12M18 6L6 18"/>'),
  izq: trazo('<path d="M15 5l-7 7 7 7"/>'),
  der: trazo('<path d="M9 5l7 7-7 7"/>'),
  pausa: '<svg class="ico ico-relleno" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2h3v12H4zM9 2h3v12H9z"/></svg>',
  dron: trazo('<rect x="10" y="10" width="4" height="4" rx="1"/><path d="M10 10L7 7M14 10l3-3M10 14l-3 3M14 14l3 3"/><circle cx="5.5" cy="5.5" r="2.5"/><circle cx="18.5" cy="5.5" r="2.5"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
  inmo: trazo('<path d="M4 21V8l7-4v17"/><path d="M11 21V10l9 4v7"/><path d="M2 21h20"/>'),
  health: trazo('<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>'),
  tech: trazo('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
  business: trazo('<path d="M5 20v-6M12 20V4M19 20V9"/>'),
  commerce: trazo('<path d="M2 3h3l2.5 12h11L21 7H6.2"/><path d="M9 20h.01M18 20h.01"/>'),
  food: trazo('<path d="M3 11h18c0 5-3.6 9-9 9s-9-4-9-9z"/><path d="M9 7c0-1.5 1.5-1.5 1.5-3M14 7c0-1.5 1.5-1.5 1.5-3"/>'),
};
