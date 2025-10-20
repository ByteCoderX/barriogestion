// GestionarAccesos.js

// Datos de ejemplo - Personas actualmente en el barrio
let accesosActivos = [
    {
        id: 1,
        nombre: 'Roberto González',
        documento: '35789456',
        tipo: 'visita',
        lote: 'lote1',
        nombreLote: 'Lote 1',
        propietario: 'Juan Pérez',
        horaEntrada: '14:30',
        fechaEntrada: '2024-10-20',
        vehiculo: 'Ford Focus ABC123',
        observaciones: '',
        guardia: 'Pedro González'
    },
    {
        id: 2,
        nombre: 'Laura Fernández',
        documento: '33654987',
        tipo: 'empleado',
        lote: 'lote1',
        nombreLote: 'Lote 1',
        propietario: 'Juan Pérez',
        horaEntrada: '10:15',
        fechaEntrada: '2024-10-20',
        vehiculo: '',
        observaciones: 'Empleada doméstica',
        guardia: 'Jorge Ramírez'
    },
    {
        id: 3,
        nombre: 'Sofía Martínez',
        documento: '41258963',
        tipo: 'visita',
        lote: 'lote2',
        nombreLote: 'Lote 2',
        propietario: 'María García',
        horaEntrada: '08:30',
        fechaEntrada: '2024-10-20',
        vehiculo: '',
        observaciones: '',
        guardia: 'Pedro González'
    },
    {
        id: 4,
        nombre: 'Diego Castro',
        documento: '39874561',
        tipo: 'visita',
        lote: 'lote5',
        nombreLote: 'Lote 5',
        propietario: 'Roberto Sánchez',
        horaEntrada: '09:45',
        fechaEntrada: '2024-10-20',
        vehiculo: 'Chevrolet Cruze MNO654',
        observaciones: 'Visita familiar',
        guardia: 'Jorge Ramírez'
    },
    {
        id: 5,
        nombre: 'Servicios Express SA',
        documento: '30-71234567-8',
        tipo: 'proveedor',
        lote: 'lote3',
        nombreLote: 'Lote 3',
        propietario: 'Carlos López',
        horaEntrada: '12:45',
        fechaEntrada: '2024-10-20',
        vehiculo: 'Fiat Ducato GHI789',
        observaciones: 'Entrega de materiales',
        guardia: 'Luis Martín'
    }
];

// Últimas salidas registradas
let ultimasSalidas = [
    {
        nombre: 'Pedidos Ya - Juan Ramírez',
        documento: '40123456',
        tipo: 'delivery',
        horaSalida: '11:30',
        tiempoEstadia: '15 min'
    },
    {
        nombre: 'Carlos López',
        documento: '32456123',
        tipo: 'propietario',
        horaSalida: '09:00',
        tiempoEstadia: '12 horas'
    }
];

let accesosFiltrados = [...accesosActivos];
let accesoSeleccionado = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    cargarAccesosActivos();
    cargarUltimasSalidas();
    actualizarEstadisticas();
    iniciarReloj();
});

// Inicializar eventos
function inicializarEventos() {
    // Botones principales
    document.getElementById('registrarEntradaBtn').addEventListener('click', abrirModalEntrada);
    document.getElementById('registrarSalidaBtn').addEventListener('click', abrirModalSalidaRapida);
    document.getElementById('verHistorialBtn').addEventListener('click', irAHistorial);
    
    // Búsqueda y filtros
    document.getElementById('buscarPersona').addEventListener('input', buscarPersonaActiva);
    document.getElementById('filtroTipoRapido').addEventListener('change', filtrarPorTipo);
    
    // Formularios
    document.getElementById('entradaForm').addEventListener('submit', guardarEntrada);
    
    // Botones de cancelar
    document.getElementById('cancelarEntrada').addEventListener('click', cerrarModalEntrada);
    document.getElementById('cancelarSalida').addEventListener('click', cerrarModalConfirmarSalida);
    
    // Cerrar modales con X
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Búsqueda en modal de salida rápida
    document.getElementById('buscarPersonaSalida').addEventListener('input', buscarParaSalida);
    
    // Botones de modal de detalle
    document.getElementById('cerrarDetalleAcceso').addEventListener('click', cerrarModalDetalle);
    document.getElementById('registrarSalidaDesdeDetalle').addEventListener('click', registrarSalidaDesdeDetalle);
    
    // Confirmar salida
    document.getElementById('confirmarSalidaBtn').addEventListener('click', confirmarSalida);
}

// Cargar accesos activos en la tabla
function cargarAccesosActivos() {
    const tbody = document.getElementById('accesos-activos-tbody');
    tbody.innerHTML = '';
    
    if (accesosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">No hay personas actualmente en el barrio</td></tr>';
        return;
    }
    
    accesosFiltrados.forEach(acc => {
        const tr = document.createElement('tr');
        const tiempoTranscurrido = calcularTiempoTranscurrido(acc.fechaEntrada, acc.horaEntrada);
        
        tr.innerHTML = `
            <td><span class="estado-activo">● Activo</span></td>
            <td><strong>${acc.nombre}</strong></td>
            <td>${acc.documento}</td>
            <td><span class="badge tipo-${acc.tipo}">${getTipoNombre(acc.tipo)}</span></td>
            <td><strong>${acc.nombreLote}</strong><br><small style="color: #b8b8b8;">${acc.propietario}</small></td>
            <td><strong>${acc.horaEntrada}</strong></td>
            <td><span class="tiempo-transcurrido">${tiempoTranscurrido}</span></td>
            <td>${acc.vehiculo || '<span style="color: #666;">-</span>'}</td>
            <td class="acciones">
                <button class="btn-icon" onclick="verDetalleAcceso(${acc.id})" title="Ver detalle">
                    <img src="../../../assets/icons/eye.svg" alt="Ver">
                </button>
                <button class="btn-icon btn-salida" onclick="prepararSalida(${acc.id})" title="Registrar salida">
                    <img src="../../../assets/icons/actualizardatos.png" alt="Salida">
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Cargar últimas salidas
function cargarUltimasSalidas() {
    const lista = document.getElementById('recientes-lista');
    lista.innerHTML = '';
    
    if (ultimasSalidas.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #b8b8b8; padding: 1rem;">No hay salidas recientes</p>';
        return;
    }
    
    ultimasSalidas.forEach(salida => {
        const item = document.createElement('div');
        item.className = 'reciente-item';
        item.innerHTML = `
            <div class="reciente-info">
                <span class="badge tipo-${salida.tipo}">${getTipoNombre(salida.tipo)}</span>
                <strong>${salida.nombre}</strong>
                <span style="color: #b8b8b8;">DNI: ${salida.documento}</span>
            </div>
            <div class="reciente-hora">
                <span style="color: #ef4444;">Salida: ${salida.horaSalida}</span>
                <span style="color: #b8b8b8;">Estadía: ${salida.tiempoEstadia}</span>
            </div>
        `;
        lista.appendChild(item);
    });
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    const cards = document.querySelectorAll('.control-card');
    const activos = accesosActivos.length;
    
    // Calcular entradas y salidas del día (simulado)
    const entradasHoy = 89;
    const salidasHoy = 38;
    const alertas = accesosActivos.filter(a => {
        const tiempo = calcularTiempoEnMinutos(a.fechaEntrada, a.horaEntrada);
        return tiempo > 720; // Más de 12 horas
    }).length;
    
    cards[0].querySelector('.card-valor').textContent = activos;
    cards[1].querySelector('.card-valor').textContent = entradasHoy;
    cards[2].querySelector('.card-valor').textContent = salidasHoy;
    cards[3].querySelector('.card-valor').textContent = alertas;
    
    // Actualizar badge de activos
    const badgeActivo = document.querySelector('.badge-activo');
    if (badgeActivo) {
        badgeActivo.textContent = `● ${activos} Activos`;
    }
}

// Calcular tiempo transcurrido
function calcularTiempoTranscurrido(fecha, hora) {
    const entrada = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diffMs = ahora - entrada;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
        return `${diffMins} min`;
    } else {
        const horas = Math.floor(diffMins / 60);
        const minutos = diffMins % 60;
        return `${horas}h ${minutos}m`;
    }
}

// Calcular tiempo en minutos
function calcularTiempoEnMinutos(fecha, hora) {
    const entrada = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diffMs = ahora - entrada;
    return Math.floor(diffMs / 60000);
}

// Iniciar reloj para actualizar tiempos
function iniciarReloj() {
    setInterval(() => {
        const tiempos = document.querySelectorAll('.tiempo-transcurrido');
        tiempos.forEach((elem, index) => {
            if (accesosFiltrados[index]) {
                const acc = accesosFiltrados[index];
                elem.textContent = calcularTiempoTranscurrido(acc.fechaEntrada, acc.horaEntrada);
            }
        });
    }, 60000); // Actualizar cada minuto
}

// Abrir modales
function abrirModalEntrada() {
    document.getElementById('entradaForm').reset();
    document.getElementById('entradaModal').style.display = 'block';
}

function abrirModalSalidaRapida() {
    document.getElementById('buscarPersonaSalida').value = '';
    cargarListaPersonasSalida(accesosActivos);
    document.getElementById('salidaRapidaModal').style.display = 'block';
}

function cerrarModalEntrada() {
    document.getElementById('entradaModal').style.display = 'none';
}

function cerrarModalSalidaRapida() {
    document.getElementById('salidaRapidaModal').style.display = 'none';
}

function cerrarModalConfirmarSalida() {
    document.getElementById('confirmarSalidaModal').style.display = 'none';
    accesoSeleccionado = null;
}

function cerrarModalDetalle() {
    document.getElementById('detalleAccesoModal').style.display = 'none';
}

// Guardar entrada
function guardarEntrada(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipoEntrada').value;
    const lote = document.getElementById('loteEntrada').value;
    const nombre = document.getElementById('nombreEntrada').value;
    const documento = document.getElementById('documentoEntrada').value;
    const vehiculo = document.getElementById('vehiculoEntrada').value;
    const observaciones = document.getElementById('observacionesEntrada').value;
    
    const loteSeleccionado = document.querySelector(`#loteEntrada option[value="${lote}"]`);
    const propietario = loteSeleccionado ? loteSeleccionado.textContent.split(' - ')[1] : 'Desconocido';
    const nombreLote = loteSeleccionado ? loteSeleccionado.textContent.split(' - ')[0] : lote;
    
    const ahora = new Date();
    const horaEntrada = ahora.toTimeString().slice(0, 5);
    const fechaEntrada = ahora.toISOString().split('T')[0];
    
    const nuevaEntrada = {
        id: Date.now(),
        nombre,
        documento,
        tipo,
        lote,
        nombreLote,
        propietario,
        horaEntrada,
        fechaEntrada,
        vehiculo: vehiculo || '',
        observaciones: observaciones || '',
        guardia: 'Usuario Actual'
    };
    
    accesosActivos.unshift(nuevaEntrada);
    accesosFiltrados = [...accesosActivos];
    
    mostrarNotificacion('Entrada registrada correctamente', 'success');
    cerrarModalEntrada();
    cargarAccesosActivos();
    actualizarEstadisticas();
}

// Cargar lista de personas para salida
function cargarListaPersonasSalida(personas) {
    const lista = document.getElementById('listaPersonasSalida');
    lista.innerHTML = '';
    
    if (personas.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #b8b8b8; padding: 1rem;">No hay personas para registrar salida</p>';
        return;
    }
    
    personas.forEach(persona => {
        const item = document.createElement('div');
        item.className = 'persona-salida-item';
        item.onclick = () => prepararSalida(persona.id);
        item.innerHTML = `
            <div class="persona-salida-info">
                <strong>${persona.nombre}</strong>
                <span>DNI: ${persona.documento}</span>
                <span class="badge tipo-${persona.tipo}">${getTipoNombre(persona.tipo)}</span>
            </div>
            <div class="persona-salida-lote">
                <span>${persona.nombreLote}</span>
                <span style="color: #22c55e;">Entrada: ${persona.horaEntrada}</span>
            </div>
        `;
        lista.appendChild(item);
    });
}

// Buscar persona para salida
function buscarParaSalida(e) {
    const termino = e.target.value.toLowerCase();
    const filtrados = accesosActivos.filter(acc =>
        acc.nombre.toLowerCase().includes(termino) ||
        acc.documento.includes(termino)
    );
    cargarListaPersonasSalida(filtrados);
}

// Preparar salida
function prepararSalida(id) {
    const acceso = accesosActivos.find(a => a.id === id);
    if (!acceso) return;
    
    accesoSeleccionado = acceso;
    
    document.getElementById('confirmNombre').textContent = acceso.nombre;
    document.getElementById('confirmDocumento').textContent = acceso.documento;
    document.getElementById('confirmTipo').textContent = getTipoNombre(acceso.tipo);
    document.getElementById('confirmLote').textContent = `${acceso.nombreLote} - ${acceso.propietario}`;
    document.getElementById('confirmHoraEntrada').textContent = `${acceso.fechaEntrada} ${acceso.horaEntrada}`;
    document.getElementById('confirmTiempo').textContent = calcularTiempoTranscurrido(acceso.fechaEntrada, acceso.horaEntrada);
    document.getElementById('observacionesSalida').value = '';
    
    cerrarModalSalidaRapida();
    document.getElementById('confirmarSalidaModal').style.display = 'block';
}

// Confirmar salida
function confirmarSalida() {
    if (!accesoSeleccionado) return;
    
    const observaciones = document.getElementById('observacionesSalida').value;
    
    // Agregar a últimas salidas
    const ahora = new Date();
    const horaSalida = ahora.toTimeString().slice(0, 5);
    const tiempoEstadia = calcularTiempoTranscurrido(accesoSeleccionado.fechaEntrada, accesoSeleccionado.horaEntrada);
    
    ultimasSalidas.unshift({
        nombre: accesoSeleccionado.nombre,
        documento: accesoSeleccionado.documento,
        tipo: accesoSeleccionado.tipo,
        horaSalida: horaSalida,
        tiempoEstadia: tiempoEstadia
    });
    
    // Limitar a 10 últimas salidas
    if (ultimasSalidas.length > 10) {
        ultimasSalidas = ultimasSalidas.slice(0, 10);
    }
    
    // Eliminar de accesos activos
    accesosActivos = accesosActivos.filter(a => a.id !== accesoSeleccionado.id);
    accesosFiltrados = [...accesosActivos];
    
    mostrarNotificacion('Salida registrada correctamente', 'success');
    cerrarModalConfirmarSalida();
    cargarAccesosActivos();
    cargarUltimasSalidas();
    actualizarEstadisticas();
}

// Ver detalle de acceso
function verDetalleAcceso(id) {
    const acceso = accesosActivos.find(a => a.id === id);
    if (!acceso) return;
    
    accesoSeleccionado = acceso;
    
    const detalleContent = document.getElementById('detalleAccesoContent');
    detalleContent.innerHTML = `
        <div class="detalle-item">
            <strong>Estado:</strong>
            <span class="estado-activo">● Activo en el barrio</span>
        </div>
        <div class="detalle-item">
            <strong>Nombre:</strong>
            <span>${acceso.nombre}</span>
        </div>
        <div class="detalle-item">
            <strong>Documento:</strong>
            <span>${acceso.documento}</span>
        </div>
        <div class="detalle-item">
            <strong>Tipo de Acceso:</strong>
            <span class="badge tipo-${acceso.tipo}">${getTipoNombre(acceso.tipo)}</span>
        </div>
        <div class="detalle-item">
            <strong>Lote Destino:</strong>
            <span>${acceso.nombreLote}</span>
        </div>
        <div class="detalle-item">
            <strong>Propietario:</strong>
            <span>${acceso.propietario}</span>
        </div>
        <div class="detalle-item">
            <strong>Hora de Entrada:</strong>
            <span>${acceso.fechaEntrada} - ${acceso.horaEntrada}</span>
        </div>
        <div class="detalle-item">
            <strong>Tiempo en el Barrio:</strong>
            <span style="color: #3b82f6; font-weight: 600;">${calcularTiempoTranscurrido(acceso.fechaEntrada, acceso.horaEntrada)}</span>
        </div>
        <div class="detalle-item">
            <strong>Vehículo:</strong>
            <span>${acceso.vehiculo || 'Sin vehículo'}</span>
        </div>
        <div class="detalle-item">
            <strong>Guardia Entrada:</strong>
            <span>${acceso.guardia}</span>
        </div>
        <div class="detalle-item">
            <strong>Observaciones:</strong>
            <span>${acceso.observaciones || 'Sin observaciones'}</span>
        </div>
    `;
    
    document.getElementById('detalleAccesoModal').style.display = 'block';
}

// Registrar salida desde detalle
function registrarSalidaDesdeDetalle() {
    if (!accesoSeleccionado) return;
    cerrarModalDetalle();
    prepararSalida(accesoSeleccionado.id);
}

// Buscar persona activa
function buscarPersonaActiva(e) {
    const termino = e.target.value.toLowerCase();
    
    accesosFiltrados = accesosActivos.filter(acc =>
        acc.nombre.toLowerCase().includes(termino) ||
        acc.documento.includes(termino) ||
        acc.nombreLote.toLowerCase().includes(termino) ||
        acc.propietario.toLowerCase().includes(termino) ||
        acc.vehiculo.toLowerCase().includes(termino)
    );
    
    cargarAccesosActivos();
}

// Filtrar por tipo
function filtrarPorTipo() {
    const tipo = document.getElementById('filtroTipoRapido').value;
    
    if (tipo === 'todos') {
        accesosFiltrados = [...accesosActivos];
    } else {
        accesosFiltrados = accesosActivos.filter(acc => acc.tipo === tipo);
    }
    
    cargarAccesosActivos();
}

// Ir al historial
function irAHistorial() {
    // Aquí se redirigiría a la página de historial
    mostrarNotificacion('Redirigiendo al historial completo...', 'info');
    setTimeout(() => {
        window.location.href = '../Accesos/Accesos.php';
    }, 1000);
}

// Funciones auxiliares
function getTipoNombre(tipo) {
    const nombres = {
        propietario: 'Propietario',
        visita: 'Visita',
        proveedor: 'Proveedor',
        empleado: 'Empleado',
        delivery: 'Delivery'
    };
    return nombres[tipo] || tipo;
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notif = document.createElement('div');
    notif.className = `notificacion notificacion-${tipo}`;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}