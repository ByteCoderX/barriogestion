<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Notificaciones</title>
    <link rel="stylesheet" href="notifications.css">
</head>
<body>
 



        <!-- Agregar el hader de admin -->




    <nav class="navbar">
        <h1>Sistema de Notificaciones</h1>
    </nav>

    <div class="container">
        <!-- Estadísticas -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalNotificaciones">0</div>
                <div class="stat-label">Total Notificaciones</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="notificacionesEnviadas">0</div>
                <div class="stat-label">Enviadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="notificacionesPendientes">0</div>
                <div class="stat-label">Pendientes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="notificacionesProgramadas">0</div>
                <div class="stat-label">Programadas</div>
            </div>
        </div>

        <!-- Formulario para crear notificación -->
        <div class="form-section">
            <h2 class="form-title">Crear Nueva Notificación</h2>
            
            <div id="alertContainer"></div>

            <form id="notificacionForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="titulo">Título de la Notificación *</label>
                        <input type="text" id="titulo" name="titulo" required placeholder="Ej: Mantenimiento Programado">
                    </div>
                    
                    <div class="form-group">
                        <label for="prioridad">Prioridad *</label>
                        <select id="prioridad" name="prioridad" required>
                            <option value="">Seleccionar prioridad...</option>
                            <option value="baja">🟢 Baja</option>
                            <option value="media">🟡 Media</option>
                            <option value="alta">🟠 Alta</option>
                            <option value="urgente">🔴 Urgente</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="categoria">Categoría *</label>
                        <select id="categoria" name="categoria" required>
                            <option value="">Seleccionar categoría...</option>
                            <option value="general">General</option>
                            <option value="mantenimiento">Mantenimiento</option>
                            <option value="seguridad">Seguridad</option>
                            <option value="evento">Evento</option>
                            <option value="corte_servicio">Corte de Servicio</option>
                            <option value="administrativo">Administrativo</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="destinatarios">Destinatarios *</label>
                        <select id="destinatarios" name="destinatarios" required>
                            <option value="">Seleccionar destinatarios...</option>
                            <option value="todos">Todos los residentes</option>
                            <option value="sector_a">Sector A</option>
                            <option value="sector_b">Sector B</option>
                            <option value="sector_c">Sector C</option>
                            <option value="propietarios">Solo Propietarios</option>
                            <option value="inquilinos">Solo Inquilinos</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="fechaEnvio">Fecha de Envío *</label>
                        <input type="date" id="fechaEnvio" name="fechaEnvio" required>
                    </div>
                </div>
                
                <br>
                
                <div class="form-group">
                    <label for="mensaje">Mensaje de la Notificación *</label>
                    <textarea id="mensaje" name="mensaje" rows="5" required placeholder="Escribe el contenido de la notificación aquí..."></textarea>
                </div>
                
                <br>
                
                <h4></h4>
                
                <br>
                
                <div class="form-group checkbox-group">
                    <label>
                        <input type="checkbox" id="enviarEmail" name="enviarEmail" checked>
                        Enviar también por email
                    </label>
                    <label>
                        <input type="checkbox" id="enviarSMS" name="enviarSMS">
                        Enviar también por SMS
                    </label>
                    <label>
                        <input type="checkbox" id="enviarSMS" name="enviarSMS">
                        Enviar también por WhatsApp
                    </label>
                </div>
                
                <div class="button-group">
                    <button type="submit" class="btn">Enviar Notificación</button>
                    <button type="reset" class="btn btn-danger">Limpiar</button>
                </div>
            </form>
        </div>

        <!-- Filtros -->
        <div class="filters-section">
            <h3>Filtrar Notificaciones</h3>
            <div class="filters-grid">
                <select id="filtroEstado" onchange="filtrarNotificaciones()">
                    <option value="">Todos los estados</option>
                    <option value="enviada">Enviadas</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="programada">Programadas</option>
                    <option value="cancelada">Canceladas</option>
                </select>
                
                <select id="filtroPrioridad" onchange="filtrarNotificaciones()">
                    <option value="">Todas las prioridades</option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                </select>
                
                <select id="filtroCategoria" onchange="filtrarNotificaciones()">
                    <option value="">Todas las categorías</option>
                    <option value="general">General</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="seguridad">Seguridad</option>
                    <option value="evento">Evento</option>
                    <option value="corte_servicio">Corte de Servicio</option>
                    <option value="administrativo">Administrativo</option>
                </select>

                <input type="text" id="buscarTexto" placeholder="Buscar por título o mensaje..." onkeyup="filtrarNotificaciones()">
            </div>
        </div>

        <!-- Tabla de notificaciones -->
        <div class="table-section">
            <div class="table-header">
                <h2>Historial de Notificaciones</h2>
            </div>
            <div class="table-container">
                <table id="notificacionesTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Prioridad</th>
                            <th>Destinatarios</th>
                            <th>Fecha Envío</th>
                            <th>Estado</th>
                            <th>Leídas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="notificacionesTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="notifications.js"></script>
</body>
</html>