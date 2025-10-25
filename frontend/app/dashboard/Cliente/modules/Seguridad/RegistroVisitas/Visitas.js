// Datos del cliente logueado (simulated)
const clienteData = {
    id: 123,
    nombre: "Juan Carlos Pérez",
    lote: "Lote 15"
};

let currentTheme = localStorage.getItem('theme') || 'dark';

// Aplicar tema guardado al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    applyTheme(currentTheme);
});

// Base de datos de visitas del cliente (solo las autorizadas por él)
const misVisitas = [
    {
        id: 1,
        nombre: "María Elena Rodríguez",
        dni: "35420891",
        telefono: "+54 9 11 4785-2341",
        fecha: "2024-09-20",
        hora_desde: "14:30",
        hora_hasta: "18:00",
        tipo: "temporal",
        motivo: "familiar",
        estado: "autorizada",
        observaciones: "Visita de fin de semana, familiar directo"
    },
    {
        id: 2,
        nombre: "Carlos Eduardo Fernández",
        dni: "28756439",
        telefono: "+54 9 11 5642-8973",
        fecha: "2024-09-19",
        hora_desde: "09:00",
        hora_hasta: "17:30",
        tipo: "una_vez",
        motivo: "trabajo",
        estado: "activa",
        observaciones: "Técnico en aire acondicionado"
    },
    {
        id: 3,
        nombre: "Ana Sofía González",
        dni: "41235678",
        telefono: "+54 9 11 3456-7890",
        fecha: "2024-09-18",
        hora_desde: "19:30",
        hora_hasta: "23:00",
        tipo: "una_vez",
        motivo: "social",
        estado: "completada",
        observaciones: "Reunión social"
    },
    {
        id: 4,
        nombre: "Roberto Silva",
        dni: "33987654",
        telefono: "+54 9 11 7890-1234",
        fecha: "2024-09-17",
        hora_desde: "11:45",
        hora_hasta: "12:15",
        tipo: "una_vez",
        motivo: "delivery",
        estado: "completada",
        observaciones: "Entrega de pedidos"
    },
    {
        id: 5,
        nombre: "Lucía Isabel Martínez",
        dni: "37654321",
        telefono: "+54 9 11 2345-6789",
        fecha: "2024-09-21",
        hora_desde: "16:00",
        hora_hasta: "18:00",
        tipo: "permanente",
        motivo: "mantenimiento",
        estado: "cancelada",
        observaciones: "Trabajo de jardinería - Cancelado por lluvia"
    }
];

let visitasFiltradas = [...misVisitas];

// Mapeos de texto
const motivosTexto = {
    'familiar': 'Visita Familiar',
    'social': 'Visita Social',
    'trabajo': 'Trabajo/Servicio',
    'delivery': 'Delivery',
    'mantenimiento': 'Mantenimiento',
    'evento': 'Evento'
};

const tiposTexto = {
    'una_vez': 'Una Vez',
    'temporal': 'Temporal',
    'permanente': 'Permanente'
};

const estadosTexto = {
    'autorizada': 'Autorizada',
    'activa': 'En Curso',
    'completada': 'Completada',
    'cancelada': 'Cancelada'
};

// Inicializar página
function inicializarPagina() {
    cargarTabla(misVisitas);
    actualizarEstadisticas();
}

// Cargar tabla
function cargarTabla(visitas) {
    const tbody = document.getElementById('visitasTableBody');
    tbody.innerHTML = '';

    visitas.forEach(visita => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
                    <td>${visita.nombre}</td>
                    <td>${visita.dni}</td>
                    <td>${visita.telefono}</td>
                    <td>${formatearFechaVisualizacion(visita.fecha)}</td>
                    <td>${visita.hora_desde} - ${visita.hora_hasta}</td>
                    <td><span class="tipo-visita tipo-${visita.tipo}">${tiposTexto[visita.tipo]}</span></td>
                    <td>${motivosTexto[visita.motivo]}</td>
                    <td><span class="status status-${visita.estado}">${estadosTexto[visita.estado]}</span></td>
                    <td class="action-buttons">
                        ${visita.estado === 'autorizada' ?
                `<button class="btn-action btn-cancel" onclick="mostrarModalCancelar(${visita.id})">Cancelar</button>
                             <button class="btn-action btn-edit" onclick="mostrarModalEditar(${visita.id})">Editar</button>`
                : ''}
                    </td>
                `;

        tbody.appendChild(fila);
    });
}

// Formatear fecha
function formatearFechaVisualizacion(fecha) {
    const [ano, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    const hoy = new Date().toISOString().split('T')[0];
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    const stats = {
        autorizadas: visitasFiltradas.filter(v => v.estado === 'autorizada').length,
        activas: visitasFiltradas.filter(v => v.estado === 'activa' && v.fecha === hoy).length,
        pendientes: visitasFiltradas.filter(v => v.estado === 'autorizada' && v.fecha >= hoy).length,
        esteMes: visitasFiltradas.filter(v => v.fecha >= inicioMes).length
    };

    document.getElementById('visitasAutorizadas').textContent = stats.autorizadas;
    document.getElementById('visitasActivas').textContent = stats.activas;
    document.getElementById('visitasPendientes').textContent = stats.pendientes;
    document.getElementById('visitasEsteMes').textContent = stats.esteMes;
}

// Aplicar filtros
function aplicarFiltros() {
    const fecha = document.getElementById('fechaFiltro').value;
    const estado = document.getElementById('estadoFiltro').value;
    const tipo = document.getElementById('tipoFiltro').value;

    visitasFiltradas = misVisitas.filter(visita => {
        let cumpleFiltros = true;

        if (fecha && visita.fecha !== fecha) {
            cumpleFiltros = false;
        }
        if (estado && visita.estado !== estado) {
            cumpleFiltros = false;
        }
        if (tipo && visita.tipo !== tipo) {
            cumpleFiltros = false;
        }

        return cumpleFiltros;
    });

    cargarTabla(visitasFiltradas);
    actualizarEstadisticas();
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('fechaFiltro').value = '';
    document.getElementById('estadoFiltro').value = '';
    document.getElementById('tipoFiltro').value = '';

    visitasFiltradas = [...misVisitas];
    cargarTabla(visitasFiltradas);
    actualizarEstadisticas();
}

// Filtrar visitas de hoy
function filtrarVisitasHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaFiltro').value = hoy;
    aplicarFiltros();
}

// MODAL DE CONFIRMACIÓN PARA CANCELAR
function mostrarModalCancelar(id) {
    const visita = misVisitas.find(v => v.id === id);
    if (!visita) return;

    const modal = document.getElementById('modalCancelar');
    const nombreVisitante = document.getElementById('nombreVisitanteCancelar');
    
    nombreVisitante.textContent = visita.nombre;
    modal.dataset.visitaId = id;
    modal.classList.add('active');
}

function cerrarModalCancelar() {
    const modal = document.getElementById('modalCancelar');
    modal.classList.remove('active');
}

function confirmarCancelacion() {
    const modal = document.getElementById('modalCancelar');
    const visitaId = parseInt(modal.dataset.visitaId);
    
    const visitaIndex = misVisitas.findIndex(v => v.id === visitaId);
    if (visitaIndex !== -1) {
        misVisitas[visitaIndex].estado = 'cancelada';
        visitasFiltradas = [...misVisitas];
        cargarTabla(visitasFiltradas);
        actualizarEstadisticas();
        cerrarModalCancelar();
        mostrarNotificacion('Visita cancelada exitosamente', 'success');
    }
}

// MODAL DE EDICIÓN
function mostrarModalEditar(id) {
    const visita = misVisitas.find(v => v.id === id);
    if (!visita) return;

    // Llenar el formulario con los datos actuales
    document.getElementById('editId').value = visita.id;
    document.getElementById('editNombre').value = visita.nombre;
    document.getElementById('editDni').value = visita.dni;
    document.getElementById('editTelefono').value = visita.telefono;
    document.getElementById('editFecha').value = visita.fecha;
    document.getElementById('editHoraDesde').value = visita.hora_desde;
    document.getElementById('editHoraHasta').value = visita.hora_hasta;
    document.getElementById('editTipo').value = visita.tipo;
    document.getElementById('editMotivo').value = visita.motivo;
    document.getElementById('editObservaciones').value = visita.observaciones;

    const modal = document.getElementById('modalEditar');
    modal.classList.add('active');
}

function cerrarModalEditar() {
    const modal = document.getElementById('modalEditar');
    modal.classList.remove('active');
}

function guardarEdicion() {
    const id = parseInt(document.getElementById('editId').value);
    const visitaIndex = misVisitas.findIndex(v => v.id === id);
    
    if (visitaIndex !== -1) {
        // Actualizar los datos
        misVisitas[visitaIndex].nombre = document.getElementById('editNombre').value;
        misVisitas[visitaIndex].dni = document.getElementById('editDni').value;
        misVisitas[visitaIndex].telefono = document.getElementById('editTelefono').value;
        misVisitas[visitaIndex].fecha = document.getElementById('editFecha').value;
        misVisitas[visitaIndex].hora_desde = document.getElementById('editHoraDesde').value;
        misVisitas[visitaIndex].hora_hasta = document.getElementById('editHoraHasta').value;
        misVisitas[visitaIndex].tipo = document.getElementById('editTipo').value;
        misVisitas[visitaIndex].motivo = document.getElementById('editMotivo').value;
        misVisitas[visitaIndex].observaciones = document.getElementById('editObservaciones').value;

        visitasFiltradas = [...misVisitas];
        cargarTabla(visitasFiltradas);
        actualizarEstadisticas();
        cerrarModalEditar();
        mostrarNotificacion('Visita actualizada exitosamente', 'success');
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.add('show');
    }, 100);

    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Cerrar modales al hacer clic fuera
window.addEventListener("click", function (event) {
    const modalCancelar = document.getElementById('modalCancelar');
    const modalEditar = document.getElementById('modalEditar');
    
    if (event.target === modalCancelar) {
        cerrarModalCancelar();
    }
    if (event.target === modalEditar) {
        cerrarModalEditar();
    }
});

// Exportar mis visitas a Excel
function exportarMisVisitas() {
    // Crear el contenido HTML de la tabla para Excel
    let tabla = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
            <meta charset="UTF-8">
            <style>
                table { border-collapse: collapse; width: 100%; }
                th { background-color: #333333; color: white; font-weight: bold; padding: 10px; border: 1px solid #ddd; }
                td { padding: 8px; border: 1px solid #ddd; }
                tr:nth-child(even) { background-color: #f2f2f2; }
                .header { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                .info { margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="header">Registro de Visitas - ${clienteData.lote}</div>
            <div class="info">
                <strong>Propietario:</strong> ${clienteData.nombre}<br>
                <strong>Fecha de exportación:</strong> ${new Date().toLocaleDateString('es-AR')}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Visitante</th>
                        <th>DNI</th>
                        <th>Teléfono</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Tipo</th>
                        <th>Motivo</th>
                        <th>Estado</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>`;

    visitasFiltradas.forEach(visita => {
        tabla += `
            <tr>
                <td>${visita.nombre}</td>
                <td>${visita.dni}</td>
                <td>${visita.telefono}</td>
                <td>${formatearFechaVisualizacion(visita.fecha)}</td>
                <td>${visita.hora_desde} - ${visita.hora_hasta}</td>
                <td>${tiposTexto[visita.tipo]}</td>
                <td>${motivosTexto[visita.motivo]}</td>
                <td>${estadosTexto[visita.estado]}</td>
                <td>${visita.observaciones}</td>
            </tr>`;
    });

    tabla += `
                </tbody>
            </table>
        </body>
        </html>`;

    // Crear el blob y descargar como Excel
    const blob = new Blob([tabla], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Visitas_${clienteData.lote.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar notificación
    mostrarNotificacion('Excel descargado exitosamente', 'success');
}

// Funciones para el selector de tema
function setTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
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
    // Controlado por CSS hover
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    inicializarPagina();

    // Hamburguer menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
        });
    }

    // Event listeners para filtros
    document.getElementById('fechaFiltro').addEventListener('change', aplicarFiltros);
    document.getElementById('estadoFiltro').addEventListener('change', aplicarFiltros);
    document.getElementById('tipoFiltro').addEventListener('change', aplicarFiltros);
});