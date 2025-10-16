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


    <script>
        // Variables globales para temas
        let currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Datos de ejemplo para el historial
        const historialData = {
            '2025-07': {
                periodo: 'Julio 2025',
                fechaEmision: '01/07/2025',
                fechaVencimiento: '10/07/2025',
                monto: '$125.000',
                estado: 'PENDIENTE',
                fechaPago: null,
                metodoPago: null,
                numeroTransaccion: null
            },
            '2025-06': {
                periodo: 'Junio 2025',
                fechaEmision: '01/06/2025',
                fechaVencimiento: '10/06/2025',
                monto: '$118.500',
                estado: 'PAGADA',
                fechaPago: '08/06/2025',
                metodoPago: 'Transferencia',
                numeroTransaccion: 'TXN-20250608-001'
            },
            '2025-05': {
                periodo: 'Mayo 2025',
                fechaEmision: '01/05/2025',
                fechaVencimiento: '10/05/2025',
                monto: '$115.200',
                estado: 'PAGADA',
                fechaPago: '09/05/2025',
                metodoPago: 'Debito Automático',
                numeroTransaccion: 'TXN-20250509-001'
            },
            '2025-04': {
                periodo: 'Abril 2025',
                fechaEmision: '01/04/2025',
                fechaVencimiento: '10/04/2025',
                monto: '$112.800',
                estado: 'PAGADA',
                fechaPago: '07/04/2025',
                metodoPago: 'Transferencia',
                numeroTransaccion: 'TXN-20250407-001'
            },
            '2025-03': {
                periodo: 'Marzo 2025',
                fechaEmision: '01/03/2025',
                fechaVencimiento: '10/03/2025',
                monto: '$110.500',
                estado: 'PAGADA',
                fechaPago: '08/03/2025',
                metodoPago: 'Efectivo',
                numeroTransaccion: 'REC-20250308-001'
            },
            '2025-02': {
                periodo: 'Febrero 2025',
                fechaEmision: '01/02/2025',
                fechaVencimiento: '10/02/2025',
                monto: '$108.200',
                estado: 'PAGADA',
                fechaPago: '06/02/2025',
                metodoPago: 'Transferencia',
                numeroTransaccion: 'TXN-20250206-001'
            }
        };

        // Inicializar página
        document.addEventListener('DOMContentLoaded', function() {
            // Aplicar tema guardado
            applyTheme(currentTheme);
            
            // Configurar menú móvil
            setupMobileMenu();
            
            // Inicializar historial
            inicializarHistorial();
            configurarEventListeners();
        });

        // Funciones para el selector de tema
        function setTheme(theme) {
            currentTheme = theme;
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        }

        function applyTheme(theme) {
            const body = document.body;
            
            // Remover todas las clases de tema
            body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
            
            // Aplicar el tema seleccionado
            if (theme === 'light') {
                body.classList.add('theme-light');
            } else if (theme === 'nature') {
                body.classList.add('theme-nature');
            }
            // El tema oscuro no necesita clase adicional (es el por defecto)
        }

        function toggleThemeMenu() {
            // Esta función puede ser usada si quieres controlar el menú por JavaScript
            // Por ahora el menú se controla con CSS hover
        }

        // Configurar menú móvil
        function setupMobileMenu() {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const closeMenu = document.getElementById('closeMenu');

            if (hamburger) {
                hamburger.addEventListener('click', function() {
                    hamburger.classList.toggle('active');
                    if (mobileMenu) mobileMenu.classList.toggle('active');
                    if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
                    document.body.style.overflow = (mobileMenu && mobileMenu.classList.contains('active')) ? 'hidden' : 'auto';
                });
            }

            if (closeMenu) {
                closeMenu.addEventListener('click', function() {
                    if (hamburger) hamburger.classList.remove('active');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }

            if (mobileMenuOverlay) {
                mobileMenuOverlay.addEventListener('click', function() {
                    if (hamburger) hamburger.classList.remove('active');
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        }

        function inicializarHistorial() {
            actualizarEstadisticas();
        }

        function configurarEventListeners() {
            // Botones de filtros
            const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
            const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');
            const btnExportarExcel = document.getElementById('btnExportarExcel');
            const btnExportarPDF = document.getElementById('btnExportarPDF');

            if (btnAplicarFiltros) btnAplicarFiltros.addEventListener('click', aplicarFiltros);
            if (btnLimpiarFiltros) btnLimpiarFiltros.addEventListener('click', limpiarFiltros);
            if (btnExportarExcel) btnExportarExcel.addEventListener('click', exportarExcel);
            if (btnExportarPDF) btnExportarPDF.addEventListener('click', exportarPDF);

            // Cerrar modal al hacer clic fuera
            window.addEventListener('click', function(event) {
                const modal = document.getElementById('modalDetalle');
                if (event.target === modal) {
                    cerrarModal();
                }
            });

            // Filtros en tiempo real
            const filtroAno = document.getElementById('filtroAno');
            const filtroMes = document.getElementById('filtroMes');
            const filtroEstado = document.getElementById('filtroEstado');

            if (filtroAno) filtroAno.addEventListener('change', aplicarFiltrosAutomatico);
            if (filtroMes) filtroMes.addEventListener('change', aplicarFiltrosAutomatico);
            if (filtroEstado) filtroEstado.addEventListener('change', aplicarFiltrosAutomatico);
        }

        function aplicarFiltros() {
            const ano = document.getElementById('filtroAno')?.value || '';
            const mes = document.getElementById('filtroMes')?.value || '';
            const estado = document.getElementById('filtroEstado')?.value || '';
            const montoMin = document.getElementById('filtroMontoMin')?.value || '';

            console.log('Aplicando filtros:', { ano, mes, estado, montoMin });
            showAlert('Filtros aplicados correctamente', 'success');
        }

        function aplicarFiltrosAutomatico() {
            setTimeout(aplicarFiltros, 300);
        }

        function limpiarFiltros() {
            const filtroAno = document.getElementById('filtroAno');
            const filtroMes = document.getElementById('filtroMes');
            const filtroEstado = document.getElementById('filtroEstado');
            const filtroMontoMin = document.getElementById('filtroMontoMin');

            if (filtroAno) filtroAno.value = '';
            if (filtroMes) filtroMes.value = '';
            if (filtroEstado) filtroEstado.value = '';
            if (filtroMontoMin) filtroMontoMin.value = '';
            
            showAlert('Filtros limpiados', 'info');
        }

        function verDetalle(periodo) {
            const datos = historialData[periodo];
            if (!datos) return;

            // Llenar datos en el modal
            const detallePeriodo = document.getElementById('detallePeriodo');
            const detalleFechaEmision = document.getElementById('detalleFechaEmision');
            const detalleFechaVencimiento = document.getElementById('detalleFechaVencimiento');
            const detalleMontoTotal = document.getElementById('detalleMontoTotal');

            if (detallePeriodo) detallePeriodo.textContent = datos.periodo;
            if (detalleFechaEmision) detalleFechaEmision.textContent = datos.fechaEmision;
            if (detalleFechaVencimiento) detalleFechaVencimiento.textContent = datos.fechaVencimiento;
            if (detalleMontoTotal) detalleMontoTotal.innerHTML = `<strong>${datos.monto}</strong>`;

            // Estado con estilo
            const estadoElement = document.getElementById('detalleEstado');
            if (estadoElement) {
                estadoElement.innerHTML = `<span class="estado-badge ${datos.estado.toLowerCase()}">${datos.estado}</span>`;
            }

            // Mostrar información de pago si está pagada
            const grupoPago = document.getElementById('grupoPago');
            if (datos.estado === 'PAGADA' && grupoPago) {
                const detalleFechaPago = document.getElementById('detalleFechaPago');
                const detalleMetodoPago = document.getElementById('detalleMetodoPago');
                const detalleNumeroTransaccion = document.getElementById('detalleNumeroTransaccion');

                if (detalleFechaPago) detalleFechaPago.textContent = datos.fechaPago || '-';
                if (detalleMetodoPago) detalleMetodoPago.textContent = datos.metodoPago || '-';
                if (detalleNumeroTransaccion) detalleNumeroTransaccion.textContent = datos.numeroTransaccion || '-';
                grupoPago.style.display = 'block';
            } else if (grupoPago) {
                grupoPago.style.display = 'none';
            }

            // Mostrar modal
            const modal = document.getElementById('modalDetalle');
            if (modal) modal.style.display = 'block';
        }

        function cerrarModal() {
            const modal = document.getElementById('modalDetalle');
            if (modal) modal.style.display = 'none';
        }

        function descargarComprobante(periodo) {
            const datos = historialData[periodo];
            if (!datos) return;

            showAlert(`Descargando comprobante de ${datos.periodo}...`, 'info');
            
            setTimeout(() => {
                showAlert(`Comprobante de ${datos.periodo} descargado correctamente`, 'success');
            }, 1500);
        }

        function exportarExcel() {
            showAlert('Exportando a Excel...', 'info');
            
            setTimeout(() => {
                showAlert('Archivo Excel exportado correctamente', 'success');
            }, 2000);
        }

        function exportarPDF() {
            showAlert('Generando PDF...', 'info');
            
            setTimeout(() => {
                showAlert('Archivo PDF generado correctamente', 'success');
            }, 2000);
        }

        function actualizarEstadisticas() {
            // Las estadísticas mostradas son de ejemplo
        }

        // Mostrar alerta
        function showAlert(message, type = 'info') {
            // Remover alertas existentes
            const existingAlerts = document.querySelectorAll('.temp-alert');
            existingAlerts.forEach(alert => alert.remove());
            
            // Crear nueva alerta
            const alert = document.createElement('div');
            alert.className = `temp-alert alert alert-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'}`;
            alert.textContent = message;
            alert.style.cssText = `
                position: fixed;
                top: 120px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 600;
                z-index: 9999;
                max-width: 300px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease-out;
            `;

            const colores = {
                'success': 'background: linear-gradient(135deg, #4CAF50, #45a049);',
                'error': 'background: linear-gradient(135deg, #f44336, #da190b);',
                'info': 'background: linear-gradient(135deg, #2196F3, #1976D2);'
            };

            alert.style.cssText += colores[type] || colores['info'];

            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            if (!document.querySelector('style[data-alerts]')) {
                style.setAttribute('data-alerts', 'true');
                document.head.appendChild(style);
            }

            document.body.appendChild(alert);

            setTimeout(() => {
                alert.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 300);
            }, 4000);
        }

        // Manejo de teclado para accesibilidad
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modal = document.getElementById('modalDetalle');
                if (modal && modal.style.display === 'block') {
                    cerrarModal();
                }
            }
        });
    </script>
</body>
</html>