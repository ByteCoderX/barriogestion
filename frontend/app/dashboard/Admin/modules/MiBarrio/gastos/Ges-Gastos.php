<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Gastos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="./Ges-Gastos.css?v=2">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="gastos-container">
            <div class="page-header">
                <h1>Gestionar Gastos</h1>
                <p>Administra todos los gastos del barrio de manera eficiente</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="nuevoGastoBtn">
                    <img src="../../../assets/icons/iconmas.svg" alt="Nuevo">
                    Nuevo Gasto
                </button>
                <button class="btn-secondary" id="importarGastosBtn">
                    <img src="../../../assets/icons/import.svg" alt="Importar">
                    Importar Gastos
                </button>
                <button class="btn-secondary" id="exportarGastosBtn">
                    <img src="../../../assets/icons/export.svg" alt="Exportar">
                    Exportar Gastos
                </button>
            </div>

            <!-- Filtros -->
            <div class="filtros-section">
                <div class="filtro-grupo">
                    <label for="filtroCategoria">Categoría:</label>
                    <select id="filtroCategoria">
                        <option value="todas">Todas las categorías</option>
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="limpieza">Limpieza</option>
                        <option value="seguridad">Seguridad</option>
                        <option value="servicios">Servicios</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
                <div class="filtro-grupo">
                    <label for="filtroFecha">Fecha:</label>
                    <input type="month" id="filtroFecha">
                </div>
                <div class="filtro-grupo">
                    <label for="filtroEstado">Estado:</label>
                    <select id="filtroEstado">
                        <option value="todos">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="pagado">Pagado</option>
                    </select>
                </div>
                <button class="btn-filtro" id="aplicarFiltros">Aplicar Filtros</button>
            </div>

            <!-- Resumen de gastos -->
            <div class="resumen-gastos">
                <div class="resumen-card">
                    <h3>Total Gastos Mes</h3>
                    <div class="resumen-valor">$980,000</div>
                </div>
                <div class="resumen-card">
                    <h3>Gastos Pendientes</h3>
                    <div class="resumen-valor">$125,000</div>
                </div>
                <div class="resumen-card">
                    <h3>Gastos Aprobados</h3>
                    <div class="resumen-valor">$855,000</div>
                </div>
            </div>

            <!-- Tabla de gastos -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Listado de Gastos</h3>
                    <div class="tabla-buscar">
                        <input type="text" id="buscarGasto" placeholder="Buscar gasto...">
                        <img src="../../../assets/icons/search.svg" alt="Buscar">
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaGastos">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Concepto</th>
                                <th>Categoría</th>
                                <th>Proveedor</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="gastos-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal para nuevo/editar gasto -->
        <div id="gastoModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle">Nuevo Gasto</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="gastoForm">
                    <div class="form-group">
                        <label for="conceptoGasto">Concepto:</label>
                        <input type="text" id="conceptoGasto" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="categoriaGasto">Categoría:</label>
                            <select id="categoriaGasto" required>
                                <option value="">Seleccionar categoría</option>
                                <option value="mantenimiento">Mantenimiento</option>
                                <option value="limpieza">Limpieza</option>
                                <option value="seguridad">Seguridad</option>
                                <option value="servicios">Servicios</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="proveedorGasto">Proveedor:</label>
                            <input type="text" id="proveedorGasto" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="montoGasto">Monto:</label>
                            <input type="number" id="montoGasto" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="fechaGasto">Fecha:</label>
                            <input type="date" id="fechaGasto" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="descripcionGasto">Descripción:</label>
                        <textarea id="descripcionGasto" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarGasto">Cancelar</button>
                        <button type="submit" class="btn-save">Guardar Gasto</button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <script src="./Ges-Gastos.js?v=1"></script>
</body>
</html>