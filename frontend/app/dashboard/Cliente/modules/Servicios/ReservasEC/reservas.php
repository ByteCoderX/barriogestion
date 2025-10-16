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
                <div class="espacios-grid">
                    
                </div>
            </div>

            <!-- Próximas Reservas -->
            <div class="proximas-reservas">
                <div class="seccion-header">
                    <h2>Mis Próximas Reservas</h2>
                    <a href="#" class="ver-todas" onclick="verMisReservas()">Ver todas</a>
                </div>
                <div class="reservas-lista" id="reservasLista">
                    <!-- Se cargarán dinámicamente -->
                </div>
            </div>
        </div>
    </main>

    <!-- Modal de Reserva -->
    <div class="modal-overlay" id="modalReserva">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitulo">Reservar Espacio</h3>
                <button class="close-modal" onclick="cerrarModalReserva()">×</button>
            </div>
            <form class="modal-body" id="formReserva">
                <div class="form-group">
                    <label for="fechaReserva">Fecha de la reserva</label>
                    <input type="date" id="fechaReserva" name="fechaReserva" required min="">
                </div>

                <div class="form-group">
                    <label for="horaInicio">Hora de inicio</label>
                    <select id="horaInicio" name="horaInicio" required>
                        <option value="">Seleccionar hora</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="horaFin">Hora de fin</label>
                    <select id="horaFin" name="horaFin" required>
                        <option value="">Seleccionar hora</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="cantidadPersonas">Cantidad de personas</label>
                    <input type="number" id="cantidadPersonas" name="cantidadPersonas" min="1" required>
                </div>

                <div class="form-group">
                    <label for="observaciones">Observaciones (opcional)</label>
                    <textarea id="observaciones" name="observaciones" rows="3" placeholder="Detalles adicionales sobre la reserva..."></textarea>
                </div>

                <!-- Información de precio (solo para espacios con costo) -->
                <div class="precio-info" id="precioInfo" style="display: none;">
                    <div class="precio-detalle">
                        <div class="precio-item">
                            <span>Precio total:</span>
                            <span id="precioTotal">$0</span>
                        </div>
                        <div class="precio-item">
                            <span>Seña requerida (50%):</span>
                            <span id="senaRequerida">$0</span>
                        </div>
                        <div class="precio-item">
                            <span>Saldo restante:</span>
                            <span id="saldoRestante">$0</span>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn-secondary" onclick="cerrarModalReserva()">Cancelar</button>
                    <button type="submit" class="btn-primary">Confirmar Reserva</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de Confirmación -->
    <div class="modal-overlay" id="modalConfirmacion">
        <div class="modal-content confirmacion-modal">
            <div class="modal-header">
                <h3>Reserva Confirmada</h3>
                <button class="close-modal" onclick="cerrarModalConfirmacion()">×</button>
            </div>
            <div class="modal-body">
                <div class="confirmacion-icon">
                    <img src="../../../assets/icons/check-circle.png" alt="Confirmado">
                </div>
                <div class="confirmacion-mensaje">
                    <h4>¡Tu reserva ha sido confirmada!</h4>
                    <p id="mensajeConfirmacion"></p>
                </div>
                <div class="confirmacion-detalle" id="detalleConfirmacion">
                    <!-- Se llenará dinámicamente -->
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="cerrarModalConfirmacion()">Entendido</button>
            </div>
        </div>
    </div>

    <script src="../../../assets/js/index.js?v=8"></script>
    <script src="./reservas.js?v=13"></script>
</body>
</html>