<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificaciones - Barrio Privado</title>
    <link rel="stylesheet" href="Notificacion.css?=4">
    <link rel="stylesheet" href="../index.css?v=83">
</head>
<body>

<header>
    <div class="izq">
        <div class="LogoApp">
            <a href="../index.php">
            <img src="../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
            </a>           
        </div>
        <nav class="menu-principal">
            <div class="dropdown">
                <a href="../index.php" class="menu-item">Inicio</a>
            </div>
            <div class="dropdown">
                <a href="#" class="menu-item">Expensas</a>
                <div class="dropdown-content">
                    <a href="../Expensas/expensas.php">Ver Expensas</a>
                    <a href="../Expensas/Historial/Historial.php">Historial</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="#" class="menu-item">Servicios</a>
                <div class="dropdown-content">
                    <a href="../mapa-barrio.php">Mapa del Barrio</a>
                    <a href="../Servicios/ReservasEC/reservas.php">Reservar Espacios</a>
                    <a href="../Servicios/MiCarnet/carnet.php">Mi Carnet</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="#" class="menu-item">Seguridad</a>
                <div class="dropdown-content">
                    <a href="../Seguridad/ControlAccesos/Invitado.php">Control de Acceso</a>
                    <a href="../Seguridad/GesPermisos/Permisos.php">Gestionar Permisos</a>
                    <a href="../Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                </div>
            </div>
            <a href="../Reclamos/quejas.php" class="menu-item">Reclamos</a>
            <a href="../Configuracion/Configuracion.php" class="menu-item">Configuracion</a>
        </nav>
    </div>
    <div class="derecha">
        <!-- Selector de tema -->
        <div class="theme-selector">
            <button class="theme-button" onclick="toggleThemeMenu()">
                <svg class="theme-icon" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
            </button>
            <div class="theme-options">
                <div class="theme-option" onclick="setTheme('dark')">
                    <div class="theme-color theme-dark"></div>
                    <span>Oscuro</span>
                </div>
                <div class="theme-option" onclick="setTheme('light')">
                    <div class="theme-color theme-light-color"></div>
                    <span>Claro</span>
                </div>
                <div class="theme-option" onclick="setTheme('nature')">
                    <div class="theme-color theme-nature-color"></div>
                    <span>Naturaleza</span>
                </div>
            </div>
        </div>

        <a href="Notificacion.php" class="icono-header">
            <img src="../assets/icons/notificacion.png" alt="notificaciones">
            <span class="notification-badge" id="notificationCount">3</span>
        </a>
        <div class="IdSession">
            <h1 class="texto">Cliente</h1>
            <a href="../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
        </div>
        
        <!-- Menú hamburguesa -->
        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>

<div class="container">
    <!-- Filtros de notificaciones -->
    <div class="notification-filters">
        <h2 class="filter-title">Filtrar Notificaciones</h2>
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">Todas</button>
            <button class="filter-btn" data-filter="unread">No leídas (5)</button>
            <button class="filter-btn" data-filter="maintenance">Mantenimiento</button>
            <button class="filter-btn" data-filter="event">Eventos</button>
            <button class="filter-btn" data-filter="expenses">Expensas</button>
            <button class="filter-btn" data-filter="security">Seguridad</button>
            <button class="filter-btn" data-filter="announcement">Anuncios</button>
        </div>
        <button class="mark-all-read" onclick="markAllAsRead()">Marcar todas como leídas</button>
    </div>

    <!-- Lista de notificaciones -->
    <div class="notifications-list" id="notificationsList">
        
        <!-- Notificación de Mantenimiento - No leída -->
        <div class="notification-item unread" data-type="maintenance" data-id="1">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-maintenance">🔧</div>
                    <span class="type-label">Mantenimiento</span>
                </div>
                <div class="notification-time">
                    <div class="unread-badge"></div>
                    <span>Hace 2 horas</span>
                </div>
            </div>
            <h3 class="notification-title">Corte de agua programado - Sector Norte</h3>
            <p class="notification-content">
                Se realizará mantenimiento en las tuberías principales del sector norte el día jueves 12 de septiembre de 8:00 a 16:00 hs. Se recomienda almacenar agua para uso doméstico.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-mark-read" onclick="markAsRead(1)">Marcar como leída</button>
                <button class="action-btn btn-view-details" onclick="viewDetails(1)">Ver detalles</button>
            </div>
        </div>

        <!-- Notificación de Evento - No leída -->
        <div class="notification-item unread" data-type="event" data-id="2">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-event">🎉</div>
                    <span class="type-label">Evento</span>
                </div>
                <div class="notification-time">
                    <div class="unread-badge"></div>
                    <span>Hace 5 horas</span>
                </div>
            </div>
            <h3 class="notification-title">Fiesta de Primavera - Inscripciones abiertas</h3>
            <p class="notification-content">
                ¡Ya están abiertas las inscripciones para la Fiesta de Primavera! Fecha: Sábado 21 de septiembre, 19:00 hs en el salón de usos múltiples. Incluye cena y música en vivo.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-mark-read" onclick="markAsRead(2)">Marcar como leída</button>
                <button class="action-btn btn-view-details" onclick="viewDetails(2)">Inscribirse</button>
            </div>
        </div>

        <!-- Notificación de Expensas - No leída -->
        <div class="notification-item unread" data-type="expenses" data-id="3">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-expenses">💰</div>
                    <span class="type-label">Expensas</span>
                </div>
                <div class="notification-time">
                    <div class="unread-badge"></div>
                    <span>Hace 1 día</span>
                </div>
            </div>
            <h3 class="notification-title">Liquidación de expensas - Septiembre 2025</h3>
            <p class="notification-content">
                Ya está disponible la liquidación de expensas correspondiente al mes de septiembre. Vencimiento: 10 de octubre. Total a abonar: $85.450. Incluye obras de mejora en portón principal.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-mark-read" onclick="markAsRead(3)">Marcar como leída</button>
                <button class="action-btn btn-view-details" onclick="viewDetails(3)">Ver liquidación</button>
            </div>
        </div>

        <!-- Notificación de Seguridad - No leída -->
        <div class="notification-item unread" data-type="security" data-id="4">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-security">🛡️</div>
                    <span class="type-label">Seguridad</span>
                </div>
                <div class="notification-time">
                    <div class="unread-badge"></div>
                    <span>Hace 1 día</span>
                </div>
            </div>
            <h3 class="notification-title">Actualización del sistema de acceso</h3>
            <p class="notification-content">
                Se ha actualizado el sistema de control de acceso. Las nuevas tarjetas magnéticas estarán disponibles en administración a partir del lunes 16 de septiembre.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-mark-read" onclick="markAsRead(4)">Marcar como leída</button>
                <button class="action-btn btn-view-details" onclick="viewDetails(4)">Más información</button>
            </div>
        </div>

        <!-- Notificación de Anuncio - No leída -->
        <div class="notification-item unread" data-type="announcement" data-id="5">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-announcement">📢</div>
                    <span class="type-label">Anuncio</span>
                </div>
                <div class="notification-time">
                    <div class="unread-badge"></div>
                    <span>Hace 2 días</span>
                </div>
            </div>
            <h3 class="notification-title">Nuevos horarios de la pileta</h3>
            <p class="notification-content">
                A partir del 15 de septiembre, la pileta tendrá nuevos horarios de temporada: Lunes a viernes 9:00-20:00, Sábados y domingos 8:00-21:00. Guardavidas disponible en todos los horarios.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-mark-read" onclick="markAsRead(5)">Marcar como leída</button>
                <button class="action-btn btn-view-details" onclick="viewDetails(5)">Ver horarios completos</button>
            </div>
        </div>

        <!-- Notificación de Mantenimiento - Leída -->
        <div class="notification-item read" data-type="maintenance" data-id="6">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-maintenance">🔧</div>
                    <span class="type-label">Mantenimiento</span>
                </div>
                <div class="notification-time">
                    <span>Hace 3 días</span>
                </div>
            </div>
            <h3 class="notification-title">Mantenimiento de ascensores completado</h3>
            <p class="notification-content">
                Se ha completado exitosamente el mantenimiento preventivo de todos los ascensores del complejo. Todos los equipos están funcionando normalmente.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-view-details" onclick="viewDetails(6)">Ver detalles</button>
            </div>
        </div>

        <!-- Notificación de Evento - Leída -->
        <div class="notification-item read" data-type="event" data-id="7">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-event">🎉</div>
                    <span class="type-label">Evento</span>
                </div>
                <div class="notification-time">
                    <span>Hace 1 semana</span>
                </div>
            </div>
            <h3 class="notification-title">Torneo de paddle - Resultados</h3>
            <p class="notification-content">
                ¡Felicitaciones a los ganadores del torneo de paddle! Categoría A: Juan Pérez y María García. Categoría B: Carlos López y Ana Martín. Próximo torneo: octubre.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-view-details" onclick="viewDetails(7)">Ver resultados completos</button>
            </div>
        </div>

        <!-- Notificación de Expensas - Leída -->
        <div class="notification-item read" data-type="expenses" data-id="8">
            <div class="notification-header">
                <div class="notification-type">
                    <div class="type-icon type-expenses">💰</div>
                    <span class="type-label">Expensas</span>
                </div>
                <div class="notification-time">
                    <span>Hace 1 semana</span>
                </div>
            </div>
            <h3 class="notification-title">Pago de expensas confirmado</h3>
            <p class="notification-content">
                Se ha confirmado el pago de sus expensas correspondientes al mes de agosto. Gracias por mantener al día sus pagos. Próximo vencimiento: 10 de octubre.
            </p>
            <div class="notification-actions">
                <button class="action-btn btn-view-details" onclick="viewDetails(8)">Ver comprobante</button>
            </div>
        </div>

    </div>
</div>

<script>
    // Variables globales para temas
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
     // Aplicar tema guardado al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            // Aplicar tema
            applyTheme(currentTheme);
        });

    // Variables para notificaciones
    let notifications = [];
    let currentFilter = 'all';

    // Inicializar
    document.addEventListener('DOMContentLoaded', function() {
        // Aplicar tema guardado
        applyTheme(currentTheme);
        
        // Configurar menú móvil
        setupMobileMenu();
        
        // Inicializar notificaciones
        initializeNotifications();
        setupFilters();
        updateUnreadCount();
    });

    // Configurar menú móvil
    function setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const closeMenu = document.getElementById('closeMenu');

        if (hamburger) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                if (mobileMenu) mobileMenu.classList.toggle('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
                document.body.style.overflow = (mobileMenu && mobileMenu.classList.contains('active')) ? 'hidden' : 'auto';
            });
        }

        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                if (hamburger) hamburger.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function() {
                if (hamburger) hamburger.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // Funciones para el selector de tema
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

    // Inicializar notificaciones
    function initializeNotifications() {
        const notificationElements = document.querySelectorAll('.notification-item');
        notifications = Array.from(notificationElements).map(el => ({
            id: parseInt(el.dataset.id),
            type: el.dataset.type,
            read: el.classList.contains('read'),
            element: el
        }));
    }

    // Configurar filtros
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(b => b.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                // Aplicar filtro
                currentFilter = this.dataset.filter;
                applyFilter(currentFilter);
            });
        });
    }

    // Aplicar filtro
    function applyFilter(filter) {
        const notificationItems = document.querySelectorAll('.notification-item');
        
        notificationItems.forEach(item => {
            const type = item.dataset.type;
            const isRead = item.classList.contains('read');
            
            let show = true;
            
            switch(filter) {
                case 'all':
                    show = true;
                    break;
                case 'unread':
                    show = !isRead;
                    break;
                default:
                    show = type === filter;
            }
            
            item.style.display = show ? 'block' : 'none';
        });
    }

    // Marcar como leída
    function markAsRead(id) {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            notification.element.classList.remove('unread');
            notification.element.classList.add('read');
            
            // Remover badge y botón
            const badge = notification.element.querySelector('.unread-badge');
            if (badge) badge.remove();
            
            const markReadBtn = notification.element.querySelector('.btn-mark-read');
            if (markReadBtn) markReadBtn.remove();
            
            updateUnreadCount();
            showAlert('Notificación marcada como leída', 'success');
        }
    }

    // Marcar todas como leídas
    function markAllAsRead() {
        const unreadNotifications = notifications.filter(n => !n.read);
        
        if (unreadNotifications.length === 0) {
            showAlert('No hay notificaciones sin leer', 'info');
            return;
        }
        
        unreadNotifications.forEach(notification => {
            notification.read = true;
            notification.element.classList.remove('unread');
            notification.element.classList.add('read');
            
            // Remover badge y botón
            const badge = notification.element.querySelector('.unread-badge');
            if (badge) badge.remove();
            
            const markReadBtn = notification.element.querySelector('.btn-mark-read');
            if (markReadBtn) markReadBtn.remove();
        });
        
        updateUnreadCount();
        showAlert(`${unreadNotifications.length} notificaciones marcadas como leídas`, 'success');
    }

    // Ver detalles
    function viewDetails(id) {
        const notification = notifications.find(n => n.id === id);
        if (notification) {
            // Marcar como leída automáticamente al ver detalles
            if (!notification.read) {
                markAsRead(id);
            }
            
            // Simular navegación a detalles
            const titles = {
                1: 'los detalles del mantenimiento de tuberías',
                2: 'el formulario de inscripción al evento',
                3: 'la liquidación detallada de expensas',
                4: 'más información sobre el sistema de acceso',
                5: 'los horarios completos de la pileta',
                6: 'el reporte completo del mantenimiento',
                7: 'los resultados completos del torneo',
                8: 'su comprobante de pago'
            };
            
            showAlert(`Navegando a ${titles[id] || 'los detalles'}...`, 'info');
        }
    }

    // Actualizar contador de no leídas
    function updateUnreadCount() {
        const unreadCount = notifications.filter(n => !n.read).length;
        const unreadBtn = document.querySelector('[data-filter="unread"]');
        if (unreadBtn) {
            unreadBtn.textContent = `No leídas (${unreadCount})`;
        }
        
        // Actualizar badge del header
        const headerBadge = document.getElementById('notificationCount');
        if (headerBadge) {
            headerBadge.textContent = unreadCount;
        }
    }

    // Mostrar alerta
    function showAlert(message, type = 'info') {
        // Remover alertas existentes
        const existingAlerts = document.querySelectorAll('.temp-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Crear nueva alerta
        const alert = document.createElement('div');
        alert.className = `temp-alert alert alert-${type === 'success' ? 'success' : 'error'}`;
        alert.textContent = message;
        alert.style.position = 'fixed';
        alert.style.top = '100px';
        alert.style.right = '20px';
        alert.style.zIndex = '1000';
        alert.style.minWidth = '300px';
        
        document.body.appendChild(alert);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // Efectos adicionales
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // No hacer nada si se clickea un botón
            if (e.target.classList.contains('action-btn')) return;
            
            // Agregar efecto de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
</script>
</body>
</html>