<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Visitas - BarrioGestion</title>
    <link rel="stylesheet" href="Visitas.css">
    <link rel="stylesheet" href="../../../index.css">
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
                <a href="expensas.php" class="mobile-menu-item active">
                    <img src="../../../assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="historial-pagos.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="mapa-barrio.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="reservas.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="carnet.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="control-acceso.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="visitas.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="notificaciones.php" class="mobile-icon-item">
                <img src="../../../assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="reclamos.php" class="mobile-icon-item">
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
                    <h1>Mis visitas</h1>
                    <p>Consulta el historial completo de tus visitas registradas</p>
                    <div class="breadcrumb">
                        <a href="../../../index.php">Inicio</a> &gt; <span>Seguridad</span> &gt; <span>Registro de visitas</span>
                    </div>
                </div>
            </div>

    <div class="container">
        <!-- Estadísticas del cliente -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="visitasAutorizadas">5</div>
                <div class="stat-label">Visitas Autorizadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="visitasActivas">2</div>
                <div class="stat-label">Activas Hoy</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="visitasPendientes">1</div>
                <div class="stat-label">Pendientes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="visitasEsteMes">8</div>
                <div class="stat-label">Este Mes</div>
            </div>
        </div>

        <!-- Acciones rápidas -->
        <div class="quick-actions">
            <div class="action-card">
                <h3>Nueva Autorización</h3>
                <p>Autorizar nueva visita para tu lote</p>
                <a href="../ControlAccesos/Invitado.php" class="btn">Autorizar Visita</a>
            </div>
        </div>

        <!-- Filtros simplificados para cliente -->
        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label for="fechaFiltro">Filtrar por Fecha</label>
                    <input type="date" id="fechaFiltro" name="fechaFiltro">
                </div>
                <div class="filter-group">
                    <label for="estadoFiltro">Estado</label>
                    <select id="estadoFiltro" name="estadoFiltro">
                        <option value="">Todos los estados</option>
                        <option value="autorizada">Autorizada</option>
                        <option value="activa">En Curso</option>
                        <option value="completada">Completada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="tipoFiltro">Tipo</label>
                    <select id="tipoFiltro" name="tipoFiltro">
                        <option value="">Todos los tipos</option>
                        <option value="una_vez">Una Vez</option>
                        <option value="temporal">Temporal</option>
                        <option value="permanente">Permanente</option>
                    </select>
                </div>
                <div class="filter-group">
                    <button class="btn btn-small" onclick="aplicarFiltros()">🔍 Filtrar</button>
                </div>
                <div class="filter-group">
                    <button class="btn btn-small btn-secondary" onclick="limpiarFiltros()">🗑️ Limpiar</button>
                </div>
            </div>
        </div>

        <!-- Tabla de visitas del cliente -->
        <div class="table-section">
            <div class="table-header">
                <h2> Mis Visitas Autorizadas</h2>
                <button class="btn btn-small" onclick="exportarMisVisitas()">📥 Exportar</button>
            </div>
            <div class="table-container">
                <table id="visitasTable">
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
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="visitasTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal de Confirmación para Cancelar -->
    <div id="modalCancelar" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2> Confirmar Cancelación</h2>
                <button class="modal-close" onclick="cerrarModalCancelar()">&times;</button>
            </div>
            <div class="modal-body">
                <p>¿Estás seguro de que deseas cancelar la visita de <strong id="nombreVisitanteCancelar"></strong>?</p>
                <p class="modal-warning">Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="cerrarModalCancelar()">No, volver</button>
                <button class="btn btn-danger" onclick="confirmarCancelacion()">Sí, cancelar visita</button>
            </div>
        </div>
    </div>

    <!-- Modal de Edición -->
    <div id="modalEditar" class="modal">
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2> Editar Visita</h2>
                <button class="modal-close" onclick="cerrarModalEditar()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="formEditarVisita" onsubmit="event.preventDefault(); guardarEdicion();">
                    <input type="hidden" id="editId">
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="editNombre">Nombre Completo *</label>
                            <input type="text" id="editNombre" required>
                        </div>

                        <div class="form-group">
                            <label for="editDni">DNI *</label>
                            <input type="text" id="editDni" required>
                        </div>

                        <div class="form-group">
                            <label for="editTelefono">Teléfono *</label>
                            <input type="tel" id="editTelefono" required>
                        </div>

                        <div class="form-group">
                            <label for="editFecha">Fecha *</label>
                            <input type="date" id="editFecha" required>
                        </div>

                        <div class="form-group">
                            <label for="editHoraDesde">Hora Desde *</label>
                            <input type="time" id="editHoraDesde" required>
                        </div>

                        <div class="form-group">
                            <label for="editHoraHasta">Hora Hasta *</label>
                            <input type="time" id="editHoraHasta" required>
                        </div>

                        <div class="form-group">
                            <label for="editTipo">Tipo de Visita *</label>
                            <select id="editTipo" required>
                                <option value="una_vez">Una Vez</option>
                                <option value="temporal">Temporal</option>
                                <option value="permanente">Permanente</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="editMotivo">Motivo *</label>
                            <select id="editMotivo" required>
                                <option value="familiar">Visita Familiar</option>
                                <option value="social">Visita Social</option>
                                <option value="trabajo">Trabajo/Servicio</option>
                                <option value="delivery">Delivery</option>
                                <option value="mantenimiento">Mantenimiento</option>
                                <option value="evento">Evento</option>
                            </select>
                        </div>

                        <div class="form-group form-group-full">
                            <label for="editObservaciones">Observaciones</label>
                            <textarea id="editObservaciones" rows="3"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="cerrarModalEditar()">Cancelar</button>
                <button class="btn" onclick="guardarEdicion()">Guardar Cambios</button>
            </div>
        </div>
    </div>
       
    <script src="Visitas.js"></script>

</body>
</html>