<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Reclamos</title>
    <link rel="stylesheet" href="complains.css">
    <link rel="stylesheet" href="../../index.css">
</head>
<body>
    <?php include '../../includes/header.php'; ?>

    <nav class="navbar">
        <h1>Sistema de Reclamos y Sugerencias</h1>
    </nav>

    <div class="container">
        <!-- Estadísticas -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalReclamos">0</div>
                <div class="stat-label">Total Reclamos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="reclamosNuevosCount">0</div>
                <div class="stat-label">Nuevos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="reclamosEnProceso">0</div>
                <div class="stat-label">En Proceso</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="reclamosResueltos">0</div>
                <div class="stat-label">Resueltos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="reclamosCerrados">0</div>
                <div class="stat-label">Cerrados</div>
            </div>
        </div>

        <!-- Formulario para crear reclamo (Vista Usuario) -->
        <div class="form-section" id="userFormSection">
            <h2 class="form-title">Nuevo Reclamo o Sugerencia</h2>
            
            <div id="alertContainer"></div>

            <form id="reclamoForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="categoria">Categoría *</label>
                        <select id="categoria" name="categoria" required>
                            <option value="">Seleccionar categoría...</option>
                            <option value="mantenimiento">Mantenimiento</option>
                            <option value="limpieza">Limpieza</option>
                            <option value="seguridad">Seguridad</option>
                            <option value="ruidos">Ruidos Molestos</option>
                            <option value="areas_comunes">Áreas Comunes</option>
                            <option value="servicios">Servicios (Agua, Luz, Gas)</option>
                            <option value="administrativo">Administrativo</option>
                            <option value="convivencia">Convivencia</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="prioridad">Urgencia *</label>
                        <select id="prioridad" name="prioridad" required>
                            <option value="">Seleccionar urgencia...</option>
                            <option value="baja">🟢 Baja - No urgente</option>
                            <option value="media">🟡 Media - Puede esperar</option>
                            <option value="alta">🟠 Alta - Requiere atención pronto</option>
                            <option value="urgente">🔴 Urgente - Requiere atención inmediata</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="ubicacion">Ubicación *</label>
                        <input type="text" id="ubicacion" name="ubicacion" required placeholder="Ej: Torre A - Piso 3 - Dpto 301">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="asunto">Asunto *</label>
                    <input type="text" id="asunto" name="asunto" required placeholder="Resumen breve del reclamo o sugerencia">
                </div>

                <div class="form-group">
                    <label for="descripcion">Descripción Detallada *</label>
                    <textarea id="descripcion" name="descripcion" rows="5" required placeholder="Describe con el mayor detalle posible tu reclamo o sugerencia..."></textarea>
                </div>
                <div class="form-group checkbox-group">
                    <label>
                        <input type="checkbox" id="anonimo" name="anonimo">
                        Enviar de forma anónima
                    </label>
                </div>
                
                <div class="button-group">
                    <button type="submit" class="btn">Enviar Reclamo</button>
                    <button type="reset" class="btn btn-danger">Limpiar</button>
                </div>
            </form>
        </div>

        <!-- Sección de administración (Vista Admin) -->
        <div class="admin-section" id="adminSection">
            <h2 class="form-title">Panel de Administración de Reclamos</h2>
            
            <!-- Filtros avanzados -->
            <div class="filters-section">
                <h3>Filtrar Reclamos</h3>
                <div class="filters-grid">
                    <select id="filtroEstado" onchange="filtrarReclamos()">
                        <option value="">Todos los estados</option>
                        <option value="nuevo">Nuevos</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="resuelto">Resueltos</option>
                        <option value="cerrado">Cerrados</option>
                        <option value="rechazado">Rechazados</option>
                    </select>
                    <select id="filtroCategoria" onchange="filtrarReclamos()">
                        <option value="">Todas las categorías</option>
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="limpieza">Limpieza</option>
                        <option value="seguridad">Seguridad</option>
                        <option value="ruidos">Ruidos Molestos</option>
                        <option value="areas_comunes">Áreas Comunes</option>
                        <option value="servicios">Servicios</option>
                        <option value="administrativo">Administrativo</option>
                        <option value="convivencia">Convivencia</option>
                        <option value="otros">Otros</option>
                    </select>
                    
                    <select id="filtroPrioridad" onchange="filtrarReclamos()">
                        <option value="">Todas las prioridades</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                    </select>

                    <input type="date" id="filtroFechaDesde" onchange="filtrarReclamos()" placeholder="Fecha desde">

                    <input type="text" id="buscarTexto" placeholder="Buscar por asunto o descripción..." onkeyup="filtrarReclamos()">

                    <button class="btn btn-secondary btn-small" onclick="limpiarFiltros()">Limpiar Filtros</button>
                </div>
            </div>
        </div>

        <!-- Tabla de reclamos -->
        <div class="table-section">
            <div class="table-header">
                <h2>Listado de Reclamos</h2>
                <div class="table-actions">
                    <button class="btn btn-small" onclick="exportarReclamos()">Exportar</button>
                    <button class="btn btn-small btn-secondary" onclick="generarReporte()">Generar Reporte</button>
                </div>
            </div>
            <div class="table-container">
                <table id="reclamosTable">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Fecha</th>
                            <th>Asunto</th>
                            <th>Categoría</th>
                            <th>Ubicación</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                            <th>Asignado a</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="reclamosTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="complains.js"></script>
</body>
</html>