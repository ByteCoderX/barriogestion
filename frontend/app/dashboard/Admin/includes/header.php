<?php
define('APP_BASE_PATH', realpath(__DIR__ . '/../../../')); 
<<<<<<< HEAD
//require APP_BASE_PATH . "/Utils/auth/validator.php";
=======
// require APP_BASE_PATH . "/Utils/auth/validator.php";
>>>>>>> 352e706ea61a22cca553e65e8cb5f798619835ed

$baseUrl = '/barriogestion/frontend/app/dashboard/Admin';
?>
<header>
    <div class="izq">
        <div class="LogoApp">
            <a href="<?= $baseUrl ?>/index.php">
                <img src="<?= $baseUrl ?>/assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
            </a>                
        </div>

        <nav class="menu-principal">
            <a href="<?= $baseUrl ?>/index.php" class="menu-item">Inicio</a>
            <div class="dropdown">
                <a href="#" class="menu-item">Mi Barrio</a>
                <div class="dropdown-content">
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/gastos/Ges-Gastos.php">Gestionar Gastos</a>
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/pagos/Ges-Pagos.php">Gestionar Pagos</a>
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/ingresos/ingresos.php">Gestionar Ingresos</a>
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/fondos/fondos.php">Gestionar Fondos</a>
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/expensas/ExpensasAdmin.php">Gestionar Expensas</a>
                </div>
            </div>
            <div class="dropdown">
                <a class="menu-item">Gestión Lotes</a>
                <div class="dropdown-content">
                    <a href="<?= $baseUrl ?>/modules/GestionLotes/espacios/ReservasEspacios.php">Gestionar Espacios</a>
                    <a href="<?= $baseUrl ?>/modules/GestionLotes/usuarios/Usuarios.php">Gestionar Usuarios</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="#" class="menu-item">Seguridad</a>
                <div class="dropdown-content">
                    <a href="<?= $baseUrl ?>/modules/Seguridad/GestionAccesos/Accesos.php">Gestionar Accesos</a>
                    <a href="<?= $baseUrl ?>/modules/Seguridad/Historial/HistorialAccesos.php">Historial de Accesos</a>
                </div>
            </div>
            
                    <a href="<?= $baseUrl ?>/modules/Configuracion/Configuracion.php" class="menu-item">Configuración</a>
        </nav>
    </div>

    <div class="derecha">
        <a href="<?= $baseUrl ?>/notificaciones.php" class="icono-header">
            <img src="<?= $baseUrl ?>/assets/icons/notificacion.png" alt="notificaciones">
            <span class="notification-badge" id="notificationCount">3</span>
        </a>
        <a href="<?= $baseUrl ?>/modules/complains/complains.php" class="icono-header" title="Reclamos">
            <img src="<?= $baseUrl ?>/assets/icons/reclamos4.png" alt="Reclamos">
        </a>
        <div class="IdSession">
            <h1 class="texto">Administrador</h1>
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
            <img src="<?= $baseUrl ?>/assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
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
                    <img src="<?= $baseUrl ?>/assets/icons/expensas.svg" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Expensas/Historial/Historial.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="<?= $baseUrl ?>/modules/Servicios/MapaDelBarrio/Barrios.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Servicios/ReservasEC/reservas.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Servicios/MiCarnet/carnet.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="<?= $baseUrl ?>/modules/Seguridad/ControlAccesos/Invitado.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Seguridad/GesPermisos/Permisos.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="<?= $baseUrl ?>/modules/Seguridad/RegistroVisitas/Visitas.php" class="mobile-menu-item">
                    <img src="<?= $baseUrl ?>/assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="<?= $baseUrl ?>/modules/Notificaciones/Notificacion.php" class="mobile-icon-item">
                <img src="<?= $baseUrl ?>/assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="<?= $baseUrl ?>/modules/Reclamos/quejas.php" class="mobile-icon-item">
                <img src="<?= $baseUrl ?>/assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>
</header>
<script src="/tesisde/app/Utils/logout.js"></script>