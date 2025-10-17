// Base de datos simulada de reclamos
class ReclamosDB {
    constructor() {
        this.reclamos = [];
        this.usuarioActual = {
            id: 1,
            nombre: 'Admin Principal',
            rol: 'administrador', // 'administrador' o 'usuario'
            lote: 'Torre A - 301'
        };
        this.nextId = 1;
        this.initializeData();
    }

    initializeData() {
        if (this.reclamos.length === 0) {
            const reclamosIniciales = [
                {
                    id_reclamo: this.nextId++,
                    categoria: 'mantenimiento',
                    asunto: 'Fuga de agua en pasillo principal',
                    descripcion: 'Hay una fuga considerable de agua en el pasillo del tercer piso que está causando humedad en las paredes y piso resbaladizo.',
                    prioridad: 'urgente',
                    ubicacion: 'Torre A - Piso 3 - Pasillo',
                    estado: 'nuevo',
                    fecha_creacion: '2024-12-18',
                    usuario_id: 2,
                    usuario_nombre: 'Juan Pérez',
                    anonimo: false,
                    asignado_a: null,
                    fecha_asignacion: null,
                    fecha_resolucion: null,
                    comentarios_admin: '',
                    archivos: []
                },
                {
                    id_reclamo: this.nextId++,
                    categoria: 'areas_comunes',
                    asunto: 'Mejora en iluminación del estacionamiento',
                    descripcion: 'Sugiero instalar más luminarias en el estacionamiento subterráneo ya que hay zonas muy oscuras que generan inseguridad.',
                    prioridad: 'media',
                    ubicacion: 'Estacionamiento Subterráneo',
                    estado: 'en_proceso',
                    fecha_creacion: '2024-12-15',
                    usuario_id: 3,
                    usuario_nombre: 'María González',
                    anonimo: false,
                    asignado_a: 'Carlos Rodríguez',
                    fecha_asignacion: '2024-12-16',
                    fecha_resolucion: null,
                    comentarios_admin: 'Estamos evaluando presupuesto para instalación de nuevas luminarias LED.',
                    archivos: []
                },
                {
                    id_reclamo: this.nextId++,
                    categoria: 'ruidos',
                    asunto: 'Ruidos molestos en horario nocturno',
                    descripcion: 'El departamento del piso superior realiza ruidos molestos después de las 23:00 hs, afectando el descanso.',
                    prioridad: 'alta',
                    ubicacion: 'Torre B - Piso 5 - Dpto 502',
                    estado: 'resuelto',
                    fecha_creacion: '2024-12-10',
                    usuario_id: 4,
                    usuario_nombre: 'Anónimo',
                    anonimo: true,
                    asignado_a: 'Ana Martínez',
                    fecha_asignacion: '2024-12-11',
                    fecha_resolucion: '2024-12-17',
                    comentarios_admin: 'Se habló con el vecino del piso superior. Comprometido a respetar horarios de descanso.',
                    archivos: []
                },
                {
                    id_reclamo: this.nextId++,
                    categoria: 'administrativo',
                    asunto: 'Consulta sobre expensas del mes',
                    descripcion: 'Necesito información detallada sobre el incremento en las expensas del mes de diciembre.',
                    prioridad: 'baja',
                    ubicacion: 'Torre C - Dpto 101',
                    estado: 'cerrado',
                    fecha_creacion: '2024-12-05',
                    usuario_id: 5,
                    usuario_nombre: 'Roberto Silva',
                    anonimo: false,
                    asignado_a: 'Admin Principal',
                    fecha_asignacion: '2024-12-05',
                    fecha_resolucion: '2024-12-06',
                    comentarios_admin: 'Se envió detalle de expensas por email. Incremento por trabajos extraordinarios de mantenimiento.',
                    archivos: []
                }
            ];
            this.reclamos = reclamosIniciales;
        }
    }

    getAllReclamos() {
        // Si es usuario normal, solo ver sus propios reclamos
        if (this.usuarioActual.rol === 'usuario') {
            return this.reclamos.filter(r => r.usuario_id === this.usuarioActual.id);
        }
        // Si es admin, ver todos
        return this.reclamos;
    }

    addReclamo(reclamo) {
        const newReclamo = {
            id_reclamo: this.nextId++,
            categoria: reclamo.categoria,
            asunto: reclamo.asunto,
            descripcion: reclamo.descripcion,
            prioridad: reclamo.prioridad,
            ubicacion: reclamo.ubicacion,
            estado: 'nuevo',
            fecha_creacion: new Date().toISOString().split('T')[0],
            usuario_id: this.usuarioActual.id,
            usuario_nombre: reclamo.anonimo ? 'Anónimo' : this.usuarioActual.nombre,
            anonimo: reclamo.anonimo || false,
            asignado_a: null,
            fecha_asignacion: null,
            fecha_resolucion: null,
            comentarios_admin: '',
            archivos: []
        };

        this.reclamos.unshift(newReclamo);
        return newReclamo;
    }

    updateEstado(id, nuevoEstado, comentarios = '', asignadoA = null) {
        const reclamo = this.reclamos.find(r => r.id_reclamo === id);
        if (reclamo) {
            reclamo.estado = nuevoEstado;
            if (comentarios) {
                reclamo.comentarios_admin = comentarios;
            }
            if (asignadoA && !reclamo.asignado_a) {
                reclamo.asignado_a = asignadoA;
                reclamo.fecha_asignacion = new Date().toISOString().split('T')[0];
            }
            if (nuevoEstado === 'resuelto' || nuevoEstado === 'cerrado') {
                reclamo.fecha_resolucion = new Date().toISOString().split('T')[0];
            }
            return true;
        }
        return false;
    }

    deleteReclamo(id) {
        const index = this.reclamos.findIndex(r => r.id_reclamo === id);
        if (index !== -1) {
            this.reclamos.splice(index, 1);
            return true;
        }
        return false;
    }

    asignarReclamo(id, responsable) {
        const reclamo = this.reclamos.find(r => r.id_reclamo === id);
        if (reclamo) {
            reclamo.asignado_a = responsable;
            reclamo.fecha_asignacion = new Date().toISOString().split('T')[0];
            if (reclamo.estado === 'nuevo') {
                reclamo.estado = 'en_proceso';
            }
            return true;
        }
        return false;
    }
}

// Inicializar base de datos
const dbReclamos = new ReclamosDB();

// Referencias DOM
const reclamoForm = document.getElementById('reclamoForm');
const alertContainer = document.getElementById('alertContainer');
const reclamosTableBody = document.getElementById('reclamosTableBody');

// Función para mostrar alertas
function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Actualizar estadísticas
function updateStats() {
    const reclamos = dbReclamos.getAllReclamos();
    const total = reclamos.length;
    const nuevos = reclamos.filter(r => r.estado === 'nuevo').length;
    const enProceso = reclamos.filter(r => r.estado === 'en_proceso').length;
    const resueltos = reclamos.filter(r => r.estado === 'resuelto').length;
    const cerrados = reclamos.filter(r => r.estado === 'cerrado').length;

    document.getElementById('totalReclamos').textContent = total;
    document.getElementById('reclamosNuevosCount').textContent = nuevos;
    document.getElementById('reclamosEnProceso').textContent = enProceso;
    document.getElementById('reclamosResueltos').textContent = resueltos;
    document.getElementById('reclamosCerrados').textContent = cerrados;
    
    // Actualizar badge de notificaciones
    const badge = document.getElementById('reclamosNuevos');
    if (badge) {
        badge.textContent = nuevos;
        badge.style.display = nuevos > 0 ? 'flex' : 'none';
    }
}

// Renderizar tabla de reclamos
function renderReclamosTable(reclamos = null) {
    const datos = reclamos || dbReclamos.getAllReclamos();
    
    reclamosTableBody.innerHTML = '';

    if (datos.length === 0) {
        reclamosTableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; color: #888;">
                    No hay reclamos para mostrar
                </td>
            </tr>
        `;
        return;
    }

    datos.forEach(reclamo => {
        const row = document.createElement('tr'); 
        const prioridadIcon = {
            'baja': '🟢',
            'media': '🟡',
            'alta': '🟠',
            'urgente': '🔴'
        };
        
        const esAdmin = dbReclamos.usuarioActual.rol === 'administrador';
        
        row.innerHTML = `
            <td>${reclamo.id_reclamo}</td>
            <td>${reclamo.fecha_creacion}</td>
            <td>${reclamo.asunto}</td>
            <td>${reclamo.categoria}</td>
            <td>${reclamo.ubicacion}</td>
            <td><span class="prioridad-${reclamo.prioridad}">${prioridadIcon[reclamo.prioridad]} ${reclamo.prioridad}</span></td>
            <td><span class="status status-${reclamo.estado}">${reclamo.estado.replace('_', ' ')}</span></td>
            <td>${reclamo.asignado_a || 'Sin asignar'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-small" onclick="verDetallesReclamo(${reclamo.id_reclamo})" title="Ver detalles">Ver</button>
                    ${esAdmin ? `
                        ${reclamo.estado === 'nuevo' ? 
                            `<button class="btn btn-small btn-secondary" onclick="asignarReclamo(${reclamo.id_reclamo})" title="Asignar">Asignar</button>` : 
                            reclamo.estado === 'en_proceso' ?
                            `<button class="btn btn-small btn-warning" onclick="resolverReclamo(${reclamo.id_reclamo})" title="Resolver">Resolver</button>` :
                            reclamo.estado === 'resuelto' ?
                            `<button class="btn btn-small" onclick="cerrarReclamo(${reclamo.id_reclamo})" title="Cerrar">Cerrar</button>` : ''
                        }
                        <button class="btn btn-small btn-danger" onclick="eliminarReclamo(${reclamo.id_reclamo})" title="Eliminar">Eliminar</button>
                    ` : ''}
                </div>
            </td>
        `;
        reclamosTableBody.appendChild(row);
    });
}

// Filtrar reclamos
function filtrarReclamos() {
    const estado = document.getElementById('filtroEstado').value;
    const categoria = document.getElementById('filtroCategoria').value;
    const prioridad = document.getElementById('filtroPrioridad').value;
    const fechaDesde = document.getElementById('filtroFechaDesde').value;
    const fechaHasta = document.getElementById('filtroFechaHasta').value;
    const texto = document.getElementById('buscarTexto').value.toLowerCase();
    
    let reclamos = dbReclamos.getAllReclamos();
    
    if (estado) {
        reclamos = reclamos.filter(r => r.estado === estado);
    }

    if (categoria) {
        reclamos = reclamos.filter(r => r.categoria === categoria);
    }
    
    if (prioridad) {
        reclamos = reclamos.filter(r => r.prioridad === prioridad);
    }
    
    if (fechaDesde) {
        reclamos = reclamos.filter(r => r.fecha_creacion >= fechaDesde);
    }
    
    if (fechaHasta) {
        reclamos = reclamos.filter(r => r.fecha_creacion <= fechaHasta);
    }
    
    if (texto) {
        reclamos = reclamos.filter(r => 
            r.asunto.toLowerCase().includes(texto) || 
            r.descripcion.toLowerCase().includes(texto) ||
            r.ubicacion.toLowerCase().includes(texto)
        );
    }
    
    renderReclamosTable(reclamos);
}

// Limpiar filtros
window.limpiarFiltros = function() {
    document.getElementById('filtroEstado').value = '';
    document.getElementById('filtroCategoria').value = '';
    document.getElementById('filtroPrioridad').value = '';
    document.getElementById('filtroFechaDesde').value = '';
    document.getElementById('filtroFechaHasta').value = '';
    document.getElementById('buscarTexto').value = '';
    renderReclamosTable();
};

// Manejar envío del formulario
reclamoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(reclamoForm);
    const reclamoData = {
        categoria: formData.get('categoria'),
        asunto: formData.get('asunto'),
        descripcion: formData.get('descripcion'),
        prioridad: formData.get('prioridad'),
        ubicacion: formData.get('ubicacion'),
        anonimo: document.getElementById('anonimo').checked
    };

    try {
        const newReclamo = dbReclamos.addReclamo(reclamoData);
        showAlert('Reclamo enviado exitosamente. Será atendido a la brevedad.', 'success');
        reclamoForm.reset();
        renderReclamosTable();
        updateStats();
    } catch (error) {
        showAlert('Error al enviar el reclamo: ' + error.message, 'error');
    }
});

// Función para asignar reclamo
window.asignarReclamo = function(id) {
    const responsable = prompt('Ingrese el nombre del responsable a asignar:');
    if (responsable && responsable.trim()) {
        if (dbReclamos.asignarReclamo(id, responsable.trim())) {
            showAlert('Reclamo asignado exitosamente', 'success');
            renderReclamosTable();
            updateStats();
        } else {
            showAlert('Error al asignar el reclamo', 'error');
        }
    }
};

// Función para resolver reclamo
window.resolverReclamo = function(id) {
    const comentarios = prompt('Ingrese comentarios sobre la resolución:');
    if (comentarios !== null) {
        if (dbReclamos.updateEstado(id, 'resuelto', comentarios)) {
            showAlert('Reclamo marcado como resuelto', 'success');
            renderReclamosTable();
            updateStats();
        } else {
            showAlert('Error al resolver el reclamo', 'error');
        }
    }
};

// Función para cerrar reclamo
window.cerrarReclamo = function(id) {
    if (confirm('¿Está seguro de que desea cerrar este reclamo?')) {
        if (dbReclamos.updateEstado(id, 'cerrado')) {
            showAlert('Reclamo cerrado exitosamente', 'success');
            renderReclamosTable();
            updateStats();
        } else {
            showAlert('Error al cerrar el reclamo', 'error');
        }
    }
};

// Función para eliminar reclamo
window.eliminarReclamo = function(id) {
    const reclamo = dbReclamos.getAllReclamos().find(r => r.id_reclamo === id);
    
    if (!reclamo) {
        showAlert('Reclamo no encontrado', 'error');
        return;
    }

    if (confirm(`¿Está seguro de que desea eliminar el reclamo "${reclamo.asunto}"?`)) {
        if (dbReclamos.deleteReclamo(id)) {
            showAlert('Reclamo eliminado exitosamente', 'success');
            renderReclamosTable();
            updateStats();
        } else {
            showAlert('Error al eliminar el reclamo', 'error');
        }
    }
};

// Función para ver detalles
window.verDetallesReclamo = function(id) {
    const reclamo = dbReclamos.getAllReclamos().find(r => r.id_reclamo === id);
    
    if (!reclamo) {
        showAlert('Reclamo no encontrado', 'error');
        return;
    }

    const detalles = `
        <div style="display: grid; gap: 0.5rem;">
            <div><strong>ID:</strong> #${reclamo.id_reclamo}</div>
            <div><strong>Categoría:</strong> ${reclamo.categoria}</div>
            <div><strong>Prioridad:</strong> ${reclamo.prioridad}</div>
            <div><strong>Estado:</strong> <span class="status status-${reclamo.estado}">${reclamo.estado.replace('_', ' ')}</span></div>
            <div><strong>Ubicación:</strong> ${reclamo.ubicacion}</div>
            <div><strong>Fecha de creación:</strong> ${reclamo.fecha_creacion}</div>
            <div><strong>Reportado por:</strong> ${reclamo.usuario_nombre}</div>
            ${reclamo.asignado_a ? `<div><strong>Asignado a:</strong> ${reclamo.asignado_a}</div>` : ''}
            ${reclamo.fecha_asignacion ? `<div><strong>Fecha de asignación:</strong> ${reclamo.fecha_asignacion}</div>` : ''}
            ${reclamo.fecha_resolucion ? `<div><strong>Fecha de resolución:</strong> ${reclamo.fecha_resolucion}</div>` : ''}
        </div>
        <hr style="border: 1px solid rgba(255,255,255,0.1); margin: 1rem 0;">
        <div>
            <strong>Asunto:</strong><br>
            <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 0.5rem; margin-top: 0.5rem;">
                ${reclamo.asunto}
            </div>
        </div>
        <div style="margin-top: 1rem;">
            <strong>Descripción:</strong><br>
            <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 0.5rem; margin-top: 0.5rem;">
                ${reclamo.descripcion}
            </div>
        </div>
        ${reclamo.comentarios_admin ? `
            <div style="margin-top: 1rem;">
                <strong>Comentarios del administrador:</strong><br>
                <div style="background: rgba(76, 175, 80, 0.1); padding: 0.75rem; border-radius: 0.5rem; margin-top: 0.5rem; border: 1px solid rgba(76, 175, 80, 0.3);">
                    ${reclamo.comentarios_admin}
                </div>
            </div>
        ` : ''}
    `;

    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; overflow-y: auto;">
            <div style="background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(15px); padding: 2rem; border-radius: 1rem; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(255, 255, 255, 0.2);">
                <h3 style="color: #ffffff; margin-bottom: 1.5rem; text-align: center;">📋 Detalles del Reclamo</h3>
                <div style="color: #f3f3f3; line-height: 1.8; margin-bottom: 1.5rem;">
                    ${detalles}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="btn" style="width: 100%;">Cerrar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// Función para exportar reclamos
window.exportarReclamos = function() {
    showAlert('Función de exportación en desarrollo', 'info');
};

// Función para generar reporte
window.generarReporte = function() {
    showAlert('Función de reporte en desarrollo', 'info');
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderReclamosTable();
    updateStats();
});

// Manejo del menú hamburguesa
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}