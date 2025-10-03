<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa del Barrio - Barrio Gestión</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="Barrios.css">
    <link rel="stylesheet" href="../../index.css?v=1">
</head>
<body>
    <header>
        <div class="izq">
            <div class="LogoApp">
                <a href="../../index.php">
                <img src="../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
                </a>           
        </div>
            <nav class="menu-principal">
                <div class="dropd<own">
                    <a href="../../index.php" class="menu-item active">Inicio</a>
                </div>
            <nav class="menu-principal">
                <div class="dropdown">
                    <a href="#" class="menu-item">Expensas</a>
                    <div class="dropdown-content">
                        <a href="../../Expensas/expensas.php">Ver Expensas</a>
                        <a href="../../Expensas/Historial/Historial.php">Historial</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Servicios</a>
                    <div class="dropdown-content">
                        <a href="Barrios.php">Mapa del Barrio</a>
                        <a href="../ReservasEC/reservas.php">Reservar Espacios</a>
                        <a href="../MiCarnet/carnet.php">Mi Carnet</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="../../Seguridad/ControlAccesos/invitado.php">Control de Acceso</a>
                        <a href="../../Seguridad/GesPermisos/Permisos.php">Gestionar Permisos</a>
                        <a href="../../Seguridad/RegistroVisitas/Visitas.php">Registro de Visitas</a>
                    </div>
                </div>
                <a href="../../Reclamos/quejas.php" class="menu-item">Reclamos</a>
                <a href="../../Configuracion/Configuracion.php" class="menu-item">Configuracion</a>
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
            
            <a href="../../Notificaciones/Notificacion.php" class="icono-header">
                <img src="../../assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <div class="IdSession">
                <h1 class="texto">Cliente</h1>
                <a href="../../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
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
        <div class="header-section">
            <h1>
                <i class="fas fa-map-marked-alt"></i>
                Mapa Interactivo del Barrio
            </h1>
            <p>Explora las instalaciones y servicios disponibles en nuestro barrio</p>
        </div>

        <!-- Buscador -->
        <div class="search-container">
            <div class="search-box">
                <div class="search-input-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" class="search-input" id="searchInput" placeholder="Buscar por dirección, lote o instalación...">
                </div>
            </div>
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="filterSearch('all')">Todos</button>
                <button class="filter-btn" onclick="filterSearch('lotes')">Lotes</button>
                <button class="filter-btn" onclick="filterSearch('deportivas')">Deportivas</button>
                <button class="filter-btn" onclick="filterSearch('sociales')">Sociales</button>
                <button class="filter-btn" onclick="filterSearch('verdes')">Áreas Verdes</button>
            </div>
            <div class="search-results" id="searchResults"></div>
        </div>

        <div class="main-content">
            <div class="mapa-container">
                <div class="mapa-header">
                    <h2>Vista del Barrio</h2>
                    <div class="control-buttons">
                        <button class="control-btn" onclick="toggleFullscreen()">
                            <i class="fas fa-expand"></i>
                            <span class="btn-text">Pantalla Completa</span>
                        </button>
                        <button class="control-btn" onclick="reloadMap()">
                            <i class="fas fa-sync-alt"></i>
                            <span class="btn-text">Recargar</span>
                        </button>
                    </div>
                </div>
                <div class="mapa-frame" id="mapaFrame">
                    <div class="loading-overlay" id="loadingOverlay">
                        <div class="spinner"></div>
                        <span>Cargando mapa...</span>
                    </div>
                    <iframe id="mapaIframe" src="https://lozalen341.github.io/mapa/" allowfullscreen></iframe>
                </div>
            </div>

            <aside class="sidebar">
                <!-- Favoritos -->
                <div class="info-card">
                    <h3><i class="fas fa-star"></i> Mis Favoritos</h3>
                    <div class="favorites-list" id="favoritesList">
                        <div class="empty-favorites">
                            <i class="fas fa-star"></i>
                            <p>Aún no tienes favoritos.<br>Marca tus lugares más usados.</p>
                        </div>
                    </div>
                </div>

                <!-- Galería de fotos -->
                <div class="info-card">
                    <h3><i class="fas fa-images"></i> Galería</h3>
                    <div class="gallery-grid">
                        <div class="gallery-item" onclick="openModal('pileta')">
                            <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=400&fit=crop" alt="Pileta">
                            <div class="view-360">
                                <i class="fas fa-street-view"></i>
                                360°
                            </div>
                            <div class="gallery-overlay">
                                <h4>Pileta</h4>
                                <p>Área recreativa</p>
                            </div>
                        </div>
                        <div class="gallery-item" onclick="openModal('cancha')">
                            <img src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=400&fit=crop" alt="Cancha de Tenis">
                            <div class="gallery-overlay">
                                <h4>Cancha de Tenis</h4>
                                <p>Instalación deportiva</p>
                            </div>
                        </div>
                        <div class="gallery-item" onclick="openModal('quincho')">
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop" alt="Quincho">
                            <div class="view-360">
                                <i class="fas fa-street-view"></i>
                                360°
                            </div>
                            <div class="gallery-overlay">
                                <h4>Quincho</h4>
                                <p>Área social</p>
                            </div>
                        </div>
                        <div class="gallery-item" onclick="openModal('parque')">
                            <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop" alt="Parque">
                            <div class="gallery-overlay">
                                <h4>Parque Central</h4>
                                <p>Área verde</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="info-card">
                    <h3><i class="fas fa-info-circle"></i> Leyenda</h3>
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(135deg, #4CAF50, #45a049);">
                            <i class="fas fa-tree" style="color: white;"></i>
                        </div>
                        <div class="legend-text">
                            <h4>Áreas Verdes</h4>
                            <p>Parques y jardines</p>
                        </div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(135deg, #2196F3, #1976D2);">
                            <i class="fas fa-swimming-pool" style="color: white;"></i>
                        </div>
                        <div class="legend-text">
                            <h4>Áreas Deportivas</h4>
                            <p>Canchas y gimnasio</p>
                        </div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(135deg, #FF9800, #F57C00);">
                            <i class="fas fa-utensils" style="color: white;"></i>
                        </div>
                        <div class="legend-text">
                            <h4>Áreas Sociales</h4>
                            <p>Quincho y salón</p>
                        </div>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(135deg, #9C27B0, #7B1FA2);">
                            <i class="fas fa-home" style="color: white;"></i>
                        </div>
                        <div class="legend-text">
                            <h4>Lotes</h4>
                            <p>Viviendas del barrio</p>
                        </div>
                    </div>
                </div>

                <div class="info-card">
                    <h3><i class="fas fa-chart-bar"></i> Estadísticas</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number">150</div>
                            <div class="stat-label">Lotes</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">8</div>
                            <div class="stat-label">Instalaciones</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">12ha</div>
                            <div class="stat-label">Superficie</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Seguridad</div>
                        </div>
                    </div>
                </div>

            </aside>
        </div>
    </div>

    <!-- Modal para galería -->
    <div class="modal" id="galleryModal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">×</button>
            <img class="modal-image" id="modalImage" src="" alt="">
            <div class="modal-info">
                <h3 id="modalTitle"></h3>
                <p id="modalDescription"></p>
            </div>
        </div>
    </div>

    <script>

         let currentTheme = localStorage.getItem('theme') || 'dark';

        // Aplicar tema guardado al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            // Aplicar tema
            applyTheme(currentTheme);})

        // Base de datos de lugares
        const locations = [
            { id: 1, name: 'Lote 101', type: 'lotes', category: 'Vivienda', address: 'Calle Principal 101' },
            { id: 2, name: 'Lote 102', type: 'lotes', category: 'Vivienda', address: 'Calle Principal 102' },
            { id: 3, name: 'Pileta', type: 'deportivas', category: 'Instalación Deportiva', address: 'Sector Deportivo' },
            { id: 4, name: 'Cancha de Tenis', type: 'deportivas', category: 'Instalación Deportiva', address: 'Sector Deportivo' },
            { id: 5, name: 'Cancha de Fútbol', type: 'deportivas', category: 'Instalación Deportiva', address: 'Sector Deportivo' },
            { id: 6, name: 'Gimnasio', type: 'deportivas', category: 'Instalación Deportiva', address: 'Centro Deportivo' },
            { id: 7, name: 'Quincho Principal', type: 'sociales', category: 'Área Social', address: 'Sector Social' },
            { id: 8, name: 'Salón de Eventos', type: 'sociales', category: 'Área Social', address: 'Sector Social' },
            { id: 9, name: 'Parque Central', type: 'verdes', category: 'Área Verde', address: 'Centro del Barrio' },
            { id: 10, name: 'Plaza de Juegos', type: 'verdes', category: 'Área Verde', address: 'Zona Familiar' }
        ];

        // Datos de galería
        const galleryData = {
            pileta: {
                title: 'Pileta Climatizada',
                description: 'Nuestra pileta climatizada cuenta con zona de natación profesional de 25 metros, área recreativa para niños con profundidad reducida, vestuarios equipados con duchas y casilleros, servicio de guardarropa, zona de solárium con reposeras, kiosco de refrescos y snacks. Horario de verano: 9:00 - 20:00hs. Vista 360° disponible para recorrer virtualmente las instalaciones.',
                image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&fit=crop'
            },
            cancha: {
                title: 'Cancha de Tenis',
                description: 'Cancha profesional de tenis con superficie de polvo de ladrillo, iluminación LED para juegos nocturnos, gradas para espectadores, vestuarios equipados, equipamiento disponible para alquiler (raquetas, pelotas), instructores certificados disponibles para clases particulares o grupales. Sistema de reserva online disponible las 24 horas.',
                image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&fit=crop'
            },
            quincho: {
                title: 'Quincho y Área de Parrillas',
                description: 'Espacio ideal para reuniones familiares y eventos sociales. Cuenta con 4 parrillas profesionales de gran tamaño, mesas y sillas para 80 personas, cocina equipada con heladera industrial, freezer, microondas y vajilla completa, baños completos, sistema de audio ambiente, Wi-Fi gratuito, estacionamiento exclusivo, zona infantil con juegos. Vista 360° para planificar tu evento.',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop'
            },
            parque: {
                title: 'Parque Central',
                description: 'Extenso parque de 3 hectáreas con variedad de árboles autóctonos, senderos para caminatas y running, zona de ejercicios al aire libre con equipamiento profesional, área de picnic con mesas y bancos, juegos infantiles seguros y renovados, iluminación nocturna LED, circuito para bicicletas, fuentes de agua potable, bancos panorámicos. Espacio ideal para actividades al aire libre y contacto con la naturaleza.',
                image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&fit=crop'
            }
        };

        // Sistema de favoritos (almacenado en memoria)
        let favorites = [];

        // Cargar favoritos guardados
        function loadFavorites() {
            const saved = JSON.parse(sessionStorage.getItem('mapFavorites') || '[]');
            favorites = saved;
            renderFavorites();
        }

        // Guardar favoritos
        function saveFavorites() {
            sessionStorage.setItem('mapFavorites', JSON.stringify(favorites));
        }

        // Agregar/quitar favorito
        function toggleFavorite(location) {
            const index = favorites.findIndex(f => f.id === location.id);
            if (index > -1) {
                favorites.splice(index, 1);
            } else {
                favorites.push(location);
            }
            saveFavorites();
            renderFavorites();
            
            // Actualizar resultados de búsqueda si están activos
            if (searchInput.value.length >= 2) {
                searchInput.dispatchEvent(new Event('input'));
            }
        }

        // Renderizar lista de favoritos
        function renderFavorites() {
            const container = document.getElementById('favoritesList');
            
            if (favorites.length === 0) {
                container.innerHTML = `
                    <div class="empty-favorites">
                        <i class="fas fa-star"></i>
                        <p>Aún no tienes favoritos.<br>Marca tus lugares más usados.</p>
                    </div>
                `;
                return;
            }

            const icons = {
                lotes: { icon: 'fa-home', gradient: 'linear-gradient(135deg, #9C27B0, #7B1FA2)' },
                deportivas: { icon: 'fa-dumbbell', gradient: 'linear-gradient(135deg, #2196F3, #1976D2)' },
                sociales: { icon: 'fa-users', gradient: 'linear-gradient(135deg, #FF9800, #F57C00)' },
                verdes: { icon: 'fa-tree', gradient: 'linear-gradient(135deg, #4CAF50, #45a049)' }
            };

            container.innerHTML = favorites.map(fav => {
                const icon = icons[fav.type];
                return `
                    <div class="favorite-item">
                        <div class="favorite-info">
                            <div class="favorite-icon" style="background: ${icon.gradient}">
                                <i class="fas ${icon.icon}" style="color: white;"></i>
                            </div>
                            <div class="favorite-text">
                                <h4>${fav.name}</h4>
                                <p>${fav.address}</p>
                            </div>
                        </div>
                        <div class="favorite-actions">
                            <button class="fav-btn starred" onclick='toggleFavorite(${JSON.stringify(fav).replace(/'/g, "&#39;")})'>
                                <i class="fas fa-star"></i>
                            </button>
                            <button class="fav-btn" onclick="locateOnMap('${fav.name}')">
                                <i class="fas fa-map-marker-alt"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Buscador
        let currentFilter = 'all';
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const filtered = locations.filter(loc => {
                const matchesQuery = loc.name.toLowerCase().includes(query) || 
                                   loc.address.toLowerCase().includes(query) ||
                                   loc.category.toLowerCase().includes(query);
                const matchesFilter = currentFilter === 'all' || loc.type === currentFilter;
                return matchesQuery && matchesFilter;
            });

            displaySearchResults(filtered);
        });

        function displaySearchResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: #aaa;">No se encontraron resultados</div>';
                searchResults.classList.add('active');
                return;
            }

            searchResults.innerHTML = results.map(loc => {
                const isFav = favorites.some(f => f.id === loc.id);
                return `
                    <div class="search-result-item">
                        <div class="result-info">
                            <h4>${loc.name}</h4>
                            <p>${loc.category} - ${loc.address}</p>
                        </div>
                        <div class="result-actions">
                            <button class="result-btn" onclick="locateOnMap('${loc.name}')">
                                <i class="fas fa-map-marker-alt"></i> Ver
                            </button>
                            <button class="result-btn" onclick='toggleFavorite(${JSON.stringify(loc).replace(/'/g, "&#39;")})'>
                                <i class="fas fa-star" style="color: ${isFav ? '#ffd700' : '#fff'}"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            searchResults.classList.add('active');
        }

        function filterSearch(type) {
            currentFilter = type;
            
            // Actualizar botones
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Si hay búsqueda activa, actualizar resultados
            if (searchInput.value.length >= 2) {
                searchInput.dispatchEvent(new Event('input'));
            }
        }

        function locateOnMap(locationName) {
            alert(`Ubicando "${locationName}" en el mapa...`);
            // Aquí podrías implementar lógica para resaltar la ubicación en el mapa
        }

        // Modal de galería
        function openModal(type) {
            const data = galleryData[type];
            document.getElementById('modalImage').src = data.image;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('galleryModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('galleryModal').classList.remove('active');
        }

        // Cerrar modal al hacer clic fuera
        document.getElementById('galleryModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // === FUNCIONES DEL MAPA (SIN MODIFICAR) ===
        const iframe = document.getElementById('mapaIframe');
        const loadingOverlay = document.getElementById('loadingOverlay');

        iframe.addEventListener('load', function() {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 500);
        });

        function toggleFullscreen() {
            const mapaFrame = document.getElementById('mapaFrame');
            if (!document.fullscreenElement) {
                mapaFrame.requestFullscreen().catch(err => {
                    console.log('Error al entrar en pantalla completa:', err);
                });
            } else {
                document.exitFullscreen();
            }
        }

        function reloadMap() {
            loadingOverlay.classList.remove('hidden');
            iframe.src = iframe.src;
        }

        // Animación de entrada para las tarjetas
        window.addEventListener('load', function() {
            loadFavorites();
            
            const cards = document.querySelectorAll('.info-card, .mapa-container, .search-container');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

        // Efecto hover en items de leyenda
        document.querySelectorAll('.legend-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateX(5px)';
                }, 100);
            });
        });
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