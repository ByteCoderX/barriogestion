<?php
$baseUrl = 'tesisde/app/dashboard/admin';
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
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/accesos/invitados.php">Gestionar Ingresos</a>
                    <a href="#">Gestionar Fondos</a>
                    <a href="<?= $baseUrl ?>/modules/MiBarrio/expensas/Ges-Expensas.php">Gestionar Expensas</a>
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
                    <a href="#">Historial de Accesos</a>
                    <a href="#">Gestionar Accesos</a>
                </div>
            </div>
            <a href="#" class="menu-item">Configuración</a>
        </nav>
    </div>

    <div class="derecha">
        <a href="<?= $baseUrl ?>/notificaciones.php" class="icono-header">
            <img src="<?= $baseUrl ?>/assets/icons/notificacion.png" alt="notificaciones">
            <span class="notification-badge" id="notificationCount">3</span>
        </a>
        <a href="<?= $baseUrl ?>/reclamos.php" class="icono-header">
            <img src="<?= $baseUrl ?>/assets/icons/reclamos4.png" alt="Reclamos">
        </a>
        <div class="IdSession">
            <h1 class="texto">Administrador</h1>
            <a href="<?= $baseUrl ?>/Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
        </div>

        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>

<div id="mobileMenuOverlay" class="mobile-menu-overlay"></div>
<div id="mobileMenu" class="mobile-menu">
    <div class="mobile-menu-header">
        <h2>Menú</h2>
        <span id="closeMenu">&times;</span>
    </div>
    <a href="<?= $baseUrl ?>/index.php">Inicio</a>
    <a href="<?= $baseUrl ?>/modules/MiBarrio/gastos/Ges-Gastos.php">Gastos</a>
    <a href="<?= $baseUrl ?>/modules/MiBarrio/pagos/Ges-Pagos.php">Pagos</a>
    <a href="<?= $baseUrl ?>/modules/MiBarrio/expensas/Ges-Expensas.php">Expensas</a>
    <a href="<?= $baseUrl ?>/modules/GestionLotes/usuarios/Usuarios.php">Usuarios</a>
    <a href="<?= $baseUrl ?>/modules/GestionLotes/espacios/ReservasEspacios.php">Espacios</a>
    <a href="#">Seguridad</a>
    <a href="#">Configuración</a>
</div>
