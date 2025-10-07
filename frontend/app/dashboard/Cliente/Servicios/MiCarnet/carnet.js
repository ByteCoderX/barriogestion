let currentTheme = localStorage.getItem("theme") || "dark";

document.addEventListener("DOMContentLoaded", function () {
  applyTheme(currentTheme);
});
// JavaScript para la funcionalidad de la sección de carnet
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar funcionalidades
  initializeCarnet();
  setupEventListeners();
  updateCarnetStatus();
  generateQRCode();
});

// Función para inicializar el carnet
function initializeCarnet() {
  // Simular carga de datos del usuario
  loadUserData();

  // Configurar eventos de las tarjetas
  setupCardEvents();

  console.log("Carnet inicializado correctamente");
}

// Función para configurar event listeners
function setupEventListeners() {
  // Event listeners para botones de acción
  const downloadBtn = document.querySelector('[onclick="downloadCarnet()"]');
  const shareBtn = document.querySelector('[onclick="shareCarnet()"]');

  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCarnet);
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", shareCarnet);
  }
}

// Función para cargar datos del usuario
function loadUserData() {
  // Datos simulados - en producción vendrían de una API
  const userData = {
    nombre: "Juan Carlos Pérez",
    lote: "Manzana A, Lote 15",
    dni: "35.678.901",
    tipo: "PROPIETARIO",
    vigencia: "31/12/2025",
    codigoSeguridad: "BG-2025-A15",
    fechaEmision: "01/01/2025",
    foto: "../assets/icons/user-avatar.png",
  };

  // Actualizar elementos del DOM
  //document.getElementById('userName').textContent = userData.nombre;
  document.getElementById("userLote").textContent = userData.lote;
  document.getElementById("userDNI").textContent = userData.dni;
  document.getElementById("userTipo").textContent = userData.tipo;
  document.getElementById("userVigencia").textContent = userData.vigencia;
  document.getElementById("securityCode").textContent =
    userData.codigoSeguridad;
  document.getElementById("issueDate").textContent = userData.fechaEmision;
  document.getElementById("userPhoto").src = userData.foto;
}

// Función para actualizar el estado del carnet
function updateCarnetStatus() {
  const vigenciaElement = document.getElementById("userVigencia");
  const fechaVencimiento = new Date("2025-12-31");
  const hoy = new Date();
  const diferenciaDias = Math.ceil(
    (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24)
  );

  if (diferenciaDias > 30) {
    vigenciaElement.classList.add("estado-vigente");
  } else if (diferenciaDias > 0) {
    vigenciaElement.classList.add("estado-por-vencer");
  } else {
    vigenciaElement.classList.add("estado-vencido");
  }
}

// Función para generar código QR
function generateQRCode() {
  // En producción, esto generaría un QR real con los datos del usuario
  const qrElement = document.getElementById("qrCode");

  // Simular QR con imagen placeholder
  qrElement.src = "../assets/icons/qr-placeholder.png";
  qrElement.alt = "Código QR - BG-2025-A15";
}

// Funciones de acciones
function downloadCarnet() {
  // Simular descarga de PDF
  showNotification("Descargando carnet en PDF...", "success");

  // En producción, aquí se generaría y descargaría el PDF
  setTimeout(() => {
    showNotification("Carnet descargado correctamente", "success");
  }, 2000);
}

function shareCarnet() {
  // Simular compartir carnet
  if (navigator.share) {
    navigator.share({
      title: "Mi Carnet Digital - Barrio Gestión",
      text: "Carnet digital para acceso al barrio",
      url: window.location.href,
    });
  } else {
    // Fallback para navegadores que no soportan Web Share API
    copyToClipboard(window.location.href);
    showNotification("Enlace copiado al portapapeles", "success");
  }
}

function editarInfo() {
  showNotification("Redirigiendo a edición de perfil...", "info");
  // En producción, redirigiría a la página de edición
  setTimeout(() => {
    window.location.href = "editar-perfil.php";
  }, 1500);
}

function renovarCarnet() {
  showNotification("Iniciando proceso de renovación...", "info");
  // En producción, abriría un modal o redirigiría al proceso de renovación
  setTimeout(() => {
    showNotification(
      "Proceso de renovación iniciado. Recibirás un email con los pasos a seguir.",
      "success"
    );
  }, 2000);
}

function reportarPerdida() {
  if (
    confirm(
      "¿Estás seguro de que deseas reportar la pérdida o daño de tu carnet de amenidades?"
    )
  ) {
    showNotification("Reportando problema...", "warning");

    setTimeout(() => {
      showNotification(
        "Problema reportado. El acceso a amenidades será desactivado temporalmente. Contacta administración para obtener un nuevo carnet.",
        "warning"
      );
    }, 2000);
  }
}

// Función para mostrar modal de horarios
function showModalHorarios() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Horarios de Amenidades</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="horario-item">
                    <div class="amenidad-info">
                        <img src="../assets/icons/swimming.png" alt="Piletas">
                        <div>
                            <h4>Piletas</h4>
                            <p>Lunes a Domingo: 8:00 - 22:00</p>
                        </div>
                    </div>
                </div>
                <div class="horario-item">
                    <div class="amenidad-info">
                        <img src="../assets/icons/gym.png" alt="Gimnasio">
                        <div>
                            <h4>Gimnasio</h4>
                            <p>Lunes a Viernes: 6:00 - 23:00<br>Sábados y Domingos: 8:00 - 21:00</p>
                        </div>
                    </div>
                </div>
                <div class="horario-item">
                    <div class="amenidad-info">
                        <img src="../assets/icons/sports.png" alt="Canchas">
                        <div>
                            <h4>Canchas Deportivas</h4>
                            <p>Lunes a Domingo: 7:00 - 22:00</p>
                        </div>
                    </div>
                </div>
                <div class="horario-item">
                    <div class="amenidad-info">
                        <img src="../assets/icons/events.png" alt="Espacios">
                        <div>
                            <h4>Espacios Multiusos</h4>
                            <p>Previa reserva - Consultar disponibilidad</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Cerrar modal al hacer clic fuera
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) {
    document.body.removeChild(modal);
  }
}

// Funciones de utilidad
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Estilos básicos
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  // Colores según tipo
  switch (type) {
    case "success":
      notification.style.backgroundColor = "#4CAF50";
      break;
    case "warning":
      notification.style.backgroundColor = "#ff6b35";
      break;
    case "error":
      notification.style.backgroundColor = "#ff4444";
      break;
    default:
      notification.style.backgroundColor = "#2196F3";
  }

  document.body.appendChild(notification);

  // Mostrar notificación
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Ocultar después de 3 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback para navegadores más antiguos
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

// Funciones de utilidad para el carnet
const CarnetUtils = {
  formatearFecha: function (fecha) {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  },

  calcularDiasVencimiento: function (fechaVencimiento) {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
    return diferencia;
  },

  validarCarnet: function () {
    const fechaVencimiento = new Date("2025-12-31");
    const hoy = new Date();
    return fechaVencimiento > hoy;
  },

  generarCodigoSeguridad: function (lote, año) {
    // Generar código único basado en lote y año
    const codigo = `BG-${año}-${lote.replace(/[^A-Z0-9]/g, "")}`;
    return codigo;
  },
};

// Función para validar y actualizar estado del carnet
function validateCarnetStatus() {
  const isValid = CarnetUtils.validarCarnet();
  const diasRestantes = CarnetUtils.calcularDiasVencimiento("2025-12-31");

  const statusIndicator = document.createElement("div");
  statusIndicator.className = "carnet-status";

  if (!isValid) {
    statusIndicator.innerHTML =
      '<span class="estado-vencido">CARNET VENCIDO</span>';
  } else if (diasRestantes <= 30) {
    statusIndicator.innerHTML = `<span class="estado-por-vencer">VENCE EN ${diasRestantes} DÍAS</span>`;
  } else {
    statusIndicator.innerHTML = '<span class="estado-vigente">VIGENTE</span>';
  }

  // Insertar indicador en el carnet
  const carnetInfo = document.querySelector(".carnet-info");
  if (carnetInfo && !document.querySelector(".carnet-status")) {
    carnetInfo.appendChild(statusIndicator);
  }
}
// Funciones para el selector de tema
function setTheme(theme) {
  currentTheme = theme;
  applyTheme(theme);
  localStorage.setItem("theme", theme);
}

function applyTheme(theme) {
  const body = document.body;

  // Remover todas las clases de tema
  body.classList.remove("theme-dark", "theme-light", "theme-nature");

  // Aplicar el tema seleccionado
  if (theme === "light") {
    body.classList.add("theme-light");
  } else if (theme === "nature") {
    body.classList.add("theme-nature");
  }
  // El tema oscuro no necesita clase adicional (es el por defecto)
}

function toggleThemeMenu() {
  // Esta función puede ser usada si quieres controlar el menú por JavaScript
  // Por ahora el menú se controla con CSS hover
}
