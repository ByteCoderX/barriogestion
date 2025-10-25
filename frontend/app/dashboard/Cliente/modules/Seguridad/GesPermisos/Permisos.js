// Variables globales para temas
let currentTheme = localStorage.getItem('theme') || 'dark';

// Variables para gestión de miembros
let miembros = [];
let miembroEditando = null;

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    applyTheme(currentTheme);
    setupMobileMenu();
    setupForms();
    cargarMiembros();
    renderizarMiembros();
    configurarCierreModales();
});

// Configurar menú móvil
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
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
    // Función opcional para control adicional
}

// Configurar formularios
function setupForms() {
    const formEditar = document.getElementById('formEditarMiembro');
    const formAgregar = document.getElementById('formAgregarMiembro');
    
    if (formEditar) {
        formEditar.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarCambiosMiembro();
        });
    }
    
    if (formAgregar) {
        formAgregar.addEventListener('submit', function(e) {
            e.preventDefault();
            agregarNuevoMiembro();
        });
    }
}

// Cargar miembros existentes
function cargarMiembros() {
    miembros = [
        {
            id: 1,
            nombre: "Juan Carlos Pérez",
            edad: 45,
            dni: "25.123.456",
            rol: "propietario",
            permisos: ["acceso", "visitas", "familia", "reservas"],
            editable: false,
            telefono: "+54 11 2345-6789",
            email: "juan.perez@email.com",
            fechaRegistro: "15/01/2023"
        },
        {
            id: 2,
            nombre: "María Elena García",
            edad: 42,
            dni: "27.654.321",
            rol: "conyuge",
            permisos: ["acceso", "visitas", "reservas"],
            editable: true,
            telefono: "+54 11 3456-7890",
            email: "maria.garcia@email.com",
            fechaRegistro: "15/01/2023"
        },
        {
            id: 3,
            nombre: "Carlos Andrés Pérez",
            edad: 22,
            dni: "43.789.012",
            rol: "hijo",
            permisos: ["acceso", "visitas"],
            editable: true,
            telefono: "+54 11 4567-8901",
            email: "carlos.perez@email.com",
            fechaRegistro: "20/03/2023"
        },
        {
            id: 4,
            nombre: "Sofía Pérez García",
            edad: 19,
            dni: "45.234.567",
            rol: "hijo",
            permisos: ["acceso"],
            editable: true,
            telefono: "+54 11 5678-9012",
            email: "sofia.perez@email.com",
            fechaRegistro: "10/06/2023"
        },
        {
            id: 5,
            nombre: "Rosa Elena Martinez",
            edad: 38,
            dni: "32.456.789",
            rol: "empleado",
            permisos: ["acceso"],
            editable: true,
            telefono: "+54 11 6789-0123",
            email: "rosa.martinez@email.com",
            fechaRegistro: "05/09/2023"
        }
    ];
}

// Renderizar todos los miembros
function renderizarMiembros() {
    const lista = document.getElementById('miembrosList');
    if (!lista) return;
    
    lista.innerHTML = '';
    
    miembros.forEach(miembro => {
        agregarMiembroADOM(miembro);
    });
    
    actualizarContadorMiembros();
}

// Filtrar miembros por rol
function filtrarMiembros() {
    const filtro = document.getElementById('filtroRol').value;
    const cards = document.querySelectorAll('.miembro-card');
    
    cards.forEach(card => {
        const rol = card.dataset.rol;
        if (filtro === '' || rol === filtro) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Ver detalles de un miembro - DISEÑO MEJORADO
function verDetalles(id) {
    const miembro = miembros.find(m => m.id === id);
    if (!miembro) {
        showAlert('Miembro no encontrado', 'error');
        return;
    }
    
    const roles = {
        propietario: 'Propietario Principal',
        conyuge: 'Cónyuge',
        hijo: 'Hijo/a',
        familiar: 'Familiar',
        empleado: 'Empleado Doméstico'
    };
    
    const permisosTexto = {
        acceso: 'Acceso al Barrio',
        visitas: 'Autorizar Visitas',
        familia: 'Gestionar Familia',
        reservas: 'Realizar Reservas'
    };
    
    const permisosHTML = miembro.permisos.map(p => 
        `<div class="permiso-badge activo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${permisosTexto[p] || p}</span>
        </div>`
    ).join('');
    
    const permisosInactivos = Object.keys(permisosTexto)
        .filter(p => !miembro.permisos.includes(p))
        .map(p => `<div class="permiso-badge inactivo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>${permisosTexto[p]}</span>
        </div>`)
        .join('');
    
    // Crear modal de detalles con diseño mejorado
    const modal = document.createElement('div');
    modal.className = 'modal-overlay modal-detalle active';
    modal.id = 'modalDetalles';
    
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="cerrarModalDetalles()"></div>
        <div class="modal-content modal-detalle-content">
            <div class="modal-header-detalle">
                <div class="header-avatar">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${miembro.nombre}" alt="Avatar">
                </div>
                <div class="header-info">
                    <h3>${miembro.nombre}</h3>
                    <span class="rol-badge-detalle ${miembro.rol}">${roles[miembro.rol]}</span>
                </div>
                <button class="close-modal-detalle" onclick="cerrarModalDetalles()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div class="modal-body-detalle">
                <div class="detalle-section">
                    <h4 class="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Información Personal
                    </h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Edad</span>
                            <span class="info-value">${miembro.edad} años</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">DNI</span>
                            <span class="info-value">${miembro.dni}</span>
                        </div>
                        ${miembro.telefono ? `
                        <div class="info-item">
                            <span class="info-label">Teléfono</span>
                            <span class="info-value">${miembro.telefono}</span>
                        </div>` : ''}
                        ${miembro.email ? `
                        <div class="info-item">
                            <span class="info-label">Email</span>
                            <span class="info-value">${miembro.email}</span>
                        </div>` : ''}
                        ${miembro.fechaRegistro ? `
                        <div class="info-item">
                            <span class="info-label">Fecha de Registro</span>
                            <span class="info-value">${miembro.fechaRegistro}</span>
                        </div>` : ''}
                    </div>
                </div>
                
                <div class="detalle-section">
                    <h4 class="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Permisos y Accesos
                    </h4>
                    <div class="permisos-badges-grid">
                        ${permisosHTML}
                        ${permisosInactivos}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer-detalle">
                ${miembro.editable ? `
                    <button type="button" class="btn-footer-secondary" onclick="cerrarModalDetalles()">
                        Cerrar
                    </button>
                    <button type="button" class="btn-footer-primary" onclick="cerrarModalDetalles(); editarMiembro(${miembro.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Editar Miembro
                    </button>
                ` : `
                    <button type="button" class="btn-footer-primary-full" onclick="cerrarModalDetalles()">
                        Cerrar
                    </button>
                `}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 10);
}

// Cerrar modal de detalles
function cerrarModalDetalles() {
    const modal = document.getElementById('modalDetalles');
    if (modal) {
        const content = modal.querySelector('.modal-content');
        content.style.animation = 'modalSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Editar miembro
function editarMiembro(id) {
    const miembro = miembros.find(m => m.id === id);
    if (!miembro || !miembro.editable) {
        showAlert('Este miembro no puede ser editado', 'error');
        return;
    }
    
    miembroEditando = miembro;
    
    document.getElementById('miembroId').value = miembro.id;
    document.getElementById('nombreMiembro').value = miembro.nombre;
    document.getElementById('edadMiembro').value = miembro.edad;
    document.getElementById('dniMiembro').value = miembro.dni;
    document.getElementById('rolMiembro').value = miembro.rol;
    
    const checkboxes = document.querySelectorAll('#modalEditarMiembro input[name="permisos[]"]');
    checkboxes.forEach(cb => {
        cb.checked = miembro.permisos.includes(cb.value);
    });
    
    document.getElementById('modalEditarMiembro').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Guardar cambios del miembro
function guardarCambiosMiembro() {
    const form = document.getElementById('formEditarMiembro');
    const formData = new FormData(form);
    const id = parseInt(formData.get('miembroId'));
    
    if (!validarDNI(formData.get('dniMiembro'))) {
        showAlert('DNI inválido. Use el formato 12.345.678', 'error');
        return;
    }
    
    const dniExistente = miembros.find(m => m.id !== id && m.dni === formData.get('dniMiembro'));
    if (dniExistente) {
        showAlert('Ya existe otro miembro con este DNI', 'error');
        return;
    }
    
    const miembro = miembros.find(m => m.id === id);
    if (miembro) {
        miembro.nombre = formData.get('nombreMiembro');
        miembro.edad = parseInt(formData.get('edadMiembro'));
        miembro.dni = formData.get('dniMiembro');
        miembro.rol = formData.get('rolMiembro');
        
        const permisosSeleccionados = [];
        const checkboxes = document.querySelectorAll('#modalEditarMiembro input[name="permisos[]"]:checked');
        checkboxes.forEach(cb => {
            permisosSeleccionados.push(cb.value);
        });
        miembro.permisos = permisosSeleccionados;
        
        actualizarMiembroEnDOM(miembro);
        
        showAlert('Miembro actualizado exitosamente', 'success');
        cerrarModalEditar();
    }
}

// Agregar nuevo miembro
function agregarNuevoMiembro() {
    const form = document.getElementById('formAgregarMiembro');
    const formData = new FormData(form);
    
    if (!validarDNI(formData.get('nuevoDni'))) {
        showAlert('DNI inválido. Use el formato 12.345.678', 'error');
        return;
    }
    
    if (miembros.some(m => m.dni === formData.get('nuevoDni'))) {
        showAlert('Ya existe un miembro con este DNI', 'error');
        return;
    }
    
    const permisosSeleccionados = [];
    const checkboxes = document.querySelectorAll('#modalAgregarMiembro input[name="nuevosPermisos[]"]:checked');
    checkboxes.forEach(cb => {
        permisosSeleccionados.push(cb.value);
    });
    
    const nuevoId = Math.max(...miembros.map(m => m.id)) + 1;
    const fechaActual = new Date().toLocaleDateString('es-AR');
    const nuevoMiembro = {
        id: nuevoId,
        nombre: formData.get('nuevoNombre'),
        edad: parseInt(formData.get('nuevaEdad')),
        dni: formData.get('nuevoDni'),
        rol: formData.get('nuevoRol'),
        permisos: permisosSeleccionados,
        editable: true,
        telefono: '',
        email: '',
        fechaRegistro: fechaActual
    };
    
    miembros.push(nuevoMiembro);
    agregarMiembroADOM(nuevoMiembro);
    
    showAlert('Miembro agregado exitosamente', 'success');
    cerrarModalAgregar();
    
    form.reset();
    actualizarContadorMiembros();
}

// Eliminar miembro - DISEÑO MEJORADO
function eliminarMiembro(id) {
    const miembro = miembros.find(m => m.id === id);
    if (!miembro) {
        showAlert('Miembro no encontrado', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay modal-confirm active';
    modal.id = 'modalConfirmEliminar';
    
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="cerrarModalConfirmacion()"></div>
        <div class="modal-content modal-confirm-content">
            <div class="modal-header-confirm">
                <div class="confirm-icon-wrapper">
                    <svg class="confirm-icon-svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </div>
                <h3>¿Eliminar miembro?</h3>
                <p class="confirm-subtitle">Esta acción no se puede deshacer</p>
            </div>
            
            <div class="modal-body-confirm">
                <div class="member-preview">
                    <div class="member-preview-avatar">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${miembro.nombre}" alt="Avatar">
                    </div>
                    <div class="member-preview-info">
                        <strong>${miembro.nombre}</strong>
                        <span>DNI: ${miembro.dni}</span>
                    </div>
                </div>
                
                <div class="warning-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p>Se eliminarán todos los permisos y accesos asociados a este miembro</p>
                </div>
            </div>
            
            <div class="modal-footer-confirm">
                <button type="button" class="btn-cancel-confirm" onclick="cerrarModalConfirmacion()">
                    Cancelar
                </button>
                <button type="button" class="btn-delete-confirm" onclick="confirmarEliminacion(${id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Eliminar Miembro
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.querySelector('.modal-content').style.animation = 'modalBounceIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 10);
}

// Confirmar eliminación
function confirmarEliminacion(id) {
    const index = miembros.findIndex(m => m.id === id);
    if (index !== -1) {
        const nombreEliminado = miembros[index].nombre;
        miembros.splice(index, 1);
        
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                card.remove();
            }, 300);
        }
        
        actualizarContadorMiembros();
        cerrarModalConfirmacion();
        showAlert(`${nombreEliminado} ha sido eliminado exitosamente`, 'success');
    }
}

// Cerrar modal de confirmación
function cerrarModalConfirmacion() {
    const modal = document.getElementById('modalConfirmEliminar');
    if (modal) {
        const content = modal.querySelector('.modal-content');
        content.style.animation = 'modalSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Actualizar permisos según rol
function actualizarPermisos() {
    const rol = document.getElementById('rolMiembro').value;
    actualizarPermisosSegunRol(rol, '#modalEditarMiembro', 'permisos[]');
}

function actualizarPermisosNuevo() {
    const rol = document.getElementById('nuevoRol').value;
    actualizarPermisosSegunRol(rol, '#modalAgregarMiembro', 'nuevosPermisos[]');
}

function actualizarPermisosSegunRol(rol, modalSelector, checkboxName) {
    const modal = document.querySelector(modalSelector);
    const checkboxes = modal.querySelectorAll(`input[name="${checkboxName}"]`);
    
    checkboxes.forEach(cb => cb.checked = false);
    
    const permisosDefecto = {
        propietario: ['acceso', 'visitas', 'familia', 'reservas'],
        conyuge: ['acceso', 'visitas', 'reservas'],
        hijo: ['acceso', 'visitas'],
        familiar: ['acceso'],
        empleado: ['acceso']
    };
    
    const permisos = permisosDefecto[rol] || [];
    
    permisos.forEach(permiso => {
        const checkbox = modal.querySelector(`input[name="${checkboxName}"][value="${permiso}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

// Funciones de modal
function abrirModalAgregarMiembro() {
    const form = document.getElementById('formAgregarMiembro');
    form.reset();
    
    const checkboxes = document.querySelectorAll('#modalAgregarMiembro input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    const accesoCheckbox = document.querySelector('#modalAgregarMiembro input[value="acceso"]');
    if (accesoCheckbox) accesoCheckbox.checked = true;
    
    document.getElementById('modalAgregarMiembro').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalEditar() {
    document.getElementById('modalEditarMiembro').classList.remove('active');
    miembroEditando = null;
    document.body.style.overflow = 'auto';
}

function cerrarModalAgregar() {
    document.getElementById('modalAgregarMiembro').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Configurar cierre de modales al hacer clic fuera
function configurarCierreModales() {
    const modales = ['modalEditarMiembro', 'modalAgregarMiembro'];
    
    modales.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    if (modalId === 'modalEditarMiembro') {
                        miembroEditando = null;
                    }
                }
            });
        }
    });
}

// Utilidades
function validarDNI(dni) {
    const regex = /^\d{2}\.\d{3}\.\d{3}$/;
    return regex.test(dni);
}

function actualizarContadorMiembros() {
    const contador = document.querySelector('.miembros-count');
    if (contador) {
        contador.textContent = `${miembros.length} miembros registrados`;
    }
}

function showAlert(message, type = 'info') {
    const existingAlerts = document.querySelectorAll('.temp-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `temp-alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10001;
        min-width: 300px;
        padding: 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        if (document.body.classList.contains('theme-light')) {
            alert.style.backgroundColor = 'rgba(88, 129, 87, 0.95)';
            alert.style.color = '#ffffff';
            alert.style.border = '1px solid rgba(88, 129, 87, 0.3)';
        } else if (document.body.classList.contains('theme-nature')) {
            alert.style.backgroundColor = 'rgba(204, 227, 222, 0.95)';
            alert.style.color = '#6B9080';
            alert.style.border = '1px solid rgba(204, 227, 222, 0.3)';
        } else {
            alert.style.backgroundColor = 'rgba(0, 255, 136, 0.95)';
            alert.style.color = '#000000';
            alert.style.border = '1px solid rgba(0, 255, 136, 0.3)';
        }
    } else if (type === 'error') {
        alert.style.backgroundColor = 'rgba(255, 68, 68, 0.95)';
        alert.style.color = '#ffffff';
        alert.style.border = '1px solid rgba(255, 68, 68, 0.3)';
    } else {
        if (document.body.classList.contains('theme-light')) {
            alert.style.backgroundColor = 'rgba(166, 162, 162, 0.95)';
            alert.style.color = '#ffffff';
            alert.style.border = '1px solid rgba(166, 162, 162, 0.3)';
        } else if (document.body.classList.contains('theme-nature')) {
            alert.style.backgroundColor = 'rgba(107, 144, 128, 0.95)';
            alert.style.color = '#EAF4F4';
            alert.style.border = '1px solid rgba(107, 144, 128, 0.3)';
        } else {
            alert.style.backgroundColor = 'rgba(0, 191, 255, 0.95)';
            alert.style.color = '#000000';
            alert.style.border = '1px solid rgba(0, 191, 255, 0.3)';
        }
    }
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Función para actualizar miembro en DOM
function actualizarMiembroEnDOM(miembro) {
    const card = document.querySelector(`[data-id="${miembro.id}"]`);
    if (card) {
        card.dataset.rol = miembro.rol;
        
        const nombreEl = card.querySelector('.miembro-info h4');
        const edadEl = card.querySelector('.miembro-edad');
        const dniEl = card.querySelector('.miembro-dni');
        const rolEl = card.querySelector('.rol-badge');
        const rolContainer = card.querySelector('.miembro-rol');
        
        if (nombreEl) nombreEl.textContent = miembro.nombre;
        if (edadEl) edadEl.textContent = `${miembro.edad} años`;
        if (dniEl) dniEl.textContent = `DNI: ${miembro.dni}`;
        
        if (rolEl && rolContainer) {
            const roles = {
                propietario: 'Propietario Principal',
                conyuge: 'Cónyuge',
                hijo: 'Hijo/a',
                familiar: 'Familiar',
                empleado: 'Empleado Doméstico'
            };
            
            rolEl.textContent = roles[miembro.rol] || miembro.rol;
            rolContainer.className = `miembro-rol ${miembro.rol}`;
        }
        
        const permisosList = card.querySelector('.permisos-list');
        if (permisosList) {
            permisosList.innerHTML = '';
            const permisosTexto = {
                acceso: 'Acceso al Barrio',
                visitas: 'Autorizar Visitas',
                familia: 'Gestionar Familia',
                reservas: 'Realizar Reservas'
            };
            
            Object.keys(permisosTexto).forEach(permiso => {
                const span = document.createElement('span');
                span.className = `permiso ${miembro.permisos.includes(permiso) ? 'activo' : 'inactivo'}`;
                span.textContent = permisosTexto[permiso];
                permisosList.appendChild(span);
            });
        }
        
        const accionesEl = card.querySelector('.miembro-acciones');
        if (accionesEl) {
            accionesEl.innerHTML = '';
            
            const btnEdit = document.createElement('button');
            btnEdit.className = 'btn-action btn-edit';
            btnEdit.textContent = 'Editar Rol';
            btnEdit.onclick = () => editarMiembro(miembro.id);
            accionesEl.appendChild(btnEdit);
            
            if (miembro.rol === 'empleado') {
                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn-action btn-delete';
                btnDelete.textContent = 'Eliminar';
                btnDelete.onclick = () => eliminarMiembro(miembro.id);
                accionesEl.appendChild(btnDelete);
            } else {
                const btnView = document.createElement('button');
                btnView.className = 'btn-action btn-view';
                btnView.textContent = 'Ver Detalles';
                btnView.onclick = () => verDetalles(miembro.id);
                accionesEl.appendChild(btnView);
            }
        }
    }
}

// Agregar miembro al DOM
function agregarMiembroADOM(miembro) {
    const lista = document.getElementById('miembrosList');
    if (!lista) return;
    
    const card = document.createElement('div');
    card.className = 'miembro-card';
    card.dataset.id = miembro.id;
    card.dataset.rol = miembro.rol;
    card.style.animation = 'fadeIn 0.3s ease';
    
    const roles = {
        propietario: 'Propietario Principal',
        conyuge: 'Cónyuge',
        hijo: 'Hijo/a',
        familiar: 'Familiar',
        empleado: 'Empleado Doméstico'
    };
    
    const permisosTexto = {
        acceso: 'Acceso al Barrio',
        visitas: 'Autorizar Visitas',
        familia: 'Gestionar Familia',
        reservas: 'Realizar Reservas'
    };
    
    const permisosHTML = Object.entries(permisosTexto).map(([key, text]) => 
        `<span class="permiso ${miembro.permisos.includes(key) ? 'activo' : 'inactivo'}">${text}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="miembro-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${miembro.nombre}" alt="Avatar">
        </div>
        <div class="miembro-info">
            <h4>${miembro.nombre}</h4>
            <p class="miembro-edad">${miembro.edad} años</p>
            <p class="miembro-dni">DNI: ${miembro.dni}</p>
            <div class="miembro-rol ${miembro.rol}">
                <span class="rol-badge">${roles[miembro.rol]}</span>
            </div>
        </div>
        <div class="miembro-permisos">
            <div class="permisos-list">
                ${permisosHTML}
            </div>
        </div>
        <div class="miembro-acciones">
            <button class="btn-action btn-edit" onclick="editarMiembro(${miembro.id})">Editar Rol</button>
            ${miembro.rol === 'empleado' ? 
                `<button class="btn-action btn-delete" onclick="eliminarMiembro(${miembro.id})">Eliminar</button>` :
                `<button class="btn-action btn-view" onclick="verDetalles(${miembro.id})">Ver Detalles</button>`
            }
        </div>
    `;
    
    lista.appendChild(card);
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
        }
    }
    
    @keyframes modalBounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style)