<?php
$requiredAdmin = false;  // solo usuarios normales
require_once '../../Utils/auth/validator.php';
require_once '../../Utils/auth/auth_check.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barrio Gestion - Portal Residente</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="index.css?v=71">
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
                <div class="dropd<own">
                    <a href="index.php" class="menu-item active">Inicio</a>
                </div>
            <nav class="menu-principal">
                <div class="dropdown">
                    <a href="#" class="menu-item">Expensas</a>
                    <div class="dropdown-content">
                        <a href="./Expensas/expensas.php">Ver Expensas</a>
                        <a href="./Expensas/Historial/Historial.php">Historial</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Servicios</a>
                    <div class="dropdown-content">
                        <a href="./Servicios/MapaDelBarrio/Barrios.php">Mapa del Barrio</a>
                        <a href="./Servicios/ReservasEC/reservas.php">Reservar Espacios</a>
                        <a href="./Servicios/MiCarnet/carnet.php">Mi Carnet</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="Seguridad/ControlAccesos/invitado.php">Control de Acceso</a>
                        <a href="Seguridad/GesPermisos/Permisos.php">Gestionar Permisos</a>
                        <a href="Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                    </div>
                </div>
                <a href="./Reclamos/quejas.php" class="menu-item">Reclamos</a>
                <a href="Configuracion/Configuracion.php" class="menu-item">Configuracion</a>
            </nav>
        </div>
        <div class="derecha">
            <!-- Selector de tema -->
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
            
            <a href="Notificaciones/Notificacion.php" class="icono-header">
                <img src="./assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <div class="IdSession">
                <h1 class="texto">Cliente</h1>
                <a href="../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>
            
            <!-- Menú hamburguesa -->
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
            <img src="./assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250" >
            <button class="close-menu" id="closeMenu">×</button>
        </div>
        
        <div class="mobile-menu-content">

            <div class="mobile-menu-user">
                <h4 class="texto">Cliente</h4>
                <a href="../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>

            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="./Expensas/expensas.php" class="mobile-menu-item">
                    <img src="./assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="historial-pagos.php" class="mobile-menu-item">
                    <img src="./assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="mapa-barrio.php" class="mobile-menu-item">
                    <img src="./assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="./Servicios/ReservasEC/reservas.php" class="mobile-menu-item">
                    <img src="./assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="./Servicios/MiCarnet/carnet.php" class="mobile-menu-item">
                    <img src="./assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="control-acceso.php" class="mobile-menu-item">
                    <img src="./assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item">
                    <img src="./assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="Seguridad/RegistroVisitas/Invitados.php" class="mobile-menu-item">
                    <img src="./assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="notificaciones.php" class="mobile-icon-item">
                <img src="./assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="./Reclamos/quejas.php" class="mobile-icon-item">
                <img src="./assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>

    <main id="main">

        <div class="dashboard-container">
            <div class="presen-seccion">
                <div class="presen-contenido">
                    <h1>¡Bienvenid@ a Barrio Gestion!</h1>
                    <p>Gestiona todos los servicios de tu hogar desde un solo lugar</p>
                    <div class="presen-fecha">
                        <span id="current-date">Cargando fecha...</span>
                    </div>
                    <div class="presen-direccion">
                        <strong>Lote 101 - Familia A</strong>
                    </div>
                </div>
            </div>

            <div class="estado-resumen">
                <div class="resumen-card expensas-card">
                    <div class="card-content">
                        <h3>Expensas del Mes</h3>
                        <div class="estado-pago pendiente">
                            <span class="monto">$125,000</span>
                            <span class="estado">PENDIENTE</span>
                        </div>
                        <p class="vencimiento">Vence: 10 de Julio</p>
                        <a href="./Expensas/expensas.php" class="btn-accion">Ver Detalle</a>
                    </div>
                </div>

                <div class="resumen-card reservas-card">
                    <div class="card-content">
                        <h3>Próximas Reservas</h3>
                        <div class="proxima-reserva">
                            <span class="lugar">Cancha de Tenis</span>
                            <span class="fecha">28 Jun - 18:00hs</span>
                        </div>
                        <a href="./Servicios/ReservasEC/reservas.php" class="btn-accion">Gestionar</a>
                    </div>
                </div>
            </div>

            <div class="accesos-rapidos">
                <h2>Accesos Rápidos</h2>
                <div class="ad-container">
                <div class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./Assets/icons/reservas.png" alt="Reservas">
                </div>
                <div class="ad-info">
                    <a href="Servicios/ReservasEC/reservas.php">
                        <h3>Reservar Espacios</h3>
                        <p>Canchas, quincho, salón</p>
                    </a>
                </div>

                </div>
                <div class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./Assets/icons/permisos.png" alt="Permisos">
                    </div>
                    <div class="ad-info">
                        <a href="Seguridad/ControlAccesos/Invitado.php">
                        <h3>Autorizar Visitas</h3>
                        <p>Generar permisos de acceso</p>
                        </a>
                    </div>
                </div>
                <div class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./Assets/icons/reclamos2.png" alt="Reclamos">
                    </div>
                    <div class="ad-info">
                       <a href="Reclamos/quejas.php">
                        <h3>Nuevo Reclamo</h3>
                        <p>Reporta Incidencias</p>
                        </a>
                    </div>
                </div>
                
                <div class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./Assets/icons/carnet.png" alt="Carnet">
                    </div>
                    <div class="ad-info">
                        <a href="./Servicios/MiCarnet/carnet.php">
                        <h3>Mi Carnet</h3>
                        <p>Acceso a gimnasio y pileta</p>
                        </a>
                    </div>
                </div>
            </div>
            </div>

            <div class="notificaciones-seccion">
                <div class="seccion-header">
                    <h2>Notificaciones Recientes</h2>
                    <a href="Notificaciones/notificacion.php" class="ver-todas">Ver todas</a>
                </div>
                <div class="notificaciones-lista">
                    <div class="notificacion-item ">
                        <div class="notif-content">
                            <h4>Mantenimiento de pileta</h4>
                            <p>La pileta estará cerrada del 1 al 3 de julio por mantenimiento.</p>
                            <span class="notif-fecha">Hace 2 horas</span>
                        </div>
                    </div>

                    <div class="notificacion-item">
                        <div class="notif-content">
                            <h4>Expensas disponibles</h4>
                            <p>Ya están disponibles las expensas del mes de julio.</p>
                            <span class="notif-fecha">Ayer</span>
                        </div>
                    </div>

                    <div class="notificacion-item">
                        <div class="notif-content">
                            <h4>Evento del barrio</h4>
                            <p>Fiesta de invierno el sábado 13 de julio en el salón de eventos.</p>
                            <span class="notif-fecha">3 días</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script>
        // Variables globales
        let currentTheme = localStorage.getItem('theme') || 'dark';

        // Aplicar tema guardado al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            // Aplicar tema
            applyTheme(currentTheme);
            
            // Configurar fecha
            const fechaElement = document.getElementById('current-date');
            const opciones = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const fechaActual = new Date().toLocaleDateString('es-ES', opciones);
            fechaElement.textContent = fechaActual;

            // Configurar menú móvil
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const closeMenu = document.getElementById('closeMenu');

            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                mobileMenuOverlay.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
            });

            closeMenu.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            mobileMenuOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
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
    </script>
</body>
</html>