<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reservar Espacios - Barrio Gestión</title>
        <link rel="stylesheet" href="../../../index.css?v=87">
        <link rel="stylesheet" href="./reservas.css?v=74">
    </head>

<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="reservas-header">
                <div class="header-content">
                    <h1>Reservar Espacios</h1>
                    <div class="breadcrumb">
                        <a href="../../index.php">Inicio</a> &gt; <span>Expensas</span> &gt; <span>Reservar Espacios</span>
                    </div>
                </div>
                <div class="header-actions">
                    <a href="#" class="btn-secondary" onclick="verMisReservas()">Mis Reservas</a>
                </div>
            </div>

            <!-- Espacios Disponibles -->
            <div class="espacios-section">
                <h2>Espacios Disponibles</h2>
                <div class="espacios-grid"></div>
            </div>

            <!-- Próximas Reservas -->
            <div class="proximas-reservas">
                <div class="seccion-header">
                    <h2>Mis Próximas Reservas</h2>
                    <a href="#" class="ver-todas" onclick="verMisReservas()">Ver todas</a>
                </div>
                <div class="reservas-lista" id="reservasLista"></div>
            </div>
        </div>
    </main>

    <!-- Modales -->
    <div class="modal-overlay" id="modalReserva">...</div>
    <div class="modal-overlay" id="modalConfirmacion">...</div>

    <script src="../../../assets/js/index.js?v=8"></script>
    <script src="./reservas.js?v=100"></script>
</body>
</html>
