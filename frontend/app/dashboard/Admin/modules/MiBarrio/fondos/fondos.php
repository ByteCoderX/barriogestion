<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Fondos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="Fondos.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="fondos-container">
            <div class="page-header">
                <h1>Gestionar Fondos</h1>
                <p>Administra el fondo común y los fondos de reserva del barrio</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="nuevoMovimientoBtn">
                    <img src="../../../assets/icons/iconmas.png" alt="Nuevo">
                    Nuevo Movimiento
                </button>
                <button class="btn-secondary" id="transferirFondosBtn">
                    <img src="../../../assets/icons/actualizardatos.png" alt="Transferir">
                    Transferir entre Fondos
                </button>
                <button class="btn-secondary" id="exportarFondosBtn">
                    <img src="../../../assets/icons/download.svg" alt="Exportar">
                    Exportar Movimientos
                </button>
                <button class="btn-secondary" id="generarReporteBtn">
                    <img src="../../../assets/icons/assets/icons/reportes.png" alt="Reporte">
                    Generar Reporte
                </button>
            </div>

            <!-- Resumen de fondos -->
            <div class="resumen-fondos">
                <div class="resumen-card principal">
                    <h3>Fondo Común</h3>
                    <div class="resumen-valor">$2,450,000</div>
                    <div class="resumen-detalle">
                        <span class="ingreso">+$1,250,000 ingresos</span>
                        <span class="egreso">-$980,000 egresos</span>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Fondo de Reserva</h3>
                    <div class="resumen-valor">$5,800,000</div>
                    <div class="resumen-detalle">Meta: $10,000,000 (58%)</div>
                    <div class="resumen-progreso">
                        <div class="progreso-bar">
                            <div class="progreso-fill" style="width: 58%"></div>
                        </div>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Fondo de Emergencia</h3>
                    <div class="resumen-valor">$1,200,000</div>
                    <div class="resumen-detalle">Disponible inmediato</div>
                </div>
                <div class="resumen-card">
                    <h3>Total Fondos</h3>
                    <div class="resumen-valor">$9,450,000</div>
                    <div class="resumen-detalle cambio-positivo">+12% vs mes anterior</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroFondo">Fondo:</label>
                    <select id="filtroFondo">
                        <option value="todos">Todos los fondos</option>
                        <option value="comun">Fondo Común</option>
                        <option value="reserva">Fondo de Reserva</option>
                        <option value="emergencia">Fondo de Emergencia</option>
                        <option value="obras">Fondo de Obras</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroTipo">Tipo:</label>
                    <select id="filtroTipo">
                        <option value="todos">Todos</option>
                        <option value="ingreso">Ingresos</option>
                        <option value="egreso">Egresos</option>
                        <option value="transferencia">Transferencias</option>
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
                    <h3>Evolución de Fondos</h3>
                    <div class="grafico-controles">
                        <button class="btn-periodo active" data-periodo="mes">Mes</button>
                        <button class="btn-periodo" data-periodo="trimestre">Trimestre</button>
                        <button class="btn-periodo" data-periodo="semestre">Semestre</button>
                        <button class="btn-periodo" data-periodo="año">Año</button>
                    </div>
                </div>
                <div class="grafico-container">
                    <canvas id="fondosChart"></canvas>
                </div>
            </div>

            <!-- Tabla de movimientos -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Movimientos Recientes</h3>
                    <div class="tabla-controles">
                        <div class="tabla-buscar">
                            <input type="text" id="buscarMovimiento" placeholder="Buscar movimiento...">
                            <img src="../../../assets/icons/search.svg" alt="Buscar">
                        </div>
                        <select id="registrosPorPagina">
                            <option value="10">10 por página</option>
                            <option value="25">25 por página</option>
                            <option value="50">50 por página</option>
                        </select>
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaMovimientos">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Fondo</th>
                                <th>Concepto</th>
                                <th>Categoría</th>
                                <th>Monto</th>
                                <th>Saldo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="movimientos-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
                <div class="paginacion" id="paginacion">
                    <!-- Controles de paginación -->
                </div>
            </div>
        </div>

        <!-- Modal para nuevo movimiento -->
        <div id="movimientoModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle">Nuevo Movimiento</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="movimientoForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="tipoMovimiento">Tipo de Movimiento:</label>
                            <select id="tipoMovimiento" required>
                                <option value="">Seleccionar tipo</option>
                                <option value="ingreso">Ingreso</option>
                                <option value="egreso">Egreso</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fondoMovimiento">Fondo:</label>
                            <select id="fondoMovimiento" required>
                                <option value="">Seleccionar fondo</option>
                                <option value="comun">Fondo Común</option>
                                <option value="reserva">Fondo de Reserva</option>
                                <option value="emergencia">Fondo de Emergencia</option>
                                <option value="obras">Fondo de Obras</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="conceptoMovimiento">Concepto:</label>
                        <input type="text" id="conceptoMovimiento" required placeholder="Descripción del movimiento">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="categoriaMovimiento">Categoría:</label>
                            <select id="categoriaMovimiento" required>
                                <option value="">Seleccionar categoría</option>
                                <option value="expensas">Cobro de Expensas</option>
                                <option value="mantenimiento">Mantenimiento</option>
                                <option value="servicios">Servicios</option>
                                <option value="seguridad">Seguridad</option>
                                <option value="limpieza">Limpieza</option>
                                <option value="obras">Obras y Mejoras</option>
                                <option value="aporte">Aporte Extraordinario</option>
                                <option value="interes">Intereses Bancarios</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="montoMovimiento">Monto:</label>
                            <input type="number" id="montoMovimiento" step="0.01" required placeholder="0.00">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fechaMovimiento">Fecha:</label>
                            <input type="date" id="fechaMovimiento" required>
                        </div>
                        <div class="form-group">
                            <label for="comprobanteMovimiento">Nº Comprobante:</label>
                            <input type="text" id="comprobanteMovimiento" placeholder="Opcional">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="descripcionMovimiento">Descripción Detallada:</label>
                        <textarea id="descripcionMovimiento" rows="3" placeholder="Detalles adicionales (opcional)"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarMovimiento">Cancelar</button>
                        <button type="submit" class="btn-save">Guardar Movimiento</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para transferencia entre fondos -->
        <div id="transferenciaModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Transferir entre Fondos</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="transferenciaForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fondoOrigen">Fondo Origen:</label>
                            <select id="fondoOrigen" required>
                                <option value="">Seleccionar fondo</option>
                                <option value="comun">Fondo Común - $2,450,000</option>
                                <option value="reserva">Fondo de Reserva - $5,800,000</option>
                                <option value="emergencia">Fondo de Emergencia - $1,200,000</option>
                                <option value="obras">Fondo de Obras - $0</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fondoDestino">Fondo Destino:</label>
                            <select id="fondoDestino" required>
                                <option value="">Seleccionar fondo</option>
                                <option value="comun">Fondo Común</option>
                                <option value="reserva">Fondo de Reserva</option>
                                <option value="emergencia">Fondo de Emergencia</option>
                                <option value="obras">Fondo de Obras</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="montoTransferencia">Monto a Transferir:</label>
                        <input type="number" id="montoTransferencia" step="0.01" required placeholder="0.00">
                        <small class="form-help">Saldo disponible: <span id="saldoDisponible">$0</span></small>
                    </div>
                    <div class="form-group">
                        <label for="fechaTransferencia">Fecha:</label>
                        <input type="date" id="fechaTransferencia" required>
                    </div>
                    <div class="form-group">
                        <label for="motivoTransferencia">Motivo de la Transferencia:</label>
                        <textarea id="motivoTransferencia" rows="3" required placeholder="Describa el motivo de la transferencia"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarTransferencia">Cancelar</button>
                        <button type="submit" class="btn-save">Realizar Transferencia</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para ver detalle -->
        <div id="detalleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalle del Movimiento</h3>
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
    </main>

    <script src="fondos.js"></script>
</body>
</html>