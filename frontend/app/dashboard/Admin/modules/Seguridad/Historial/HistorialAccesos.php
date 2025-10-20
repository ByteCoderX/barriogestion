<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Accesos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="HistorialAccesos.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="historial-container">
            <div class="page-header">
                <h1>Historial de Accesos</h1>
                <p>Administra y monitorea todos los registros de entrada y salida del barrio</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="exportarHistorialBtn">
                    <img src="../../../assets/icons/download.svg" alt="Exportar">
                    Exportar Historial
                </button>
                <button class="btn-secondary" id="generarReporteBtn">
                    <img src="../../../assets/icons/assets/icons/reportes.png" alt="Reporte">
                    Generar Reporte
                </button>
                <button class="btn-secondary" id="imprimirHistorialBtn">
                    <img src="../../../assets/icons/assets/icons/reportes.png" alt="Imprimir">
                    Imprimir
                </button>
            </div>

            <!-- Resumen de accesos -->
            <div class="resumen-accesos">
                <div class="resumen-card principal">
                    <h3>Accesos Hoy</h3>
                    <div class="resumen-valor">127</div>
                    <div class="resumen-detalle">
                        <span class="info">89 entradas / 38 salidas</span>
                        <span class="comparacion">+12% vs ayer</span>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Visitas Activas</h3>
                    <div class="resumen-valor">23</div>
                    <div class="resumen-detalle">Visitantes dentro del barrio</div>
                </div>
                <div class="resumen-card">
                    <h3>Accesos Esta Semana</h3>
                    <div class="resumen-valor">842</div>
                    <div class="resumen-detalle">Promedio: 120 por día</div>
                </div>
                <div class="resumen-card">
                    <h3>Alertas Pendientes</h3>
                    <div class="resumen-valor">3</div>
                    <div class="resumen-detalle">Visitas sin registrar salida</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroTipo">Tipo de Acceso:</label>
                    <select id="filtroTipo">
                        <option value="todos">Todos los tipos</option>
                        <option value="propietario">Propietario</option>
                        <option value="visita">Visita</option>
                        <option value="proveedor">Proveedor</option>
                        <option value="empleado">Empleado</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroMovimiento">Movimiento:</label>
                    <select id="filtroMovimiento">
                        <option value="todos">Todos</option>
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroLote">Lote:</label>
                    <select id="filtroLote">
                        <option value="todos">Todos los lotes</option>
                        <option value="lote1">Lote 1</option>
                        <option value="lote2">Lote 2</option>
                        <option value="lote3">Lote 3</option>
                        <option value="lote4">Lote 4</option>
                        <option value="lote5">Lote 5</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroFechaDesde">Desde:</label>
                    <input type="date" id="filtroFechaDesde">
                </div>
                <div class="filtro-grupo">
                    <label for="filtroFechaHasta">Hasta:</label>
                    <input type="date" id="filtroFechaHasta">
                </div>
                <button class="btn-filtro" id="aplicarFiltros">Aplicar Filtros</button>
                <button class="btn-filtro-limpiar" id="limpiarFiltros">Limpiar</button>
            </div>

            <!-- Gráfico de evolución -->
            <div class="grafico-section">
                <div class="grafico-header">
                    <h3>Evolución de Accesos</h3>
                    <div class="grafico-controles">
                        <button class="btn-periodo active" data-periodo="dia">Hoy</button>
                        <button class="btn-periodo" data-periodo="semana">Esta Semana</button>
                        <button class="btn-periodo" data-periodo="mes">Este Mes</button>
                        <button class="btn-periodo" data-periodo="year">Este Año</button>
                    </div>
                </div>
                <div class="grafico-container">
                    <canvas id="accesosChart"></canvas>
                </div>
            </div>

            <!-- Tabla de historial -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Registro de Accesos</h3>
                    <div class="tabla-controles">
                        <div class="tabla-buscar">
                            <input type="text" id="buscarAcceso" placeholder="Buscar por nombre, documento, lote...">
                            <img src="../../../assets/icons/search.svg" alt="Buscar">
                        </div>
                        <select id="registrosPorPagina">
                            <option value="10">10 por página</option>
                            <option value="25">25 por página</option>
                            <option value="50">50 por página</option>
                            <option value="100">100 por página</option>
                        </select>
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaAccesos">
                        <thead>
                            <tr>
                                <th>Fecha y Hora</th>
                                <th>Tipo</th>
                                <th>Nombre</th>
                                <th>Documento</th>
                                <th>Lote</th>
                                <th>Movimiento</th>
                                <th>Vehículo</th>
                                <th>Guardia</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="accesos-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
                <div class="paginacion" id="paginacion">
                    <!-- Controles de paginación -->
                </div>
            </div>
        </div>

        <!-- Modal para ver detalle -->
        <div id="detalleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalle del Acceso</h3>
                    <span class="close">&times;</span>
                </div>
                <div id="detalleContent" class="detalle-content">
                    <!-- Contenido del detalle -->
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="imprimirDetalle">Imprimir</button>
                    <button class="btn-primary" id="cerrarDetalle">Cerrar</button>
                </div>
            </div>
        </div>

        <!-- Modal para registrar salida -->
        <div id="salidaModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Registrar Salida</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="salidaForm">
                    <div class="acceso-info">
                        <p><strong>Nombre:</strong> <span id="salidaNombre"></span></p>
                        <p><strong>Documento:</strong> <span id="salidaDocumento"></span></p>
                        <p><strong>Tipo:</strong> <span id="salidaTipo"></span></p>
                        <p><strong>Hora de Entrada:</strong> <span id="salidaHoraEntrada"></span></p>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fechaSalida">Fecha de Salida:</label>
                            <input type="date" id="fechaSalida" required>
                        </div>
                        <div class="form-group">
                            <label for="horaSalida">Hora de Salida:</label>
                            <input type="time" id="horaSalida" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="guardiaSalida">Guardia:</label>
                        <select id="guardiaSalida" required>
                            <option value="">Seleccionar guardia</option>
                            <option value="guardia1">Pedro González</option>
                            <option value="guardia2">Luis Martín</option>
                            <option value="guardia3">Jorge Ramírez</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="observacionesSalida">Observaciones:</label>
                        <textarea id="observacionesSalida" rows="2" placeholder="Información adicional (opcional)"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarSalida">Cancelar</button>
                        <button type="submit" class="btn-save">Registrar Salida</button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <script src="HistorialAccesos.js"></script>
</body>
</html>