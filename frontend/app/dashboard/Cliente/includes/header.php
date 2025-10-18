<?php
define('APP_BASE_PATH', realpath(__DIR__ . '/../../../')); 
// require APP_BASE_PATH . "/Utils/auth/validator.php";

$baseUrl = '/barriogestion/frontend/app/dashboard/cliente';

?>
<header>
    <div class="izq">
        <div class="LogoApp">
            <a href="<?= $baseUrl ?>/index.php">
                <img src="<?= $baseUrl ?>/Assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
            </a>
        </div>

        <nav class="menu-principal">
            <a href="<?= $baseUrl ?>/index.php" class="menu-item active">Inicio</a>

            <div class="dropdown">
                <a href="#" class="menu-item">Expensas</a>
                <div class="dropdown-content">
                    <a href="<?= $baseUrl ?>/modules/Expensas/expensas.php">Ver Expensas</a>
                    <a href="<?= $baseUrl ?>/modules/Expensas/Historial/Historial.php">Historial</a>
                </div>
            </div>

            <div class="dropdown">
                <a href="#" class="menu-item">Servicios</a>
                <div class="dropdown-content">
                    <a href="<?= $baseUrl ?>/modules/Servicios/MapaDelBarrio/Barrios.php">Mapa del Barrio</a>
                    <a href="<?= $baseUrl ?>/modules/Servicios/ReservasEC/reservas.php">Reservar Espacios</a>
                    <a href="<?= $baseUrl ?>/modules/Servicios/MiCarnet/carnet.php">Mi Carnet</a>
                </div>
            </div>

            <div class="dropdown">
                <a href="#" class="menu-item">Seguridad</a>
                <div class="dropdown-content">
                    <a href="<?= $baseUrl ?>/modules/Seguridad/ControlAccesos/Invitado.php">Control de Acceso</a>
                    <a href="<?= $baseUrl ?>/modules/Seguridad/GesPermisos/Permisos.php">Gestionar Permisos</a>
                    <a href="<?= $baseUrl ?>/modules/Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                </div>
            </div>

            <a href="<?= $baseUrl ?>/modules/Reclamos/quejas.php" class="menu-item">Reclamos</a>
            <a href="<?= $baseUrl ?>/modules/Configuracion/Configuracion.php" class="menu-item">Configuración</a>
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

        <a href="<?= $baseUrl ?>/modules/Notificaciones/Notificacion.php" class="icono-header">
            <img src="<?= $baseUrl ?>/Assets/icons/notificacion.png" alt="notificaciones">
            <span class="notification-badge" id="notificationCount">3</span>
        </a>

        <div class="IdSession">
            <h1 class="texto">Cliente</h1>
            <h2 id="logoutBtnDesktop" style="cursor:pointer;">Cerrar Sesión</h2>
        </div>

        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

    <!-- Menú móvil -->
    <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>

    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <img src="<?= $baseUrl ?>/Assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
            <button class="close-menu" id="closeMenu">×</button>
        </div>

        <div class="mobile-menu-content">
            <div class="mobile-menu-user">
                <h4 class="texto">Cliente</h4>
                <h2 id="logoutBtnMobile" style="cursor:pointer;">Cerrar Sesión</h2>
            </div>

            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="<?= $baseUrl ?>/modules/Expensas/expensas.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Expensas/Historial/Historial.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="<?= $baseUrl ?>/modules/Servicios/MapaDelBarrio/Barrios.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Servicios/ReservasEC/reservas.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Servicios/MiCarnet/carnet.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="<?= $baseUrl ?>/modules/Seguridad/ControlAccesos/Invitado.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Seguridad/GesPermisos/Permisos.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Seguridad/RegistroVisitas/Visitas.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/Assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="<?= $baseUrl ?>/modules/Notificaciones/Notificacion.php" class="mobile-icon-item">
                <img src="<?= $baseUrl ?>/Assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="<?= $baseUrl ?>/modules/Reclamos/quejas.php" class="mobile-icon-item">
                <img src="<?= $baseUrl ?>/Assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>
</header>
<script src="/tesisde/app/Utils/logout.js"></script>
