<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Permisos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../index.css?v=1">
    <link rel="stylesheet" href="./Permisos.css?v=15">
</head>
<body>
    
    <header>
        <div class="izq">
            <div class="LogoApp">
                <a href="../../index.php">
                    <img src="../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>
            </div>
            <nav class="menu-principal">
                <div class="dropdown">
                    <a href="../../index.php" class="menu-item">Inicio</a>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Expensas</a>
                    <div class="dropdown-content">
                        <a href="../../Expensas/expensas.php">Ver Expensas</a>
                        <a href="../../Expensas/Historial/Historial.php">Historial</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Servicios</a>
                    <div class="dropdown-content">
                        <a href="../mapa-barrio.php">Mapa del Barrio</a>
                        <a href="../../Servicios/ReservasEC/reservas.php">Reservar Espacios</a>
                        <a href="../../Servicios/MiCarnet/carnet.php">Mi Carnet</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item active">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="../../Seguridad/ControlAccesos/Invitado.php">Control de Acceso</a>
                        <a href="permisos.php" class="active">Gestionar Permisos</a>
                        <a href="../../Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                    </div>
                </div>
                <a href="../../Reclamos/quejas.php" class="menu-item">Reclamos</a>
                <a href="../../Configuracion/Configuracion.php" class="menu-item">Configuracion</a>
            </nav>
        </div>
        <div class="derecha">
            <!-- Selector de tema -->
            <div class="theme-selector">
                <button class="theme-button" onclick="toggleThemeMenu()">
                    <svg class="theme-icon" viewBox="0 0 24 24">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                    </svg>
                </button>
                <div class="theme-options">
                    <div class="theme-option" onclick="setTheme('dark')">
                        <div class="theme-color theme-dark"></div>
                        <span>Oscuro</span>
                    </div>
                    <div class="theme-option" onclick="setTheme('light')">
                        <div class="theme-color theme-light-color"></div>
                        <span>Claro</span>
                    </div>
                    <div class="theme-option" onclick="setTheme('nature')">
                        <div class="theme-color theme-nature-color"></div>
                        <span>Naturaleza</span>
                    </div>
                </div>
            </div>
            
            <a href="../../Notificaciones/notificacion.php" class="icono-header">
                <img src="../../assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <div class="IdSession">
                <h1 class="texto">Cliente</h1>
                <a href="../../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>
            
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>

    <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <img src="../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
            <button class="close-menu" id="closeMenu">×</button>
        </div>
        
        <div class="mobile-menu-content">
            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="../Expensas/expensas.php" class="mobile-menu-item">
                    <img src="../assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="../Expensas/Historial/Historial.php" class="mobile-menu-item">
                    <img src="../assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="../mapa-barrio.php" class="mobile-menu-item">
                    <img src="../assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="../Servicios/ReservasEC/reservas.php" class="mobile-menu-item">
                    <img src="../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="../Servicios/MiCarnet/carnet.php" class="mobile-menu-item">
                    <img src="../assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="../Seguridad/ControlAccesos/Invitado.php" class="mobile-menu-item">
                    <img src="../assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item active">
                    <img src="../assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="../Seguridad/RegistroVisitas/Invitados.php" class="mobile-menu-item">
                    <img src="../assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="../Notificaciones/notificacion.php" class="mobile-icon-item">
                <img src="../assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="../Reclamos/quejas.php" class="mobile-icon-item">
                <img src="../assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="permisos-header">
                <div class="header-content">
                    <h1>Gestionar Permisos Familiares</h1>
                    <p>Administra los roles y permisos de los miembros de tu familia</p>
                    <div class="breadcrumb">
                        <a href="../../index.php">Inicio</a> &gt; <span>Seguridad</span> &gt; <span>Gestionar Permisos</span>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="btn-primary" onclick="abrirModalAgregarMiembro()">Agregar Miembro</button>
                </div>
            </div>

            <!-- Información del Lote -->
            <div class="lote-info">
                <div class="lote-card">
                    <div class="lote-icon">
                        <img src="../assets/icons/lote.png" alt="Lote">
                    </div>
                    <div class="lote-details">
                        <h3>Lote 101 - Manzana A</h3>
                        <p>Propietario Principal: Juan Carlos Pérez</p>
                        <span class="miembros-count">5 miembros registrados</span>
                    </div>
                </div>
            </div>

            <!-- Lista de Miembros -->
            <div class="miembros-section">
                <div class="section-header">
                    <h2>Miembros de la Familia</h2>
                    <div class="filter-options">
                        <select id="filtroRol" onchange="filtrarMiembros()">
                            <option value="">Todos los roles</option>
                            <option value="propietario">Propietario</option>
                            <option value="conyuge">Cónyuge</option>
                            <option value="hijo">Hijo/a</option>
                            <option value="familiar">Familiar</option>
                            <option value="empleado">Empleado Doméstico</option>
                        </select>
                    </div>
                </div>

                <div class="miembros-lista" id="miembrosList">
                    <!-- Miembro 1 - Propietario -->
                    <div class="miembro-card" data-id="1" data-rol="propietario">
                        <div class="miembro-avatar">
                            <img src="../assets/icons/usuario-hombre.png" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Juan Carlos Pérez</h4>
                            <p class="miembro-edad">45 años</p>
                            <p class="miembro-dni">DNI: 25.123.456</p>
                            <div class="miembro-rol propietario">
                                <span class="rol-badge">Propietario Principal</span>
                            </div>
                        </div>
                        <div class="miembro-permisos">
                            <div class="permisos-list">
                                <span class="permiso activo">Acceso Total</span>
                                <span class="permiso activo">Autorizar Visitas</span>
                                <span class="permiso activo">Gestionar Familia</span>
                            </div>
                        </div>
                        <div class="miembro-acciones">
                            <button class="btn-action btn-view" onclick="verDetalles(1)">Ver Detalles</button>
                            <button class="btn-action btn-disabled" disabled>No Editable</button>
                        </div>
                    </div>

                    <!-- Miembro 2 - Cónyuge -->
                    <div class="miembro-card" data-id="2" data-rol="conyuge">
                        <div class="miembro-avatar">
                            <img src="../assets/icons/usuario-mujer.png" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>María Elena García</h4>
                            <p class="miembro-edad">42 años</p>
                            <p class="miembro-dni">DNI: 27.654.321</p>
                            <div class="miembro-rol conyuge">
                                <span class="rol-badge">Cónyuge</span>
                            </div>
                        </div>
                        <div class="miembro-permisos">
                            <div class="permisos-list">
                                <span class="permiso activo">Acceso Total</span>
                                <span class="permiso activo">Autorizar Visitas</span>
                                <span class="permiso inactivo">Gestionar Familia</span>
                            </div>
                        </div>
                        <div class="miembro-acciones">
                            <button class="btn-action btn-edit" onclick="editarMiembro(2)">Editar Rol</button>
                            <button class="btn-action btn-view" onclick="verDetalles(2)">Ver Detalles</button>
                        </div>
                    </div>

                    <!-- Miembro 3 - Hijo -->
                    <div class="miembro-card" data-id="3" data-rol="hijo">
                        <div class="miembro-avatar">
                            <img src="../assets/icons/usuario-joven.png" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Carlos Andrés Pérez</h4>
                            <p class="miembro-edad">22 años</p>
                            <p class="miembro-dni">DNI: 43.789.012</p>
                            <div class="miembro-rol hijo">
                                <span class="rol-badge">Hijo</span>
                            </div>
                        </div>
                        <div class="miembro-permisos">
                            <div class="permisos-list">
                                <span class="permiso activo">Acceso Básico</span>
                                <span class="permiso activo">Autorizar Visitas</span>
                                <span class="permiso inactivo">Gestionar Familia</span>
                            </div>
                        </div>
                        <div class="miembro-acciones">
                            <button class="btn-action btn-edit" onclick="editarMiembro(3)">Editar Rol</button>
                            <button class="btn-action btn-view" onclick="verDetalles(3)">Ver Detalles</button>
                        </div>
                    </div>

                    <!-- Miembro 4 - Hija -->
                    <div class="miembro-card" data-id="4" data-rol="hijo">
                        <div class="miembro-avatar">
                            <img src="../assets/icons/usuario-joven-mujer.png" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Sofía Pérez García</h4>
                            <p class="miembro-edad">19 años</p>
                            <p class="miembro-dni">DNI: 45.234.567</p>
                            <div class="miembro-rol hijo">
                                <span class="rol-badge">Hija</span>
                            </div>
                        </div>
                        <div class="miembro-permisos">
                            <div class="permisos-list">
                                <span class="permiso activo">Acceso Básico</span>
                                <span class="permiso inactivo">Autorizar Visitas</span>
                                <span class="permiso inactivo">Gestionar Familia</span>
                            </div>
                        </div>
                        <div class="miembro-acciones">
                            <button class="btn-action btn-edit" onclick="editarMiembro(4)">Editar Rol</button>
                            <button class="btn-action btn-view" onclick="verDetalles(4)">Ver Detalles</button>
                        </div>
                    </div>

                    <!-- Miembro 5 - Empleada -->
                    <div class="miembro-card" data-id="5" data-rol="empleado">
                        <div class="miembro-avatar">
                            <img src="../assets/icons/usuario-empleada.png" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Rosa Elena Martinez</h4>
                            <p class="miembro-edad">38 años</p>
                            <p class="miembro-dni">DNI: 32.456.789</p>
                            <div class="miembro-rol empleado">
                                <span class="rol-badge">Empleada Doméstica</span>
                            </div>
                        </div>
                        <div class="miembro-permisos">
                            <div class="permisos-list">
                                <span class="permiso activo">Acceso Básico</span>
                                <span class="permiso inactivo">Autorizar Visitas</span>
                                <span class="permiso inactivo">Gestionar Familia</span>
                            </div>
                        </div>
                        <div class="miembro-acciones">
                            <button class="btn-action btn-edit" onclick="editarMiembro(5)">Editar Rol</button>
                            <button class="btn-action btn-delete" onclick="eliminarMiembro(5)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal para Editar Miembro -->
    <div class="modal-overlay" id="modalEditarMiembro">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitulo">Editar Miembro</h3>
                <button class="close-modal" onclick="cerrarModalEditar()">×</button>
            </div>
            <form class="modal-body" id="formEditarMiembro">
                <input type="hidden" id="miembroId" name="miembroId">
                
                <div class="form-section">
                    <h4>Información Personal</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nombreMiembro">Nombre Completo</label>
                            <input type="text" id="nombreMiembro" name="nombreMiembro" required>
                        </div>
                        <div class="form-group">
                            <label for="edadMiembro">Edad</label>
                            <input type="number" id="edadMiembro" name="edadMiembro" min="1" max="120" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dniMiembro">DNI</label>
                        <input type="text" id="dniMiembro" name="dniMiembro" pattern="[0-9]{2}\.[0-9]{3}\.[0-9]{3}" placeholder="12.345.678" required>
                    </div>
                </div>

                <div class="form-section">
                    <h4>Rol y Permisos</h4>
                    <div class="form-group">
                        <label for="rolMiembro">Rol Familiar</label>
                        <select id="rolMiembro" name="rolMiembro" required onchange="actualizarPermisos()">
                            <option value="">Seleccionar rol</option>
                            <option value="conyuge">Cónyuge</option>
                            <option value="hijo">Hijo/a</option>
                            <option value="familiar">Familiar</option>
                            <option value="empleado">Empleado Doméstico</option>
                        </select>
                    </div>

                    <div class="permisos-section">
                        <label>Permisos Asignados</label>
                        <div class="permisos-grid">
                            <div class="permiso-item">
                                <input type="checkbox" id="permisoAcceso" name="permisos[]" value="acceso" checked>
                                <label for="permisoAcceso">Acceso al Barrio</label>
                            </div>
                            <div class="permiso-item">
                                <input type="checkbox" id="permisoVisitas" name="permisos[]" value="visitas">
                                <label for="permisoVisitas">Autorizar Visitas</label>
                            </div>
                            <div class="permiso-item">
                                <input type="checkbox" id="permisoFamilia" name="permisos[]" value="familia">
                                <label for="permisoFamilia">Gestionar Familia</label>
                            </div>
                            <div class="permiso-item">
                                <input type="checkbox" id="permisoReservas" name="permisos[]" value="reservas">
                                <label for="permisoReservas">Realizar Reservas</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn-secondary" onclick="cerrarModalEditar()">Cancelar</button>
                    <button type="submit" class="btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal para Agregar Miembro -->
    <div class="modal-overlay" id="modalAgregarMiembro">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Agregar Nuevo Miembro</h3>
                <button class="close-modal" onclick="cerrarModalAgregar()">×</button>
            </div>
            <form class="modal-body" id="formAgregarMiembro">
                <div class="form-section">
                    <h4>Información Personal</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nuevoNombre">Nombre Completo</label>
                            <input type="text" id="nuevoNombre" name="nuevoNombre" required>
                        </div>
                        <div class="form-group">
                            <label for="nuevaEdad">Edad</label>
                            <input type="number" id="nuevaEdad" name="nuevaEdad" min="1" max="120" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="nuevoDni">DNI</label>
                        <input type="text" id="nuevoDni" name="nuevoDni" pattern="[0-9]{2}\.[0-9]{3}\.[0-9]{3}" placeholder="12.345.678" required>
                    </div>
                </div>

                <div class="form-section">
                    <h4>Rol y Permisos</h4>
                    <div class="form-group">
                        <label for="nuevoRol">Rol Familiar</label>
                        <select id="nuevoRol" name="nuevoRol" required onchange="actualizarPermisosNuevo()">
                            <option value="">Seleccionar rol</option>
                            <option value="conyuge">Cónyuge</option>
                            <option value="hijo">Hijo/a</option>
                            <option value="familiar">Familiar</option>
                            <option value="empleado">Empleado Doméstico</option>
                        </select>
                    </div>

                    <div class="permisos-section">
                        <label>Permisos Asignados</label>
                        <div class="permisos-grid">
                            <div class="permiso-item">
                                <input type="checkbox" id="nuevoPermisoAcceso" name="nuevosPermisos[]" value="acceso" checked>
                                <label for="nuevoPermisoAcceso">Acceso al Barrio</label>
                            </div>
                            <div class="permiso-item">
                                <input type="checkbox" id="nuevoPermisoVisitas" name="nuevosPermisos[]" value="visitas">
                                <label for="nuevoPermisoVisitas">Autorizar Visitas</label>
                            </div>
                            <div class="permiso-item">
                                <input type="checkbox" id="nuevoPermisoFamilia" name="nuevosPermisos[]" value="familia">
                                <label for="nuevoPermisoFamilia">Gestionar Familia</label>
                            </div>
                            <div class="permiso-item">
                                <input type="checkbox" id="nuevoPermisoReservas" name="nuevosPermisos[]" value="reservas">
                                <label for="nuevoPermisoReservas">Realizar Reservas</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn-secondary" onclick="cerrarModalAgregar()">Cancelar</button>
                    <button type="submit" class="btn-primary">Agregar Miembro</button>
                </div>
            </form>
        </div>
    </div>

    <script>
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
            <img src="../assets/icons/${avatars[miembro.rol] || 'usuario-hombre.png'}" alt="Avatar">
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
    </script>
</body>
</html>