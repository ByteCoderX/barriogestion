        // Variables globales para temas
let currentTheme = localStorage.getItem('theme') || 'dark';

// Variables para gestión de miembros
let miembros = [];
let miembroEditando = null;

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema guardado
    applyTheme(currentTheme);
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Configurar formularios
    setupForms();
    
    // Cargar datos iniciales
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
            editable: false
        },
        {
            id: 2,
            nombre: "María Elena García",
            edad: 42,
            dni: "27.654.321",
            rol: "conyuge",
            permisos: ["acceso", "visitas", "reservas"],
            editable: true
        },
        {
            id: 3,
            nombre: "Carlos Andrés Pérez",
            edad: 22,
            dni: "43.789.012",
            rol: "hijo",
            permisos: ["acceso", "visitas"],
            editable: true
        },
        {
            id: 4,
            nombre: "Sofía Pérez García",
            edad: 19,
            dni: "45.234.567",
            rol: "hijo",
            permisos: ["acceso"],
            editable: true
        },
        {
            id: 5,
            nombre: "Rosa Elena Martinez",
            edad: 38,
            dni: "32.456.789",
            rol: "empleado",
            permisos: ["acceso"],
            editable: true
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
    if (miembro) {
        showAlert(`Mostrando detalles de ${miembro.nombre}`, 'info');
        // Aquí podrías abrir un modal con más detalles
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
    
    // Llenar formulario
    document.getElementById('miembroId').value = miembro.id;
    document.getElementById('nombreMiembro').value = miembro.nombre;
    document.getElementById('edadMiembro').value = miembro.edad;
    document.getElementById('dniMiembro').value = miembro.dni;
    document.getElementById('rolMiembro').value = miembro.rol;
    
    // Marcar permisos - CORREGIDO
    const checkboxes = document.querySelectorAll('#modalEditarMiembro input[name="permisos[]"]');
    checkboxes.forEach(cb => {
        cb.checked = miembro.permisos.includes(cb.value);
    });
    
    // Mostrar modal
    document.getElementById('modalEditarMiembro').classList.add('active');
}

// Guardar cambios del miembro - CORREGIDO
function guardarCambiosMiembro() {
    const form = document.getElementById('formEditarMiembro');
    const formData = new FormData(form);
    const id = parseInt(formData.get('miembroId'));
    
    // Validaciones
    if (!validarDNI(formData.get('dniMiembro'))) {
        showAlert('DNI inválido. Use el formato 12.345.678', 'error');
        return;
    }
    
    // Verificar DNI único (excluyendo el miembro actual)
    const dniExistente = miembros.find(m => m.id !== id && m.dni === formData.get('dniMiembro'));
    if (dniExistente) {
        showAlert('Ya existe otro miembro con este DNI', 'error');
        return;
    }
    
    // Actualizar miembro
    const miembro = miembros.find(m => m.id === id);
    if (miembro) {
        miembro.nombre = formData.get('nombreMiembro');
        miembro.edad = parseInt(formData.get('edadMiembro'));
        miembro.dni = formData.get('dniMiembro');
        miembro.rol = formData.get('rolMiembro');
        
        // CORREGIDO: Obtener permisos correctamente
        const permisosSeleccionados = [];
        const checkboxes = document.querySelectorAll('#modalEditarMiembro input[name="permisos[]"]:checked');
        checkboxes.forEach(cb => {
            permisosSeleccionados.push(cb.value);
        });
        miembro.permisos = permisosSeleccionados;
        
        // Actualizar UI
        actualizarMiembroEnDOM(miembro);
        
        showAlert('Miembro actualizado exitosamente', 'success');
        cerrarModalEditar();
    }
}

// Agregar nuevo miembro - CORREGIDO
function agregarNuevoMiembro() {
    const form = document.getElementById('formAgregarMiembro');
    const formData = new FormData(form);
    
    // Validaciones
    if (!validarDNI(formData.get('nuevoDni'))) {
        showAlert('DNI inválido. Use el formato 12.345.678', 'error');
        return;
    }
    
    // Verificar DNI único
    if (miembros.some(m => m.dni === formData.get('nuevoDni'))) {
        showAlert('Ya existe un miembro con este DNI', 'error');
        return;
    }
    
    // CORREGIDO: Obtener permisos correctamente
    const permisosSeleccionados = [];
    const checkboxes = document.querySelectorAll('#modalAgregarMiembro input[name="nuevosPermisos[]"]:checked');
    checkboxes.forEach(cb => {
        permisosSeleccionados.push(cb.value);
    });
    
    // Crear nuevo miembro
    const nuevoId = Math.max(...miembros.map(m => m.id)) + 1;
    const nuevoMiembro = {
        id: nuevoId,
        nombre: formData.get('nuevoNombre'),
        edad: parseInt(formData.get('nuevaEdad')),
        dni: formData.get('nuevoDni'),
        rol: formData.get('nuevoRol'),
        permisos: permisosSeleccionados,
        editable: true
    };
    
    miembros.push(nuevoMiembro);
    
    // Agregar a DOM
    agregarMiembroADOM(nuevoMiembro);
    
    showAlert('Miembro agregado exitosamente', 'success');
    cerrarModalAgregar();
    
    // Limpiar formulario
    form.reset();
    
    // Actualizar contador de miembros
    actualizarContadorMiembros();
}

// Eliminar miembro
function eliminarMiembro(id) {
    if (confirm('¿Está seguro de eliminar este miembro? Esta acción no se puede deshacer.')) {
        const index = miembros.findIndex(m => m.id === id);
        if (index !== -1) {
            miembros.splice(index, 1);
            
            // Remover del DOM
            const card = document.querySelector(`[data-id="${id}"]`);
            if (card) {
                card.remove();
            }
            
            // Actualizar contador
            actualizarContadorMiembros();
            
            showAlert('Miembro eliminado exitosamente', 'success');
        }
    }
}

// Actualizar permisos según rol - CORREGIDO
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
    
    // Resetear todos
    checkboxes.forEach(cb => cb.checked = false);
    
    // Asignar permisos según rol
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
    // Limpiar formulario antes de abrir
    const form = document.getElementById('formAgregarMiembro');
    form.reset();
    
    // Resetear checkboxes
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
        z-index: 1000;
        min-width: 300px;
        padding: 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Aplicar estilos según el tema actual
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

// CORREGIDO: Función para actualizar miembro en DOM
function actualizarMiembroEnDOM(miembro) {
    const card = document.querySelector(`[data-id="${miembro.id}"]`);
    if (card) {
        // Actualizar atributo data-rol
        card.dataset.rol = miembro.rol;
        
        // Actualizar elementos del DOM
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
            
            // Actualizar clase CSS del contenedor de rol
            rolContainer.className = `miembro-rol ${miembro.rol}`;
        }
        
        // Actualizar permisos visuales
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
        
        // Actualizar botones de acción si cambia el rol
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

// Seleccionamos todos los overlays
const modals = document.querySelectorAll('.modal-overlay');

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        // Si el click no es dentro del contenido del modal
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
