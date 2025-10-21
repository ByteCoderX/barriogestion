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
    <?php include './includes/header.php'; ?>

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
                        <img src="./assets/icons/reservas.png" alt="Reservas">
                </div>
                <div class="ad-info">
                    <a href="modules/Servicios/ReservasEC/reservas.php">
                        <h3>Reservar Espacios</h3>
                        <p>Canchas, quincho, salón</p>
                    </a>
                </div>

                </div>
                <div class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./assets/icons/permisos.png" alt="Permisos">
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
                        <img src="./assets/icons/reclamos2.png" alt="Reclamos">
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
                        <img src="./assets/icons/carnet.png" alt="Carnet">
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