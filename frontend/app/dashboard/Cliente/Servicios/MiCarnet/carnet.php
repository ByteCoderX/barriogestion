<?php
$requiredAdmin = false;  // solo usuarios normales
require_once '../../../../Utils/auth/validator.php';
require_once '../../../../Utils/auth/auth_check.php';
?>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Carnet - Barrio Gestión</title>
        <link rel="stylesheet" href="../../index.css?v=84">
        <link rel="stylesheet" href="./carnet.css?v=52">
    </head>
<body>

    <header>
        <div class="izq">
            <div class="LogoApp">
            <a href="../../index.php">
                <img src="../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>
            </div>

            <nav class="menu-principal">
                <div class="dropdown">
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
                        <a href="../../Servicios/ReservasEC/reservas.php">Reservar Espacios</a>
                        <a href="carnet.php" class="active">Mi Carnet</a>
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
    </div> <!-- <-- Este cierre faltaba -->
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
                <a href="reservas.php" class="mobile-menu-item">
                    <img src="../../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="carnet.php" class="mobile-menu-item active">
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
            <div class="carnet-header">
                <div class="header-content">
                    <h1>Mi Carnet </h1>
                    <p>Identificación digital Deportiva</p>
                    <div class="breadcrumb">
                        <a href="../../index.php">Inicio</a> &gt; <span>Servicios</span> &gt; <span>Mi Carnet</span>
                    </div>
                </div>
                <div class="header-actions">
                    <a href="#" class="btn-secondary" onclick="downloadCarnet()">Descargar Carnet</a>
                </div>
            </div>

            <!-- Carnet Digital -->
            <div class="carnet-container">
                <div class="carnet-card" id="carnetCard">
                    <div class="carnet-header-info">
                        <div class="carnet-title">
                            <h2>CARNET DIGITAL</h2>
                            <div class="carnet-logo">
                            <img src="../../assets/icons/logoheader.webp" alt="Logo Barrio">
                        </div>
                        </div>
                        <div class="carnet-photo">
                        <div class="photo-placeholder">
                            <img src="<?php echo $_SESSION['barriogestion']['userdata']['avatar']; ?>" alt="Foto del residente" id="userPhoto">
                        </div>
                    </div>
                </div>
                <div class="carnet-info">
                    <div>
                        <div class="info-row">
                            <span class="label">Nombre:</span>
                            <span class="value" id="userName"><?php echo $_SESSION['barriogestion']['userdata']['fullName']; ?></span>
                        </div>
                        <div class="info-row">
                            <span class="label">Lote:</span>
                            <span class="value" id="userLote"><?php echo $_SESSION['barriogestion']['userdata']['address']; ?></span>
                        </div>
                        <div class="info-row">
                            <span class="label">DNI:</span>
                            <span class="value" id="userDNI"><?php echo $_SESSION['barriogestion']['userdata']['dni']; ?></span>
                        </div>
                        <div class="info-row">
                            <span class="label">Tipo:</span>
                            <span class="value" id="userTipo">PROPIETARIO</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Vigencia:</span>
                            <span class="value estado-vigente" id="userVigencia">31/12/2025</span>
                        </div>
                    </div>
                    <div class="carnet-qr">
                        <div class="qr-code">
                            <img src="../../assets/icons/qrcode.png" alt="Código QR - BG-2025-A15" id="qrCode">
                        </div>
                        <p class="qr-text">Escanear para acceder a amenidades</p>
                    </div>
                </div>
                <div class="carnet-footer">
                    <div class="security-code">
                        <span>Código: <strong id="securityCode">BG-2025-A15</strong></span>
                    </div>
                    <div class="issue-date">
                        <span>Emitido: <span id="issueDate">01/01/2025</span></span>
                    </div>
                </div>
            </div>
        </div>

            <!-- Acciones Rápidas -->
            <div class="acciones-rapidas">
                <h2>Acciones Rápidas</h2>
                <div class="acciones-grid">
                    <div class="accion-card" onclick="verAmenidades()">
                        <div class="accion-icon">
                            <img src="../../assets/icons/amenities.png" alt="Amenidades">
                        </div>
                        <div class="accion-content">
                            <h3>Ver Amenidades</h3>
                            <p>Consultar instalaciones disponibles</p>
                        </div>
                    </div>
                    
                    <div class="accion-card" onclick="verHorarios()">
                        <div class="accion-icon">
                            <img src="../../assets/icons/schedule.png" alt="Horarios">
                        </div>
                        <div class="accion-content">
                            <h3>Horarios de Acceso</h3>
                            <p>Consultar horarios de cada instalación</p>
                        </div>
                    </div>
                    
                    <div class="accion-card" onclick="reportarPerdida()">
                        <div class="accion-icon">
                            <img src="../../assets/icons/warning.png" alt="Reportar">
                        </div>
                        <div class="accion-content">
                            <h3>Reportar Problema</h3>
                            <p>Informar pérdida o daño del carnet</p>
                        </div>
                    </div>
                    
                    <div class="accion-card" onclick="verHistorialAcceso()">
                        <div class="accion-icon">
                            <img src="../../assets/icons/historial.png" alt="Historial">
                        </div>
                        <div class="accion-content">
                            <a href="../ReservasEC/reservas.php">
                            <h3>Historial de Uso</h3>
                            <p>Ver accesos a instalaciones</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="../../assets/js/index.js?v=6"></script>
</body>
</html>