<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Reservas - Admin</title>
    <link rel="stylesheet" href="../../assets/css/global.css">
    <style>
        /* Reset y base */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            color: white;
            overflow-x: hidden;
        }

        /* Header */
        header {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .izq {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .LogoApp img {
            height: 40px;
            width: auto;
        }

        .menu-principal {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .menu-item {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .menu-item.active {
            background-color: #333;
            color: #fff;
        }

        .dropdown {
            position: relative;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(15px);
            min-width: 200px;
            border-radius: 0.5rem;
            padding: 0.5rem 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1000;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content a {
            color: white;
            text-decoration: none;
            padding: 0.7rem 1rem;
            display: block;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .dropdown-content a:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .dropdown-content a.active {
            background-color: #3b3b3b;
            border-radius: 0.4rem;
        }

        .derecha {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .icono-header {
            position: relative;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.3s ease;
        }

        .icono-header:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .icono-header img {
            width: 24px;
            height: 24px;
            filter: brightness(0) invert(1);
        }

        .notification-badge {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #ff4757;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .IdSession {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.2rem;
        }

        .IdSession h1 {
            font-size: 1rem;
            font-weight: 600;
        }

        .IdSession a {
            color: #e2e2e2;
            text-decoration: none;
            font-size: 0.8rem;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }

        .IdSession a:hover {
            opacity: 1;
        }

        /* Main content */
        main {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .dashboard-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        /* Header reservas */
        .reservas-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0.5rem;
            color: white;
            margin-bottom: 1rem;
        }

        .header-content h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        .breadcrumb {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .breadcrumb a {
            color: #ffffff;
            text-decoration: none;
            transition: opacity 0.3s ease;
        }

        .breadcrumb a:hover {
            opacity: 0.7;
        }

        .header-actions {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }

        .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            display: inline-block;
            cursor: pointer;
            border: none;
        }

        .btn-primary {
            background-color: #333;
            color: white;
            border: 1px solid #333;
        }

        .btn-primary:hover {
            background-color: #555;
            border-color: #555;
        }

        .btn-secondary {
            background-color: transparent;
            color: white;
            border: 1px solid #666;
        }

        .btn-secondary:hover {
            background-color: #666;
        }

        /* Estadísticas */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 1rem;
            backdrop-filter: blur(15px);
            padding: 1.5rem;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(131, 131, 131, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.623);
            color: white;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-3px);
        }

        .stat-card h3 {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        .stat-card .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .stat-card .stat-change {
            font-size: 0.8rem;
            opacity: 0.7;
        }

        .stat-card.reservas-hoy .stat-number { color: #4CAF50; }
        .stat-card.reservas-semana .stat-number { color: #2196F3; }
        .stat-card.ingresos .stat-number { color: #FF9800; }
        .stat-card.ocupacion .stat-number { color: #9C27B0; }

        /* Filtros */
        .filtros-section {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 1rem;
            backdrop-filter: blur(15px);
            padding: 1.5rem;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(131, 131, 131, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.623);
            margin-bottom: 2rem;
        }

        .filtros-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            align-items: end;
        }

        .filtro-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .filtro-group label {
            color: #ffffff;
            font-size: 0.9rem;
            font-weight: 600;
        }

        .filtro-group select,
        .filtro-group input {
            padding: 0.8rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .filtro-group select:focus,
        .filtro-group input:focus {
            outline: none;
            border-color: #666;
            background: rgba(255, 255, 255, 0.15);
        }

        .filtro-group select option {
            background-color: #333;
            color: white;
        }

        /* Tabla de reservas */
        .reservas-table-section {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 1rem;
            backdrop-filter: blur(15px);
            padding: 1.5rem;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(131, 131, 131, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.623);
        }

        .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .table-header h2 {
            font-size: 1.3rem;
            color: #ffffff;
        }

        .reservas-table {
            width: 100%;
            border-collapse: collapse;
            background: transparent;
        }

        .reservas-table th,
        .reservas-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .reservas-table th {
            background: rgba(255, 255, 255, 0.05);
            font-weight: 600;
            color: #ffffff;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .reservas-table td {
            color: #e2e2e2;
            font-size: 0.9rem;
        }

        .reservas-table tbody tr {
            transition: background-color 0.3s ease;
        }

        .reservas-table tbody tr:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .status-badge {
            padding: 0.3rem 0.8rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
            display: inline-block;
        }

        .status-badge.confirmada {
            background-color: #4CAF50;
            color: white;
        }

        .status-badge.pendiente {
            background-color: #ffaa00;
            color: white;
        }

        .status-badge.cancelada {
            background-color: #f44336;
            color: white;
        }

        .actions-buttons {
            display: flex;
            gap: 0.5rem;
        }

        .btn-action {
            padding: 0.4rem 0.8rem;
            border: none;
            border-radius: 0.3rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-edit {
            background-color: #2196F3;
            color: white;
        }

        .btn-edit:hover {
            background-color: #1976D2;
        }

        .btn-delete {
            background-color: #f44336;
            color: white;
        }

        .btn-delete:hover {
            background-color: #d32f2f;
        }

        .btn-approve {
            background-color: #4CAF50;
            color: white;
        }

        .btn-approve:hover {
            background-color: #388E3C;
        }

        /* Modal de confirmación */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-overlay.active {
            display: flex;
        }

        .modal-content {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 1rem;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 90%;
            overflow-y: auto;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(131, 131, 131, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-header h3 {
            color: white;
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0;
        }

        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.3s ease;
        }

        .close-modal:hover {
            background-color: #333;
        }

        .modal-body {
            padding: 1.5rem;
        }

        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            padding: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Estado vacío */
        .sin-reservas {
            text-align: center;
            padding: 3rem;
            color: #e2e2e2;
            opacity: 0.7;
        }

        .sin-reservas img {
            width: 80px;
            height: 80px;
            filter: brightness(0) invert(1);
            opacity: 0.5;
            margin-bottom: 1rem;
        }

        .sin-reservas p {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }

        .sin-reservas span {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .reservas-header {
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .header-actions {
                width: 100%;
                justify-content: center;
            }
            
            .header-content h1 {
                font-size: 2.5rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .filtros-grid {
                grid-template-columns: 1fr;
            }
            
            .reservas-table {
                font-size: 0.8rem;
            }
            
            .reservas-table th,
            .reservas-table td {
                padding: 0.7rem;
            }
            
            .actions-buttons {
                flex-direction: column;
                gap: 0.3rem;
            }
        }

        @media (max-width: 480px) {
            main {
                padding: 1rem;
            }
            
            .header-content h1 {
                font-size: 2rem;
            }
            
            .modal-content {
                width: 95%;
                margin: 1rem;
            }
            
            .modal-actions {
                flex-direction: column;
                gap: 0.8rem;
            }
            
            .modal-actions .btn-primary,
            .modal-actions .btn-secondary {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="izq">
            <div class="LogoApp">
                <a href="index.php">
                    <img src="./assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>
            </div>
            <nav class="menu-principal">
                <a href="./index.php" class="menu-item">Inicio</a>
                <div class="dropdown">
                    <a href="#" class="menu-item">Mi Barrio</a>
                    <div class="dropdown-content">
                        <a href="expensas.php">Gestionar Gastos</a>
                        <a href="pagar-expensas.php">Gestionar Pagos</a>
                        <a href="historial-pagos.php">Gestionar Ingresos</a>
                        <a href="historial-pagos.php">Gestionar Fondos</a>
                        <a href="historial-pagos.php">Gestionar Expensas</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a class="menu-item active">Gestion Lotes</a>
                    <div class="dropdown-content">
                        <a href="mapa-barrio.php">Gestionar Grupo Hogar</a>
                        <a href="reservas.php" class="active">Gestionar Espacios</a>
                        <a href="./lotes/carnet.php">Gestionar Carnet</a>
                        <a href="./lotes/Users/UserList.php">Gestionar Usuarios</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="control-acceso.php">Historial de Accesos</a>
                        <a href="permisos.php">Gestionar Permisos</a>
                        <a href="visitas.php">Gestionar Accesos</a>
                    </div>
                </div>
                <a href="reclamos.php" class="menu-item">Configuracion</a>
            </nav>
        </div>
        <div class="derecha">
            <a href="notificaciones.php" class="icono-header">
                <img src="./assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <a href="reclamos.php" class="icono-header">
                <img src="./assets/icons/reclamos4.png" alt="Reclamos">
            </a>
            <div class="IdSession">
                <h1 class="texto">Administrador</h1>
                <a href="../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>
        </div>
    </header>

    <main>
        <div class="dashboard-container">
            <!-- Header -->
            <div class="reservas-header">
                <div class="header-content">
                    <h1>Gestión de Reservas</h1>
                    <div class="breadcrumb">
                        <a href="index.php">Inicio</a> &gt; <a href="#">Gestión Lotes</a> &gt; <span>Gestionar Espacios</span>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="exportarReservas()">Exportar</button>
                    <button class="btn-primary" onclick="actualizarReservas()">Actualizar</button>
                </div>
            </div>

            <!-- Estadísticas -->
            <div class="stats-grid">
                <div class="stat-card reservas-hoy">
                    <h3>Reservas Hoy</h3>
                    <div class="stat-number" id="reservasHoy">0</div>
                    <div class="stat-change">Sin cambios</div>
                </div>
                <div class="stat-card reservas-semana">
                    <h3>Esta Semana</h3>
                    <div class="stat-number" id="reservasSemana">0</div>
                    <div class="stat-change">Sin cambios</div>
                </div>
                <div class="stat-card ingresos">
                    <h3>Ingresos Estimados</h3>
                    <div class="stat-number" id="ingresosEstimados">$0</div>
                    <div class="stat-change">Sin cambios</div>
                </div>
                <div class="stat-card ocupacion">
                    <h3>% Ocupación</h3>
                    <div class="stat-number" id="ocupacion">0%</div>
                    <div class="stat-change">Sin cambios</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtros-grid">
                    <div class="filtro-group">
                        <label for="filtroEspacio">Espacio</label>
                        <select id="filtroEspacio">
                            <option value="">Todos los espacios</option>
                            <option value="clubhouse">Club House</option>
                            <option value="quincho">Quincho</option>
                            <option value="pileta">Pileta</option>
                            <option value="futbol">Cancha de Fútbol</option>
                            <option value="tenis">Cancha de Tenis</option>
                        </select>
                    </div>
                    <div class="filtro-group">
                        <label for="filtroEstado">Estado</label>
                        <select id="filtroEstado">
                            <option value="">Todos los estados</option>
                            <option value="confirmada">Confirmadas</option>
                            <option value="pendiente">Pendientes</option>
                            <option value="cancelada">Canceladas</option>
                        </select>
                    </div>
                    <div class="filtro-group">
                        <label for="fechaDesde">Desde</label>
                        <input type="date" id="fechaDesde">
                    </div>
                    <div class="filtro-group">
                        <label for="fechaHasta">Hasta</label>
                        <input type="date" id="fechaHasta">
                    </div>
                    <div class="filtro-group">
                        <button class="btn-filtrar" onclick="aplicarFiltros()">Filtrar</button>
                    </div>
                </div>
            </div>

            <!-- Tabla de Reservas -->
            <div class="reservas-table-section">
                <div class="table-header">
                    <h2>Todas las Reservas</h2>
                </div>
                <div class="table-container">
                    <table class="reservas-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Espacio</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Personas</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="reservasTableBody">
                            <tr>
                                <td colspan="9">
                                    <div class="sin-reservas">
                                        <p>No hay reservas disponibles</p>
                                        <span>Las reservas realizadas por los usuarios aparecerán aquí</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal de confirmación de eliminación -->
    <div class="modal-overlay" id="modalConfirmacion">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Acción</h3>
                <button class="close-modal" onclick="cerrarModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p id="mensajeConfirmacion">¿Estás seguro de que deseas realizar esta acción?</p>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="cerrarModal()">Cancelar</button>
                <button class="btn-primary" id="confirmarAccion">Confirmar</button>
            </div>
        </div>
    </div>

    <script>
        // Variables globales
        let reservasData = [];
        let reservasFiltradas = [];

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            configurarFechas();
            cargarReservasDesdeCliente();
            actualizarEstadisticas();
        });

        // Configurar fechas por defecto
        function configurarFechas() {
            const hoy = new Date();
            const fechaHoy = hoy.toISOString().split('T')[0];
            const fechaSemana = new Date(hoy.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
            
            document.getElementById('fechaDesde').value = fechaHoy;
            document.getElementById('fechaHasta').value = fechaSemana;
        }

        // Simular carga de reservas desde el sistema cliente
        function cargarReservasDesdeCliente() {
            // Esta función se conectaría con el backend para obtener las reservas
            // Por ahora dejamos el array vacío como solicitaste
            actualizarTablaReservas();
        }

        // Actualizar tabla de reservas
        function actualizarTablaReservas() {
            const tbody = document.getElementById('reservasTableBody');
            
            if (reservasFiltradas.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="9">
                            <div class="sin-reservas">
                                <p>No hay reservas disponibles</p>
                                <span>Las reservas realizadas por los usuarios aparecerán aquí</span>
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = reservasFiltradas.map(reserva => `
                <tr>
                    <td>#${reserva.id}</td>
                    <td>${reserva.usuario}</td>
                    <td>${reserva.espacio}</td>
                    <td>${formatearFecha(reserva.fecha)}</td>
                    <td>${reserva.horaInicio}:00 - ${reserva.horaFin}:00</td>
                    <td>${reserva.cantidadPersonas}</td>
                    <td>${reserva.precio === 0 ? 'Gratuito' : '$' + reserva.precio.toLocaleString()}</td>
                    <td><span class="status-badge ${reserva.estado}">${reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}</span></td>
                    <td>
                        <div class="actions-buttons">
                            <button class="btn-action btn-edit" onclick="editarReserva(${reserva.id})" title="Editar">
                                Editar
                            </button>
                            ${reserva.estado === 'pendiente' ? `
                            <button class="btn-action btn-approve" onclick="aprobarReserva(${reserva.id})" title="Aprobar">
                                Aprobar
                            </button>
                            ` : ''}
                            <button class="btn-action btn-delete" onclick="confirmarEliminacion(${reserva.id})" title="Eliminar">
                                Eliminar
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Aplicar filtros
        function aplicarFiltros() {
            const espacio = document.getElementById('filtroEspacio').value;
            const estado = document.getElementById('filtroEstado').value;
            const fechaDesde = document.getElementById('fechaDesde').value;
            const fechaHasta = document.getElementById('fechaHasta').value;

            reservasFiltradas = reservasData.filter(reserva => {
                let cumpleFiltros = true;

                if (espacio && reserva.espacioKey !== espacio) {
                    cumpleFiltros = false;
                }

                if (estado && reserva.estado !== estado) {
                    cumpleFiltros = false;
                }

                if (fechaDesde && reserva.fecha < fechaDesde) {
                    cumpleFiltros = false;
                }

                if (fechaHasta && reserva.fecha > fechaHasta) {
                    cumpleFiltros = false;
                }

                return cumpleFiltros;
            });

            actualizarTablaReservas();
            actualizarEstadisticas();
        }

        // Actualizar estadísticas
        function actualizarEstadisticas() {
            const hoy = new Date().toISOString().split('T')[0];
            const fechaSemanaAtras = new Date();
            fechaSemanaAtras.setDate(fechaSemanaAtras.getDate() - 7);
            const fechaSemana = fechaSemanaAtras.toISOString().split('T')[0];

            const reservasHoy = reservasFiltradas.filter(r => r.fecha === hoy).length;
            const reservasSemana = reservasFiltradas.filter(r => r.fecha >= fechaSemana).length;
            const ingresos = reservasFiltradas.reduce((sum, r) => sum + (r.precio || 0), 0);
            const totalEspacios = 5; // Club House, Quincho, Pileta, Fútbol, Tenis
            const ocupacion = reservasFiltradas.length > 0 ? Math.round((reservasSemana / (totalEspacios * 7)) * 100) : 0;

            document.getElementById('reservasHoy').textContent = reservasHoy;
            document.getElementById('reservasSemana').textContent = reservasSemana;
            document.getElementById('ingresosEstimados').textContent = ' + ingresos.toLocaleString();
            document.getElementById('ocupacion').textContent = ocupacion + '%';
        }

        // Formatear fecha
        function formatearFecha(fecha) {
            return new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }

        // Editar reserva
        function editarReserva(id) {
            const reserva = reservasData.find(r => r.id === id);
            if (!reserva) return;

            // Aquí podrías abrir un modal de edición
            alert(`Editar reserva #${id} - ${reserva.espacio}`);
        }

        // Aprobar reserva
        function aprobarReserva(id) {
            const reserva = reservasData.find(r => r.id === id);
            if (!reserva) return;

            reserva.estado = 'confirmada';
            actualizarTablaReservas();
            actualizarEstadisticas();
            
            alert(`Reserva #${id} aprobada correctamente`);
        }

        // Confirmar eliminación
        function confirmarEliminacion(id) {
            const reserva = reservasData.find(r => r.id === id);
            if (!reserva) return;

            document.getElementById('mensajeConfirmacion').textContent = 
                `¿Estás seguro de que deseas eliminar la reserva #${id} de ${reserva.espacio}?`;
            
            document.getElementById('confirmarAccion').onclick = function() {
                eliminarReserva(id);
            };

            document.getElementById('modalConfirmacion').classList.add('active');
        }

        // Eliminar reserva
        function eliminarReserva(id) {
            const index = reservasData.findIndex(r => r.id === id);
            if (index !== -1) {
                reservasData.splice(index, 1);
                aplicarFiltros(); // Reaplica filtros y actualiza tabla
                cerrarModal();
                alert(`Reserva #${id} eliminada correctamente`);
            }
        }

        // Cerrar modal
        function cerrarModal() {
            document.getElementById('modalConfirmacion').classList.remove('active');
        }

        // Actualizar reservas (simulando llamada al backend)
        function actualizarReservas() {
            // Aquí harías la llamada al backend para obtener reservas actualizadas
            cargarReservasDesdeCliente();
            alert('Reservas actualizadas correctamente');
        }

        // Exportar reservas
        function exportarReservas() {
            if (reservasFiltradas.length === 0) {
                alert('No hay reservas para exportar');
                return;
            }

            // Crear CSV simple
            const headers = ['ID', 'Usuario', 'Espacio', 'Fecha', 'Hora Inicio', 'Hora Fin', 'Personas', 'Precio', 'Estado'];
            const csvContent = [
                headers.join(','),
                ...reservasFiltradas.map(r => [
                    r.id,
                    r.usuario,
                    r.espacio,
                    r.fecha,
                    r.horaInicio,
                    r.horaFin,
                    r.cantidadPersonas,
                    r.precio,
                    r.estado
                ].join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'reservas_' + new Date().toISOString().split('T')[0] + '.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            alert('Reservas exportadas correctamente');
        }

        // Función para recibir reservas del sistema cliente (se llamaría desde el backend)
        function recibirNuevaReserva(reserva) {
            // Agregar la reserva al sistema admin
            reservasData.push({
                id: reserva.id,
                usuario: reserva.usuario || 'Usuario Cliente',
                espacio: reserva.nombreEspacio,
                espacioKey: reserva.espacio,
                fecha: reserva.fecha,
                horaInicio: reserva.horaInicio,
                horaFin: reserva.horaFin,
                cantidadPersonas: reserva.cantidadPersonas,
                precio: reserva.precio,
                estado: reserva.estado,
                observaciones: reserva.observaciones,
                fechaCreacion: reserva.fechaCreacion
            });

            aplicarFiltros();
            alert('Nueva reserva recibida del sistema cliente');
        }

        // Inicializar filtros por defecto
        window.addEventListener('load', function() {
            reservasFiltradas = [...reservasData];
            aplicarFiltros();
        });

        // Funciones globales para mantener compatibilidad
        window.aplicarFiltros = aplicarFiltros;
        window.actualizarReservas = actualizarReservas;
        window.exportarReservas = exportarReservas;
        window.editarReserva = editarReserva;
        window.aprobarReserva = aprobarReserva;
        window.confirmarEliminacion = confirmarEliminacion;
        window.cerrarModal = cerrarModal;
        window.recibirNuevaReserva = recibirNuevaReserva;
    </script>
</body>
</html>