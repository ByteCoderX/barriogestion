let currentTheme = localStorage.getItem('theme') || 'dark';
document.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);
});

async function cargarSettings() {
    const res = await fetch('../../../../../settings.json');
    return await res.json();
}
const settings = await cargarSettings();


// Datos de los espacios (se llenarán desde la API)
const espaciosData = {};
let espacioSeleccionado = null;
let reservasUsuario = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `.espacios-grid {display: flex !important;flex-direction: column !important;gap: 1rem !important;grid-template-columns: none !important;}.espacios-grid .espacio-card {display: none !important;}`;
    document.head.appendChild(style);
    cargarEspaciosDesdeAPI();
    cargarReservasUsuario();
    configurarFechaMinima();
    configurarEventosFormulario();
});

// =================== ESPACIOS ===================

// Cargar espacios desde API
async function cargarEspaciosDesdeAPI() {
    try {
        const res = await fetch(`${settings.API_URL}/bg/v1/spaces`, {
            method: 'GET',
            headers: { 'x-api-key': 'hola' },
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Error al obtener espacios (${res.status})`);
        const espacios = await res.json();
        espacios.forEach(e => {
            espaciosData[e.id] = {
                nombre: e.name,
                descripcion: e.description,
                capacidad: e.capacity,
                precio: e.price,
                sena: e.deposit || Math.floor(e.price / 2),
                horarioInicio: e.startHour,
                horarioFin: e.endHour,
                icono: e.icon,
                estado: e.status || 'disponible',
                detalles: e.features || []
            };
        });
        cargarEspaciosComoTiras();
    } catch (error) {
        console.error('Error al cargar espacios:', error);
    }
}

// Cargar espacios como tiras
function cargarEspaciosComoTiras() {
    const espaciosGrid = document.querySelector('.espacios-grid');
    if (!espaciosGrid) return;
    espaciosGrid.classList.add('espacios-grid-vertical');
    espaciosGrid.innerHTML = '';
    Object.keys(espaciosData).forEach(espacioKey => {
        const espacio = espaciosData[espacioKey];
        const tiraEspacio = crearTiraEspacio(espacioKey, espacio);
        espaciosGrid.appendChild(tiraEspacio);
    });
}

// Crear tira de espacio
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
                <h3 class="espacio-nombre">${espacio.nombre}</h3>
                <div class="espacio-status ${espacio.estado}">Disponible</div>
            </div>
            <p class="espacio-descripcion">${espacio.descripcion}</p>
            <div class="espacio-detalles">
                <span><strong>Capacidad:</strong> ${espacio.capacidad}</span>
                <span><strong>Horario:</strong> ${espacio.horarioInicio}:00 - ${espacio.horarioFin}:00</span>
            </div>
        </div>
        <div class="espacio-precio">
            <div class="precio-valor">${espacio.precio === 0 ? 'Gratuito' : `${espacio.precio.toLocaleString()}`}</div>
        </div>
        <div class="ver-detalles">
            <button class="btn-reservar">Reservar</button>
        </div>
    `;
    tira.addEventListener('mouseenter', () => tira.classList.add('hover'));
    tira.addEventListener('mouseleave', () => tira.classList.remove('hover'));
    tira.addEventListener('click', () => mostrarDetallesEspacio(espacioKey));
    return tira;
}

// Mostrar modal de detalles
function mostrarDetallesEspacio(espacioKey) {
    const espacio = espaciosData[espacioKey];
    if (!espacio) return;
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
                        <h5>Información General</h5>
                        <div><strong>Capacidad:</strong> ${espacio.capacidad}</div>
                        <div><strong>Horario:</strong> ${espacio.horarioInicio}:00 - ${espacio.horarioFin}:00</div>
                        <div><strong>Precio:</strong> ${espacio.precio === 0 ? 'Gratuito' : `$${espacio.precio}`}</div>
                        ${espacio.precio > 0 ? `<div><strong>Seña:</strong> $${espacio.sena}</div>` : ''}
                    </div>
                    <div class="detalle-column">
                        <h5>Características</h5>
                        <ul>${espacio.detalles.map(d => `<li>• ${d}</li>`).join('')}</ul>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="cerrarModalDetalles()">Volver</button>
                <button class="btn-primary" onclick="cerrarModalDetalles(); abrirModalReserva('${espacioKey}');">Reservar Ahora</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
}

function cerrarModalDetalles() {
    const modal = document.querySelector('.modal-overlay:not(#modalReserva):not(#modalConfirmacion)');
    if (modal) modal.remove();
}

// =================== RESERVAS ===================

// Abrir modal de reserva
function abrirModalReserva(espacioKey) {
    espacioSeleccionado = espacioKey;
    const espacio = espaciosData[espacioKey];
    const modal = document.getElementById('modalReserva');
    const titulo = document.getElementById('modalTitulo');
    const precioInfo = document.getElementById('precioInfo');
    titulo.textContent = `Reservar ${espacio.nombre}`;
    if (espacio.precio > 0) {
        precioInfo.style.display = 'block';
        document.getElementById('precioTotal').textContent = `$${espacio.precio}`;
        document.getElementById('senaRequerida').textContent = `$${espacio.sena}`;
        document.getElementById('saldoRestante').textContent = `$${espacio.sena}`;
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
        const h = `${hora.toString().padStart(2, '0')}:00`;
        horaInicio.innerHTML += `<option value="${hora}">${h}</option>`;
    }
    horaInicio.addEventListener('change', function () {
        const inicioSel = parseInt(this.value);
        horaFin.innerHTML = '<option value="">Seleccionar hora</option>';
        if (inicioSel) {
            for (let hora = inicioSel + 1; hora <= espacio.horarioFin; hora++) {
                const h = `${hora.toString().padStart(2, '0')}:00`;
                horaFin.innerHTML += `<option value="${hora}">${h}</option>`;
            }
        }
    });
}

function cerrarModalReserva() {
    const modal = document.getElementById('modalReserva');
    modal.classList.remove('active');
    espacioSeleccionado = null;
    document.getElementById('formReserva').reset();
}

// Configurar fecha mínima
function configurarFechaMinima() {
    const fechaInput = document.getElementById('fechaReserva');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.min = hoy;
    }
}

// Eventos del formulario
function configurarEventosFormulario() {
    const form = document.getElementById('formReserva');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            procesarReserva();
        });
    }
}

// Procesar reserva (POST /)
async function procesarReserva() {
    const formData = new FormData(document.getElementById('formReserva'));
    const espacio = espaciosData[espacioSeleccionado];
    const payload = {
        spaceId: Number(espacioSeleccionado),
        dni: localStorage.getItem('dni') || '12345678',
        reservationDate: new Date(formData.get('fechaReserva')),
        startTime: `${formData.get('horaInicio')}:00`,
        endTime: `${formData.get('horaFin')}:00`,
        peopleCount: Number(formData.get('cantidadPersonas')),
        observations: formData.get('observaciones') || ''
    };
    try {
        const res = await fetch(`${settings.API_URL}/bg/v1/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': 'hola' },
            body: JSON.stringify(payload),
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Error al crear reserva (${res.status})`);
        const data = await res.json();
        cerrarModalReserva();
        mostrarConfirmacion({
            nombreEspacio: espacio.nombre,
            fecha: formData.get('fechaReserva'),
            horaInicio: formData.get('horaInicio'),
            horaFin: formData.get('horaFin'),
            cantidadPersonas: formData.get('cantidadPersonas'),
            precio: espacio.precio,
            sena: espacio.sena,
            estado: 'confirmada'
        });
        await cargarReservasUsuario();
    } catch (error) {
        console.error('Error al enviar la reserva:', error);
        alert('Hubo un problema al crear la reserva.');
    }
}

// Mostrar confirmación
function mostrarConfirmacion(info) {
    const modal = document.getElementById('modalConfirmacion');
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Reserva Confirmada</h3>
                <button class="close-modal" onclick="cerrarModalConfirmacion()">×</button>
            </div>
            <div class="modal-body">
                <p>Has reservado <strong>${info.nombreEspacio}</strong></p>
                <p>Fecha: ${info.fecha}</p>
                <p>Hora: ${info.horaInicio} a ${info.horaFin}</p>
                <p>Cantidad de personas: ${info.cantidadPersonas}</p>
                ${info.precio > 0 ? `<p>Seña: $${info.sena}</p>` : ''}
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="cerrarModalConfirmacion()">Aceptar</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function cerrarModalConfirmacion() {
    const modal = document.getElementById('modalConfirmacion');
    modal.classList.remove('active');
}

// =================== MIS RESERVAS ===================

// Cargar reservas del usuario (GET /me/:dni)
async function cargarReservasUsuario() {
    const lista = document.getElementById('reservasLista');
    if (!lista) return;
    const dni = localStorage.getItem('dni') || '12345678';
    try {
        const res = await fetch(`${settings.API_URL}/bg/v1/me/${dni}`, {
            method: 'GET',
            headers: { 'x-api-key': 'hola' },
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Error al obtener reservas (${res.status})`);
        const reservas = await res.json();
        reservasUsuario = reservas; // actualizar array global
        if (!reservas || reservas.length === 0) {
            lista.innerHTML = `<div class="sin-reservas"><img src="../../../assets/icons/misreservas.png" alt="Sin reservas"><p>No tienes reservas próximas</p></div>`;
            return;
        }
        const proximas = reservas.filter(r => new Date(r.reservationDate) >= new Date())
            .sort((a, b) => new Date(a.reservationDate) - new Date(b.reservationDate))
            .slice(0, 3);
        lista.innerHTML = proximas.map(r => {
            const fecha = new Date(r.reservationDate).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
            return `<div class="reserva-item">
                        <div class="reserva-info">
                            <h4>${r.spaceName || 'Espacio reservado'}</h4>
                            <p>${fecha} - ${r.startTime} a ${r.endTime}</p>
                        </div>
                        <div class="reserva-status confirmada">Confirmada</div>
                    </div>`;
        }).join('');
    } catch (error) {
        console.error('Error al cargar reservas:', error);
        lista.innerHTML = `<p>No se pudieron cargar las reservas.</p>`;
    }
}

// Ver todas las reservas
function verMisReservas() {
    cargarReservasUsuario();
}
