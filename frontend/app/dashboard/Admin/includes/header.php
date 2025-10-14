<?php
$baseUrl = '/tesisde/app/dashboard/admin';
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
                <a class="menu-item">Gestion Lotes</a>
                <div class="dropdown-content">
                    <!-- <a href="<?= $baseUrl ?>/mapa-barrio.php">Gestionar Grupo Hogar</a> -->
                    <a href="<?= $baseUrl ?>/modules/GestionLotes/espacios/ReservasEspacios.php">Gestionar Espacios</a>
                    <!-- <a href="<?= $baseUrl ?>/modules/GestionLotes/carnet/carnet.php">Gestionar Carnet</a> -->
                    <a href="<?= $baseUrl ?>/modules/GestionLotes/usuarios/Usuarios.php">Gestionar Usuarios</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="#" class="menu-item">Seguridad</a>
                <div class="dropdown-content">
                    <a href="#">Historial de Accesos</a>
                    <!-- <a href="#">Gestionar Permisos</a> -->
                    <a href="#">Gestionar Accesos</a>
                </div>
            </div>
            <a href="#" class="menu-item">Configuracion</a>
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
    </div>
</header>
