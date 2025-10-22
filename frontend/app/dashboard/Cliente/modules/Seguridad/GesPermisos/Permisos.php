<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Permisos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="Permisos.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <img src="../../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
            <button class="close-menu" id="closeMenu">×</button>
        </div>
        
        <div class="mobile-menu-content">
            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="../Expensas/expensas.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="../Expensas/Historial/Historial.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="../mapa-barrio.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="../Servicios/ReservasEC/reservas.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="../Servicios/MiCarnet/carnet.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="../Seguridad/ControlAccesos/Invitado.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item active">
                    <img src="../../../assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="../Seguridad/RegistroVisitas/Invitados.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="../Notificaciones/notificacion.php" class="mobile-icon-item">
                <img src="../../../assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="../Reclamos/quejas.php" class="mobile-icon-item">
                <img src="../../../assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
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
                        <a href="../../../index.php">Inicio</a> &gt; <span>Seguridad</span> &gt; <span>Gestionar Permisos</span>
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
                        <img src="https://pxcdn.ellitoral.com.ar/litoral/072012/1515510933132.jpg" alt="Lote">
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
                            <img src="https://www.gravatar.com/avatar/ejemplo?s=200" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Juan Carlos Pérez</h4>
                            <p class="miembro-edad">45 años</p>
                            <p class="miembro-dni">DNI: 25123456</p>
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
                            <img src="https://www.gravatar.com/avatar/ejemplo?s=200" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>María Elena García</h4>
                            <p class="miembro-edad">42 años</p>
                            <p class="miembro-dni">DNI: 27654321</p>
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
                            <img src="https://www.gravatar.com/avatar/ejemplo?s=200" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Carlos Andrés Pérez</h4>
                            <p class="miembro-edad">22 años</p>
                            <p class="miembro-dni">DNI: 43789012</p>
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
                            <img src="https://www.gravatar.com/avatar/ejemplo?s=200" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Sofía Pérez García</h4>
                            <p class="miembro-edad">19 años</p>
                            <p class="miembro-dni">DNI: 45234567</p>
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
                            <img src="https://www.gravatar.com/avatar/ejemplo?s=200" alt="Avatar">
                        </div>
                        <div class="miembro-info">
                            <h4>Rosa Elena Martinez</h4>
                            <p class="miembro-edad">38 años</p>
                            <p class="miembro-dni">DNI: 32456789</p>
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
                            <input type="number" id="edadMiembro" name="edadMiembro" min="1" max="99" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dniMiembro">DNI (8 números)</label>
                        <input type="text" id="dniMiembro" name="dniMiembro" maxlength="8" placeholder="12345678" required>
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
                            <input type="number" id="nuevaEdad" name="nuevaEdad" min="1" max="99" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="nuevoDni">DNI (8 números)</label>
                        <input type="text" id="nuevoDni" name="nuevoDni" maxlength="8" placeholder="12345678" required>
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

    <script src="Permisos.js"></script>

</body>
</html>