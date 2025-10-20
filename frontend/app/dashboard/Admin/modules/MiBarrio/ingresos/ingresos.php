<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Ingresos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="ingresos.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="ingresos-container">
            <div class="page-header">
                <h1>Gestionar Ingresos</h1>
                <p>Administra todos los ingresos del barrio: expensas, aportes extraordinarios y otros cobros</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="nuevoIngresoBtn">
                    <img src="../../../assets/icons/iconmas.png" alt="Nuevo">
                    Registrar Ingreso
                </button>
                <button class="btn-secondary" id="cobrarExpensasBtn">
                    <img src="../../../assets/icons/actualizardatos.png" alt="Cobrar">
                    Cobrar Expensas Masivo
                </button>
                <button class="btn-secondary" id="exportarIngresosBtn">
                    <img src="../../../assets/icons/download.svg" alt="Exportar">
                    Exportar Ingresos
                </button>
                <button class="btn-secondary" id="generarRecibosBtn">
                    <img src="../../../assets/icons/assets/icons/reportes.png" alt="Recibos">
                    Generar Recibos
                </button>
            </div>

            <!-- Resumen de ingresos -->
            <div class="resumen-ingresos">
                <div class="resumen-card principal">
                    <h3>Ingresos del Mes</h3>
                    <div class="resumen-valor">$3,850,000</div>
                    <div class="resumen-detalle">
                        <span class="ingreso">42 transacciones registradas</span>
                        <span class="comparacion">+15% vs mes anterior</span>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Expensas Cobradas</h3>
                    <div class="resumen-valor">$2,950,000</div>
                    <div class="resumen-detalle">35 de 45 lotes pagados (78%)</div>
                    <div class="resumen-progreso">
                        <div class="progreso-bar">
                            <div class="progreso-fill" style="width: 78%"></div>
                        </div>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Aportes Extraordinarios</h3>
                    <div class="resumen-valor">$650,000</div>
                    <div class="resumen-detalle">8 aportes recibidos</div>
                </div>
                <div class="resumen-card">
                    <h3>Otros Ingresos</h3>
                    <div class="resumen-valor">$250,000</div>
                    <div class="resumen-detalle">Alquileres y diversos</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroTipo">Tipo de Ingreso:</label>
                    <select id="filtroTipo">
                        <option value="todos">Todos los tipos</option>
                        <option value="expensas">Expensas Ordinarias</option>
                        <option value="extraordinarias">Expensas Extraordinarias</option>
                        <option value="aporte">Aportes</option>
                        <option value="alquiler">Alquileres</option>
                        <option value="interes">Intereses</option>
                        <option value="multa">Multas</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroEstado">Estado:</label>
                    <select id="filtroEstado">
                        <option value="todos">Todos</option>
                        <option value="pagado">Pagado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="parcial">Pago Parcial</option>
                        <option value="vencido">Vencido</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroLote">Lote:</label>
                    <select id="filtroLote">
                        <option value="todos">Todos los lotes</option>
                        <option value="lote1">Lote 1</option>
                        <option value="lote2">Lote 2</option>
                        <option value="lote3">Lote 3</option>
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
                    <h3>Evolución de Ingresos</h3>
                    <div class="grafico-controles">
                        <button class="btn-periodo active" data-periodo="mes">Mes</button>
                        <button class="btn-periodo" data-periodo="trimestre">Trimestre</button>
                        <button class="btn-periodo" data-periodo="semestre">Semestre</button>
                        <button class="btn-periodo" data-periodo="año">Año</button>
                    </div>
                </div>
                <div class="grafico-container">
                    <canvas id="ingresosChart"></canvas>
                </div>
            </div>

            <!-- Tabla de ingresos -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Registro de Ingresos</h3>
                    <div class="tabla-controles">
                        <div class="tabla-buscar">
                            <input type="text" id="buscarIngreso" placeholder="Buscar por lote, concepto...">
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
                    <table id="tablaIngresos">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Lote</th>
                                <th>Propietario</th>
                                <th>Tipo</th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Recibo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="ingresos-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
                <div class="paginacion" id="paginacion">
                    <!-- Controles de paginación -->
                </div>
            </div>
        </div>

        <!-- Modal para nuevo ingreso -->
        <div id="ingresoModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle">Registrar Nuevo Ingreso</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="ingresoForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="tipoIngreso">Tipo de Ingreso:</label>
                            <select id="tipoIngreso" required>
                                <option value="">Seleccionar tipo</option>
                                <option value="expensas">Expensas Ordinarias</option>
                                <option value="extraordinarias">Expensas Extraordinarias</option>
                                <option value="aporte">Aporte Voluntario</option>
                                <option value="alquiler">Alquiler</option>
                                <option value="interes">Intereses</option>
                                <option value="multa">Multa</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="loteIngreso">Lote:</label>
                            <select id="loteIngreso" required>
                                <option value="">Seleccionar lote</option>
                                <option value="lote1">Lote 1 - Juan Pérez</option>
                                <option value="lote2">Lote 2 - María García</option>
                                <option value="lote3">Lote 3 - Carlos López</option>
                                <option value="lote4">Lote 4 - Ana Martínez</option>
                                <option value="lote5">Lote 5 - Roberto Sánchez</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="conceptoIngreso">Concepto:</label>
                        <input type="text" id="conceptoIngreso" required placeholder="Ej: Expensas Octubre 2024">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="montoIngreso">Monto:</label>
                            <input type="number" id="montoIngreso" step="0.01" required placeholder="0.00">
                        </div>
                        <div class="form-group">
                            <label for="metodoPago">Método de Pago:</label>
                            <select id="metodoPago" required>
                                <option value="">Seleccionar método</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="transferencia">Transferencia Bancaria</option>
                                <option value="cheque">Cheque</option>
                                <option value="debito">Débito Automático</option>
                                <option value="mercadopago">Mercado Pago</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fechaIngreso">Fecha de Pago:</label>
                            <input type="date" id="fechaIngreso" required>
                        </div>
                        <div class="form-group">
                            <label for="nroRecibo">Nº de Recibo:</label>
                            <input type="text" id="nroRecibo" placeholder="Se genera automáticamente" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="observaciones">Observaciones:</label>
                        <textarea id="observaciones" rows="3" placeholder="Observaciones adicionales (opcional)"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarIngreso">Cancelar</button>
                        <button type="submit" class="btn-save">Registrar Ingreso</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para cobro masivo de expensas -->
        <div id="cobrarExpensasModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Cobrar Expensas Masivo</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="cobrarExpensasForm">
                    <div class="form-group">
                        <label for="periodoExpensas">Período:</label>
                        <input type="month" id="periodoExpensas" required>
                    </div>
                    <div class="form-group">
                        <label for="montoExpensas">Monto por Lote:</label>
                        <input type="number" id="montoExpensas" step="0.01" required placeholder="0.00">
                    </div>
                    <div class="form-group">
                        <label for="fechaVencimiento">Fecha de Vencimiento:</label>
                        <input type="date" id="fechaVencimiento" required>
                    </div>
                    <div class="form-group">
                        <label>Seleccionar Lotes:</label>
                        <div class="checkbox-group" id="lotesCheckbox">
                            <!-- Se generarán dinámicamente -->
                        </div>
                        <div class="checkbox-actions">
                            <button type="button" class="btn-checkbox" id="seleccionarTodos">Seleccionar Todos</button>
                            <button type="button" class="btn-checkbox" id="deseleccionarTodos">Deseleccionar Todos</button>
                        </div>
                    </div>
                    <div class="form-summary">
                        <p>Total de lotes seleccionados: <strong id="lotesSeleccionados">0</strong></p>
                        <p>Monto total a facturar: <strong id="montoTotal">$0</strong></p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarCobro">Cancelar</button>
                        <button type="submit" class="btn-save">Generar Cobro Masivo</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para ver detalle -->
        <div id="detalleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalle del Ingreso</h3>
                    <span class="close">&times;</span>
                </div>
                <div id="detalleContent" class="detalle-content">
                    <!-- Contenido del detalle -->
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="imprimirRecibo">Imprimir Recibo</button>
                    <button class="btn-secondary" id="enviarEmail">Enviar por Email</button>
                    <button class="btn-primary" id="cerrarDetalle">Cerrar</button>
                </div>
            </div>
        </div>
    </main>

    <script src="ingresos.js"></script>
</body>
</html>