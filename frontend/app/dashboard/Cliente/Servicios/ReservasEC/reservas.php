<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reservar Espacios - Barrio Gestión</title>
        <link rel="stylesheet" href="../../index.css?v=87">
        <link rel="stylesheet" href="./reservas.css?v=74">
        
    </head>
<body>
    
    <header>
        <div class="izq">
            <div class="LogoApp">
                <a href="../../index.php">
                    <img src="../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>
            </div>
            <div class="menu-principal">
                    <a href="../../index.php" class="menu-item">Inicio</a>

                </div>
            <nav class="menu-principal">
                <div class="dropdown">
                    <a href="#" class="menu-item">Expensas</a>
                    <div class="dropdown-content">
                        <a href="../../Expensas/expensas.php">Ver Expensas</a>
                        <a href="../../Expensas/Historial/Historial.php">Historial</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item active">Servicios</a>
                    <div class="dropdown-content">
                        <a href="mapa-barrio.php">Mapa del Barrio</a>
                        <a href="reservas.php" class="active">Reservar Espacios</a>
                        <a href="../MiCarnet/carnet.php">Mi Carnet</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="../../Seguridad/ControlAccesos/Invitado.php">Control de Acceso</a>
                        <a href="../../Seguridad/GesPermisos/Permisos.php">Gestionar Permisos</a>
                        <a href="../../Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                    </div>
                </div>
                <a href="../../Reclamos/quejas.php" class="menu-item">Reclamos</a>
                <a href="../../Configuracion/Configuracion.php" class="menu-item">Configuracion</a>

            </nav>
        </div>
        <div class="derecha">
    <div class="theme-selector">
        <button class="theme-button" onclick="toggleThemeMenu()">
            <svg class="theme-icon" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
        </button>
        <div class="theme-options">
            <div class="theme-option" onclick="setTheme('dark')">
                <div class="theme-color theme-dark"></div>
                <span>Oscuro</span>
            </div>
            <div class="theme-option" onclick="setTheme('light')">
                <div class="theme-color theme-light-color"></div>
                <span>Claro</span>
            </div>
            <div class="theme-option" onclick="setTheme('nature')">
                <div class="theme-color theme-nature-color"></div>
                <span>Naturaleza</span>
            </div>
        </div>
    </div> 
    
    <a href="../../Notificaciones/notificacion.php" class="icono-header">
        <img src="../../assets/icons/notificacion.png" alt="notificaciones">
        <span class="notification-badge" id="notificationCount">3</span>
    </a>
            <div class="IdSession">
                <h1 class="texto">Cliente</h1>
                <a href="../../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>
            
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>

    <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <img src="../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
            <button class="close-menu" id="closeMenu">×</button>
        </div>
        
        <div class="mobile-menu-content">
            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="expensas.php" class="mobile-menu-item">
                    <img src="../../assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="historial-pagos.php" class="mobile-menu-item">
                    <img src="../../assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="mapa-barrio.php" class="mobile-menu-item">
                    <img src="../../assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="reservar-espacios.php" class="mobile-menu-item active">
                    <img src="../../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="carnet.php" class="mobile-menu-item">
                    <img src="../../assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="control-acceso.php" class="mobile-menu-item">
                    <img src="../../assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item">
                    <img src="../../assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="visitas.php" class="mobile-menu-item">
                    <img src="../../assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="notificaciones.php" class="mobile-icon-item">
                <img src="../../assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="reclamos.php" class="mobile-icon-item">
                <img src="../../assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="reservas-header">
                <div class="header-content">
                    <h1>Reservar Espacios</h1>
                    <div class="breadcrumb">
                        <a href="../../index.php">Inicio</a> &gt; <span>Expensas</span> &gt; <span>Reservar Espacios</span>
                    </div>
                </div>
                <div class="header-actions">
                    <a href="#" class="btn-secondary" onclick="verMisReservas()">Mis Reservas</a>
                </div>
            </div>

            <!-- Espacios Disponibles -->
            <div class="espacios-section">
                <h2>Espacios Disponibles</h2>
                <div class="espacios-grid">
                    
                </div>
            </div>

            <!-- Próximas Reservas -->
            <div class="proximas-reservas">
                <div class="seccion-header">
                    <h2>Mis Próximas Reservas</h2>
                    <a href="#" class="ver-todas" onclick="verMisReservas()">Ver todas</a>
                </div>
                <div class="reservas-lista" id="reservasLista">
                    <!-- Se cargarán dinámicamente -->
                </div>
            </div>
        </div>
    </main>

    <!-- Modal de Reserva -->
    <div class="modal-overlay" id="modalReserva">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitulo">Reservar Espacio</h3>
                <button class="close-modal" onclick="cerrarModalReserva()">×</button>
            </div>
            <form class="modal-body" id="formReserva">
                <div class="form-group">
                    <label for="fechaReserva">Fecha de la reserva</label>
                    <input type="date" id="fechaReserva" name="fechaReserva" required min="">
                </div>

                <div class="form-group">
                    <label for="horaInicio">Hora de inicio</label>
                    <select id="horaInicio" name="horaInicio" required>
                        <option value="">Seleccionar hora</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="horaFin">Hora de fin</label>
                    <select id="horaFin" name="horaFin" required>
                        <option value="">Seleccionar hora</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="cantidadPersonas">Cantidad de personas</label>
                    <input type="number" id="cantidadPersonas" name="cantidadPersonas" min="1" required>
                </div>

                <div class="form-group">
                    <label for="observaciones">Observaciones (opcional)</label>
                    <textarea id="observaciones" name="observaciones" rows="3" placeholder="Detalles adicionales sobre la reserva..."></textarea>
                </div>

                <!-- Información de precio (solo para espacios con costo) -->
                <div class="precio-info" id="precioInfo" style="display: none;">
                    <div class="precio-detalle">
                        <div class="precio-item">
                            <span>Precio total:</span>
                            <span id="precioTotal">$0</span>
                        </div>
                        <div class="precio-item">
                            <span>Seña requerida (50%):</span>
                            <span id="senaRequerida">$0</span>
                        </div>
                        <div class="precio-item">
                            <span>Saldo restante:</span>
                            <span id="saldoRestante">$0</span>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn-secondary" onclick="cerrarModalReserva()">Cancelar</button>
                    <button type="submit" class="btn-primary">Confirmar Reserva</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de Confirmación -->
    <div class="modal-overlay" id="modalConfirmacion">
        <div class="modal-content confirmacion-modal">
            <div class="modal-header">
                <h3>Reserva Confirmada</h3>
                <button class="close-modal" onclick="cerrarModalConfirmacion()">×</button>
            </div>
            <div class="modal-body">
                <div class="confirmacion-icon">
                    <img src="../../assets/icons/check-circle.png" alt="Confirmado">
                </div>
                <div class="confirmacion-mensaje">
                    <h4>¡Tu reserva ha sido confirmada!</h4>
                    <p id="mensajeConfirmacion"></p>
                </div>
                <div class="confirmacion-detalle" id="detalleConfirmacion">
                    <!-- Se llenará dinámicamente -->
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="cerrarModalConfirmacion()">Entendido</button>
            </div>
        </div>
    </div>

    <script src="../../assets/js/index.js?v=6"></script>
    <script src="./reservas.js?v=10"></script>
</body>
</html>