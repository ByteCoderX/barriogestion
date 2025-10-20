<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Accesos - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="Accesos.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="gestionar-container">
            <div class="page-header">
                <h1>Gestionar Accesos</h1>
                <p>Control en tiempo real de entradas y salidas del barrio</p>
            </div>

            <!-- Sección de acciones rápidas -->
            <div class="acciones-section">
                <button class="btn-primary" id="registrarEntradaBtn">
                    <img src="../../../assets/icons/iconmas.png" alt="Entrada">
                    Registrar Entrada
                </button>
                <button class="btn-secondary" id="registrarSalidaBtn">
                    <img src="../../../assets/icons/actualizardatos.png" alt="Salida">
                    Registrar Salida
                </button>
                <button class="btn-secondary" id="verHistorialBtn" onclick="window.location.href='../Historial/HistorialAccesos.php'">
                    <img src="../../../assets/icons/search.svg" alt="Historial">
                    Ver Historial Completo
                </button>
            </div>

            <!-- Panel de control en tiempo real -->
            <div class="panel-control">
                <div class="control-card principal">
                    <div class="card-icon">
                        <img src="../../../assets/icons/iconmas.png" alt="Activos">
                    </div>
                    <div class="card-content">
                        <h3>Accesos Activos</h3>
                        <div class="card-valor">23</div>
                        <div class="card-detalle">Personas dentro del barrio</div>
                    </div>
                </div>
                <div class="control-card">
                    <div class="card-icon">
                        <img src="../../../assets/icons/iconmas.png" alt="Entradas">
                    </div>
                    <div class="card-content">
                        <h3>Entradas Hoy</h3>
                        <div class="card-valor">89</div>
                        <div class="card-detalle">Últimas 24 horas</div>
                    </div>
                </div>
                <div class="control-card">
                    <div class="card-icon">
                        <img src="../../../assets/icons/actualizardatos.png" alt="Salidas">
                    </div>
                    <div class="card-content">
                        <h3>Salidas Hoy</h3>
                        <div class="card-valor">38</div>
                        <div class="card-detalle">Últimas 24 horas</div>
                    </div>
                </div>
                <div class="control-card alerta">
                    <div class="card-icon">
                        <img src="../../../assets/icons/search.svg" alt="Alertas">
                    </div>
                    <div class="card-content">
                        <h3>Alertas</h3>
                        <div class="card-valor">3</div>
                        <div class="card-detalle">Requieren atención</div>
                    </div>
                </div>
            </div>

            <!-- Buscador rápido -->
            <div class="buscador-section">
                <div class="buscador-container">
                    <img src="../../../assets/icons/search.svg" alt="Buscar">
                    <input type="text" id="buscarPersona" placeholder="Buscar persona activa por nombre, documento o lote...">
                </div>
                <select id="filtroTipoRapido">
                    <option value="todos">Todos</option>
                    <option value="visita">Visitas</option>
                    <option value="empleado">Empleados</option>
                    <option value="proveedor">Proveedores</option>
                    <option value="propietario">Propietarios</option>
                </select>
            </div>

            <!-- Tabla de accesos activos -->
            <div class="tabla-section">
                <div class="tabla-header">
                    <h3>Personas Actualmente en el Barrio</h3>
                    <div class="tabla-info">
                        <span class="badge-activo">● 23 Activos</span>
                    </div>
                </div>
                <div class="tabla-container">
                    <table id="tablaGestionAccesos">
                        <thead>
                            <tr>
                                <th>Estado</th>
                                <th>Nombre</th>
                                <th>Documento</th>
                                <th>Tipo</th>
                                <th>Lote Destino</th>
                                <th>Hora Entrada</th>
                                <th>Tiempo</th>
                                <th>Vehículo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="accesos-activos-tbody">
                            <!-- Los datos se cargarán dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Accesos recientes (últimas salidas) -->
            <div class="recientes-section">
                <div class="recientes-header">
                    <h3>Últimas Salidas Registradas</h3>
                    <button class="btn-ver-mas" id="verTodasSalidas">Ver todas</button>
                </div>
                <div class="recientes-lista" id="recientes-lista">
                    <!-- Los datos se cargarán dinámicamente -->
                </div>
            </div>
        </div>

        <!-- Modal para registrar entrada -->
        <div id="entradaModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Registrar Entrada</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="entradaForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="tipoEntrada">Tipo de Acceso:</label>
                            <select id="tipoEntrada" required>
                                <option value="">Seleccionar tipo</option>
                                <option value="propietario">Propietario</option>
                                <option value="visita">Visita</option>
                                <option value="proveedor">Proveedor</option>
                                <option value="empleado">Empleado</option>
                                <option value="delivery">Delivery</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="loteEntrada">Lote Destino:</label>
                            <select id="loteEntrada" required>
                                <option value="">Seleccionar lote</option>
                                <option value="lote1">Lote 1 - Juan Pérez</option>
                                <option value="lote2">Lote 2 - María García</option>
                                <option value="lote3">Lote 3 - Carlos López</option>
                                <option value="lote4">Lote 4 - Ana Martínez</option>
                                <option value="lote5">Lote 5 - Roberto Sánchez</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nombreEntrada">Nombre Completo:</label>
                            <input type="text" id="nombreEntrada" required placeholder="Nombre y apellido">
                        </div>
                        <div class="form-group">
                            <label for="documentoEntrada">Documento:</label>
                            <input type="text" id="documentoEntrada" required placeholder="DNI o documento">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="vehiculoEntrada">Vehículo (Opcional):</label>
                        <input type="text" id="vehiculoEntrada" placeholder="Marca, modelo y patente">
                    </div>
                    <div class="form-group">
                        <label for="observacionesEntrada">Observaciones:</label>
                        <textarea id="observacionesEntrada" rows="2" placeholder="Información adicional (opcional)"></textarea>
                    </div>
                    <div class="info-automatica">
                        <p><strong>Hora de entrada:</strong> Se registrará automáticamente</p>
                        <p><strong>Guardia:</strong> Usuario actual del sistema</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="cancelarEntrada">Cancelar</button>
                        <button type="submit" class="btn-save">Registrar Entrada</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para registrar salida rápida -->
        <div id="salidaRapidaModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Registrar Salida</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="salida-rapida-contenido">
                    <div class="buscar-persona-salida">
                        <label>Buscar persona para registrar salida:</label>
                        <input type="text" id="buscarPersonaSalida" placeholder="Buscar por nombre o documento...">
                    </div>
                    <div class="lista-personas-salida" id="listaPersonasSalida">
                        <!-- Se cargará dinámicamente -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de confirmación de salida -->
        <div id="confirmarSalidaModal" class="modal">
            <div class="modal-content modal-small">
                <div class="modal-header">
                    <h3>Confirmar Salida</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="confirmar-salida-info">
                    <div class="info-persona-salida">
                        <p><strong>Nombre:</strong> <span id="confirmNombre"></span></p>
                        <p><strong>Documento:</strong> <span id="confirmDocumento"></span></p>
                        <p><strong>Tipo:</strong> <span id="confirmTipo"></span></p>
                        <p><strong>Lote:</strong> <span id="confirmLote"></span></p>
                        <p><strong>Hora de Entrada:</strong> <span id="confirmHoraEntrada"></span></p>
                        <p><strong>Tiempo en el barrio:</strong> <span id="confirmTiempo"></span></p>
                    </div>
                    <div class="form-group">
                        <label for="observacionesSalida">Observaciones (Opcional):</label>
                        <textarea id="observacionesSalida" rows="2" placeholder="Información adicional"></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" id="cancelarSalida">Cancelar</button>
                    <button type="button" class="btn-save" id="confirmarSalidaBtn">Confirmar Salida</button>
                </div>
            </div>
        </div>

        <!-- Modal de detalle -->
        <div id="detalleAccesoModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalle del Acceso Activo</h3>
                    <span class="close">&times;</span>
                </div>
                <div id="detalleAccesoContent" class="detalle-content">
                    <!-- Contenido del detalle -->
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" id="cerrarDetalleAcceso">Cerrar</button>
                    <button class="btn-primary" id="registrarSalidaDesdeDetalle">Registrar Salida</button>
                </div>
            </div>
        </div>
    </main>

    <script src="Accesos.js"></script>
</body>
</html>