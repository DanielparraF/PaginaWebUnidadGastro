/* ============================================================
   UNIDAD GASTROENTEROLÓGICA DUITAMA
   main.js
   Contenido:
   1. showSection()   — cambia entre pestañas
   2. abrirWhatsApp() — arma el mensaje y abre WhatsApp
============================================================ */


/* ============================================================
   1. CAMBIO DE SECCIÓN / PESTAÑA
   - Oculta todas las secciones
   - Activa la sección con el id recibido
   - Marca la pestaña pulsada como activa
   - Lleva la vista al inicio
============================================================ */

function showSection(id, btn) {

  /* Ocultar todas las secciones */
  document.querySelectorAll('.section').forEach(function(seccion) {
    seccion.classList.remove('active');
  });

  /* Quitar estado activo de todas las pestañas */
  document.querySelectorAll('.nav-tab').forEach(function(tab) {
    tab.classList.remove('active');
  });

  /* Mostrar la sección correcta */
  document.getElementById(id).classList.add('active');

  /* Marcar la pestaña pulsada */
  if (btn) {
    btn.classList.add('active');
  }

  /* Scroll suave al tope */
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ============================================================
   2. ABRIR WHATSAPP CON MENSAJE PRELLENADO
   - Lee los campos del formulario
   - Valida que nombre y teléfono no estén vacíos
   - Construye el mensaje en formato legible
   - Abre wa.me con el número de la unidad
============================================================ */

function abrirWhatsApp() {

  /* Leer campos */
  var nombre   = document.getElementById('nombre').value.trim();
  var telefono = document.getElementById('telefono').value.trim();
  var servicio = document.getElementById('servicio').value;
  var motivo   = document.getElementById('motivo').value.trim();

  /* Validación mínima */
  if (!nombre || !telefono) {
    alert('Por favor ingresa tu nombre y número de WhatsApp para continuar.');
    return;
  }

  /* Armar mensaje */
  var msg = 'Hola, quiero agendar una cita en la Unidad Gastroenterológica.\n\n';
  msg += '*Nombre:* '   + nombre   + '\n';
  msg += '*Teléfono:* ' + telefono + '\n';

  if (servicio) {
    msg += '*Servicio:* ' + servicio + '\n';
  }

  if (motivo) {
    msg += '*Motivo:* ' + motivo + '\n';
  }

  msg += '\nQuedo pendiente de su confirmación. ¡Gracias!';

  /* Número WhatsApp Business de la unidad (formato internacional sin +) */
  var numero = '573125824128';

  /* Construir URL y abrir en pestaña nueva */
  var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}

/* ============================================================
   3. MODAL DE SERVICIOS
============================================================ */

/* Contenido de cada servicio */
var servicios = {
  'consulta-gastro': {
    icono: 'ti ti-stethoscope',
    titulo: 'Consulta en gastroenterología',
    descripcion: 'Valoración completa del sistema digestivo con el especialista. Se revisa tu historia clínica, síntomas y se define un plan diagnóstico y de tratamiento personalizado. Indicada para síntomas como acidez, dolor abdominal, cambios en el tránsito intestinal o control de enfermedades crónicas digestivas.'
  },
  'consulta-interna': {
    icono: 'ti ti-heart-rate-monitor',
    titulo: 'Consulta de medicina interna',
    descripcion: 'Atención integral del adulto enfocada en la detección y manejo de enfermedades sistémicas. El especialista evalúa múltiples órganos y sistemas para un diagnóstico preciso, coordinando el tratamiento de condiciones complejas que afectan la salud general.'
  },
  'endoscopia': {
    icono: 'ti ti-camera',
    titulo: 'Endoscopia digestiva alta',
    descripcion: 'Procedimiento que permite visualizar directamente el esófago, el estómago y el duodeno mediante un endoscopio flexible. Se realiza bajo sedación leve, dura aproximadamente 15 minutos y permite detectar lesiones, tomar biopsias y tratar algunas condiciones en el mismo momento.'
  },
  'colonoscopia': {
    icono: 'ti ti-search',
    titulo: 'Colonoscopia diagnóstica y preventiva',
    descripcion: 'Evaluación visual completa del intestino grueso para detectar pólipos, inflamación o signos de cáncer colorrectal. Es el estudio de referencia para la prevención del cáncer de colon. Se recomienda a partir de los 45 años o antes si hay antecedentes familiares.'
  },
  'polipectomia': {
    icono: 'ti ti-cut',
    titulo: 'Polipectomía',
    descripcion: 'Extirpación de pólipos del colon durante la colonoscopia. Los pólipos son crecimientos anormales que, si no se retiran, pueden convertirse en cáncer con el tiempo. El procedimiento es ambulatorio, no requiere incisiones y el paciente se recupera rápidamente.'
  },
  'balon': {
    icono: 'ti ti-scale',
    titulo: 'Balón gástrico',
    descripcion: 'Alternativa no quirúrgica para el manejo del sobrepeso y la obesidad. Se introduce un balón de silicona en el estómago mediante endoscopia, lo que genera sensación de saciedad y ayuda a reducir la ingesta de alimentos. El procedimiento es ambulatorio y el balón permanece entre 6 y 12 meses.'
  },
  'prueba-aliento': {
    icono: 'ti ti-flask',
    titulo: 'Prueba de aliento',
    descripcion: 'Examen no invasivo para detectar la bacteria Helicobacter pylori, principal causante de gastritis y úlceras gástricas. El paciente ingiere una solución y se analiza el aire espirado. No requiere endoscopia, es rápido, indoloro y muy preciso para confirmar o descartar la infección.'
  },
  'biopsias': {
    icono: 'ti ti-microscope',
    titulo: 'Toma de biopsias digestivas',
    descripcion: 'Durante la endoscopia o colonoscopia se toman pequeñas muestras de tejido de zonas sospechosas para análisis en laboratorio de patología. Permite diagnosticar con precisión inflamaciones, infecciones, lesiones precancerosas o cáncer digestivo en etapas tempranas.'
  }
};

/* Abrir modal */
function abrirModal(id) {
  var datos   = servicios[id];
  var overlay = document.getElementById('modal-overlay');

  document.getElementById('modal-icon').innerHTML  = '<i class="' + datos.icono + '"></i>';
  document.getElementById('modal-title').textContent = datos.titulo;
  document.getElementById('modal-body').textContent  = datos.descripcion;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; /* evita scroll de fondo */
}

/* Cerrar modal */
function cerrarModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* Ir a agendar desde el modal */
function irAgendar() {
  cerrarModal();
  showSection('agendamiento', document.querySelectorAll('.nav-tab')[2]);
}

/* Cerrar con tecla Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') cerrarModal();
});