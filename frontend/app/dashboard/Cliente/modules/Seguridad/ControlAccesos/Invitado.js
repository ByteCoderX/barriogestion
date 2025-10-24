// ============================================
// BASE DE DATOS EN MEMORIA
// ============================================
class InvitadosUsuarioDB {
    constructor() {
        this.usuarioActual = {
            id: 1,
            nombre: 'Juan Pérez',
            lote: 'Lote 15',
            telefono: '123456789'
        };
        this.invitados = [];
        this.initializeData();
    }

    initializeData() {
        const fechaFutura1 = new Date();
        fechaFutura1.setDate(fechaFutura1.getDate() + 5);
        const fechaFutura2 = new Date();
        fechaFutura2.setDate(fechaFutura2.getDate() + 2);

        this.invitados = [
            {
                id_invitado: 1,
                nombre: 'Roberto',
                apellido: 'González',
                dni: '12345678',
                telefono: '987654321',
                fecha_visita: fechaFutura1.toISOString().split('T')[0],
                hora_visita: '15:00',
                permiso: 'temporal',
                motivo: 'familiar',
                observaciones: 'Visita de fin de semana',
                estado: 'autorizada',
                fecha_creacion: new Date().toISOString().split('T')[0],
                usuario_solicitante: this.usuarioActual.id
            },
            {
                id_invitado: 2,
                nombre: 'Laura',
                apellido: 'Fernández',
                dni: '87654321',
                telefono: '456789123',
                fecha_visita: fechaFutura2.toISOString().split('T')[0],
                hora_visita: '10:30',
                permiso: 'una_vez',
                motivo: 'trabajo',
                observaciones: 'Técnico de reparaciones',
                estado: 'pendiente',
                fecha_creacion: new Date().toISOString().split('T')[0],
                usuario_solicitante: this.usuarioActual.id
            }
        ];
    }

    getInvitadosUsuario() {
        return this.invitados.filter(inv => inv.usuario_solicitante === this.usuarioActual.id);
    }

    addInvitado(invitado) {
        const newId = this.invitados.length > 0 ? Math.max(...this.invitados.map(v => v.id_invitado)) + 1 : 1;
        
        const newInvitado = {
            id_invitado: newId,
            nombre: invitado.nombre,
            apellido: invitado.apellido,
            dni: invitado.dni,
            telefono: invitado.telefono || '',
            fecha_visita: invitado.fechaVisita,
            hora_visita: invitado.horaVisita || '',
            permiso: invitado.permiso,
            motivo: invitado.motivo || '',
            observaciones: invitado.observaciones || '',
            estado: 'pendiente',
            fecha_creacion: new Date().toISOString().split('T')[0],
            usuario_solicitante: this.usuarioActual.id
        };

        this.invitados.push(newInvitado);
        return newInvitado;
    }

    deleteInvitado(id) {
        const index = this.invitados.findIndex(v => v.id_invitado === id && v.usuario_solicitante === this.usuarioActual.id);
        if (index !== -1) {
            if (this.invitados[index].estado === 'pendiente') {
                this.invitados.splice(index, 1);
                return true;
            }
            return false;
        }
        return false;
    }

    updateInvitado(id, datosActualizados) {
        const index = this.invitados.findIndex(v => v.id_invitado === id && v.usuario_solicitante === this.usuarioActual.id);
        if (index !== -1 && this.invitados[index].estado === 'pendiente') {
            Object.assign(this.invitados[index], datosActualizados);
            return true;
        }
        return false;
    }

    getUsuarioActual() {
        return this.usuarioActual;
    }

    getInvitadoById(id) {
        return this.invitados.find(inv => inv.id_invitado === id && inv.usuario_solicitante === this.usuarioActual.id);
    }
}

// Inicializar base de datos
const dbUsuario = new InvitadosUsuarioDB();

// ============================================
// SISTEMA DE TEMAS - CON PERSISTENCIA SIMULADA
// ============================================
// Simulación de persistencia usando una variable global en window
// Si no existe, intentar recuperar de localStorage o usar 'dark' por defecto
if (!window.appTheme) {
    window.appTheme = localStorage.getItem('theme') || 'dark';
}
let currentTheme = window.appTheme;

function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
    
    if (theme === 'light') {
        body.classList.add('theme-light');
    } else if (theme === 'nature') {
        body.classList.add('theme-nature');
    }
}

function setTheme(theme) {
    currentTheme = theme;
    window.appTheme = theme; // Guardar en variable global
    localStorage.setItem('theme', theme); // Persistir en localStorage
    applyTheme(theme);
}

function toggleThemeMenu() {
    // Controlado por CSS hover
}

// ============================================
// FUNCIONES DE UI
// ============================================
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

function updateUserInfo() {
    const usuarioElement = document.getElementById('usuarioNombre');
    if (usuarioElement) {
        usuarioElement.textContent = '';
    }
}
function updateStats() {
    const invitados = dbUsuario.getInvitadosUsuario();
    const total = invitados.length;
    const autorizados = invitados.filter(v => v.estado === 'autorizada').length;
    const pendientes = invitados.filter(v => v.estado === 'pendiente').length;
    const rechazados = invitados.filter(v => v.estado === 'rechazada').length;

    document.getElementById('misInvitados').textContent = total;
    document.getElementById('invitadosAutorizados').textContent = autorizados;
    document.getElementById('invitadosPendientes').textContent = pendientes;
    document.getElementById('invitadosRechazados').textContent = rechazados;
}

function renderInvitadosTable() {
    const invitados = dbUsuario.getInvitadosUsuario();
    const invitadosTableBody = document.getElementById('invitadosTableBody');
    
    invitadosTableBody.innerHTML = '';

    if (invitados.length === 0) {
        invitadosTableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; color: #888;">
                    No tienes invitados registrados aún
                </td>
            </tr>
        `;
        return;
    }

    invitados.forEach(invitado => {
        const row = document.createElement('tr');
        
        const horaDisplay = invitado.hora_visita || 'No especificada';
        const motivoDisplay = invitado.motivo || '-';
        
        row.innerHTML = `
            <td>${invitado.id_invitado}</td>
            <td>${invitado.nombre}</td>
            <td>${invitado.apellido}</td>
            <td>${invitado.dni}</td>
            <td>${invitado.fecha_visita}</td>
            <td>${horaDisplay}</td>
            <td>${invitado.permiso}</td>
            <td>${motivoDisplay}</td>
            <td><span class="status status-${invitado.estado}">${invitado.estado.charAt(0).toUpperCase() + invitado.estado.slice(1)}</span></td>
            <td>
                <div class="action-buttons">
                    ${invitado.estado === 'pendiente' ? 
                        `<button class="btn btn-small btn-edit" onclick="editarInvitado(${invitado.id_invitado})" title="Editar">Editar</button>
                         <button class="btn btn-small btn-delete" onclick="mostrarModalEliminar(${invitado.id_invitado})" title="Eliminar">Eliminar</button>` :
                        `<button class="btn btn-small btn-view" onclick="verDetalles(${invitado.id_invitado})" title="Ver detalles">Ver Detalles</button>`
                    }
                </div>
            </td>
        `;
        invitadosTableBody.appendChild(row);
    });
}

// ============================================
// VALIDACIONES
// ============================================
function validarDNI(dni) {
    const dniLimpio = dni.replace(/\D/g, '');
    return dniLimpio.length >= 7 && dniLimpio.length <= 8;
}

// ============================================
// MODALES
// ============================================
function mostrarModalEliminar(id) {
    const invitado = dbUsuario.getInvitadoById(id);
    
    if (!invitado) {
        showAlert('Invitado no encontrado', 'error');
        return;
    }

    if (invitado.estado !== 'pendiente') {
        showAlert('No puedes eliminar un invitado que ya fue procesado por el administrador', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-detalle active';
    modal.id = 'modalEliminar';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content modal-confirm">
            <div class="modal-header">
                <h2>Confirmar Eliminación</h2>
                <button class="btn-cerrar">&times;</button>
            </div>
            <div class="modal-body">
                <div class="confirm-message">
                    <div class="confirm-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </div>
                    <p class="confirm-text">¿Estás seguro de que deseas eliminar este invitado?</p>
                    <div class="confirm-details">
                        <strong>${invitado.nombre} ${invitado.apellido}</strong>
                        <span>DNI: ${invitado.dni}</span>
                    </div>
                    <p class="confirm-warning">Esta acción no se puede deshacer.</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-cerrar-secundario">Cancelar</button>
                    <button class="btn-danger-modal" data-id="${id}">Eliminar Invitado</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    const overlay = modal.querySelector('.modal-overlay');
    const btnCerrar = modal.querySelector('.btn-cerrar');
    const btnCancelar = modal.querySelector('.btn-cerrar-secundario');
    const btnEliminar = modal.querySelector('.btn-danger-modal');

    overlay.addEventListener('click', cerrarModal);
    btnCerrar.addEventListener('click', cerrarModal);
    btnCancelar.addEventListener('click', cerrarModal);
    btnEliminar.addEventListener('click', function() {
        confirmarEliminar(parseInt(this.getAttribute('data-id')));
    });
}

function verDetalles(id) {
    const invitado = dbUsuario.getInvitadoById(id);
    
    if (!invitado) {
        showAlert('Invitado no encontrado', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-detalle active';
    modal.id = 'modalDetalles';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>Detalles del Invitado</h2>
                <button class="btn-cerrar">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detalle-info">
                    <div class="info-row">
                        <span class="label">Nombre Completo:</span>
                        <span class="value">${invitado.nombre} ${invitado.apellido}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">DNI:</span>
                        <span class="value">${invitado.dni}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Teléfono:</span>
                        <span class="value">${invitado.telefono || 'No especificado'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Fecha de Visita:</span>
                        <span class="value">${invitado.fecha_visita}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Hora Aproximada:</span>
                        <span class="value">${invitado.hora_visita || 'No especificada'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Tipo de Visita:</span>
                        <span class="value">${invitado.permiso}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Motivo:</span>
                        <span class="value">${invitado.motivo || 'No especificado'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Estado:</span>
                        <span class="value"><span class="status status-${invitado.estado}">${invitado.estado.charAt(0).toUpperCase() + invitado.estado.slice(1)}</span></span>
                    </div>
                    <div class="info-row">
                        <span class="label">Observaciones:</span>
                        <span class="value">${invitado.observaciones || 'Ninguna'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Fecha de Registro:</span>
                        <span class="value">${invitado.fecha_creacion}</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-cerrar-secundario">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    const overlay = modal.querySelector('.modal-overlay');
    const btnCerrar = modal.querySelector('.btn-cerrar');
    const btnCerrarSecundario = modal.querySelector('.btn-cerrar-secundario');

    overlay.addEventListener('click', cerrarModal);
    btnCerrar.addEventListener('click', cerrarModal);
    btnCerrarSecundario.addEventListener('click', cerrarModal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal-detalle');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// ============================================
// CRUD DE INVITADOS
// ============================================
function confirmarEliminar(id) {
    if (dbUsuario.deleteInvitado(id)) {
        cerrarModal();
        showAlert('Invitado eliminado exitosamente', 'success');
        renderInvitadosTable();
        updateStats();
    } else {
        cerrarModal();
        showAlert('Error al eliminar el invitado', 'error');
    }
}

function editarInvitado(id) {
    const invitados = dbUsuario.getInvitadosUsuario();
    const invitado = invitados.find(inv => inv.id_invitado === id);
    
    if (!invitado) {
        showAlert('Invitado no encontrado', 'error');
        return;
    }

    if (invitado.estado !== 'pendiente') {
        showAlert('No puedes editar un invitado que ya fue procesado por el administrador', 'error');
        return;
    }

    document.getElementById('nombre').value = invitado.nombre;
    document.getElementById('apellido').value = invitado.apellido;
    document.getElementById('dni').value = invitado.dni;
    document.getElementById('telefono').value = invitado.telefono;
    document.getElementById('fechaVisita').value = invitado.fecha_visita;
    document.getElementById('horaVisita').value = invitado.hora_visita;
    document.getElementById('permiso').value = invitado.permiso;
    document.getElementById('motivo').value = invitado.motivo;
    document.getElementById('observaciones').value = invitado.observaciones;

    const submitBtn = document.querySelector('#invitadoForm button[type="submit"]');
    submitBtn.innerHTML = 'Actualizar Invitado';
    submitBtn.dataset.editId = id;
    submitBtn.dataset.editing = 'true';

    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    
    showAlert('Modo edición activado. Modifica los datos y haz clic en "Actualizar Invitado"', 'success');
}

function actualizarInvitado(id) {
    const invitadoForm = document.getElementById('invitadoForm');
    const formData = new FormData(invitadoForm);
    const datosActualizados = Object.fromEntries(formData);

    if (!validarDNI(datosActualizados.dni)) {
        showAlert('El DNI debe tener entre 7 y 8 dígitos', 'error');
        return;
    }

    const fechaVisita = new Date(datosActualizados.fechaVisita);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaVisita < hoy) {
        showAlert('La fecha de visita no puede ser anterior a hoy', 'error');
        return;
    }

    const updateData = {
        nombre: datosActualizados.nombre,
        apellido: datosActualizados.apellido,
        dni: datosActualizados.dni,
        telefono: datosActualizados.telefono || '',
        fecha_visita: datosActualizados.fechaVisita,
        hora_visita: datosActualizados.horaVisita || '',
        permiso: datosActualizados.permiso,
        motivo: datosActualizados.motivo || '',
        observaciones: datosActualizados.observaciones || ''
    };

    if (dbUsuario.updateInvitado(id, updateData)) {
        showAlert('Invitado actualizado exitosamente', 'success');
        invitadoForm.reset();
        
        const submitBtn = document.querySelector('#invitadoForm button[type="submit"]');
        submitBtn.innerHTML = 'Registrar Invitado';
        delete submitBtn.dataset.editId;
        delete submitBtn.dataset.editing;
        
        renderInvitadosTable();
        updateStats();
    } else {
        showAlert('Error al actualizar el invitado', 'error');
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema inicial
    applyTheme(currentTheme);
    
    // Configurar fecha actual
    const fechaElement = document.getElementById('current-date');
    if (fechaElement) {
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const fechaActual = new Date().toLocaleDateString('es-ES', opciones);
        fechaElement.textContent = fechaActual;
    }

    // Configurar menú móvil
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.toggle('active');
            }
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
                document.body.style.overflow = 'auto';
            });
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    }
    
    // Inicializar datos
    updateUserInfo();
    renderInvitadosTable();
    updateStats();

    // Manejar envío del formulario
    const invitadoForm = document.getElementById('invitadoForm');
    invitadoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        
        if (submitBtn.dataset.editing === 'true') {
            actualizarInvitado(parseInt(submitBtn.dataset.editId));
            return;
        }
        
        const formData = new FormData(invitadoForm);
        const invitadoData = Object.fromEntries(formData);

        if (!validarDNI(invitadoData.dni)) {
            showAlert('El DNI debe tener entre 7 y 8 dígitos', 'error');
            return;
        }

        const fechaVisita = new Date(invitadoData.fechaVisita);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if (fechaVisita < hoy) {
            showAlert('La fecha de visita no puede ser anterior a hoy', 'error');
            return;
        }

        const invitadosExistentes = dbUsuario.getInvitadosUsuario();
        const dniDuplicado = invitadosExistentes.find(inv => 
            inv.dni === invitadoData.dni && 
            inv.fecha_visita === invitadoData.fechaVisita &&
            inv.estado !== 'rechazada'
        );

        if (dniDuplicado) {
            showAlert('Ya existe un invitado con este DNI para la fecha seleccionada', 'error');
            return;
        }

        try {
            const newInvitado = dbUsuario.addInvitado(invitadoData);
            showAlert('Invitado registrado exitosamente. Esperando autorización del administrador.', 'success');
            invitadoForm.reset();
            renderInvitadosTable();
            updateStats();
        } catch (error) {
            showAlert('Error al registrar el invitado: ' + error.message, 'error');
        }
    });

    // Establecer fecha mínima como hoy
    document.getElementById('fechaVisita').min = new Date().toISOString().split('T')[0];

    // Formatear campo DNI
    document.getElementById('dni').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        e.target.value = value;
    });

    // Formatear campo teléfono
    document.getElementById('telefono').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        e.target.value = value;
    });
});