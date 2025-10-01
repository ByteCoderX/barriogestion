<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expensas - Barrio Gestión</title>
    <link rel="stylesheet" href="../index.css?v=18">
    <link rel="stylesheet" href="./expensas.css?v=119">
</head>
<body>
    
    <header>
        <div class="izq">
            <div class="LogoApp">
            <a href="../index.php">
                <img src=".././assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>                
            </div>
            <nav class="menu-principal">
                <div class="dropdown">
                    <a href="../index.php" class="menu-item">Inicio</a>
                </div>
            <nav class="menu-principal">
                <div class="dropdown">
                    <a href="#" class="menu-item active">Expensas</a>
                    <div class="dropdown-content">
                        <a href="expensas.php" class="active">Ver Expensas</a>
                        <a href="Historial/Historial.php">Historial</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Servicios</a>
                    <div class="dropdown-content">
                        <a href="mapa-barrio.php">Mapa del Barrio</a>
                        <a href="../Servicios/ReservasEC/reservas.php">Reservar Espacios</a>
                        <a href="../Servicios/MiCarnet/carnet.php">Mi Carnet</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="../Seguridad/ControlAccesos/Invitado.php">Control de Acceso</a>
                        <a href="../Seguridad/GesPermisos/Permisos.php">Gestionar Permisos</a>
                        <a href="../Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                    </div>
                </div>
                <a href="../Reclamos/quejas.php" class="menu-item">Reclamos</a>
                <a href="../Configuracion/Configuracion.php" class="menu-item">Configuracion</a>

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
            <a href="../Notificaciones/notificacion.php" class="icono-header">
                <img src="../assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <div class="IdSession">
                <h1 class="texto">Cliente</h1>
                <a href="../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
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
            <img src="../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
            <button class="close-menu" id="closeMenu">×</button>
        </div>
        
        <div class="mobile-menu-content">
            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="expensas.php" class="mobile-menu-item active">
                    <img src="../assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="historial-pagos.php" class="mobile-menu-item">
                    <img src="../assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="mapa-barrio.php" class="mobile-menu-item">
                    <img src="../assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="reservas.php" class="mobile-menu-item">
                    <img src="../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="carnet.php" class="mobile-menu-item">
                    <img src="../assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="control-acceso.php" class="mobile-menu-item">
                    <img src="../assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item">
                    <img src="../assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="visitas.php" class="mobile-menu-item">
                    <img src="../assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="notificaciones.php" class="mobile-icon-item">
                <img src="../assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="reclamos.php" class="mobile-icon-item">
                <img src="../assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="expensas-header">
                <div class="header-content">
                    <h1>Gestión de Expensas</h1>
                    <p>Consulta y gestiona tus expensas mensuales</p>
                    <div class="breadcrumb">
                        <a href="../index.php">Inicio</a> > <span>Expensas</span>
                    </div>
                </div>
                <div class="header-actions">
                    <a href="Historial/Historial.php" class="btn-secondary">Ver Historial</a>
                </div>
            </div>

            <!-- Resumen -->
            <div class="expensas-resumen">
                <div class="resumen-card pendiente">
                    <div class="card-icon">
                        <img src="../assets/icons/expensas.png" alt="Expensa Pendiente">
                    </div>
                    <div class="card-info">
                        <h3>Expensa Actual</h3>
                        <div class="monto">$125,000</div>
                        <div class="estado-badge pendiente">PENDIENTE</div>
                        <div class="vencimiento">Vence: 10 de Julio 2025</div>
                    </div>
                    <div class="card-actions">
                        <a href="pagar-expensas.php" class="btn-pagar">Pagar Ahora</a>
                        <a href="#" class="btn-comprobante">Ver Detalle</a>
                    </div>
                </div>

                <div class="resumen-card pagada">
                    <div class="card-icon">
                        <img src="../assets/icons/pagos.png" alt="Expensa Pagada">
                    </div>
                    <div class="card-info">
                        <h3>Último Pago</h3>
                        <div class="monto">$118,500</div>
                        <div class="estado-badge pagada">PAGADA</div>
                        <div class="fecha-pago">Pagada: 8 de Junio 2025</div>
                    </div>
                    <div class="card-actions">
                        <a href="#" class="btn-comprobante">Ver Comprobante</a>
                    </div>
                </div>
            </div>
        </div>
    </main>


    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <h3>Barrio Gestión</h3>
                <p>Sistema online para la administración eficiente de barrios cerrados y countrys.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com/barriogestionbcx/"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>Contacto</h3>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i> Buenos Aires, Argentina</li>
                    <li><i class="fas fa-phone"></i> Teléfono: +54 11 4184 6774</li>
                    <li><i class="fas fa-envelope"></i> Email: BarrioGestion@ByteCoderX.com</li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Enlaces</h3>
                <ul>
                    <li><a href="index.php">Inicio</a></li>
                    <li><a href="./Expensas/expensas.php">Expensas</a></li>
                    <li><a href="./Servicios/ReservasEC/reservas.php">Servicios</a></li>
                    <li><a href="Seguridad/ControlAccesos/invitado.php">Seguridad</a></li>
                    <li><a href="./Reclamos/quejas.php">Reclamos</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Barrio Gestión - Desarrollado por ByteCoderX</p>
        </div>
    </footer>

    <script>
// Variables globales
let currentTheme = localStorage.getItem('theme') || 'dark';

// Aplicar tema guardado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema
    applyTheme(currentTheme);
    
    // Configurar menú móvil existente (si lo tienes)
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (hamburger && mobileMenu) {
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
    }
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

    <script src="../assets/js/index.js?v=5"></script>
    <script src="../assets/js/expensas.js?v=1"></script>

</body>
</html>