<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Expensas - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="ExpensasAdmin.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="expensas-container">
            <div class="page-header">
                <h1>Gestionar Expensas</h1>
                <p>Genera, administra y controla las expensas mensuales de cada lote</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="generarExpensasBtn">
                    <img src="../../../assets/icons/iconmas.svg" alt="Generar">
                    Generar Expensas del Mes
                </button>
                <button class="btn-secondary" id="enviarExpensasBtn">
                    <img src="../../../assets/icons/email.svg" alt="Enviar">
                    Enviar por Email
                </button>
                <button class="btn-secondary" id="exportarExpensasBtn">
                    <img src="../../../assets/icons/export.svg" alt="Exportar">
                    Exportar Listado
                </button>
                <button class="btn-secondary" id="imprimirExpensasBtn">
                    <img src="../../../assets/icons/print.svg" alt="Imprimir">
                    Imprimir Todas
                </button>
            </div>

            <!-- Resumen de expensas -->
            <div class="resumen-expensas">
                <div class="resumen-card principal">
                    <h3>Período Actual</h3>
                    <div class="resumen-valor">Octubre 2024</div>
                    <div class="resumen-detalle">
                        <span class="info">Vencimiento: 10/11/2024</span>
                        <span class="estado">Estado: Generadas</span>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Total Facturado</h3>
                    <div class="resumen-valor">$3,825,000</div>
                    <div class="resumen-detalle">45 lotes facturados</div>
                </div>
                <div class="resumen-card success">
                    <h3>Cobrado</h3>
                    <div class="resumen-valor">$2,950,000</div>
                    <div class="resumen-detalle">35 lotes pagos (78%)</div>
                    <div class="resumen-progreso">
                        <div class="progreso-bar">
                            <div class="progreso-fill" style="width: 78%"></div>
                        </div>
                    </div>
                </div>
                <div class="resumen-card warning">
                    <h3>Pendiente</h3>
                    <div class="resumen-valor">$875,000</div>
                    <div class="resumen-detalle">10 lotes deben (22%)</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroPeriodo">Período:</label>
                    <select id="filtroPeriodo">
                        <option value="2024-10">Octubre 2024</option>
                        <option value="2024-09">Septiembre 2024</option>
                        <option value="2024-08">Agosto 2024</option>
                        <option value="2024-07">Julio 2024</option>
                        <option value="2024-06">Junio 2024</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroEstado">Estado de Pago:</label>
                    <select id="filtroEstado">
                        <option value="todos">Todos los estados</option>
                        <option value="pagado">Pagado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="vencido">Vencido</option>
                        <option value="parcial">Pago Parcial</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroMonto">Rango de Monto:</label>
                    <select id="filtroMonto">
                        <option value="todos">Todos</option>
                        <option value="0-50000">$0 - $50,000</option>
                        <option value="50000-100000">$50,000 - $100,000</option>
                        <option value="100000-150000">$100,000 - $150,000</option>
                        <option value="150000-mas">Más de $150,000</option>
                    </select>
                </div>
                <button class="btn-filtro" id="aplicarFiltros">Aplicar Filtros</button>
                <button class="btn-filtro-limpiar" id="limpiarFiltros">Limpiar</button>
            </div>

            <!-- Gráfico de estadísticas -->
            <div class="grafico-section">
                <div class="grafico-header">
                    <h3>Evolución de Cobranza</h3>
                    <div class="grafico-controles">
                        <button class="btn-periodo active" data-periodo="6">Últimos 6 meses</button>
                        <button class="btn-periodo" data-periodo="12">Últimos 12 meses</button>
                        <button class="btn-periodo" data-periodo="all">Todo el período</button>
                    </div>
                </div>
                <div class="grafico-container">
                    <canvas id="expensasChart"></canvas>
                </div>
            </div>

            <!-- Tabla de expensas -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Expensas por Lote</h3>
                    <div class="tabla-controles">
                        <div class="tabla-buscar">
                            <input type="text" id="buscarExpensa" placeholder="Buscar por lote o propietario...">
                            <img src="../../../assets/icons/search.svg" alt="Buscar">
                        </div>
                        <select id="registrosPorPagina">
                            <option value="10">10 por página</option>
                            <option value="25">25 por página</option>
                            <option value="50">50 por página</option>
                            <option value="100">Todos</option>
                        </select>
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaExpensas">
                        <thead>
                            <tr>
                                <th>Lote</th>
                                <th>Propietario</th>
                                <th>Período</th>
                                <th>Monto</th>
                                <th>Pagado</th>
                                <th>Saldo</th>
                                <th>Estado</th>
                                <th>Vencimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="expensas-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
                <div class="paginacion" id="paginacion">
                    <!-- Controles de paginación -->
                </div>
            </div>
        </div>

        <!-- Modal para generar expensas -->
        <div id="generarExpensasModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Generar Expensas del Mes</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="generarExpensasForm">
                    <div class="form-group">
                        <label for="periodoExpensas">Período:</label>
                        <input type="month" id="periodoExpensas" required>
                        <small class="form-help">Selecciona el mes para el cual generar las expensas</small>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="montoBase">Monto Base por Lote:</label>
                            <input type="number" id="montoBase" step="0.01" required placeholder="85000.00">
                        </div>
                        <div class="form-group">
                            <label for="fechaVencimiento">Fecha de Vencimiento:</label>
                            <input type="date" id="fechaVencimiento" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Conceptos Incluidos:</label>
                        <div class="checkbox-group-grid">
                            <label class="checkbox-label">
                                <input type="checkbox" checked> Mantenimiento General
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" checked> Seguridad
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" checked> Limpieza
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" checked> Espacios Comunes
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox"> Fondo de Reserva
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox"> Mejoras Extraordinarias
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="notasExpensas">Notas Adicionales:</label>
                        <textarea id="notasExpensas" rows="3" placeholder="Información adicional que aparecerá en las expensas (opcional)"></textarea>
                    </div>
                    <div class="form-summary">
                        <p>Total de lotes a facturar: <strong>45</strong></p>
                        <p>Monto total a generar: <strong id="montoTotalGenerar">$3,825,000</strong></p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarGenerar">Cancelar</button>
                        <button type="submit" class="btn-save">Generar Expensas</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para ver detalle -->
        <div id="detalleExpensaModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalle de Expensa</h3>
                    <span class="close">&times;</span>
                </div>
                <div id="detalleExpensaContent" class="detalle-content">
                    <!-- Contenido del detalle -->
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="imprimirExpensa">Imprimir</button>
                    <button class="btn-secondary" id="enviarEmailExpensa">Enviar por Email</button>
                    <button class="btn-primary" id="cerrarDetalleExpensa">Cerrar</button>
                </div>
            </div>
        </div>

        <!-- Modal para registrar pago -->
        <div id="registrarPagoModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Registrar Pago de Expensa</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="registrarPagoForm">
                    <div class="pago-info">
                        <p><strong>Lote:</strong> <span id="pagoLote"></span></p>
                        <p><strong>Propietario:</strong> <span id="pagoPropietario"></span></p>
                        <p><strong>Monto Total:</strong> <span id="pagoMontoTotal"></span></p>
                        <p><strong>Saldo Pendiente:</strong> <span id="pagoSaldoPendiente"></span></p>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="montoPago">Monto a Pagar:</label>
                            <input type="number" id="montoPago" step="0.01" required placeholder="0.00">
                            <small class="form-help">Puedes ingresar el monto total o un pago parcial</small>
                        </div>
                        <div class="form-group">
                            <label for="fechaPago">Fecha de Pago:</label>
                            <input type="date" id="fechaPago" required>
                        </div>
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
                    <div class="form-group">
                        <label for="referenciaPago">Referencia/Comprobante:</label>
                        <input type="text" id="referenciaPago" placeholder="Número de comprobante o referencia (opcional)">
                    </div>
                    <div class="form-group">
                        <label for="observacionesPago">Observaciones:</label>
                        <textarea id="observacionesPago" rows="2" placeholder="Notas adicionales (opcional)"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarPago">Cancelar</button>
                        <button type="submit" class="btn-save">Registrar Pago</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para enviar por email -->
        <div id="enviarEmailModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Enviar Expensas por Email</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="enviarEmailForm">
                    <div class="form-group">
                        <label>Seleccionar destinatarios:</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label-block">
                                <input type="checkbox" id="enviarTodos"> Todos los propietarios
                            </label>
                            <label class="checkbox-label-block">
                                <input type="checkbox" id="enviarPendientes"> Solo con saldo pendiente
                            </label>
                            <label class="checkbox-label-block">
                                <input type="checkbox" id="enviarPagados"> Solo los que ya pagaron
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="asuntoEmail">Asunto:</label>
                        <input type="text" id="asuntoEmail" value="Expensas - Octubre 2024" required>
                    </div>
                    <div class="form-group">
                        <label for="mensajeEmail">Mensaje:</label>
                        <textarea id="mensajeEmail" rows="4" placeholder="Mensaje que acompañará el envío de la expensa"></textarea>
                    </div>
                    <div class="form-summary">
                        <p>Total de emails a enviar: <strong id="totalEmails">0</strong></p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarEmail">Cancelar</button>
                        <button type="submit" class="btn-save">Enviar Emails</button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <script src="ExpensasAdmin.js"></script>
</body>
</html>