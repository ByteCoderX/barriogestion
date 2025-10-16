<?php
require "../../Utils/auth/validator.php";

$baseUrl = '/tesisde/app/dashboard/cliente';

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
            <h2 id="logoutBtn" style="cursor:pointer;">Cerrar Sesión</h2>
        </div>

        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>
<script src="../../../Utils/logout.js"></script>
