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
                <button class="new-complaint-btn" onclick="abrirModalNuevoReclamo()">✏️</button>
            </div>
            
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Buscar reclamos..." oninput="filtrarReclamos()">
            </div>

        </div>

        <!-- Área de chat -->
        <div class="chat-area">
            <div id="chatContent">
                <div class="empty-chat">
                    <div class="empty-chat-icon">💬</div>
                    <h3>Sistema de Reclamos</h3>
                    <p>Selecciona un reclamo existente para ver la conversación o crea uno nuevo</p>
                    <button class="btn-primary" onclick="abrirModalNuevoReclamo()">
                        ✏️ Crear Nueva Queja
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
            <form id="formNuevoReclamo" onsubmit="crearReclamo(event)">
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

    

    <script>

          let currentTheme = localStorage.getItem('theme') || 'dark';

        // Aplicar tema guardado al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            // Aplicar tema
            applyTheme(currentTheme);
});
        // Variables globales
        let reclamos = [];
        let reclamoActivo = null;
        let contadorReclamos = 1;

        // Cargar datos del almacenamiento local
        function cargarDatos() {
            const datosGuardados = JSON.parse(sessionStorage.getItem('reclamos_chat') || '[]');
            const contadorGuardado = sessionStorage.getItem('contador_reclamos');
            
            if (datosGuardados.length > 0) {
                reclamos = datosGuardados;
            }
            
            if (contadorGuardado) {
                contadorReclamos = parseInt(contadorGuardado);
            }
        }

        // Guardar datos en almacenamiento local
        function guardarDatos() {
            sessionStorage.setItem('reclamos_chat', JSON.stringify(reclamos));
            sessionStorage.setItem('contador_reclamos', contadorReclamos.toString());
        }

        // Renderizar lista de reclamos
        function renderizarListaReclamos() {
            const lista = document.getElementById('complaintsList');
            
            if (reclamos.length === 0) {
                lista.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">No hay reclamos registrados</div>';
                return;
            }

            lista.innerHTML = reclamos.map(reclamo => `
                <div class="complaint-item ${reclamoActivo?.id === reclamo.id ? 'active' : ''}" 
                     onclick="seleccionarReclamo('${reclamo.id}')">
                    <div class="complaint-header">
                        <div class="complaint-id">${reclamo.id}</div>
                        <div class="complaint-date">${formatearFechaCorta(reclamo.fechaCreacion)}</div>
                    </div>
                    <div class="complaint-title">${reclamo.titulo}</div>
                    <div class="complaint-preview">
                        ${reclamo.mensajes.length > 0 ? 
                            reclamo.mensajes[reclamo.mensajes.length - 1].contenido.substring(0, 60) + '...' :
                            'Sin mensajes'
                        }
                    </div>
                    <div class="complaint-status status-${reclamo.estado}">
                        ${formatearEstado(reclamo.estado)}
                    </div>
                </div>
            `).join('');
        }

        // Seleccionar reclamo
        function seleccionarReclamo(id) {
            reclamoActivo = reclamos.find(r => r.id === id);
            renderizarListaReclamos();
            renderizarChat();
        }

        // Renderizar chat
        function renderizarChat() {
            const chatContent = document.getElementById('chatContent');
            
            if (!reclamoActivo) {
                chatContent.innerHTML = `
                    <div class="empty-chat">
                        <div class="empty-chat-icon">💬</div>
                        <h3>Sistema de Reclamos</h3>
                        <p>Selecciona un reclamo existente para ver la conversación o crea uno nuevo</p>
                        <button class="btn-primary" onclick="abrirModalNuevoReclamo()">
                            ✏️ Crear Nueva Queja
                        </button>
                    </div>
                `;
                return;
            }

            chatContent.innerHTML = `
                <div class="chat-header">
                    <div class="chat-title">${reclamoActivo.titulo}</div>
                    <div class="chat-subtitle">${reclamoActivo.id} • ${formatearEstado(reclamoActivo.estado)}</div>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    ${reclamoActivo.mensajes.map(mensaje => `
                        <div class="message">
                            <div class="message-bubble">
                                <div class="message-content">${mensaje.contenido}</div>
                                <div class="message-time">${formatearHora(mensaje.timestamp)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="message-input-container">
                    <textarea 
                        id="messageInput" 
                        class="message-input" 
                        placeholder="Escribe tu mensaje..."
                        onkeydown="manejarEnterEnMensaje(event)"
                        oninput="ajustarAlturaTextarea(this)"></textarea>
                    <button class="send-button" onclick="enviarMensaje()">
                        ➤
                    </button>
                </div>
            `;

            // Scroll al final del chat
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }

        // Enviar mensaje
        function enviarMensaje() {
            const input = document.getElementById('messageInput');
            const contenido = input.value.trim();
            
            if (!contenido || !reclamoActivo) return;

            const nuevoMensaje = {
                id: reclamoActivo.mensajes.length + 1,
                tipo: 'user',
                contenido: contenido,
                timestamp: new Date().toISOString(),
                leido: false
            };

            reclamoActivo.mensajes.push(nuevoMensaje);
            input.value = '';
            input.style.height = 'auto';
            
            guardarDatos();
            renderizarChat();
            renderizarListaReclamos();
        }

        // Manejar Enter en el textarea
        function manejarEnterEnMensaje(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                enviarMensaje();
            }
        }

        // Ajustar altura del textarea
        function ajustarAlturaTextarea(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }

        // Crear nuevo reclamo
        function crearReclamo(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const nuevoReclamo = {
                id: `REC-${new Date().getFullYear()}-${String(contadorReclamos).padStart(3, '0')}`,
                titulo: formData.get('titulo'),
                categoria: formData.get('categoria'),
                prioridad: formData.get('prioridad'),
                estado: 'pendiente',
                ubicacion: formData.get('ubicacion') || 'No especificada',
                descripcion: formData.get('descripcion'),
                fechaCreacion: new Date().toISOString(),
                mensajes: [
                    {
                        id: 1,
                        tipo: 'user',
                        contenido: formData.get('descripcion'),
                        timestamp: new Date().toISOString(),
                        leido: false
                    }
                ]
            };

            reclamos.unshift(nuevoReclamo);
            contadorReclamos++;
            
            guardarDatos();
            renderizarListaReclamos();
            cerrarModal();
            
            // Seleccionar automáticamente el nuevo reclamo
            seleccionarReclamo(nuevoReclamo.id);
            
            mostrarNotificacion('¡Reclamo creado exitosamente!');
        }

        // Filtrar reclamos
        function filtrarReclamos() {
            const searchInput = document.querySelector('.search-input');
            const termino = searchInput.value.toLowerCase();
            
            const reclamosFiltrados = reclamos.filter(reclamo => 
                reclamo.titulo.toLowerCase().includes(termino) ||
                reclamo.id.toLowerCase().includes(termino) ||
                reclamo.categoria.toLowerCase().includes(termino)
            );
            
            const lista = document.getElementById('complaintsList');
            
            if (reclamosFiltrados.length === 0) {
                lista.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">No se encontraron reclamos</div>';
                return;
            }

            lista.innerHTML = reclamosFiltrados.map(reclamo => `
                <div class="complaint-item ${reclamoActivo?.id === reclamo.id ? 'active' : ''}" 
                     onclick="seleccionarReclamo('${reclamo.id}')">
                    <div class="complaint-header">
                        <div class="complaint-id">${reclamo.id}</div>
                        <div class="complaint-date">${formatearFechaCorta(reclamo.fechaCreacion)}</div>
                    </div>
                    <div class="complaint-title">${reclamo.titulo}</div>
                    <div class="complaint-preview">
                        ${reclamo.mensajes.length > 0 ? 
                            reclamo.mensajes[reclamo.mensajes.length - 1].contenido.substring(0, 60) + '...' :
                            'Sin mensajes'
                        }
                    </div>
                    <div class="complaint-status status-${reclamo.estado}">
                        ${formatearEstado(reclamo.estado)}
                    </div>
                </div>
            `).join('');
        }

        // Abrir modal
        function abrirModalNuevoReclamo() {
            document.getElementById('modalNuevoReclamo').style.display = 'block';
        }

        // Cerrar modal
        function cerrarModal() {
            document.getElementById('modalNuevoReclamo').style.display = 'none';
            document.getElementById('formNuevoReclamo').reset();
        }

        // Mostrar notificación
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

        // Auto-scroll mejorado
        function scrollToBottom() {
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        // Funciones de formateo
        function formatearEstado(estado) {
            const estados = {
                'pendiente': 'Pendiente',
                'en-proceso': 'En Proceso',
                'resuelto': 'Resuelto',
                'cerrado': 'Cerrado'
            };
            return estados[estado] || estado;
        }

        function formatearFechaCorta(fecha) {
            const date = new Date(fecha);
            const ahora = new Date();
            const diferencia = ahora - date;
            
            if (diferencia < 86400000) { // Menos de 24 horas
                return date.toLocaleTimeString('es-AR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            } else if (diferencia < 604800000) { // Menos de 7 días
                return date.toLocaleDateString('es-AR', { weekday: 'short' });
            } else {
                return date.toLocaleDateString('es-AR', { 
                    day: '2-digit', 
                    month: '2-digit' 
                });
            }
        }

        function formatearHora(timestamp) {
            return new Date(timestamp).toLocaleTimeString('es-AR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            cargarDatos();
            renderizarListaReclamos();
        });

        // Cerrar modal al hacer clic fuera
        window.onclick = function(event) {
            const modal = document.getElementById('modalNuevoReclamo');
            if (event.target === modal) {
                cerrarModal();
            }
        }
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
    </script>
</body>
</html>