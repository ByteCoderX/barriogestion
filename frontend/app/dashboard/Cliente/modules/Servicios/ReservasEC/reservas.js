// Datos de los espacios - Actualizado según amenities disponibles
const espaciosData = {
    // Canchas de Tenis
    canchaTenis1: {
        nombre: 'Cancha de tenis Nº 1',
        descripcion: 'Cancha de tenis profesional con iluminación',
        capacidad: '4 jugadores',
        precio: 25000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/tennis.png',
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
        nombre: 'Cancha de tenis Nº 2',
        descripcion: 'Cancha de tenis profesional con superficie rápida',
        capacidad: '4 jugadores',
        precio: 25000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/tennis.png',
        estado: 'disponible',
        detalles: [
            'Superficie rápida',
            'Red oficial',
            'Iluminación nocturna',
            'Raquetas disponibles',
            'Pelotas incluidas'
        ]
    },
    canchaTenis3: {
        nombre: 'Canchas de tenis Nº 3',
        descripcion: 'Cancha de tenis con iluminación nocturna',
        capacidad: '4 jugadores',
        precio: 25000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/tennis.png',
        estado: 'disponible',
        detalles: [
            'Superficie profesional',
            'Red oficial',
            'Iluminación nocturna',
            'Raquetas disponibles',
            'Pelotas incluidas'
        ]
    },
    
    // Cancha Polideportiva
    canchaPolideportiva: {
        nombre: 'CHANCHA POLIDEPORTIVA',
        descripcion: 'Cancha polideportiva multiuso',
        capacidad: '20 jugadores',
        precio: 30000,
        sena: 6000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Multiuso (fútbol, básquet, vóley)',
            'Iluminación profesional',
            'Césped sintético',
            'Arcos y aros incluidos',
            'Vestuarios disponibles'
        ]
    },
    
    // Club House
    clubhouse: {
        nombre: 'House',
        descripcion: 'Salón de eventos para celebraciones y reuniones',
        capacidad: '150 personas',
        precio: 50000,
        sena: 12500,
        horarioInicio: 9,
        horarioFin: 23,
        icono: '../../../assets/icons/clubhouse.png',
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
    
    // Mesas de Quincho
    mesasQuincho: {
        nombre: 'MESAS QUINCHO',
        descripcion: 'Sector quincho con mesas compartidas',
        capacidad: '40 personas',
        precio: 15000,
        sena: 3000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesas y bancos',
            'Baños cercanos',
            'Zona techada'
        ]
    },
    
    // Metegol y Playroom
    metegolPlayroom: {
        nombre: 'Metegol - Playroom',
        descripcion: 'Sala de juegos y entretenimiento',
        capacidad: '15 personas',
        precio: 0,
        sena: 0,
        horarioInicio: 8,
        horarioFin: 22,
        icono: '../../../assets/icons/clubhouse.png',
        estado: 'disponible',
        detalles: [
            'Metegol profesional',
            'Juegos de mesa',
            'Zona de recreación',
            'Gratuito para socios'
        ]
    },
    
    // Canchas de Fútbol
    canchaFutbol1: {
        nombre: 'Nº 1 - CANCHA DE FUTBOL',
        descripcion: 'Cancha de fútbol 5 con césped sintético',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 3000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped sintético',
            'Arcos incluidos',
            'Iluminación nocturna',
            'Pelotas disponibles'
        ]
    },
    canchaFutbol3: {
        nombre: 'Nº 3 - CANCHA DE FUTBOL',
        descripcion: 'Cancha de fútbol 7 con césped natural',
        capacidad: '14 jugadores',
        precio: 20000,
        sena: 3000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped natural',
            'Arcos oficiales',
            'Iluminación nocturna',
            'Área de espectadores'
        ]
    },
    canchaFutbol4: {
        nombre: 'Nº 4 - CANCHA DE FUTBOL',
        descripcion: 'Cancha de fútbol 5 techada',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped sintético',
            'Arcos incluidos',
            'Iluminación LED',
            'Protección lateral techada'
        ]
    },
    canchaFutbol5: {
        nombre: 'Nº 5 - CANCHA DE FUTBOL',
        descripcion: 'Cancha de fútbol 5',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 5000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Césped sintético',
            'Arcos incluidos',
            'Pelotas disponibles'
        ]
    },
    canchaFutbol2: {
        nombre: 'Nº2 CANCHA DE FUTBOL',
        descripcion: 'Cancha de fútbol 5 al aire libre',
        capacidad: '10 jugadores',
        precio: 20000,
        sena: 3000,
        horarioInicio: 7,
        horarioFin: 22,
        icono: '../../../assets/icons/futbol.png',
        estado: 'disponible',
        detalles: [
            'Pasto natural',
            'Arcos incluidos',
            'Iluminación nocturna',
            'Vestuarios cercanos'
        ]
    },
    
    // Quinchos individuales
    quinchoMesa1: {
        nombre: 'Quincho mesa Nº 1',
        descripcion: 'Sector quincho con mesa exclusiva',
        capacidad: '10 personas',
        precio: 10000,
        sena: 2000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesa y bancos',
            'Baño cercano'
        ]
    },
    quinchoMesa2: {
        nombre: 'Quincho mesa Nº 2',
        descripcion: 'Sector quincho con mesa exclusiva',
        capacidad: '10 personas',
        precio: 10000,
        sena: 2000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesa y bancos',
            'Baño cercano'
        ]
    },
    quinchoMesa3: {
        nombre: 'Quincho mesa Nº 3',
        descripcion: 'Sector quincho con mesa exclusiva',
        capacidad: '10 personas',
        precio: 10000,
        sena: 2000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesa y bancos',
            'Baño cercano'
        ]
    },
    quinchoMesa4: {
        nombre: 'Quincho mesa Nº 4',
        descripcion: 'Sector quincho con mesa exclusiva',
        capacidad: '10 personas',
        precio: 10000,
        sena: 2000,
        horarioInicio: 10,
        horarioFin: 22,
        icono: '../../../assets/icons/quincho.png',
        estado: 'disponible',
        detalles: [
            'Parrilla compartida',
            'Mesa y bancos',
            'Baño cercano'
        ]
    },
    
    // Ping Pong y Pool
    pingPongPlayroom: {
        nombre: 'Ping Pong - Playroom',
        descripcion: 'Mesa de ping pong en sala de juegos',
        capacidad: '8 personas',
        precio: 0,
        sena: 0,
        horarioInicio: 8,
        horarioFin: 22,
        icono: '../../../assets/icons/clubhouse.png',
        estado: 'disponible',
        detalles: [
            'Mesa profesional',
            'Paletas incluidas',
            'Pelotas disponibles',
            'Gratuito para socios'
        ]
    },
    poolPlayroom: {
        nombre: 'Pool - Playroom',
        descripcion: 'Mesa de pool en sala de juegos',
        capacidad: '8 personas',
        precio: 0,
        sena: 0,
        horarioInicio: 8,
        horarioFin: 22,
        icono: '../../../assets/icons/clubhouse.png',
        estado: 'disponible',
        detalles: [
            'Mesa profesional',
            'Tacos incluidos',
            'Bolas disponibles',
            'Gratuito para socios'
        ]
    }
};

// Variables globales
let espacioSeleccionado = null;
let reservasUsuario = [];
let currentTheme = 'dark';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Intentar recuperar tema del localStorage (si está disponible)
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            currentTheme = savedTheme;
            applyTheme(currentTheme);
        }
    } catch (e) {
        applyTheme(currentTheme);
    }
    
    cargarEspaciosComoTiras();
    cargarReservasDesdeStorage();
    cargarReservasUsuario();
    configurarFechaMinima();
    configurarEventosFormulario();
});

// Cargar espacios como tiras horizontales
function cargarEspaciosComoTiras() {
    const espaciosGrid = document.querySelector('.espacios-grid');
    if (!espaciosGrid) return;

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
                ${espacio.precio === 0 ? 'Gratuito' : `$${espacio.precio.toLocaleString()}`}
            </div>
        </div>
        <div class="ver-detalles">
            <button class="btn-reservar">
                Reservar
            </button>
        </div>
    `;

    tira.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });

    tira.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });

    tira.addEventListener('click', function() {
        mostrarDetallesEspacio(espacioKey);
    });

    return tira;
}

// Mostrar modal con detalles del espacio
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
    
    // Cerrar cualquier modal existente
    const modalExistente = document.getElementById('modalReserva');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Crear modal dinámicamente
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay active';
    modalOverlay.id = 'modalReserva';
    
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Reservar ${espacio.nombre}</h3>
                <button class="close-modal" onclick="cerrarModalReserva()">×</button>
            </div>
            <div class="modal-body">
                ${espacio.precio > 0 ? `
                <div class="precio-info">
                    <div class="precio-detalle">
                        <div class="precio-item">
                            <span>Precio total:</span>
                            <strong>$${espacio.precio.toLocaleString()}</strong>
                        </div>
                        <div class="precio-item">
                            <span>Seña requerida (50%):</span>
                            <strong>$${espacio.sena.toLocaleString()}</strong>
                        </div>
                        <div class="precio-item">
                            <span>Saldo restante:</span>
                            <strong>$${espacio.sena.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <form id="formReserva">
                    <div class="form-group">
                        <label for="fechaReserva">Fecha de reserva *</label>
                        <input type="date" id="fechaReserva" name="fechaReserva" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="horaInicio">Hora de inicio *</label>
                        <select id="horaInicio" name="horaInicio" required>
                            <option value="">Seleccionar hora</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="horaFin">Hora de fin *</label>
                        <select id="horaFin" name="horaFin" required>
                            <option value="">Seleccionar hora</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="cantidadPersonas">Cantidad de personas *</label>
                        <input type="number" id="cantidadPersonas" name="cantidadPersonas" min="1" max="${parseInt(espacio.capacidad)}" placeholder="Ej: 10" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="observaciones">Observaciones</label>
                        <textarea id="observaciones" name="observaciones" placeholder="Comentarios adicionales (opcional)"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="cerrarModalReserva()">Cancelar</button>
                <button class="btn-primary" onclick="procesarReserva()">Confirmar Reserva</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Configurar fecha mínima
    const fechaInput = document.getElementById('fechaReserva');
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.min = hoy;
    
    // Cargar horarios y configurar eventos
    cargarHorarios(espacio);
    
    // Prevenir cierre al hacer click dentro del modal
    const modalContent = modalOverlay.querySelector('.modal-content');
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Cerrar al hacer click en el overlay
    modalOverlay.addEventListener('click', function() {
        cerrarModalReserva();
    });
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
    if (modal) {
        modal.remove();
    }
    espacioSeleccionado = null;
    const form = document.getElementById('formReserva');
    if (form) {
        form.reset();
    }
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

// Validar disponibilidad de horarios
function validarDisponibilidad(espacioKey, fecha, horaInicio, horaFin) {
    return !reservasUsuario.some(reserva => 
        reserva.espacio === espacioKey &&
        reserva.fecha === fecha &&
        (
            (parseInt(horaInicio) >= parseInt(reserva.horaInicio) && parseInt(horaInicio) < parseInt(reserva.horaFin)) ||
            (parseInt(horaFin) > parseInt(reserva.horaInicio) && parseInt(horaFin) <= parseInt(reserva.horaFin)) ||
            (parseInt(horaInicio) <= parseInt(reserva.horaInicio) && parseInt(horaFin) >= parseInt(reserva.horaFin))
        )
    );
}

// Guardar reservas en localStorage
function guardarReservas() {
    try {
        localStorage.setItem('reservasUsuario', JSON.stringify(reservasUsuario));
    } catch (e) {
        console.log('No se pudieron guardar las reservas');
    }
}

// Cargar reservas desde localStorage
function cargarReservasDesdeStorage() {
    try {
        const reservasGuardadas = localStorage.getItem('reservasUsuario');
        if (reservasGuardadas) {
            reservasUsuario = JSON.parse(reservasGuardadas);
        }
    } catch (e) {
        reservasUsuario = [];
    }
}

// Procesar reserva
function procesarReserva() {
    const form = document.getElementById('formReserva');
    if (!form || !espacioSeleccionado) return;

    const formData = new FormData(form);
    const espacio = espaciosData[espacioSeleccionado];
    
    const reservaData = {
        fecha: formData.get('fechaReserva'),
        horaInicio: formData.get('horaInicio'),
        horaFin: formData.get('horaFin'),
        cantidadPersonas: formData.get('cantidadPersonas')
    };
    
    // Validar campos requeridos
    if (!reservaData.fecha || !reservaData.horaInicio || !reservaData.horaFin || !reservaData.cantidadPersonas) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Validar disponibilidad
    if (!validarDisponibilidad(espacioSeleccionado, reservaData.fecha, reservaData.horaInicio, reservaData.horaFin)) {
        alert('El espacio no está disponible en ese horario. Por favor, elige otro horario.');
        return;
    }
    
    const reserva = {
        id: Date.now(),
        espacio: espacioSeleccionado,
        nombreEspacio: espacio.nombre,
        fecha: reservaData.fecha,
        horaInicio: reservaData.horaInicio,
        horaFin: reservaData.horaFin,
        cantidadPersonas: reservaData.cantidadPersonas,
        observaciones: formData.get('observaciones'),
        precio: espacio.precio,
        sena: espacio.sena,
        estado: 'confirmada',
        fechaCreacion: new Date().toISOString()
    };
    
    reservasUsuario.push(reserva);
    guardarReservas();
    cerrarModalReserva();
    mostrarConfirmacion(reserva);
    cargarReservasUsuario();
}

// Mostrar modal de confirmación
function mostrarConfirmacion(reserva) {
    const modal = document.getElementById('modalConfirmacion');
    const mensaje = document.getElementById('mensajeConfirmacion');
    const detalle = document.getElementById('detalleConfirmacion');
    
    if (!modal || !mensaje || !detalle) return;
    
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
    if (modal) {
        modal.classList.remove('active');
    }
}

// Cargar reservas del usuario
function cargarReservasUsuario() {
    const lista = document.getElementById('reservasLista');
    if (!lista) return;
    
    const hoy = new Date().toISOString().split('T')[0];
    const proximasReservas = reservasUsuario
        .filter(reserva => reserva.fecha >= hoy)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    if (proximasReservas.length === 0) {
        lista.innerHTML = `
            <div class="sin-reservas">
                <img src="../../../assets/icons/misreservas.png" alt="Sin reservas">
                <p>No tienes reservas próximas</p>
            </div>
        `;
        return;
    }
    
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
                    <span class="reserva-personas">${reserva.cantidadPersonas} personas</span>
                </div>
                <div class="reserva-status ${reserva.estado}">
                    ${reserva.estado === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                </div>
            </div>
        `;
    }).join('');
}

// Ver todas las reservas
function verMisReservasModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Mis Reservas</h3>
                <button class="close-modal" onclick="cerrarModal(this)">×</button>
            </div>
            <div class="modal-body">
                ${reservasUsuario.length === 0 
                    ? '<p>No tienes reservas registradas.</p>' 
                    : reservasUsuario.map(r => `
                        <div class="reserva-item">
                            <h4>${r.nombreEspacio}</h4>
                            <p>${r.fecha} - ${r.horaInicio}:00 a ${r.horaFin}:00 (${r.estado})</p>
                        </div>
                    `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function cerrarModal(btn) {
    btn.closest('.modal-overlay').remove();
}

// Funciones para mantener compatibilidad con el HTML existente
window.abrirModalReserva = abrirModalReserva;
window.cerrarModalReserva = cerrarModalReserva;
window.cerrarModalConfirmacion = cerrarModalConfirmacion;
window.cerrarModalDetalles = cerrarModalDetalles;
window.verMisReservas = verMisReservasModal;

// Funciones para el selector de tema
function setTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.log('No se pudo guardar el tema');
    }
}

function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
    
    if (theme === 'light') {
        body.classList.add('theme-light');
    } else if (theme === 'nature') {
        body.classList.add('theme-nature');
    }
}

function toggleThemeMenu() {
    // Esta función puede ser usada si quieres controlar el menú por JavaScript
}

// Exponer funciones de tema para uso global
window.setTheme = setTheme;
window.applyTheme = applyTheme;
window.toggleThemeMenu = toggleThemeMenu;