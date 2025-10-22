<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa del Barrio - Barrio Gestión</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="Barrios.css">
    <link rel="stylesheet" href="../../../index.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <div class="container">
        <div class="header-section">
            <h1>
                
                Mapa Interactivo del Barrio
            </h1>
            <p>Explora las instalaciones y servicios disponibles en nuestro barrio</p>
            <div class="breadcrumb">
                        <a href="../../../index.php">Inicio</a> &gt; <span>Servicios</span> &gt; <span>Mi Barrio</span>
            </div>
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
            <div class="left-column">
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

                <!-- Tarjetas inferiores en 2 columnas -->
                <div class="bottom-cards">
                    <div class="stats-card">
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

                    <div class="legend-card">
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
                            <img src="../../../Assets/img/foto1.jpg" alt="Pileta">
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
                            <img src="../../../Assets/img/foto2.webp" alt="Cancha de Tenis">
                            <div class="gallery-overlay">
                                <h4>Cancha de Tenis</h4>
                                <p>Instalación deportiva</p>
                            </div>
                        </div>
                        <div class="gallery-item" onclick="openModal('quincho')">
                            <img src="../../../Assets/img/foto3.jpg" alt="Quincho">
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
                            <img src="../../../Assets/img/foto4.jpeg" alt="Parque">
                            <div class="gallery-overlay">
                                <h4>Parque Central</h4>
                                <p>Área verde</p>
                            </div>
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

    <script src="Barrios.js"></script>
   
</body>
</html>