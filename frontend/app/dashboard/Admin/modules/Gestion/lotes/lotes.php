<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Lotes - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="lotes.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="lotes-container">
            <div class="page-header">
                <h1>Gestionar Lotes</h1>
                <p>Administra la información de todos los lotes y propietarios del barrio</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="nuevoLoteBtn">
                    <img src="../../../assets/icons/iconmas.png" alt="Nuevo">
                    Agregar Lote
                </button>
                <button class="btn-secondary" id="exportarLotesBtn">
                    <img src="../../../assets/icons/download.svg" alt="Exportar">
                    Exportar Listado
                </button>
                <button class="btn-secondary" id="generarMapaBtn">
                    <img src="../../../assets/icons/reportes.png" alt="Mapa">
                    Ver Mapa
                </button>
            </div>

            <!-- Resumen de lotes -->
            <div class="resumen-lotes">
                <div class="resumen-card principal">
                    <h3>Total de Lotes</h3>
                    <div class="resumen-valor" id="totalLotes">0</div>
                    <div class="resumen-detalle">
                        <span class="info">En el barrio privado</span>
                    </div>
                </div>
                <div class="resumen-card success">
                    <h3>Lotes Ocupados</h3>
                    <div class="resumen-valor" id="lotesOcupados">0</div>
                    <div class="resumen-detalle" id="porcentajeOcupacion">0% de ocupación</div>
                    <div class="resumen-progreso">
                        <div class="progreso-bar">
                            <div class="progreso-fill" id="progresoOcupacion" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
                <div class="resumen-card warning">
                    <h3>Lotes Disponibles</h3>
                    <div class="resumen-valor" id="lotesDisponibles">0</div>
                    <div class="resumen-detalle" id="porcentajeDisponibilidad">0% disponibilidad</div>
                </div>
                <div class="resumen-card info">
                    <h3>En Construcción</h3>
                    <div class="resumen-valor" id="lotesConstruccion">0</div>
                    <div class="resumen-detalle">Obras en progreso</div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroEstado">Estado:</label>
                    <select id="filtroEstado">
                        <option value="todos">Todos los estados</option>
                        <option value="ocupado">Ocupado</option>
                        <option value="disponible">Disponible</option>
                        <option value="construccion">En Construcción</option>
                        <option value="reservado">Reservado</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroManzana">Manzana:</label>
                    <select id="filtroManzana">
                        <option value="todas">Todas las manzanas</option>
                        <option value="A">Manzana A</option>
                        <option value="B">Manzana B</option>
                        <option value="C">Manzana C</option>
                        <option value="D">Manzana D</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroSuperficie">Superficie:</label>
                    <select id="filtroSuperficie">
                        <option value="todas">Todas</option>
                        <option value="0-300">Menos de 300 m²</option>
                        <option value="300-500">300 - 500 m²</option>
                        <option value="500-800">500 - 800 m²</option>
                        <option value="800-mas">Más de 800 m²</option>
                    </select>
                </div>
                <button class="btn-filtro" id="aplicarFiltros">Aplicar Filtros</button>
                <button class="btn-filtro-limpiar" id="limpiarFiltros">Limpiar</button>
            </div>

            <!-- Estadísticas por manzana -->
            <div class="grafico-section">
                <div class="grafico-header">
                    <h3>Distribución por Manzana</h3>
                    <div class="grafico-controles">
                        <button class="btn-periodo active" data-vista="ocupacion">Por Ocupación</button>
                        <button class="btn-periodo" data-vista="superficie">Por Superficie</button>
                    </div>
                </div>
                <div class="grafico-container">
                    <canvas id="lotesChart"></canvas>
                </div>
            </div>

            <!-- Tabla de lotes -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Listado de Lotes</h3>
                    <div class="tabla-controles">
                        <div class="tabla-buscar">
                            <input type="text" id="buscarLote" placeholder="Buscar por número o propietario...">
                            <img src="../../../assets/icons/search.svg" alt="Buscar">
                        </div>
                        <select id="registrosPorPagina">
                            <option value="10">10 por página</option>
                            <option value="25">25 por página</option>
                            <option value="50">50 por página</option>
                            <option value="100">Todos</option>
                        </select>
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaLotes">
                        <thead>
                            <tr>
                                <th>Lote</th>
                                <th>Manzana</th>
                                <th>Propietario</th>
                                <th>Superficie</th>
                                <th>Estado</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="lotes-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
                <div class="paginacion" id="paginacion">
                    <!-- Controles de paginación -->
                </div>
            </div>
        </div>

        <!-- Modal para nuevo/editar lote -->
        <div id="loteModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle">Agregar Nuevo Lote</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="loteForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="numeroLote">Número de Lote:</label>
                            <input type="number" id="numeroLote" required placeholder="Ej: 1">
                        </div>
                        <div class="form-group">
                            <label for="manzanaLote">Manzana:</label>
                            <select id="manzanaLote" required>
                                <option value="">Seleccionar</option>
                                <option value="A">Manzana A</option>
                                <option value="B">Manzana B</option>
                                <option value="C">Manzana C</option>
                                <option value="D">Manzana D</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="superficieLote">Superficie (m²):</label>
                            <input type="number" id="superficieLote" step="0.01" required placeholder="Ej: 450">
                        </div>
                        <div class="form-group">
                            <label for="estadoLote">Estado:</label>
                            <select id="estadoLote" required>
                                <option value="">Seleccionar</option>
                                <option value="disponible">Disponible</option>
                                <option value="ocupado">Ocupado</option>
                                <option value="construccion">En Construcción</option>
                                <option value="reservado">Reservado</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="direccionLote">Dirección:</label>
                        <input type="text" id="direccionLote" placeholder="Calle y número dentro del barrio">
                    </div>

                    <!-- Datos del propietario (solo si está ocupado) -->
                    <div id="propietarioSection" style="display: none;">
                        <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e0e0e0;">
                        <h4 style="margin-bottom: 1rem; color: #2c3e50;">Datos del Propietario</h4>
                        
                        <div class="form-group">
                            <label for="nombrePropietario">Nombre Completo:</label>
                            <input type="text" id="nombrePropietario" placeholder="Nombre y apellido del propietario">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="dniPropietario">DNI/CUIT:</label>
                                <input type="text" id="dniPropietario" placeholder="12345678">
                            </div>
                            <div class="form-group">
                                <label for="telefonoPropietario">Teléfono:</label>
                                <input type="tel" id="telefonoPropietario" placeholder="+54 11 1234-5678">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="emailPropietario">Email:</label>
                            <input type="email" id="emailPropietario" placeholder="propietario@email.com">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="observacionesLote">Observaciones:</label>
                        <textarea id="observacionesLote" rows="3" placeholder="Información adicional del lote (opcional)"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarLote">Cancelar</button>
                        <button type="submit" class="btn-save">Guardar Lote</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para ver detalle -->
        <div id="detalleLoteModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalle del Lote</h3>
                    <span class="close">&times;</span>
                </div>
                <div id="detalleLoteContent" class="detalle-content">
                    <!-- Contenido del detalle -->
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="imprimirFichaBtn">Imprimir Ficha</button>
                    <button class="btn-primary" id="cerrarDetalleLote">Cerrar</button>
                </div>
            </div>
        </div>
    </main>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="lotes.js"></script>
</body>
</html>