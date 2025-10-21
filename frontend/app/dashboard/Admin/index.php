<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barrio Gestion - Dashboard</title>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="assets/css/sidebar-right.css?=v5">

</head>
<body>
    <?php include './includes/header.php'; ?>

    <div class="sidebar-right" id="sidebar-right">
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Buscar lote...">
            <img src="./assets/icons/search.svg" alt="Buscar" class="search-icon">
        </div>
        <div class="lotes-container" id="lotes-container">

        </div>
    </div>

    <main id="main">
        <div class="dashboard-container">
            <div class="presen-seccion">
                <div class="presen-contenido">
                    <h1>¡Bienvenido a Barrio Gestión!</h1>
                    <p>Administra de manera eficiente tu barrio privado con nuestras herramientas de gestión.</p>
                    <div class="presen-fecha">
                        <span id="current-date">Cargando fecha...</span>
                    </div>
                </div>
            </div>

            <br>

            <div class="seccion-titulo">
                <h2>Accesos Directos</h2>
            </div>
            <div class="ad-container">
                <a href="modules/MiBarrio/expensas/ExpensasAdmin.php" class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./assets/icons/expensas.svg" alt="Expensas">
                    </div>
                    <div class="ad-info">
                        <h3>Generar Expensas</h3>
                        <p>Crear liquidación del mes</p>
                    </div>
                </a>

                <a href="modules/MiBarrio/pagos/Ges-Pagos.php" class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./assets/icons/pagos.svg" alt="Pagos">
                    </div>
                    <div class="ad-info">
                        <h3>Registrar Pago</h3>
                        <p>Añadir nuevo pago</p>
                    </div>
                </a>

                <a href="modules/MiBarrio/gastos/Ges-Gastos.php" class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./assets/icons/gastos.svg" alt="Gastos">
                    </div>
                    <div class="ad-info">
                        <h3>Registrar Gasto</h3>
                        <p>Añadir nuevo gasto</p>
                    </div>
                </a>

                <a href="modules/Gestion/usuarios/Usuarios.php" class="ad-tarjeta">
                    <div class="ad-icon">
                        <img src="./assets/icons/usuarios-alt.svg" alt="Usuarios">
                    </div>
                    <div class="ad-info">
                        <h3>Nuevo Residente</h3>
                        <p>Añadir nuevo propietario</p>
                    </div>
                </a>
            </div>

            
            <div class="seccion-titulo">
                <h2>Estadísticas del Barrio</h2>
                <a href="#" class="ver-todos">Ver detalles</a>
            </div>
            <div class="stats-container">
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Recaudación Mensual</h3>
                        <div class="stats-icono up">
                            <img src="./assets/icons/subida.png" alt="Incremento">
                            <span>12%</span>
                        </div>
                    </div>
                    <div class="stats-valor">$1,250,000</div>
                </div>
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Gastos Mensuales</h3>
                        <div class="stats-icono down">
                            <img src="./assets/icons/baja.png" alt="Decremento">
                            <span>5%</span>
                        </div>
                    </div>
                    <div class="stats-valor">$980,000</div>
                </div>
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Tasa de Morosidad</h3>
                        <div class="stats-icono down">
                            <img src="./assets/icons/baja.png" alt="Decremento">
                            <span>3%</span>
                        </div>
                    </div>
                    <div class="stats-valor">18%</div>
                </div>
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Fondos de Reserva</h3>
                        <div class="stats-icono up">
                            <img src="./assets/icons/subida.png" alt="Incremento">
                            <span>8%</span>
                        </div>
                    </div>
                    <div class="stats-valor">$2,500,000</div>
                </div>
            </div>
            
            <div class="seccion-titulo">
                <h2>Estado de Lotes</h2>
            </div>
            <div class="lotes-status-container">
                <div class="status-tarjeta">
                    <div class="status-valor">97</div>
                    <div class="status-label">Lotes al día</div>
                </div>
                <div class="status-tarjeta">
                    <div class="status-valor">4</div>
                    <div class="status-label">Con mora</div>
                </div>
                <div class="status-tarjeta">
                    <div class="status-valor">1</div>
                    <div class="status-label">Lotes vacíos</div>
                </div>
            </div>
        </div>
    </main>

    <script src="./assets/js/index.js?=v2"></script>
    <script src="./assets/js/sidebar-right.js?=v2"></script>
    <script>
        // Cargar fecha actual
        document.addEventListener('DOMContentLoaded', function() {
            const fechaElement = document.getElementById('current-date');
            const opciones = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const fechaActual = new Date().toLocaleDateString('es-ES', opciones);
            fechaElement.textContent = fechaActual;
        });
    </script>
</body>
</html>