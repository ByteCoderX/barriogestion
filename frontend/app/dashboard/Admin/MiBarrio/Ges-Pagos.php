<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Pagos - Barrio Gestión</title>
    <link rel="stylesheet" href="../index.css?v=14">
    <link rel="stylesheet" href="./Assets/css/Ges-Pagos.css?v=1">
</head>
<body>
    <header>
        <div class="izq">
            <div class="LogoApp">
                <a href="index.php">
                <img src="../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>                
            </div>
            <nav class="menu-principal">
                <a href="./index.php" class="menu-item">Inicio</a>
                <div class="dropdown">
                    <a href="#" class="menu-item">Mi Barrio</a>
                    <div class="dropdown-content">
                        <a href="gestionar-gastos.php">Gestionar Gastos</a>
                        <a href="gestionar-pagos.php">Gestionar Pagos</a>
                        <a href="gestionar-ingresos.php">Gestionar Ingresos</a>
                        <a href="gestionar-fondos.php">Gestionar Fondos</a>
                        <a href="gestionar-expensas.php">Gestionar Expensas</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a class="menu-item">Gestión Lotes</a>
                    <div class="dropdown-content">
                        <a href="mapa-barrio.php">Gestionar Grupo Hogar</a>
                        <a href="lotes/Ges-EspaciosComunes/ReservasEspacios.php">Gestionar Espacios</a>
                        <a href="../lotes/carnet.php">Gestionar Carnet</a>
                        <a href="../lotes/Users/UserList.php">Gestionar Usuarios</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="control-acceso.php">Historial de Accesos</a>
                        <a href="permisos.php">Gestionar Permisos</a>
                        <a href="Seguridad/Ges-Accesos/invitados.php">Gestionar Accesos</a>
                    </div>
                </div>
                <a href="reclamos.php" class="menu-item">Configuración</a>
            </nav>
        </div>
        <div class="derecha">
            <a href="notificaciones.php" class="icono-header">
                <img src="../assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <a href="reclamos.php" class="icono-header">
                <img src="../assets/icons/reclamos4.png" alt="Reclamos">
            </a>
            <div class="IdSession">
                <h1 class="texto">Administrador</h1>
                <a href="../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>
        </div>
    </header>

    <main id="main">
        <div class="pagos-container">
            <div class="page-header">
                <h1>Gestionar Pagos</h1>
                <p>Administra todos los pagos de expensas y seguimiento de residentes</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="registrarPagoBtn">
                    <img src="../assets/icons/plus.svg" alt="Nuevo">
                    Registrar Pago
                </button>
                <button class="btn-secondary" id="importarPagosBtn">
                    <img src="../assets/icons/upload.svg" alt="Importar">
                    Importar Pagos
                </button>
                <button class="btn-secondary" id="exportarPagosBtn">
                    <img src="../assets/icons/download.svg" alt="Exportar">
                    Exportar Pagos
                </button>
                <button class="btn-secondary" id="enviarRecordatoriosBtn">
                    <img src="../assets/icons/mail.svg" alt="Recordatorios">
                    Enviar Recordatorios
                </button>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroLote">Lote:</label>
                    <select id="filtroLote">
                        <option value="todos">Todos los lotes</option>
                        <option value="1">Lote 1</option>
                        <option value="2">Lote 2</option>
                        <option value="3">Lote 3</option>
                        <option value="4">Lote 4</option>
                        <option value="5">Lote 5</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroFecha">Período:</label>
                    <input type="month" id="filtroFecha">
                </div>
                <div class="filtro-grupo">
                    <label for="filtroEstado">Estado:</label>
                    <select id="filtroEstado">
                        <option value="todos">Todos</option>
                        <option value="pagado">Pagado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="vencido">Vencido</option>
                        <option value="parcial">Pago Parcial</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroMetodo">Método de Pago:</label>
                    <select id="filtroMetodo">
                        <option value="todos">Todos</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="cheque">Cheque</option>
                    </select>
                </div>
                <button class="btn-filtro" id="aplicarFiltros">Aplicar Filtros</button>
            </div>

            <!-- Resumen de pagos -->
            <div class="resumen-pagos">
                <div class="resumen-card">
                    <h3>Total Recaudado</h3>
                    <div class="resumen-valor">$1,250,000</div>
                    <div class="resumen-progreso">
                        <div class="progreso-bar">
                            <div class="progreso-fill" style="width: 85%"></div>
                        </div>
                        <span>85% del mes</span>
                    </div>
                </div>
                <div class="resumen-card">
                    <h3>Pagos Pendientes</h3>
                    <div class="resumen-valor">$220,000</div>
                    <div class="resumen-detalle">15 lotes pendientes</div>
                </div>
                <div class="resumen-card">
                    <h3>Pagos Vencidos</h3>
                    <div class="resumen-valor">$75,000</div>
                    <div class="resumen-detalle">4 lotes con mora</div>
                </div>
                <div class="resumen-card">
                    <h3>Tasa de Cobranza</h3>
                    <div class="resumen-valor">92%</div>
                    <div class="resumen-detalle">+5% vs mes anterior</div>
                </div>
            </div>

            <!-- Tabla de pagos -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Historial de Pagos</h3>
                    <div class="tabla-controles">
                        <div class="tabla-buscar">
                            <input type="text" id="buscarPago" placeholder="Buscar por lote o residente...">
                            <img src="./assets/icons/search.svg" alt="Buscar">
                        </div>
                        <select id="registrosPorPagina">
                            <option value="10">10 por página</option>
                            <option value="25">25 por página</option>
                            <option value="50">50 por página</option>
                        </select>
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaPagos">
                        <thead>
                            <tr>
                                <th>Lote</th>
                                <th>Residente</th>
                                <th>Período</th>
                                <th>Monto</th>
                                <th>Fecha Pago</th>
                                <th>Método</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="pagos-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
                <div class="paginacion" id="paginacion">
                    <!-- Controles de paginación -->
                </div>
            </div>
        </div>

        <!-- Modal para registrar/editar pago -->
        <div id="pagoModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle">Registrar Pago</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="pagoForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="lotePago">Lote:</label>
                            <select id="lotePago" required>
                                <option value="">Seleccionar lote</option>
                                <option value="1">Lote 1 - Juan Pérez</option>
                                <option value="2">Lote 2 - María González</option>
                                <option value="3">Lote 3 - Carlos Rodríguez</option>
                                <option value="4">Lote 4 - Ana Martínez</option>
                                <option value="5">Lote 5 - Luis García</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="periodoPago">Período:</label>
                            <input type="month" id="periodoPago" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="montoPago">Monto:</label>
                            <input type="number" id="montoPago" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="fechaPago">Fecha de Pago:</label>
                            <input type="date" id="fechaPago" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="metodoPago">Método de Pago:</label>
                            <select id="metodoPago" required>
                                <option value="">Seleccionar método</option>
                                <option value="transferencia">Transferencia Bancaria</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="cheque">Cheque</option>
                                <option value="debito">Débito Automático</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="referenciaPago">Referencia/Comprobante:</label>
                            <input type="text" id="referenciaPago" placeholder="Nº de transferencia, cheque, etc.">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="observacionesPago">Observaciones:</label>
                        <textarea id="observacionesPago" rows="3" placeholder="Observaciones adicionales..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarPago">Cancelar</button>
                        <button type="submit" class="btn-save">Guardar Pago</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para ver comprobante -->
        <div id="comprobanteModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Comprobante de Pago</h3>
                    <span class="close">&times;</span>
                </div>
                <div id="comprobanteContent" class="comprobante-content">
                    <!-- Contenido del comprobante -->
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="imprimirComprobante">Imprimir</button>
                    <button class="btn-primary" id="enviarComprobante">Enviar por Email</button>
                </div>
            </div>
        </div>
    </main>

    <script src="./js/gestionar-pagos.js?v=1"></script>
</body>
</html>