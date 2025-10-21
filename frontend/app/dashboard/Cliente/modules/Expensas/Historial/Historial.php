<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Expensas - Barrio Gestión</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="Historial.css?v=66">
    <link rel="stylesheet" href="../../../index.css?v=98">

</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <div class="container">
        <!-- Header del historial -->
        <div class="historial-header">
            <div class="header-content">
                <h1>Historial de Expensas</h1>
                <p>Consulta el historial completo de tus expensas y pagos realizados</p>
                <div class="breadcrumb">
                    <a href="../../../index.php">Inicio</a> > <span>Expensas</span> > <span>Historial</span>
                </div>
            </div>
        </div>

        <!-- Filtros -->
        <div class="filtros-container">
            <div class="filtros-header">Filtrar Historial</div>
            <div class="filtros-row">
                <div class="filtro-grupo">
                    <label>Año</label>
                    <select id="filtroAno">
                        <option value="">Todos los años</option>
                        <option value="2025" selected>2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label>Mes</label>
                    <select id="filtroMes">
                        <option value="">Todos los meses</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06" selected>Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label>Estado</label>
                    <select id="filtroEstado">
                        <option value="">Todos los estados</option>
                        <option value="pagada">Pagadas</option>
                        <option value="pendiente">Pendientes</option>
                        <option value="vencida">Vencidas</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label>Desde Monto</label>
                    <input type="number" id="filtroMontoMin" placeholder="Monto mínimo">
                </div>
            </div>
            <div class="filtros-actions">
                <button class="btn btn-secondary" id="btnLimpiarFiltros">Limpiar Filtros</button>
                <button class="btn btn-primary" id="btnAplicarFiltros">Aplicar Filtros</button>
            </div>
        </div>

        <!-- Estadísticas resumen -->
        <div class="estadisticas-resumen">
            <div class="estadistica-card">
                <h3>Total Pagado</h3>
                <div class="estadistica-valor">$1.458.350</div>
                <div class="estadistica-detalle">En los últimos 12 meses</div>
            </div>
            <div class="estadistica-card">
                <h3>Promedio Mensual</h3>
                <div class="estadistica-valor">$121.529</div>
                <div class="estadistica-detalle">Basado en 12 meses</div>
            </div>
            <div class="estadistica-card">
                <h3>Expensas Pagadas</h3>
                <div class="estadistica-valor">11</div>
                <div class="estadistica-detalle">De 12 expensas emitidas</div>
            </div>
            <div class="estadistica-card">
                <h3>Pendientes</h3>
                <div class="estadistica-valor">1</div>
                <div class="estadistica-detalle">Expensa actual</div>
            </div>
        </div>

        <!-- Tabla de historial -->
        <div class="historial-table-container">
            <div class="table-header">
                <h2>Registro Detallado</h2>
                <div class="table-actions">
                    <button class="btn btn-secondary" id="btnExportarExcel">Exportar Excel</button>
                    <button class="btn btn-secondary" id="btnExportarPDF">Exportar PDF</button>
                </div>
            </div>

            <table class="historial-table">
                <thead>
                    <tr>
                        <th>Período</th>
                        <th>Fecha Emisión</th>
                        <th>Fecha Vencimiento</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha Pago</th>
                        <th>Método Pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaHistorial">
                    <tr>
                        <td>Julio 2025</td>
                        <td>01/07/2025</td>
                        <td>10/07/2025</td>
                        <td>$125.000</td>
                        <td><span class="estado-badge pendiente">PENDIENTE</span></td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <div class="acciones-fila">
                                <button class="btn-accion btn-ver" onclick="verDetalle('2025-07')">Ver</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Junio 2025</td>
                        <td>01/06/2025</td>
                        <td>10/06/2025</td>
                        <td>$118.500</td>
                        <td><span class="estado-badge pagada">PAGADA</span></td>
                        <td>08/06/2025</td>
                        <td>Transferencia</td>
                        <td>
                            <div class="acciones-fila">
                                <button class="btn-accion btn-ver" onclick="verDetalle('2025-06')">Ver</button>
                                <button class="btn-accion btn-descargar" onclick="descargarComprobante('2025-06')">PDF</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Mayo 2025</td>
                        <td>01/05/2025</td>
                        <td>10/05/2025</td>
                        <td>$115.200</td>
                        <td><span class="estado-badge pagada">PAGADA</span></td>
                        <td>09/05/2025</td>
                        <td>Debito Automático</td>
                        <td>
                            <div class="acciones-fila">
                                <button class="btn-accion btn-ver" onclick="verDetalle('2025-05')">Ver</button>
                                <button class="btn-accion btn-descargar" onclick="descargarComprobante('2025-05')">PDF</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Abril 2025</td>
                        <td>01/04/2025</td>
                        <td>10/04/2025</td>
                        <td>$112.800</td>
                        <td><span class="estado-badge pagada">PAGADA</span></td>
                        <td>07/04/2025</td>
                        <td>Transferencia</td>
                        <td>
                            <div class="acciones-fila">
                                <button class="btn-accion btn-ver" onclick="verDetalle('2025-04')">Ver</button>
                                <button class="btn-accion btn-descargar" onclick="descargarComprobante('2025-04')">PDF</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Marzo 2025</td>
                        <td>01/03/2025</td>
                        <td>10/03/2025</td>
                        <td>$110.500</td>
                        <td><span class="estado-badge pagada">PAGADA</span></td>
                        <td>08/03/2025</td>
                        <td>Efectivo</td>
                        <td>
                            <div class="acciones-fila">
                                <button class="btn-accion btn-ver" onclick="verDetalle('2025-03')">Ver</button>
                                <button class="btn-accion btn-descargar" onclick="descargarComprobante('2025-03')">PDF</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Febrero 2025</td>
                        <td>01/02/2025</td>
                        <td>10/02/2025</td>
                        <td>$108.200</td>
                        <td><span class="estado-badge pagada">PAGADA</span></td>
                        <td>06/02/2025</td>
                        <td>Transferencia</td>
                        <td>
                            <div class="acciones-fila">
                                <button class="btn-accion btn-ver" onclick="verDetalle('2025-02')">Ver</button>
                                <button class="btn-accion btn-descargar" onclick="descargarComprobante('2025-02')">PDF</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Paginación -->
            <div class="paginacion-container">
                <div class="paginacion-info">
                    Mostrando 6 de 12 registros
                </div>
                <div class="paginacion">
                    <button class="paginacion-btn disabled">« Anterior</button>
                    <button class="paginacion-btn active">1</button>
                    <button class="paginacion-btn">2</button>
                    <button class="paginacion-btn">Siguiente »</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para ver detalles -->
    <div id="modalDetalle" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Detalle de Expensa</h2>
                <span class="close" onclick="cerrarModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="detalle-grupo">
                    <h3>Información General</h3>
                    <div class="detalle-item">
                        <span class="detalle-label">Período:</span>
                        <span class="detalle-valor" id="detallePeriodo">-</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Fecha de Emisión:</span>
                        <span class="detalle-valor" id="detalleFechaEmision">-</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Fecha de Vencimiento:</span>
                        <span class="detalle-valor" id="detalleFechaVencimiento">-</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Estado:</span>
                        <span class="detalle-valor" id="detalleEstado">-</span>
                    </div>
                </div>

                <div class="detalle-grupo">
                    <h3>Detalle de Montos</h3>
                    <div class="detalle-item">
                        <span class="detalle-label">Expensas Ordinarias:</span>
                        <span class="detalle-valor">$85.000</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Expensas Extraordinarias:</span>
                        <span class="detalle-valor">$15.000</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Fondo de Reserva:</span>
                        <span class="detalle-valor">$12.000</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Servicios:</span>
                        <span class="detalle-valor">$8.000</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Intereses:</span>
                        <span class="detalle-valor">$0</span>
                    </div>
                    <div class="detalle-item" style="border-top: 2px solid rgba(255,255,255,0.3); margin-top: 1rem; padding-top: 1rem;">
                        <span class="detalle-label"><strong>Total:</strong></span>
                        <span class="detalle-valor" id="detalleMontoTotal"><strong>$120.000</strong></span>
                    </div>
                </div>

                <div class="detalle-grupo" id="grupoPago" style="display: none;">
                    <h3>Información de Pago</h3>
                    <div class="detalle-item">
                        <span class="detalle-label">Fecha de Pago:</span>
                        <span class="detalle-valor" id="detalleFechaPago">-</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Método de Pago:</span>
                        <span class="detalle-valor" id="detalleMetodoPago">-</span>
                    </div>
                    <div class="detalle-item">
                        <span class="detalle-label">Número de Transacción:</span>
                        <span class="detalle-valor" id="detalleNumeroTransaccion">-</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="Historial.js"></script>

</body>
</html>