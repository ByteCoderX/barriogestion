<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuario - Registro de Invitados</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="invitado.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="reservas-header">
                <div class="header-content">
                    <h1>Registro de Invitados</h1>
                    <p>Gestiona y autoriza el acceso de tus visitantes al barrio</p>
                    <div class="breadcrumb">
                        <a href="../../../index.php">Inicio</a> &gt; <span>Seguridad</span> &gt; <span>Registro de Invitados</span>
                    </div>
                </div>
                <div class="header-actions">
                    <p class="cliente" id="usuarioNombre">Cargando...</p>
                </div>
            </div>

            <div class="container">
                <!-- Estadísticas del usuario -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number" id="misInvitados">0</div>
                        <div class="stat-label">Mis Invitados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="invitadosAutorizados">0</div>
                        <div class="stat-label">Autorizados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="invitadosPendientes">0</div>
                        <div class="stat-label">Pendientes</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="invitadosRechazados">0</div>
                        <div class="stat-label">Rechazados</div>
                    </div>
                </div>

                <!-- Formulario para registrar invitado -->
                <div class="form-section">
                    <h2 class="form-title">Registrar Nuevo Invitado</h2>
                    
                    <div id="alertContainer"></div>

                    <form id="invitadoForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="nombre">Nombre del Invitado *</label>
                                <input type="text" id="nombre" name="nombre" required placeholder="Ingrese el nombre">
                            </div>
                            
                            <div class="form-group">
                                <label for="apellido">Apellido *</label>
                                <input type="text" id="apellido" name="apellido" required placeholder="Ingrese el apellido">
                            </div>
                            
                            <div class="form-group">
                                <label for="dni">DNI *</label>
                                <input type="text" id="dni" name="dni" required maxlength="20" placeholder="Ej: 12345678">
                            </div>
                            
                            <div class="form-group">
                                <label for="telefono">Teléfono</label>
                                <input type="tel" id="telefono" name="telefono" placeholder="Ej: +54 9 11 1234-5678">
                            </div>
                            
                            <div class="form-group">
                                <label for="fechaVisita">Fecha de Visita *</label>
                                <input type="date" id="fechaVisita" name="fechaVisita" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="horaVisita">Hora Aproximada</label>
                                <input type="time" id="horaVisita" name="horaVisita">
                            </div>
                            
                            <div class="form-group">
                                <label for="permiso">Tipo de Visita *</label>
                                <select id="permiso" name="permiso" required>
                                    <option value="">Seleccionar tipo...</option>
                                    <option value="una_vez">Una sola vez</option>
                                    <option value="temporal">Temporal (varios días)</option>
                                    <option value="permanente">Permanente</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="motivo">Motivo de la Visita</label>
                                <select id="motivo" name="motivo">
                                    <option value="">Seleccionar motivo...</option>
                                    <option value="familiar">Visita familiar</option>
                                    <option value="social">Visita social</option>
                                    <option value="trabajo">Trabajo/Servicio</option>
                                    <option value="delivery">Delivery</option>
                                    <option value="otros">Otros</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="observaciones">Observaciones Adicionales</label>
                            <textarea id="observaciones" name="observaciones" rows="3" placeholder="Información adicional sobre la visita (opcional)"></textarea>
                        </div>
                        <br>
                        <button type="submit" class="btn">Registrar Invitado</button>
                    </form>
                </div>

                <!-- Tabla de mis invitados -->
                <div class="table-section">
                    <div class="table-header">
                        <h2>Mis Invitados Registrados</h2>
                    </div>
                    <div class="table-container">
                        <table id="invitadosTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>DNI</th>
                                    <th>Fecha Visita</th>
                                    <th>Hora</th>
                                    <th>Tipo</th>
                                    <th>Motivo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="invitadosTableBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="Invitado.js"></script>
</body>
</html>