<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barrio Gestion - Portal Residente</title>
    <link rel="stylesheet" href="reclamos.css?=18">
    <link rel="stylesheet" href="../../index.css?v=46">

</head>
<body>
    <?php include '../../includes/header.php'; ?>

    <div class="chat-container">
        <!-- Sidebar con lista de reclamos -->
        <div class="chat-sidebar">
    <div class="sidebar-header">
            <h2>Mis Reclamos</h2>
            <button class="new-complaint-btn" onclick="abrirModalNuevoReclamo()">+</button>
        </div>

        <div class="search-container">
            <input type="text" class="search-input" placeholder="Buscar reclamos..." oninput="filtrarReclamos()">
        </div>

        <!--lista de reclamos -->
        <div id="complaintsList"></div>
    </div>


        <!-- Área de chat -->
        <div class="chat-area">
            <div id="chatContent">
                <div class="empty-chat">
                    <div class="empty-chat-icon">💬</div><!--habria que poner otra cosa que no sea emoji aca-->
                    <h3>Sistema de Reclamos</h3>
                    <p>Selecciona un reclamo existente para ver la conversación o crea uno nuevo</p>
                    <button class="btn-primary" onclick="abrirModalNuevoReclamo()">
                        Crear Nueva Queja
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para nuevo reclamo -->
    <div id="modalNuevoReclamo" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="cerrarModal()">&times;</span>
            <h2>Crear Nuevo Reclamo</h2>
            <form id="formNuevoReclamo">
                <div class="form-group">
                    <label for="titulo">Título del Reclamo</label>
                    <input type="text" id="titulo" name="titulo" required placeholder="Descripción breve del problema">
                </div>
                
                <div class="form-group">
                    <label for="categoria">Categoría</label>
                    <select id="categoria" name="categoria" required>
                        <option value="">Seleccionar categoría</option>
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="limpieza">Limpieza</option>
                        <option value="seguridad">Seguridad</option>
                        <option value="amenities">Amenities</option>
                        <option value="administracion">Administración</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="prioridad">Prioridad</label>
                    <select id="prioridad" name="prioridad" required>
                        <option value="">Seleccionar prioridad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                        <option value="critica">Crítica</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="ubicacion">Ubicación</label>
                    <input type="text" id="ubicacion" name="ubicacion" placeholder="Ej: Torre A - Piso 3, Área común, etc.">
                </div>

                <div class="form-group">
                    <label for="descripcion">Descripción Detallada</label>
                    <textarea id="descripcion" name="descripcion" required placeholder="Describe el problema con el mayor detalle posible..."></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="cerrarModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Crear Reclamo</button>
                </div>
            </form>
        </div>
    </div>

    <script src="./reclamos.js"></script>
    <script>
        // Aplicar tema guardado al cargar la página
        let currentTheme = localStorage.getItem('theme') || 'dark';
        document.addEventListener('DOMContentLoaded', function() {
            applyTheme(currentTheme);
        });

        // Funciones de tema
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

        // Ajustar altura del textarea (estilo dinámico)
        function ajustarAlturaTextarea(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }

        // Mostrar notificación (animación)
        function mostrarNotificacion(mensaje) {
            const notificacion = document.createElement('div');
            notificacion.className = 'notification';
            notificacion.textContent = mensaje;
            
            document.body.appendChild(notificacion);
            
            setTimeout(() => {
                notificacion.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    if (document.body.contains(notificacion)) {
                        document.body.removeChild(notificacion);
                    }
                }, 300);
            }, 3000);
        }

        // Auto-scroll
        function scrollToBottom() {
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
    </script>
</body>
</html>