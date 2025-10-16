<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expensas - Barrio Gestión</title>
    <link rel="stylesheet" href="../../index.css?v=18">
    <link rel="stylesheet" href="./expensas.css?v=119">
</head>
<body>
    <?php include '../../includes/header.php'; ?>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="expensas-header">
                <div class="header-content">
                    <h1>Gestión de Expensas</h1>
                    <p>Consulta y gestiona tus expensas mensuales</p>
                    <div class="breadcrumb">
                        <a href="../../index.php">Inicio</a> > <span>Expensas</span>
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
                        <img src="../../assets/icons/expensas.png" alt="Expensa Pendiente">
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
                        <img src="../../assets/icons/pagos.png" alt="Expensa Pagada">
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

    <script src="../../assets/js/index.js?v=5"></script>
    <script src="../../assets/js/expensas.js?v=1"></script>

</body>
</html>