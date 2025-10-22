let currentTheme = localStorage.getItem('theme') || 'dark';

document.addEventListener('DOMContentLoaded', function() {
    applyTheme(currentTheme);
});

// Datos de los espacios
const espaciosData = {
    clubhouse: {
        nombre: 'Club House',
        descripcion: 'Salón de eventos para celebraciones y reuniones',
        capacidad: '150 personas',
        precio: 25000,
        sena: 12500,
        horarioInicio: 9,
        horarioFin: 23,
        icono: '../../Assets/icons/clubhouse.png',
        estado: 'disponible',
        detalles: [
            'Aire acondicionado',
            'Sistema de sonido incluido',
            'Iluminación profesional',
            'Cocina equipada',
            'Baños privados',
            'Estacionamiento incluido'
        ]
    },
    canchaTenis1: {
        nombre: 'Cancha de Tenis Nº1',
        descripcion: 'Cancha de tenis profesional con iluminación',
        capacidad: '4 jugadores',
        precio: 25000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/tennis.png',
        estado: 'disponible',
        detalles: [
            'Superficie profesional',
            'Red oficial',
            'Iluminación LED',
            'Raquetas disponibles',
            'Pelotas incluidas'
        ]
    },
    canchaTenis2: {
        nombre: 'Cancha de Tenis Nº2',
        descripcion: 'Cancha de tenis profesional con superficie rápida',
        capacidad: '4 jugadores',
        precio: 25000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/tennis.png',
        estado: 'disponible',
        detalles: [
            'Superficie rápida',
            'Red oficial',
            'Iluminación nocturna',
            'Raquetas disponibles',
            'Pelotas incluidas'
        ]
    },
    canchaFutbol1: {
        nombre: 'Cancha de Fútbol Nº1',
        descripcion: 'Cancha de fútbol 5 con césped sintético',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 3000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped sintético',
            'Arcos incluidos',
            'Iluminación nocturna',
            'Pelotas disponibles'
        ]
    },
    canchaFutbol2: {
        nombre: 'Cancha de Fútbol Nº2',
        descripcion: 'Cancha de fútbol 5 al aire libre',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 3000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Pasto natural',
            'Arcos incluidos',
            'Iluminación nocturna',
            'Vestuarios cercanos'
        ]
    },
    canchaFutbol3: {
        nombre: 'Cancha de Fútbol Nº3',
        descripcion: 'Cancha de fútbol 7 con césped natural',
        capacidad: '14 jugadores',
        precio: 20000,
        sena: 3000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped natural',
            'Arcos oficiales',
            'Iluminación nocturna',
            'Área de espectadores'
        ]
    },
    canchaFutbol4: {
        nombre: 'Cancha de Fútbol Nº4',
        descripcion: 'Cancha de fútbol 5 techada',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped sintético',
            'Arcos incluidos',
            'Iluminación LED',
            'Protección lateral techada'
        ]
    },
    canchaFutbol5: {
        nombre: 'Cancha de Fútbol Nº5',
        descripcion: 'Cancha de fútbol 5',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped sintético',
            'Arcos incluidos',
            'Pelotas disponibles'
        ]
    },

    quinchoMesa3: {
        nombre: 'Quincho Mesa Nº3',
        descripcion: 'Sector quincho con mesa exclusiva',
        capacidad: '10 personas',
        precio: 10000,
        sena: 2000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesa y bancos',
            'Baño cercano'
        ]
    },
    quinchoMesa4: {
        nombre: 'Quincho Mesa Nº4',
        descripcion: 'Sector quincho con mesa exclusiva',
        capacidad: '10 personas',
        precio: 10000,
        sena: 2000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesa y bancos',
            'Baño cercano'
        ]
    }
};

// Variables globales
let espacioSeleccionado = null;
let reservasUsuario = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Agregar CSS override para forzar el layout de tiras
    const style = document.createElement('style');
    style.textContent = `
        .espacios-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
            grid-template-columns: none !important;
        }
        .espacios-grid .espacio-card {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
    
    cargarEspaciosComoTiras();
    cargarReservasUsuario();
    configurarFechaMinima();
    configurarEventosFormulario();
});

// Cargar espacios como tiras horizontales
function cargarEspaciosComoTiras() {
    const espaciosGrid = document.querySelector('.espacios-grid');
    if (!espaciosGrid) return;

    // Cambiar el CSS del grid para mostrar como lista vertical
    espaciosGrid.classList.add('espacios-grid-vertical');

    espaciosGrid.innerHTML = '';

    Object.keys(espaciosData).forEach(espacioKey => {
        const espacio = espaciosData[espacioKey];
        const tiraEspacio = crearTiraEspacio(espacioKey, espacio);
        espaciosGrid.appendChild(tiraEspacio);
    });
}

// Crear tira horizontal para cada espacio
function crearTiraEspacio(espacioKey, espacio) {
    const tira = document.createElement('div');
    tira.className = 'espacio-tira';
    tira.dataset.espacio = espacioKey;

    tira.innerHTML = `
        <div class="espacio-imagen">
            <img src="${espacio.icono}" alt="${espacio.nombre}" class="espacio-icon">
        </div>
        <div class="espacio-info-principal">
            <div class="espacio-header">
                <h3 class="espacio-nombre">
                    ${espacio.nombre}
                </h3>
                <div class="espacio-status ${espacio.estado}">
                    Disponible
                </div>
            </div>
            <p class="espacio-descripcion">
                ${espacio.descripcion}
            </p>
            <div class="espacio-detalles">
                <span><strong>Capacidad:</strong> ${espacio.capacidad}</span>
                <span><strong>Horario:</strong> ${espacio.horarioInicio}:00 - ${espacio.horarioFin}:00</span>
            </div>
        </div>
        <div class="espacio-precio">
            <div class="precio-valor">
                ${espacio.precio === 0 ? 'Gratuito' : `${espacio.precio.toLocaleString()}`}
            </div>
        </div>
        <div class="ver-detalles">
            <button class="btn-reservar">
                Reservar
            </button>
        </div>
    `;

    // Agregar eventos sin usar estilos inline
    tira.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });

    tira.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });

    // Hacer toda la tira clickeable
    tira.addEventListener('click', function() {
        mostrarDetallesEspacio(espacioKey);
    });

    return tira;
}

// Mostrar modal con detalles del espacio
function mostrarDetallesEspacio(espacioKey) {
    const espacio = espaciosData[espacioKey];
    if (!espacio) return;

    // Crear modal de detalles
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay active modal-detalles';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalles del ${espacio.nombre}</h3>
                <button class="close-modal" onclick="cerrarModalDetalles()">×</button>
            </div>
            <div class="modal-body">
                <div class="detalle-espacio-header">
                    <img src="${espacio.icono}" alt="${espacio.nombre}" class="detalle-espacio-icon">
                    <h4 class="detalle-espacio-nombre">${espacio.nombre}</h4>
                    <p class="detalle-espacio-descripcion">${espacio.descripcion}</p>
                </div>

                <div class="detalles-grid">
                    <div class="detalle-column">
                        <h5 class="detalle-section-title">Información General</h5>
                        <div class="detail-item">
                            <span class="detail-label">Capacidad:</span>
                            <span class="detail-value">${espacio.capacidad}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Horario:</span>
                            <span class="detail-value">${espacio.horarioInicio}:00 - ${espacio.horarioFin}:00</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Precio:</span>
                            <span class="detail-value precio">
                                ${espacio.precio === 0 ? 'Gratuito' : `$${espacio.precio.toLocaleString()}`}
                            </span>
                        </div>
                        ${espacio.precio > 0 ? `
                        <div class="detail-item">
                            <span class="detail-label">Seña (50%):</span>
                            <span class="detail-value">$${espacio.sena.toLocaleString()}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="detalle-column">
                        <h5 class="detalle-section-title">Características</h5>
                        <ul class="caracteristicas-list">
                            ${espacio.detalles.map(detalle => `
                                <li class="caracteristica-item">
                                    • ${detalle}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="cerrarModalDetalles()">Volver</button>
                <button class="btn-primary" onclick="cerrarModalDetalles(); abrirModalReserva('${espacioKey}');">
                    Reservar Ahora
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);
}

// Cerrar modal de detalles
function cerrarModalDetalles() {
    const modal = document.querySelector('.modal-overlay:not(#modalReserva):not(#modalConfirmacion)');
    if (modal) {
        modal.remove();
    }
}

// Abrir modal de reserva
function abrirModalReserva(espacioKey) {
    espacioSeleccionado = espacioKey;
    const espacio = espaciosData[espacioKey];
    
    const modal = document.getElementById('modalReserva');
    const titulo = document.getElementById('modalTitulo');
    const precioInfo = document.getElementById('precioInfo');
    
    titulo.textContent = `Reservar ${espacio.nombre}`;
    
    // Mostrar información de precio solo si tiene costo
    if (espacio.precio > 0) {
        precioInfo.style.display = 'block';
        document.getElementById('precioTotal').textContent = `$${espacio.precio.toLocaleString()}`;
        document.getElementById('senaRequerida').textContent = `$${espacio.sena.toLocaleString()}`;
        document.getElementById('saldoRestante').textContent = `$${espacio.sena.toLocaleString()}`;
    } else {
        precioInfo.style.display = 'none';
    }
    
    cargarHorarios(espacio);
    modal.classList.add('active');
}

// Cargar horarios disponibles
function cargarHorarios(espacio) {
    const horaInicio = document.getElementById('horaInicio');
    const horaFin = document.getElementById('horaFin');
    
    horaInicio.innerHTML = '<option value="">Seleccionar hora</option>';
    horaFin.innerHTML = '<option value="">Seleccionar hora</option>';
    
    for (let hora = espacio.horarioInicio; hora < espacio.horarioFin; hora++) {
        const horaFormateada = `${hora.toString().padStart(2, '0')}:00`;
        horaInicio.innerHTML += `<option value="${hora}">${horaFormateada}</option>`;
    }
    
    // Actualizar horas de fin cuando se selecciona hora de inicio
    horaInicio.addEventListener('change', function() {
        const inicioSeleccionado = parseInt(this.value);
        horaFin.innerHTML = '<option value="">Seleccionar hora</option>';
        
        if (inicioSeleccionado) {
            for (let hora = inicioSeleccionado + 1; hora <= espacio.horarioFin; hora++) {
                const horaFormateada = `${hora.toString().padStart(2, '0')}:00`;
                horaFin.innerHTML += `<option value="${hora}">${horaFormateada}</option>`;
            }
        }
    });
}

// Cerrar modal de reserva
function cerrarModalReserva() {
    const modal = document.getElementById('modalReserva');
    modal.classList.remove('active');
    espacioSeleccionado = null;
    document.getElementById('formReserva').reset();
}

// Configurar fecha mínima (hoy)
function configurarFechaMinima() {
    const fechaInput = document.getElementById('fechaReserva');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.min = hoy;
    }
}

// Configurar eventos del formulario
function configurarEventosFormulario() {
    const form = document.getElementById('formReserva');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            procesarReserva();
        });
    }
}

// Procesar reserva
function procesarReserva() {
    const formData = new FormData(document.getElementById('formReserva'));
    const espacio = espaciosData[espacioSeleccionado];
    
    const reserva = {
        id: Date.now(),
        espacio: espacioSeleccionado,
        nombreEspacio: espacio.nombre,
        fecha: formData.get('fechaReserva'),
        horaInicio: formData.get('horaInicio'),
        horaFin: formData.get('horaFin'),
        cantidadPersonas: formData.get('cantidadPersonas'),
        observaciones: formData.get('observaciones'),
        precio: espacio.precio,
        sena: espacio.sena,
        estado: 'confirmada',
        fechaCreacion: new Date().toISOString()
    };
    
    // Agregar a reservas del usuario
    reservasUsuario.push(reserva);
    
    // Cerrar modal de reserva
    cerrarModalReserva();
    
    // Mostrar confirmación
    mostrarConfirmacion(reserva);
    
    // Actualizar lista de reservas
    cargarReservasUsuario();
}

// Mostrar modal de confirmación
function mostrarConfirmacion(reserva) {
    const modal = document.getElementById('modalConfirmacion');
    const mensaje = document.getElementById('mensajeConfirmacion');
    const detalle = document.getElementById('detalleConfirmacion');
    
    const fechaFormateada = new Date(reserva.fecha + 'T00:00:00').toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    mensaje.innerHTML = `Tu reserva para ${reserva.nombreEspacio} ha sido confirmada para el ${fechaFormateada}.`;
    
    detalle.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Espacio:</span>
            <span class="detail-value">${reserva.nombreEspacio}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Fecha:</span>
            <span class="detail-value">${fechaFormateada}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Horario:</span>
            <span class="detail-value">${reserva.horaInicio}:00 - ${reserva.horaFin}:00</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Personas:</span>
            <span class="detail-value">${reserva.cantidadPersonas}</span>
        </div>
        ${reserva.precio > 0 ? `
        <div class="detail-item">
            <span class="detail-label">Total:</span>
            <span class="detail-value">$${reserva.precio.toLocaleString()}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Seña requerida:</span>
            <span class="detail-value">$${reserva.sena.toLocaleString()}</span>
        </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
}

// Cerrar modal de confirmación
function cerrarModalConfirmacion() {
    const modal = document.getElementById('modalConfirmacion');
    modal.classList.remove('active');
}

// Cargar reservas del usuario
function cargarReservasUsuario() {
    const lista = document.getElementById('reservasLista');
    if (!lista) return;
    
    if (reservasUsuario.length === 0) {
        lista.innerHTML = `
            <div class="sin-reservas">
                <img src="../../assets/icons/misreservas.png" alt="Sin reservas">
                <p>No tienes reservas próximas</p>
            </div>
        `;
        return;
    }
    
    // Mostrar solo las próximas 3 reservas
    const proximasReservas = reservasUsuario
        .filter(reserva => new Date(reserva.fecha) >= new Date())
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 3);
    
    lista.innerHTML = proximasReservas.map(reserva => {
        const fechaFormateada = new Date(reserva.fecha + 'T00:00:00').toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'short'
        });
        
        return `
            <div class="reserva-item">
                <div class="reserva-info">
                    <h4>${reserva.nombreEspacio}</h4>
                    <p>${fechaFormateada} - ${reserva.horaInicio}:00 a ${reserva.horaFin}:00</p>
                </div>
                <div class="reserva-status ${reserva.estado}">
                    ${reserva.estado === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                </div>
            </div>
        `;
    }).join('');
}

// Ver todas las reservas
function verMisReservas() {
    // Por ahora solo mostrar un alert, podrías crear una página dedicada
    if (reservasUsuario.length === 0) {
        alert('No tienes reservas registradas.');
    } else {
        const resumen = reservasUsuario.map(reserva => 
            `${reserva.nombreEspacio} - ${reserva.fecha} (${reserva.estado})`
        ).join('\n');
        alert(`Tus reservas:\n\n${resumen}`);
    }
}

// Funciones para mantener compatibilidad con el HTML existente
window.abrirModalReserva = abrirModalReserva;
window.cerrarModalReserva = cerrarModalReserva;
window.cerrarModalConfirmacion = cerrarModalConfirmacion;
window.cerrarModalDetalles = cerrarModalDetalles;
window.verMisReservas = verMisReservas;

// Funciones para el selector de tema
function setTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
    const body = document.body;
    
    // Remover todas las clases de tema
    body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
    
    // Aplicar el tema seleccionado
    if (theme === 'light') {
        body.classList.add('theme-light');
    } else if (theme === 'nature') {
        body.classList.add('theme-nature');
    }
    // El tema oscuro no necesita clase adicional (es el por defecto)
}

function toggleThemeMenu() {
    // Esta función puede ser usada si quieres controlar el menú por JavaScript
    // Por ahora el menú se controla con CSS hover
}