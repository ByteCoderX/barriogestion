<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Reservas - Barrio Gestión</title>
    <link rel="stylesheet" href="ReservasEspacios.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="dashboard-container">
            <!-- Sección de bienvenida -->
            <div class="presen-seccion">
                <div class="presen-contenido">
                    <h1>Gestión de Reservas</h1>
                    <p>Administra las reservas de espacios comunes del barrio</p>
                    <div class="presen-breadcrumb">
                        <a href="index.php">Inicio</a> › <a href="#">Gestión Lotes</a> › <span>Gestionar Espacios</span>
                    </div>
                </div>
                <div class="presen-acciones">
                    <button class="btn-secondary" onclick="exportarReservas()">Exportar</button>
                    <button class="btn-primary" onclick="actualizarReservas()">Actualizar</button>
                </div>
            </div>

            <br>

            <!-- Estadísticas -->
            <div class="seccion-titulo">
                <h2>Estadísticas</h2>
            </div>
            <div class="stats-container">
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Reservas Hoy</h3>
                        <div class="stats-icono up">
                            <img src="./assets/icons/subida.png" alt="Incremento">
                            <span>0%</span>
                        </div>
                    </div>
                    <div class="stats-valor" id="reservasHoy">0</div>
                </div>
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Esta Semana</h3>
                        <div class="stats-icono up">
                            <img src="./assets/icons/subida.png" alt="Incremento">
                            <span>0%</span>
                        </div>
                    </div>
                    <div class="stats-valor" id="reservasSemana">0</div>
                </div>
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>Ingresos Estimados</h3>
                        <div class="stats-icono up">
                            <img src="./assets/icons/subida.png" alt="Incremento">
                            <span>0%</span>
                        </div>
                    </div>
                    <div class="stats-valor" id="ingresosEstimados">$0</div>
                </div>
                <div class="stats-tarjeta">
                    <div class="stats-info">
                        <h3>% Ocupación</h3>
                        <div class="stats-icono up">
                            <img src="./assets/icons/subida.png" alt="Incremento">
                            <span>0%</span>
                        </div>
                    </div>
                    <div class="stats-valor" id="ocupacion">0%</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="seccion-titulo">
                <h2>Filtros de Búsqueda</h2>
            </div>
            <div class="filtros-section">
                <div class="filtros-grid">
                    <div class="filtro-group">
                        <label for="filtroEspacio">Espacio</label>
                        <select id="filtroEspacio">
                            <option value="">Todos los espacios</option>
                            <option value="clubhouse">Club House</option>
                            <option value="quincho">Quincho</option>
                            <option value="pileta">Pileta</option>
                            <option value="futbol">Cancha de Fútbol</option>
                            <option value="tenis">Cancha de Tenis</option>
                        </select>
                    </div>
                    <div class="filtro-group">
                        <label for="filtroEstado">Estado</label>
                        <select id="filtroEstado">
                            <option value="">Todos los estados</option>
                            <option value="confirmada">Confirmadas</option>
                            <option value="pendiente">Pendientes</option>
                            <option value="cancelada">Canceladas</option>
                        </select>
                    </div>
                    <div class="filtro-group">
                        <label for="fechaDesde">Desde</label>
                        <input type="date" id="fechaDesde">
                    </div>
                    <div class="filtro-group">
                        <label for="fechaHasta">Hasta</label>
                        <input type="date" id="fechaHasta">
                    </div>
                    <div class="filtro-group">
                        <button class="btn-filtrar" onclick="aplicarFiltros()">Filtrar</button>
                    </div>
                </div>
            </div>

            <!-- Tabla de Reservas -->
            <div class="seccion-titulo">
                <h2>Todas las Reservas</h2>
            </div>
            <div class="reservas-table-section">
                <div class="table-responsive">
                    <table class="reservas-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Espacio</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Personas</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="reservasTableBody">
                            <tr>
                                <td colspan="9">
                                    <div class="sin-reservas">
                                        <p>No hay reservas disponibles</p>
                                        <span>Las reservas realizadas por los usuarios aparecerán aquí</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal de confirmación -->
    <div class="modal-overlay" id="modalConfirmacion">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmar Acción</h3>
                <button class="close-modal" onclick="cerrarModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p id="mensajeConfirmacion">¿Estás seguro de que deseas realizar esta acción?</p>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="cerrarModal()">Cancelar</button>
                <button class="btn-primary" id="confirmarAccion">Confirmar</button>
            </div>
        </div>
    </div>

    <script>
        let reservasData = [];
        let reservasFiltradas = [];

        document.addEventListener('DOMContentLoaded', function() {
            configurarFechas();
            cargarReservasDesdeCliente();
            actualizarEstadisticas();
        });

        function configurarFechas() {
            const hoy = new Date();
            const fechaHoy = hoy.toISOString().split('T')[0];
            const fechaSemana = new Date(hoy.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
            
            document.getElementById('fechaDesde').value = fechaHoy;
            document.getElementById('fechaHasta').value = fechaSemana;
        }

        function cargarReservasDesdeCliente() {
            actualizarTablaReservas();
        }

        function actualizarTablaReservas() {
            const tbody = document.getElementById('reservasTableBody');
            
            if (reservasFiltradas.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="9">
                            <div class="sin-reservas">
                                <p>No hay reservas disponibles</p>
                                <span>Las reservas realizadas por los usuarios aparecerán aquí</span>
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = reservasFiltradas.map(reserva => `
                <tr>
                    <td>#${reserva.id}</td>
                    <td>${reserva.usuario}</td>
                    <td>${reserva.espacio}</td>
                    <td>${formatearFecha(reserva.fecha)}</td>
                    <td>${reserva.horaInicio}:00 - ${reserva.horaFin}:00</td>
                    <td>${reserva.cantidadPersonas}</td>
                    <td>${reserva.precio === 0 ? 'Gratuito' : '$' + reserva.precio.toLocaleString()}</td>
                    <td><span class="status-badge ${reserva.estado}">${reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}</span></td>
                    <td>
                        <div class="actions-buttons">
                            <button class="btn-action btn-edit" onclick="editarReserva(${reserva.id})">Editar</button>
                            ${reserva.estado === 'pendiente' ? `<button class="btn-action btn-approve" onclick="aprobarReserva(${reserva.id})">Aprobar</button>` : ''}
                            <button class="btn-action btn-delete" onclick="confirmarEliminacion(${reserva.id})">Eliminar</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function aplicarFiltros() {
            const espacio = document.getElementById('filtroEspacio').value;
            const estado = document.getElementById('filtroEstado').value;
            const fechaDesde = document.getElementById('fechaDesde').value;
            const fechaHasta = document.getElementById('fechaHasta').value;

            reservasFiltradas = reservasData.filter(reserva => {
                let cumpleFiltros = true;
                if (espacio && reserva.espacioKey !== espacio) cumpleFiltros = false;
                if (estado && reserva.estado !== estado) cumpleFiltros = false;
                if (fechaDesde && reserva.fecha < fechaDesde) cumpleFiltros = false;
                if (fechaHasta && reserva.fecha > fechaHasta) cumpleFiltros = false;
                return cumpleFiltros;
            });

            actualizarTablaReservas();
            actualizarEstadisticas();
        }

        function actualizarEstadisticas() {
            const hoy = new Date().toISOString().split('T')[0];
            const fechaSemanaAtras = new Date();
            fechaSemanaAtras.setDate(fechaSemanaAtras.getDate() - 7);
            const fechaSemana = fechaSemanaAtras.toISOString().split('T')[0];

            const reservasHoy = reservasFiltradas.filter(r => r.fecha === hoy).length;
            const reservasSemana = reservasFiltradas.filter(r => r.fecha >= fechaSemana).length;
            const ingresos = reservasFiltradas.reduce((sum, r) => sum + (r.precio || 0), 0);
            const totalEspacios = 5;
            const ocupacion = reservasFiltradas.length > 0 ? Math.round((reservasSemana / (totalEspacios * 7)) * 100) : 0;

            document.getElementById('reservasHoy').textContent = reservasHoy;
            document.getElementById('reservasSemana').textContent = reservasSemana;
            document.getElementById('ingresosEstimados').textContent = '$' + ingresos.toLocaleString();
            document.getElementById('ocupacion').textContent = ocupacion + '%';
        }

        function formatearFecha(fecha) {
            return new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }

        function editarReserva(id) {
            const reserva = reservasData.find(r => r.id === id);
            if (!reserva) return;
            alert(`Editar reserva #${id} - ${reserva.espacio}`);
        }

        function aprobarReserva(id) {
            const reserva = reservasData.find(r => r.id === id);
            if (!reserva) return;
            reserva.estado = 'confirmada';
            actualizarTablaReservas();
            actualizarEstadisticas();
            alert(`Reserva #${id} aprobada correctamente`);
        }

        function confirmarEliminacion(id) {
            const reserva = reservasData.find(r => r.id === id);
            if (!reserva) return;
            document.getElementById('mensajeConfirmacion').textContent = 
                `¿Estás seguro de que deseas eliminar la reserva #${id} de ${reserva.espacio}?`;
            document.getElementById('confirmarAccion').onclick = function() {
                eliminarReserva(id);
            };
            document.getElementById('modalConfirmacion').classList.add('active');
        }

        function eliminarReserva(id) {
            const index = reservasData.findIndex(r => r.id === id);
            if (index !== -1) {
                reservasData.splice(index, 1);
                aplicarFiltros();
                cerrarModal();
                alert(`Reserva #${id} eliminada correctamente`);
            }
        }

        function cerrarModal() {
            document.getElementById('modalConfirmacion').classList.remove('active');
        }

        function actualizarReservas() {
            cargarReservasDesdeCliente();
            alert('Reservas actualizadas correctamente');
        }

        function exportarReservas() {
            if (reservasFiltradas.length === 0) {
                alert('No hay reservas para exportar');
                return;
            }
            const headers = ['ID', 'Usuario', 'Espacio', 'Fecha', 'Hora Inicio', 'Hora Fin', 'Personas', 'Precio', 'Estado'];
            const csvContent = [
                headers.join(','),
                ...reservasFiltradas.map(r => [
                    r.id, r.usuario, r.espacio, r.fecha, r.horaInicio, r.horaFin,
                    r.cantidadPersonas, r.precio, r.estado
                ].join(','))
            ].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reservas_' + new Date().toISOString().split('T')[0] + '.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            alert('Reservas exportadas correctamente');
        }

        function recibirNuevaReserva(reserva) {
            reservasData.push({
                id: reserva.id,
                usuario: reserva.usuario || 'Usuario Cliente',
                espacio: reserva.nombreEspacio,
                espacioKey: reserva.espacio,
                fecha: reserva.fecha,
                horaInicio: reserva.horaInicio,
                horaFin: reserva.horaFin,
                cantidadPersonas: reserva.cantidadPersonas,
                precio: reserva.precio,
                estado: reserva.estado,
                observaciones: reserva.observaciones,
                fechaCreacion: reserva.fechaCreacion
            });
            aplicarFiltros();
            alert('Nueva reserva recibida del sistema cliente');
        }

        window.addEventListener('load', function() {
            reservasFiltradas = [...reservasData];
            aplicarFiltros();
        });
    </script>
</body>
</html>