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
                image: '../../../Assets/img/foto1.jpg'
            },
            cancha: {
                title: 'Cancha de Tenis',
                description: 'Cancha profesional de tenis con superficie de polvo de ladrillo, iluminación LED para juegos nocturnos, gradas para espectadores, vestuarios equipados, equipamiento disponible para alquiler (raquetas, pelotas), instructores certificados disponibles para clases particulares o grupales. Sistema de reserva online disponible las 24 horas.',
                image: '../../../Assets/img/foto2.webp'
            },
            quincho: {
                title: 'Quincho y Área de Parrillas',
                description: 'Espacio ideal para reuniones familiares y eventos sociales. Cuenta con 4 parrillas profesionales de gran tamaño, mesas y sillas para 80 personas, cocina equipada con heladera industrial, freezer, microondas y vajilla completa, baños completos, sistema de audio ambiente, Wi-Fi gratuito, estacionamiento exclusivo, zona infantil con juegos. Vista 360° para planificar tu evento.',
                image: '../../../Assets/img/foto3.jpg'
            },
            parque: {
                title: 'Parque Central',
                description: 'Extenso parque de 3 hectáreas con variedad de árboles autóctonos, senderos para caminatas y running, zona de ejercicios al aire libre con equipamiento profesional, área de picnic con mesas y bancos, juegos infantiles seguros y renovados, iluminación nocturna LED, circuito para bicicletas, fuentes de agua potable, bancos panorámicos. Espacio ideal para actividades al aire libre y contacto con la naturaleza.',
                image: '../../../Assets/img/foto4.jpeg'
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
