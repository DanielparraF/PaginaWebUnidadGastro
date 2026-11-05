/* ============================================================
   UNIDAD GASTROENTEROLÓGICA DUITAMA
   main.js
   1. showSection()   — navegación entre pestañas
   2. abrirWhatsApp() — formulario de agendamiento
   3. Servicios       — datos, render, filtros
   4. Modal           — abrir, cerrar, ir a agendar
============================================================ */


/* ============================================================
   1. NAVEGACIÓN
============================================================ */

function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(function(s) {
    s.classList.remove('active');
  });
  document.querySelectorAll('.nav-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  if (!btn) btn = document.querySelector('.nav-tab[data-section="' + id + '"]');
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ============================================================
   2. WHATSAPP — AGENDAMIENTO
============================================================ */

function abrirWhatsApp() {
  var nombre   = document.getElementById('nombre').value.trim();
  var telefono = document.getElementById('telefono').value.trim();
  var servicio = document.getElementById('servicio').value;
  var motivo   = document.getElementById('motivo').value.trim();

  if (!nombre || !telefono) {
    alert('Por favor ingresa tu nombre y número de WhatsApp para continuar.');
    return;
  }

  var msg = 'Hola, quiero agendar una cita en la Unidad Gastroenterológica.\n\n';
  msg += '*Nombre:* '   + nombre   + '\n';
  msg += '*Teléfono:* ' + telefono + '\n';
  if (servicio) msg += '*Servicio:* ' + servicio + '\n';
  if (motivo)   msg += '*Motivo:* '   + motivo   + '\n';
  msg += '\nQuedo pendiente de su confirmación. ¡Gracias!';

  var numero = '573125824128';
  var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}


/* ============================================================
   3. SERVICIOS — DATOS Y RENDER
============================================================ */

var serviciosData = [
  {
    id: 'consulta-gastro',
    cat: 'consulta',
    icon: 'ti-stethoscope',
    color: 'teal',
    tag: 'Consulta',
    titulo: 'Gastroenterología',
    resumen: 'Valoración especializada de enfermedades del sistema digestivo con plan de manejo personalizado.',
    desc: 'Valoración completa del sistema digestivo con el especialista. Se revisa tu historia clínica, síntomas y se define un plan diagnóstico y de tratamiento personalizado. Indicada para síntomas como acidez, dolor abdominal, cambios en el tránsito intestinal o control de enfermedades crónicas digestivas.',
    dur: '30 – 45 min',
    esp: 'Dr. Ricardo Carvajal',
    highlight: false
  },
  {
    id: 'consulta-interna',
    cat: 'consulta',
    icon: 'ti-heart-rate-monitor',
    color: 'navy',
    tag: 'Consulta',
    titulo: 'Medicina interna',
    resumen: 'Atención integral del adulto con enfoque en la detección y manejo de enfermedades sistémicas.',
    desc: 'Atención integral del adulto enfocada en la detección y manejo de enfermedades sistémicas. El especialista evalúa múltiples órganos y sistemas para un diagnóstico preciso, coordinando el tratamiento de condiciones complejas que afectan la salud general.',
    dur: '30 – 45 min',
    esp: 'Dra. Carolina Garzon',
    highlight: false
  },
  {
    id: 'endoscopia',
    cat: 'procedimiento',
    icon: 'ti-camera',
    color: 'teal',
    tag: 'Procedimiento',
    titulo: 'Endoscopia digestiva alta',
    resumen: 'Visualización directa del esófago, estómago y duodeno. Permite detectar lesiones y tomar biopsias.',
    desc: 'Procedimiento que permite visualizar directamente el esófago, el estómago y el duodeno mediante un endoscopio flexible. Se realiza bajo sedación leve, dura aproximadamente 15 minutos y permite detectar lesiones, tomar biopsias y tratar algunas condiciones en el mismo momento.',
    dur: '15 – 20 min',
    esp: 'Dr. Ricardo Carvajal',
    highlight: true
  },
  {
    id: 'colonoscopia',
    cat: 'procedimiento',
    icon: 'ti-search',
    color: 'navy',
    tag: 'Procedimiento',
    titulo: 'Colonoscopia',
    resumen: 'Evaluación visual del intestino grueso para detección temprana de pólipos y cáncer colorrectal.',
    desc: 'Evaluación visual completa del intestino grueso para detectar pólipos, inflamación o signos de cáncer colorrectal. Es el estudio de referencia para la prevención del cáncer de colon. Se recomienda a partir de los 45 años o antes si hay antecedentes familiares.',
    dur: '20 – 40 min',
    esp: 'Dr. Ricardo Carvajal',
    highlight: true
  },
  {
    id: 'polipectomia',
    cat: 'procedimiento',
    icon: 'ti-cut',
    color: 'teal',
    tag: 'Procedimiento',
    titulo: 'Polipectomía',
    resumen: 'Extirpación de pólipos del colon durante la colonoscopia para prevenir el cáncer.',
    desc: 'Extirpación de pólipos del colon durante la colonoscopia. Los pólipos son crecimientos anormales que, si no se retiran, pueden convertirse en cáncer con el tiempo. El procedimiento es ambulatorio, no requiere incisiones y el paciente se recupera rápidamente.',
    dur: '20 – 45 min',
    esp: 'Dr. Ricardo Carvajal',
    highlight: false
  },
  {
    id: 'balon',
    cat: 'procedimiento',
    icon: 'ti-scale',
    color: 'gold',
    tag: 'Procedimiento',
    titulo: 'Balón gástrico',
    resumen: 'Alternativa no quirúrgica para el manejo del sobrepeso. Procedimiento endoscópico ambulatorio.',
    desc: 'Alternativa no quirúrgica para el manejo del sobrepeso y la obesidad. Se introduce un balón de silicona en el estómago mediante endoscopia, lo que genera sensación de saciedad y ayuda a reducir la ingesta de alimentos. El procedimiento es ambulatorio y el balón permanece entre 6 y 12 meses.',
    dur: '20 – 30 min',
    esp: 'Dr. Ricardo Carvajal',
    highlight: false
  },
  {
    id: 'prueba-aliento',
    cat: 'preventivo',
    icon: 'ti-flask',
    color: 'navy',
    tag: 'Preventivo',
    titulo: 'Prueba de aliento',
    resumen: 'Detección no invasiva de Helicobacter pylori. Rápido, indoloro y muy preciso.',
    desc: 'Examen no invasivo para detectar la bacteria Helicobacter pylori, principal causante de gastritis y úlceras gástricas. El paciente ingiere una solución y se analiza el aire espirado. No requiere endoscopia, es rápido, indoloro y muy preciso para confirmar o descartar la infección.',
    dur: '30 – 40 min',
    esp: 'Dr. Ricardo Carvajal',
    highlight: false
  },
  {
    id: 'biopsias',
    cat: 'procedimiento',
    icon: 'ti-microscope',
    color: 'teal',
    tag: 'Procedimiento',
    titulo: 'Toma de biopsias',
    resumen: 'Muestras de tejido para diagnóstico preciso de lesiones gastrointestinales.',
    desc: 'Durante la endoscopia o colonoscopia se toman pequeñas muestras de tejido de zonas sospechosas para análisis en laboratorio de patología. Permite diagnosticar con precisión inflamaciones, infecciones, lesiones precancerosas o cáncer digestivo en etapas tempranas.',
    dur: 'Dentro del procedimiento',
    esp: 'Dr. Ricardo Carvajal',
    highlight: false
  }
];

/* Renderiza las tarjetas en el grid */
function renderServicios(lista, gridId) {
  var grid = document.getElementById(gridId || 'services-grid');
  if (!grid) return;
  grid.innerHTML = '';            // ← limpia antes de dibujar (esta es la clave)

  lista.forEach(function(s) {
    var card = document.createElement('div');
    card.className = 'service-card' + (s.highlight ? ' service-card--highlight' : '');
    card.onclick = function() { abrirModal(s); };

    card.innerHTML =
      '<div class="service-icon-wrap service-icon-wrap--' + s.color + '">' +
        '<i class="ti ' + s.icon + '" aria-hidden="true"></i>' +
      '</div>' +
      '<div class="service-card-tag">' + s.tag + '</div>' +
      '<h3>' + s.titulo + '</h3>' +
      '<p>' + s.resumen + '</p>' +
      '<div class="service-card-footer">' +
        '<span class="service-card-dur">' +
          '<i class="ti ti-clock" aria-hidden="true"></i> ' + s.dur +
        '</span>' +
        '<button class="service-card-more">' +
          '<i class="ti ti-info-circle" aria-hidden="true"></i> Ver más' +
        '</button>' +
      '</div>';

    grid.appendChild(card);
  });
}

/* Filtro por categoría */
function filtrar(cat, btn) {
  document.querySelectorAll('.srv-filtro').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  var lista = cat === 'todos'
    ? serviciosData
    : serviciosData.filter(function(s) { return s.cat === cat; });

  renderServicios(lista);
}


/* ============================================================
   4. MODAL
============================================================ */

function abrirModal(s) {
  document.getElementById('modal-icon').className     = 'ti ' + s.icon;
  document.getElementById('modal-tag').textContent    = s.tag;
  document.getElementById('modal-titulo').textContent = s.titulo;
  document.getElementById('modal-desc').textContent   = s.desc;
  document.getElementById('modal-dur').textContent    = 'Duración: ' + s.dur;
  document.getElementById('modal-esp').textContent    = s.esp;

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function irAgendar() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  showSection('agendamiento');
}

/* Cerrar con Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   5. INSTALACIONES — GALERÍA
   Para agregar contenido, edita solo estas dos listas.
   FOTOS:  { src: 'ruta/foto.jpg', titulo: 'Texto' }
   VIDEOS: { tipo: 'archivo', src: 'assets/video/x.mp4', poster: 'assets/img/x.jpg', titulo: '...' }
           { tipo: 'youtube', id: 'ID_DEL_VIDEO', titulo: '...' }   (ID = lo que va después de "v=")
============================================================ */

var instalacionesFotos = [
  { src: 'assets/img/Foto procedimientos.JPG', titulo: 'Equipo Médico' },
  { src: 'assets/img/DSC_5933.jpg', titulo: 'Logo' },
  { src: 'assets/img/DSC_5935.jpg', titulo: 'Sala de espera' },
  { src: 'assets/img/DSC_6077.jpg', titulo: 'Hall' },
  { src: 'assets/img/DSC_5950.jpg', titulo: 'Puesto de recepción' },
  { src: 'assets/img/DSC_5960.jpg', titulo: 'Consultorio 1' },
  { src: 'assets/img/DSC_5975.jpg', titulo: 'Sala de procedimientos endoscópicos' },
  { src: 'assets/img/DSC_5988.jpg', titulo: 'Sala de procedimientos colonoscópicos' },
  { src: 'assets/img/DSC_6001.jpg', titulo: 'Sala de recuperación' },

];

var instalacionesVideos = [
  {
    tipo: 'youtube',
    id: '63TDT1czv60',
    vertical: true,
    poster: 'assets/img/DSC_5933.jpg',
    titulo: 'Recorrido por la unidad'
  },
  {
    tipo: 'youtube',
    id: 'cfgMZIGMOws',
    vertical: true,
    poster: 'assets/img/DSC_5950.jpg',
    titulo: 'Conoce nuestras instalaciones'
  }
];

var lbItems = [];
var lbIndex = 0;

function escapeHtml(t) {
  return String(t).replace(/[&<>"']/g, function(c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function renderInstalaciones() {
  var gf = document.getElementById('inst-fotos');
  var gv = document.getElementById('inst-videos');
  if (!gf || !gv) return;
  gf.innerHTML = '';
  gv.innerHTML = '';
  lbItems = [];

  instalacionesFotos.forEach(function(f) {
    var idx = lbItems.push({ tipo: 'foto', src: f.src, titulo: f.titulo }) - 1;
    var b = document.createElement('button');
    b.className = 'inst-item';
    b.type = 'button';
    b.onclick = function() { abrirLightbox(idx); };
    b.innerHTML =
      '<img src="' + escapeHtml(f.src) + '" alt="' + escapeHtml(f.titulo) + '" loading="lazy" />' +
      '<span class="inst-item-cap">' + escapeHtml(f.titulo) + '</span>' +
      '<span class="inst-item-zoom"><i class="ti ti-zoom-in" aria-hidden="true"></i></span>';
    gf.appendChild(b);
  });

  instalacionesVideos.forEach(function(v) {
    var idx = lbItems.push(v) - 1;
    var thumb = v.tipo === 'youtube'
      ? 'https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg'
      : (v.poster || '');
    var b = document.createElement('button');
    b.className = 'inst-item inst-item--video';
    b.type = 'button';
    b.onclick = function() { abrirLightbox(idx); };
    b.innerHTML =
      (thumb ? '<img src="' + escapeHtml(thumb) + '" alt="' + escapeHtml(v.titulo) + '" loading="lazy" />' : '') +
      '<span class="inst-play"><i class="ti ti-player-play-filled" aria-hidden="true"></i></span>' +
      '<span class="inst-item-cap">' + escapeHtml(v.titulo) + '</span>';
    gv.appendChild(b);
  });
  gv.classList.toggle('inst-videos--vertical', instalacionesVideos.some(function(v) { return v.vertical; }));

  rellenarPlaceholders(gf, instalacionesFotos.length, 3, 'ti-photo', 'Foto próximamente');
  rellenarPlaceholders(gv, instalacionesVideos.length, 2, 'ti-video', 'Video próximamente');
}

function rellenarPlaceholders(grid, actuales, minimo, icono, texto) {
  for (var i = actuales; i < minimo; i++) {
    var ph = document.createElement('div');
    ph.className = 'inst-item inst-item--placeholder';
    ph.innerHTML = '<i class="ti ' + icono + '" aria-hidden="true"></i><span>' + texto + '</span>';
    grid.appendChild(ph);
  }
}

function abrirLightbox(i) {
  lbIndex = i;
  pintarLightbox();
  var lb = document.getElementById('lightbox');
  lb.classList.add('active');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function pintarLightbox() {
  var it = lbItems[lbIndex];
  var html = '';
  if (it.tipo === 'foto') {
    html = '<img src="' + escapeHtml(it.src) + '" alt="' + escapeHtml(it.titulo) + '" />';
  } else if (it.tipo === 'youtube') {
    html = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(it.id) +
           '?autoplay=1&rel=0" title="' + escapeHtml(it.titulo) +
           '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  } else {
    html = '<video src="' + escapeHtml(it.src) + '" controls autoplay playsinline></video>';
  }
  document.getElementById('lightbox-stage').innerHTML = html;
  document.getElementById('lightbox-caption').textContent = it.titulo || '';
  var solo = lbItems.length < 2;
  document.querySelector('.lightbox-prev').style.display = solo ? 'none' : '';
  document.querySelector('.lightbox-next').style.display = solo ? 'none' : '';
}

function navLightbox(dir, e) {
  if (e) e.stopPropagation();
  lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
  pintarLightbox();
}

function cerrarLightbox(e) {
  if (e && e.target.id !== 'lightbox' && !e.target.closest('.lightbox-close')) return;
  var lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  lb.classList.remove('active');
  lb.setAttribute('aria-hidden', 'true');
  document.getElementById('lightbox-stage').innerHTML = '';   // detiene el video
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'Escape')     cerrarLightbox();
  if (e.key === 'ArrowLeft')  navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

document.addEventListener('DOMContentLoaded', function() {
  renderServicios(serviciosData);
  renderServiciosHome();        // ← nueva
  renderInstalaciones();
  renderInstalacionesHome(); 
});

/* Servicios destacados en el Inicio (ids de serviciosData, en este orden) */
var serviciosInicio = ['endoscopia', 'colonoscopia', 'balon', 'consulta-gastro'];

function renderServiciosHome() {
  var lista = serviciosInicio.map(function(id) {
    return serviciosData.filter(function(s) { return s.id === id; })[0];
  }).filter(Boolean);
  renderServicios(lista, 'home-servicios-grid');
}

/* Vista previa de instalaciones en el Inicio (primeras 3 fotos de la galería) */
function renderInstalacionesHome() {
  var g = document.getElementById('home-inst-grid');
  if (!g) return;
  g.innerHTML = '';
  instalacionesFotos.slice(0, 3).forEach(function(f) {
    var b = document.createElement('button');
    b.className = 'inst-item';
    b.type = 'button';
    b.onclick = function() { showSection('instalaciones'); };
    b.innerHTML =
      '<img src="' + escapeHtml(f.src) + '" alt="' + escapeHtml(f.titulo) + '" loading="lazy" />' +
      '<span class="inst-item-cap">' + escapeHtml(f.titulo) + '</span>';
    g.appendChild(b);
  });
}