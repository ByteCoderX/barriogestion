// Base de datos simulada de notificaciones
class NotificacionesDB {
    constructor() {
        this.notificaciones = [];
        this.usuarioActual = {
            id: 1,
            nombre: 'Admin Principal',
            rol: 'administrador'
        };
        this.initializeData();
    }

    initializeData() {
        if (this.notificaciones.length === 0) {
            const notificacionesIniciales = [
                {
                    id_notificacion: 1,
                    titulo: 'Mantenimiento de Áreas Comunes',
                    mensaje: 'Se realizará mantenimiento en el área de piscina el próximo sábado. La piscina permanecerá cerrada durante todo el día.',
                    prioridad: 'alta',
                    categoria: 'mantenimiento',
                    destinatarios: 'todos',
                    fecha_envio: '2024-12-20',
                    hora_envio: '09:00',
                    estado: 'enviada',
                    leidas: 45,
                    total_destinatarios: 120,
                    enviar_email: true,
                    enviar_sms: false,
                    fecha_creacion: '2024-12-15',
                    creado_por: this.usuarioActual.id
                },
                {
                    id_notificacion: 2,
                    titulo: 'Reunión de Consorcio',
                    mensaje: 'Se convoca a todos los propietarios a la reunión mensual de consorcio el día 25 de diciembre a las 18:00 hs.',
                    prioridad: 'media',
                    categoria: 'administrativo',
                    destinatarios: 'propietarios',
                    fecha_envio: '2024-12-22',
                    hora_envio: '10:00',
                    estado: 'programada',
                    leidas: 0,
                    total_destinatarios: 80,
                    enviar_email: true,
                    enviar_sms: true,
                    fecha_creacion: '2024-12-16',
                    creado_por: this.usuarioActual.id
                },
                {
                    id_notificacion: 3,
                    titulo: 'Corte de Agua Programado',
                    mensaje: 'Por trabajos de la empresa proveedora, habrá corte de agua el miércoles de 10:00 a 14:00 hs.',
                    prioridad: 'urgente',
                    categoria: 'corte_servicio',
                    destinatarios: 'todos',
                    fecha_envio: '2024-12-18',
                    hora_envio: '08:00',
                    estado: 'enviada',
                    leidas: 98,
                    total_destinatarios: 120,
                    enviar_email: true,
                    enviar_sms: true,
                    fecha_creacion: '2024-12-17',
                    creado_por: this.usuarioActual.id
                }
            ];
            this.notificaciones = notificacionesIniciales;
        }
    }

    getAllNotificaciones() {
        return this.notificaciones;
    }

    addNotificacion(notificacion) {
        const newId = this.notificaciones.length > 0 ? 
            Math.max(...this.notificaciones.map(n => n.id_notificacion)) + 1 : 1;
        
        const totalDestinatarios = this.calcularTotalDestinatarios(notificacion.destinatarios);
        
        const newNotificacion = {
            id_notificacion: newId,
            titulo: notificacion.titulo,
            mensaje: notificacion.mensaje,
            prioridad: notificacion.prioridad,
            categoria: notificacion.categoria,
            destinatarios: notificacion.destinatarios,
            fecha_envio: notificacion.fechaEnvio,
            hora_envio: notificacion.horaEnvio || '',
            estado: this.determinarEstado(notificacion.fechaEnvio, notificacion.horaEnvio),
            leidas: 0,
            total_destinatarios: totalDestinatarios,
            enviar_email: notificacion.enviarEmail || false,
            enviar_sms: notificacion.enviarSMS || false,
            fecha_creacion: new Date().toISOString().split('T')[0],
            creado_por: this.usuarioActual.id
        };

        this.notificaciones.push(newNotificacion);
        return newNotificacion;
    }

    determinarEstado(fechaEnvio, horaEnvio) {
        const ahora = new Date();
        const fechaEnvioDate = new Date(fechaEnvio);
        
        if (horaEnvio) {
            const [hora, minuto] = horaEnvio.split(':');
            fechaEnvioDate.setHours(parseInt(hora), parseInt(minuto));
        }
        
        if (fechaEnvioDate <= ahora) {
            return 'enviada';
        } else {
            return 'programada';
        }
    }

    calcularTotalDestinatarios(tipo) {
        const totales = {
            'todos': 120,
            'sector_a': 40,
            'sector_b': 45,
            'sector_c': 35,
            'propietarios': 80,
            'inquilinos': 40
        };
        return totales[tipo] || 0;
    }

    deleteNotificacion(id) {
        const index = this.notificaciones.findIndex(n => n.id_notificacion === id);
        if (index !== -1) {
            this.notificaciones.splice(index, 1);
            return true;
        }
        return false;
    }

    cancelarNotificacion(id) {
        const notificacion = this.notificaciones.find(n => n.id_notificacion === id);
        if (notificacion && (notificacion.estado === 'programada' || notificacion.estado === 'pendiente')) {
            notificacion.estado = 'cancelada';
            return true;
        }
        return false;
    }

    reenviarNotificacion(id) {
        const notificacion = this.notificaciones.find(n => n.id_notificacion === id);
        if (notificacion && notificacion.estado === 'enviada') {
            notificacion.leidas = 0;
            return true;
        }
        return false;
    }
}

// Inicializar base de datos
const db = new NotificacionesDB();

// Referencias DOM
const notificacionForm = document.getElementById('notificacionForm');
const alertContainer = document.getElementById('alertContainer');
const notificacionesTableBody = document.getElementById('notificacionesTableBody');

// Función para mostrar alertas
function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Actualizar estadísticas
function updateStats() {
    const notificaciones = db.getAllNotificaciones();
    const total = notificaciones.length;
    const enviadas = notificaciones.filter(n => n.estado === 'enviada').length;
    const pendientes = notificaciones.filter(n => n.estado === 'pendiente').length;
    const programadas = notificaciones.filter(n => n.estado === 'programada').length;

    document.getElementById('totalNotificaciones').textContent = total;
    document.getElementById('notificacionesEnviadas').textContent = enviadas;
    document.getElementById('notificacionesPendientes').textContent = pendientes;
    document.getElementById('notificacionesProgramadas').textContent = programadas;
}

// Renderizar tabla de notificaciones
function renderNotificacionesTable(notificaciones = null) {
    const datos = notificaciones || db.getAllNotificaciones();
    
    notificacionesTableBody.innerHTML = '';

    if (datos.length === 0) {
        notificacionesTableBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; color: #888;">
                    No hay notificaciones para mostrar
                </td>
            </tr>
        `;
        return;
    }

    datos.forEach(notif => {
        const row = document.createElement('tr');
        
        const horaDisplay = notif.hora_envio || '--:--';
        const porcentajeLeidas = notif.total_destinatarios > 0 ? 
            Math.round((notif.leidas / notif.total_destinatarios) * 100) : 0;
        
        const prioridadIcon = {
            'baja': '🟢',
            'media': '🟡',
            'alta': '🟠',
            'urgente': '🔴'
        };
        
        row.innerHTML = `
            <td>${notif.id_notificacion}</td>
            <td>${notif.titulo}</td>
            <td>${notif.categoria}</td>
            <td><span class="prioridad-${notif.prioridad}">${prioridadIcon[notif.prioridad]} ${notif.prioridad}</span></td>
            <td>${notif.destinatarios}</td>
            <td>${notif.fecha_envio} ${horaDisplay}</td>
            <td><span class="status status-${notif.estado}">${notif.estado}</span></td>
            <td>${notif.leidas}/${notif.total_destinatarios} (${porcentajeLeidas}%)</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-small" onclick="verDetalles(${notif.id_notificacion})" title="Ver detalles">Ver</button>
                    ${notif.estado === 'programada' || notif.estado === 'pendiente' ? 
                        `<button class="btn btn-small btn-danger" onclick="cancelarNotificacion(${notif.id_notificacion})" title="Cancelar">Cancelar</button>` :
                        notif.estado === 'enviada' ?
                        `<button class="btn btn-small btn-secondary" onclick="reenviarNotificacion(${notif.id_notificacion})" title="Reenviar">Reenviar</button>` :
                        ''
                    }
                    <button class="btn btn-small btn-danger" onclick="eliminarNotificacion(${notif.id_notificacion})" title="Eliminar">Eliminar</button>
                </div>
            </td>
        `;
        notificacionesTableBody.appendChild(row);
    });
}

// Filtrar notificaciones
function filtrarNotificaciones() {
    const estado = document.getElementById('filtroEstado').value;
    const prioridad = document.getElementById('filtroPrioridad').value;
    const categoria = document.getElementById('filtroCategoria').value;
    const texto = document.getElementById('buscarTexto').value.toLowerCase();
    
    let notificaciones = db.getAllNotificaciones();
    
    if (estado) {
        notificaciones = notificaciones.filter(n => n.estado === estado);
    }
    
    if (prioridad) {
        notificaciones = notificaciones.filter(n => n.prioridad === prioridad);
    }
    
    if (categoria) {
        notificaciones = notificaciones.filter(n => n.categoria === categoria);
    }
    
    if (texto) {
        notificaciones = notificaciones.filter(n => 
            n.titulo.toLowerCase().includes(texto) || 
            n.mensaje.toLowerCase().includes(texto)
        );
    }
    
    renderNotificacionesTable(notificaciones);
}

// Manejar envío del formulario
notificacionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(notificacionForm);
    const notificacionData = {
        titulo: formData.get('titulo'),
        mensaje: formData.get('mensaje'),
        prioridad: formData.get('prioridad'),
        categoria: formData.get('categoria'),
        destinatarios: formData.get('destinatarios'),
        fechaEnvio: formData.get('fechaEnvio'),
        horaEnvio: formData.get('horaEnvio'),
        enviarEmail: document.getElementById('enviarEmail').checked,
        enviarSMS: document.getElementById('enviarSMS').checked
    };

    // Validaciones
    const fechaEnvio = new Date(notificacionData.fechaEnvio);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaEnvio < hoy) {
        showAlert('La fecha de envío no puede ser anterior a hoy', 'error');
        return;
    }

    try {
        const newNotificacion = db.addNotificacion(notificacionData);
        const mensaje = newNotificacion.estado === 'enviada' ? 
            'Notificación enviada exitosamente' : 
            'Notificación programada exitosamente';
        showAlert(mensaje, 'success');
        notificacionForm.reset();
        renderNotificacionesTable();
        updateStats();
    } catch (error) {
        showAlert('Error al crear la notificación: ' + error.message, 'error');
    }
});

// Función para programar notificación
window.programarNotificacion = function() {
    const fechaInput = document.getElementById('fechaEnvio');
    const horaInput = document.getElementById('horaEnvio');
    
    if (!fechaInput.value || !horaInput.value) {
        showAlert('Para programar una notificación debes especificar fecha y hora', 'error');
        return;
    }
    
    // Disparar el submit normal del formulario
    notificacionForm.dispatchEvent(new Event('submit'));
};

// Función para cancelar notificación
window.cancelarNotificacion = function(id) {
    const notificacion = db.getAllNotificaciones().find(n => n.id_notificacion === id);
    
    if (!notificacion) {
        showAlert('Notificación no encontrada', 'error');
        return;
    }

    if (confirm(`¿Estás seguro de que deseas cancelar la notificación "${notificacion.titulo}"?`)) {
        if (db.cancelarNotificacion(id)) {
            showAlert('Notificación cancelada exitosamente', 'success');
            renderNotificacionesTable();
            updateStats();
        } else {
            showAlert('No se puede cancelar esta notificación', 'error');
        }
    }
};

// Función para reenviar notificación
window.reenviarNotificacion = function(id) {
    const notificacion = db.getAllNotificaciones().find(n => n.id_notificacion === id);
    
    if (!notificacion) {
        showAlert('Notificación no encontrada', 'error');
        return;
    }

    if (confirm(`¿Deseas reenviar la notificación "${notificacion.titulo}" a todos los destinatarios?`)) {
        if (db.reenviarNotificacion(id)) {
            showAlert('Notificación reenviada exitosamente', 'success');
            renderNotificacionesTable();
        } else {
            showAlert('Error al reenviar la notificación', 'error');
        }
    }
};

// Función para eliminar notificación
window.eliminarNotificacion = function(id) {
    const notificacion = db.getAllNotificaciones().find(n => n.id_notificacion === id);
    
    if (!notificacion) {
        showAlert('Notificación no encontrada', 'error');
        return;
    }

    if (confirm(`¿Estás seguro de que deseas eliminar la notificación "${notificacion.titulo}"?`)) {
        if (db.deleteNotificacion(id)) {
            showAlert('Notificación eliminada exitosamente', 'success');
            renderNotificacionesTable();
            updateStats();
        } else {
            showAlert('Error al eliminar la notificación', 'error');
        }
    }
};

// Función para ver detalles
window.verDetalles = function(id) {
    const notificacion = db.getAllNotificaciones().find(n => n.id_notificacion === id);
    
    if (!notificacion) {
        showAlert('Notificación no encontrada', 'error');
        return;
    }

    const porcentajeLeidas = notificacion.total_destinatarios > 0 ? 
        Math.round((notificacion.leidas / notificacion.total_destinatarios) * 100) : 0;

    const detalles = `
        <strong>Título:</strong> ${notificacion.titulo}<br>
        <strong>Categoría:</strong> ${notificacion.categoria}<br>
        <strong>Prioridad:</strong> ${notificacion.prioridad}<br>
        <strong>Destinatarios:</strong> ${notificacion.destinatarios} (${notificacion.total_destinatarios} personas)<br>
        <strong>Fecha de envío:</strong> ${notificacion.fecha_envio} ${notificacion.hora_envio || ''}<br>
        <strong>Estado:</strong> ${notificacion.estado}<br>
        <strong>Leídas:</strong> ${notificacion.leidas}/${notificacion.total_destinatarios} (${porcentajeLeidas}%)<br>
        <strong>Enviado por email:</strong> ${notificacion.enviar_email ? 'Sí' : 'No'}<br>
        <strong>Enviado por SMS:</strong> ${notificacion.enviar_sms ? 'Sí' : 'No'}<br>
        <strong>Fecha de creación:</strong> ${notificacion.fecha_creacion}<br><br>
        <strong>Mensaje:</strong><br>
        <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem; margin-top: 0.5rem;">
            ${notificacion.mensaje}
        </div>
    `;

    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem;">
            <div style="background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(15px); padding: 2rem; border-radius: 1rem; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255, 255, 255, 0.2);">
                <h3 style="color: #ffffff; margin-bottom: 1rem; text-align: center;">📋 Detalles de la Notificación</h3>
                <div style="color: #f3f3f3; line-height: 1.8; margin-bottom: 1.5rem;">
                    ${detalles}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="btn" style="width: 100%;">Cerrar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// Establecer fecha mínima como hoy
document.getElementById('fechaEnvio').min = new Date().toISOString().split('T')[0];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderNotificacionesTable();
    updateStats();
});

// Manejo del menú hamburguesa
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}