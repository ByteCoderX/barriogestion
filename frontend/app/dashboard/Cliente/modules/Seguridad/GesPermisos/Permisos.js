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
    
    // Aplicar validaciones a todos los inputs de edad y DNI
    aplicarValidacionesInputs();
}

// Función para aplicar validaciones a inputs
function aplicarValidacionesInputs() {
    // Validación para edad (solo 2 dígitos, sin usar type="number")
    document.addEventListener('input', function(e) {
        if (e.target.id && e.target.id.toLowerCase().includes('edad')) {
            // Eliminar cualquier carácter que no sea número
            e.target.value = e.target.value.replace(/[^\d]/g, '');
            // Limitar a 2 dígitos
            if (e.target.value.length > 2) {
                e.target.value = e.target.value.slice(0, 2);
            }
        }
    });
    
    // Validación para DNI (solo 8 números)
    document.addEventListener('input', function(e) {
        if (e.target.id && e.target.id.toLowerCase().includes('dni')) {
            // Eliminar cualquier carácter que no sea número
            e.target.value = e.target.value.replace(/[^\d]/g, '');
            // Limitar a 8 dígitos
            if (e.target.value.length > 8) {
                e.target.value = e.target.value.slice(0, 8);
            }
        }
    });
    
    // Prevenir entrada de caracteres no numéricos con keypress
    document.addEventListener('keypress', function(e) {
        const target = e.target;
        if (target.id && (target.id.toLowerCase().includes('edad') || target.id.toLowerCase().includes('dni'))) {
            // Solo permitir números (códigos 48-57)
            if (e.charCode < 48 || e.charCode > 57) {
                e.preventDefault();
            }
        }
    });
    
    // Prevenir pegado de texto no numérico
    document.addEventListener('paste', function(e) {
        const target = e.target;
        if (target.id && (target.id.toLowerCase().includes('edad') || target.id.toLowerCase().includes('dni'))) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numericText = pastedText.replace(/[^\d]/g, '');
            
            if (target.id.toLowerCase().includes('edad')) {
                target.value = numericText.slice(0, 2);
            } else if (target.id.toLowerCase().includes('dni')) {
                target.value = numericText.slice(0, 8);
            }
        }
    });
}

// Cargar miembros existentes
function cargarMiembros() {
    miembros = [
        {
            id: 1,
            nombre: "Juan Carlos Pérez",
            edad: 45,
            dni: "25123456",
            rol: "propietario",
            permisos: ["acceso", "visitas", "familia", "reservas"],
            editable: false,
            telefono: "11 2345-6789",
            email: "juan.perez@email.com",
            fechaIngreso: "15/01/2020"
        },
        {
            id: 2,
            nombre: "María Elena García",
            edad: 42,
            dni: "27654321",
            rol: "conyuge",
            permisos: ["acceso", "visitas", "reservas"],
            editable: true,
            telefono: "11 3456-7890",
            email: "maria.garcia@email.com",
            fechaIngreso: "15/01/2020"
        },
        {
            id: 3,
            nombre: "Carlos Andrés Pérez",
            edad: 22,
            dni: "43789012",
            rol: "hijo",
            permisos: ["acceso", "visitas"],
            editable: true,
            telefono: "11 4567-8901",
            email: "carlos.perez@email.com",
            fechaIngreso: "20/03/2020"
        },
        {
            id: 4,
            nombre: "Sofía Pérez García",
            edad: 19,
            dni: "45234567",
            rol: "hijo",
            permisos: ["acceso"],
            editable: true,
            telefono: "11 5678-9012",
            email: "sofia.perez@email.com",
            fechaIngreso: "10/05/2021"
        },
        {
            id: 5,
            nombre: "Rosa Elena Martinez",
            edad: 38,
            dni: "32456789",
            rol: "empleado",
            permisos: ["acceso"],
            editable: true,
            telefono: "11 6789-0123",
            email: "rosa.martinez@email.com",
            fechaIngreso: "01/02/2022"
        }
    ];
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

// Ver detalles de un miembro
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
        `<span class="permiso activo">${permisosTexto[p] || p}</span>`
    ).join('');
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Detalles del Miembro</h3>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="detalles-miembro">
                    <div class="detalle-avatar" style="text-align: center; margin-bottom: 1.5rem;">
                        <div style="width: 150px; height: 150px; margin: 0 auto; border-radius: 50%; overflow: hidden; border: 3px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1);">
                            <img src="https://www.gravatar.com/avatar/ejemplo?s=200" alt="${miembro.nombre}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    
                    <div style="display: grid; gap: 1rem;">
                        <div class="detalle-item">
                            <strong style="color: #fff; opacity: 0.7;">Nombre Completo:</strong>
                            <p style="margin: 0.3rem 0; font-size: 1.1rem;">${miembro.nombre}</p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="detalle-item">
                                <strong style="color: #fff; opacity: 0.7;">Edad:</strong>
                                <p style="margin: 0.3rem 0;">${miembro.edad} años</p>
                            </div>
                            <div class="detalle-item">
                                <strong style="color: #fff; opacity: 0.7;">DNI:</strong>
                                <p style="margin: 0.3rem 0;">${miembro.dni}</p>
                            </div>
                        </div>
                        
                        <div class="detalle-item">
                            <strong style="color: #fff; opacity: 0.7;">Rol Familiar:</strong>
                            <p style="margin: 0.5rem 0;">
                                <span class="rol-badge" style="padding: 0.4rem 1rem; border-radius: 1rem; font-size: 0.9rem; font-weight: 600; background-color: ${
                                    miembro.rol === 'propietario' ? '#ff6b35' :
                                    miembro.rol === 'conyuge' ? '#4caf50' :
                                    miembro.rol === 'hijo' ? '#2196f3' :
                                    miembro.rol === 'familiar' ? '#9c27b0' : '#607d8b'
                                }; color: white;">${roles[miembro.rol]}</span>
                            </p>
                        </div>
                        
                        <div class="detalle-item">
                            <strong style="color: #fff; opacity: 0.7;">Información de Contacto:</strong>
                            <p style="margin: 0.3rem 0;">📞 ${miembro.telefono || 'No registrado'}</p>
                            <p style="margin: 0.3rem 0;">📧 ${miembro.email || 'No registrado'}</p>
                        </div>
                        
                        <div class="detalle-item">
                            <strong style="color: #fff; opacity: 0.7;">Fecha de Ingreso:</strong>
                            <p style="margin: 0.3rem 0;">${miembro.fechaIngreso || 'No registrado'}</p>
                        </div>
                        
                        <div class="detalle-item">
                            <strong style="color: #fff; opacity: 0.7; margin-bottom: 0.5rem; display: block;">Permisos Asignados:</strong>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                                ${permisosHTML}
                            </div>
                        </div>
                        
                        <div class="detalle-item" style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1);">
                            <strong style="color: #fff; opacity: 0.7;">Estado:</strong>
                            <p style="margin: 0.3rem 0; color: #4caf50; font-weight: 600;">✓ Activo</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cerrar</button>
                ${miembro.editable ? `<button class="btn-primary" onclick="this.closest('.modal-overlay').remove(); editarMiembro(${miembro.id});">Editar Información</button>` : ''}
            </div>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
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
}

// Guardar cambios del miembro
function guardarCambiosMiembro() {
    const form = document.getElementById('formEditarMiembro');
    const formData = new FormData(form);
    const id = parseInt(formData.get('miembroId'));
    
    const edad = parseInt(formData.get('edadMiembro'));
    if (edad < 1 || edad > 99) {
        showAlert('La edad debe estar entre 1 y 99 años', 'error');
        return;
    }
    
    const dni = formData.get('dniMiembro');
    if (!validarDNI(dni)) {
        showAlert('DNI inválido. Debe tener exactamente 8 números', 'error');
        return;
    }
    
    const dniExistente = miembros.find(m => m.id !== id && m.dni === dni);
    if (dniExistente) {
        showAlert('Ya existe otro miembro con este DNI', 'error');
        return;
    }
    
    const miembro = miembros.find(m => m.id === id);
    if (miembro) {
        miembro.nombre = formData.get('nombreMiembro');
        miembro.edad = edad;
        miembro.dni = dni;
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
    
    const edad = parseInt(formData.get('nuevaEdad'));
    if (edad < 1 || edad > 99) {
        showAlert('La edad debe estar entre 1 y 99 años', 'error');
        return;
    }
    
    const dni = formData.get('nuevoDni');
    if (!validarDNI(dni)) {
        showAlert('DNI inválido. Debe tener exactamente 8 números', 'error');
        return;
    }
    
    if (miembros.some(m => m.dni === dni)) {
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
        edad: edad,
        dni: dni,
        rol: formData.get('nuevoRol'),
        permisos: permisosSeleccionados,
        editable: true,
        telefono: 'No registrado',
        email: 'No registrado',
        fechaIngreso: fechaActual
    };
    
    miembros.push(nuevoMiembro);
    agregarMiembroADOM(nuevoMiembro);
    
    showAlert('Miembro agregado exitosamente', 'success');
    cerrarModalAgregar();
    form.reset();
    actualizarContadorMiembros();
}

// Eliminar miembro
function eliminarMiembro(id) {
    const miembro = miembros.find(m => m.id === id);
    if (!miembro) {
        showAlert('Miembro no encontrado', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Confirmar Eliminación</h3>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body" style="padding: 2rem;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background-color: rgba(255, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255, 68, 68, 0.3);">
                        <span style="font-size: 3rem; color: #ff4444;">⚠</span>
                    </div>
                    <h4 style="margin-bottom: 0.5rem; color: #fff;">¿Está seguro de eliminar este miembro?</h4>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 1rem;">
                        <strong>${miembro.nombre}</strong><br>
                        DNI: ${miembro.dni}
                    </p>
                    <p style="color: #ff4444; font-size: 0.9rem;">
                        Esta acción no se puede deshacer
                    </p>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
                <button class="btn-delete" onclick="confirmarEliminacion(${id}); this.closest('.modal-overlay').remove();">Eliminar</button>
            </div>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Confirmar eliminación
function confirmarEliminacion(id) {
    const index = miembros.findIndex(m => m.id === id);
    if (index !== -1) {
        const miembroEliminado = miembros[index];
        miembros.splice(index, 1);
        
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.transition = 'all 0.3s ease';
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.remove();
            }, 300);
        }
        
        actualizarContadorMiembros();
        showAlert(`${miembroEliminado.nombre} ha sido eliminado exitosamente`, 'success');
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
    
    document.getElementById('modalAgregarMiembro').classList.add('active');
}

function cerrarModalEditar() {
    document.getElementById('modalEditarMiembro').classList.remove('active');
    miembroEditando = null;
}

function cerrarModalAgregar() {
    document.getElementById('modalAgregarMiembro').classList.remove('active');
}

// Utilidades
function validarDNI(dni) {
    const regex = /^\d{8}$/;
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
        z-index: 1000;
        min-width: 300px;
        padding: 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    if (type === 'success') {
        if (document.body.classList.contains('theme-light')) {
            alert.style.backgroundColor = 'rgba(164, 195, 178, 0.1)';
            alert.style.color = '#A4C3B2';
            alert.style.border = '1px solid rgba(164, 195, 178, 0.3)';
        } else if (document.body.classList.contains('theme-nature')) {
            alert.style.backgroundColor = 'rgba(204, 227, 222, 0.1)';
            alert.style.color = '#CCE3DE';
            alert.style.border = '1px solid rgba(204, 227, 222, 0.3)';
        } else {
            alert.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
            alert.style.color = '#00ff88';
            alert.style.border = '1px solid rgba(0, 255, 136, 0.3)';
        }
    } else if (type === 'error') {
        alert.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
        alert.style.color = '#ff4444';
        alert.style.border = '1px solid rgba(255, 68, 68, 0.3)';
    } else {
        if (document.body.classList.contains('theme-light')) {
            alert.style.backgroundColor = 'rgba(166, 162, 162, 0.1)';
            alert.style.color = '#A6A2A2';
            alert.style.border = '1px solid rgba(166, 162, 162, 0.3)';
        } else if (document.body.classList.contains('theme-nature')) {
            alert.style.backgroundColor = 'rgba(107, 144, 128, 0.1)';
            alert.style.color = '#6B9080';
            alert.style.border = '1px solid rgba(107, 144, 128, 0.3)';
        } else {
            alert.style.backgroundColor = 'rgba(0, 191, 255, 0.1)';
            alert.style.color = '#00bfff';
            alert.style.border = '1px solid rgba(0, 191, 255, 0.3)';
        }
    }
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

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

const modals = document.querySelectorAll('.modal-overlay');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

function agregarMiembroADOM(miembro) {
    const lista = document.getElementById('miembrosList');
    const card = document.createElement('div');
    card.className = 'miembro-card';
    card.dataset.id = miembro.id;
    card.dataset.rol = miembro.rol;
    
    const avatars = {
        propietario: 'usuario-hombre.png',
        conyuge: 'usuario-mujer.png',
        hijo: 'usuario-joven.png',
        familiar: 'usuario-familiar.png',
        empleado: 'usuario-empleada.png'
    };
    
    const roles = {
        propietario: 'Propietario Principal',
        conyuge: 'Cónyuge',
        hijo: 'Hijo/a',
        familiar: 'Familiar',
        empleado: 'Empleado Doméstico'
    };
    
    card.innerHTML = `
        <div class="miembro-avatar">
            <img src="../../../assets/icons/${avatars[miembro.rol] || 'usuario-hombre.png'}" alt="Avatar">
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
                ${Object.entries({
                    acceso: 'Acceso al Barrio',
                    visitas: 'Autorizar Visitas',
                    familia: 'Gestionar Familia',
                    reservas: 'Realizar Reservas'
                }).map(([key, text]) => 
                    `<span class="permiso ${miembro.permisos.includes(key) ? 'activo' : 'inactivo'}">${text}</span>`
                ).join('')}
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