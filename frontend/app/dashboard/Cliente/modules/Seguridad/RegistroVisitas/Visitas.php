<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Visitas - BarrioGestion</title>
    <link rel="stylesheet" href="Visitas.css?v=18">
    <link rel="stylesheet" href="../../../index.css?v=46">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <img src="../../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo" width="250">
            <button class="close-menu" id="closeMenu">×</button>
        </div>
        
        <div class="mobile-menu-content">
            <div class="mobile-menu-section">
                <h4>Expensas</h4>
                <a href="expensas.php" class="mobile-menu-item active">
                    <img src="../../../assets/icons/expensas.png" alt="Ver Expensas" width="24" height="24">
                    <span>Ver Expensas</span>
                </a>
                <a href="historial-pagos.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/historial.png" alt="Historial" width="24" height="24">
                    <span>Historial</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Servicios</h4>
                <a href="mapa-barrio.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/mapabarrio.png" alt="Mapa del Barrio" width="24" height="24">
                    <span>Mapa del Barrio</span>
                </a>
                <a href="reservas.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/reservasblanc.png" alt="Reservar Espacios" width="24" height="24">
                    <span>Reservar Espacios</span>
                </a>
                <a href="carnet.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/carnetblanc.png" alt="Mi Carnet" width="24" height="24">
                    <span>Mi Carnet</span>
                </a>
            </div>

            <div class="mobile-menu-section">
                <h4>Seguridad</h4>
                <a href="control-acceso.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/accesoges.png" alt="Control de Acceso" width="24" height="24">
                    <span>Control de Acceso</span>
                </a>
                <a href="permisos.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/permisosblanc.png" alt="Gestionar Permisos" width="24" height="24">
                    <span>Gestionar Permisos</span>
                </a>
                <a href="visitas.php" class="mobile-menu-item">
                    <img src="../../../assets/icons/visitas.png" alt="Registro de Visitas" width="24" height="24">
                    <span>Registro de Visitas</span>
                </a>
            </div>
        </div>

        <div class="mobile-icon-group">
            <a href="notificaciones.php" class="mobile-icon-item">
                <img src="../../../assets/icons/notificacion.png" alt="Notificaciones" width="24" height="24">
                <span>Notificaciones</span>
            </a>
            <a href="reclamos.php" class="mobile-icon-item">
                <img src="../../../assets/icons/reclamos4.png" alt="Reclamos" width="24" height="24">
                <span>Reclamos</span>
            </a>
        </div>
    </div>

    <nav class="navbar">
        <h1>Mis Visitas</h1>
    </nav>

    <div class="container">
        <!-- Estadísticas del cliente -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="visitasAutorizadas">5</div>
                <div class="stat-label">Visitas Autorizadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="visitasActivas">2</div>
                <div class="stat-label">Activas Hoy</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="visitasPendientes">1</div>
                <div class="stat-label">Pendientes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="visitasEsteMes">8</div>
                <div class="stat-label">Este Mes</div>
            </div>
        </div>

        <!-- Acciones rápidas -->
        <div class="quick-actions">
            <div class="action-card">
                <h3>➕ Nueva Autorización</h3>
                <p>Autorizar nueva visita para tu lote</p>
                <a href="../ControlAccesos/Invitado.php" class="btn">Autorizar Visita</a>
            </div>
        </div>

        <!-- Filtros simplificados para cliente -->
        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label for="fechaFiltro">Filtrar por Fecha</label>
                    <input type="date" id="fechaFiltro" name="fechaFiltro">
                </div>
                <div class="filter-group">
                    <label for="estadoFiltro">Estado</label>
                    <select id="estadoFiltro" name="estadoFiltro">
                        <option value="">Todos los estados</option>
                        <option value="autorizada">Autorizada</option>
                        <option value="activa">En Curso</option>
                        <option value="completada">Completada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="tipoFiltro">Tipo</label>
                    <select id="tipoFiltro" name="tipoFiltro">
                        <option value="">Todos los tipos</option>
                        <option value="una_vez">Una Vez</option>
                        <option value="temporal">Temporal</option>
                        <option value="permanente">Permanente</option>
                    </select>
                </div>
                <div class="filter-group">
                    <button class="btn btn-small" onclick="aplicarFiltros()">🔍 Filtrar</button>
                </div>
                <div class="filter-group">
                    <button class="btn btn-small btn-secondary" onclick="limpiarFiltros()">🗑️ Limpiar</button>
                </div>
            </div>
        </div>

        <!-- Tabla de visitas del cliente -->
        <div class="table-section">
            <div class="table-header">
                <h2>📋 Mis Visitas Autorizadas</h2>
                <button class="btn btn-small" onclick="exportarMisVisitas()">📥 Exportar</button>
            </div>
            <div class="table-container">
                <table id="visitasTable">
                    <thead>
                        <tr>
                            <th>Visitante</th>
                            <th>DNI</th>
                            <th>Teléfono</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Tipo</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="visitasTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>
        // Datos del cliente logueado (simulated)
        const clienteData = {
            id: 123,
            nombre: "Juan Carlos Pérez",
            lote: "Lote 15"
        };

        let currentTheme = localStorage.getItem('theme') || 'dark';

        // Aplicar tema guardado al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            applyTheme(currentTheme);
        });

        // Base de datos de visitas del cliente (solo las autorizadas por él)
        const misVisitas = [
            {
                id: 1,
                nombre: "María Elena Rodríguez",
                dni: "35420891",
                telefono: "+54 9 11 4785-2341",
                fecha: "2024-09-20",
                hora_desde: "14:30",
                hora_hasta: "18:00",
                tipo: "temporal",
                motivo: "familiar",
                estado: "autorizada",
                observaciones: "Visita de fin de semana, familiar directo"
            },
            {
                id: 2,
                nombre: "Carlos Eduardo Fernández",
                dni: "28756439",
                telefono: "+54 9 11 5642-8973",
                fecha: "2024-09-19",
                hora_desde: "09:00",
                hora_hasta: "17:30",
                tipo: "una_vez",
                motivo: "trabajo",
                estado: "activa",
                observaciones: "Técnico en aire acondicionado"
            },
            {
                id: 3,
                nombre: "Ana Sofía González",
                dni: "41235678",
                telefono: "+54 9 11 3456-7890",
                fecha: "2024-09-18",
                hora_desde: "19:30",
                hora_hasta: "23:00",
                tipo: "una_vez",
                motivo: "social",
                estado: "completada",
                observaciones: "Reunión social"
            },
            {
                id: 4,
                nombre: "Roberto Silva",
                dni: "33987654",
                telefono: "+54 9 11 7890-1234",
                fecha: "2024-09-17",
                hora_desde: "11:45",
                hora_hasta: "12:15",
                tipo: "una_vez",
                motivo: "delivery",
                estado: "completada",
                observaciones: "Entrega de pedidos"
            },
            {
                id: 5,
                nombre: "Lucía Isabel Martínez",
                dni: "37654321",
                telefono: "+54 9 11 2345-6789",
                fecha: "2024-09-21",
                hora_desde: "16:00",
                hora_hasta: "18:00",
                tipo: "permanente",
                motivo: "mantenimiento",
                estado: "cancelada",
                observaciones: "Trabajo de jardinería - Cancelado por lluvia"
            }
        ];

        let visitasFiltradas = [...misVisitas];

        // Mapeos de texto
        const motivosTexto = {
            'familiar': 'Visita Familiar',
            'social': 'Visita Social',
            'trabajo': 'Trabajo/Servicio',
            'delivery': 'Delivery',
            'mantenimiento': 'Mantenimiento',
            'evento': 'Evento'
        };

        const tiposTexto = {
            'una_vez': 'Una Vez',
            'temporal': 'Temporal',
            'permanente': 'Permanente'
        };

        const estadosTexto = {
            'autorizada': 'Autorizada',
            'activa': 'En Curso',
            'completada': 'Completada',
            'cancelada': 'Cancelada'
        };

        // Inicializar página
        function inicializarPagina() {
            cargarTabla(misVisitas);
            actualizarEstadisticas();
        }

        // Cargar tabla
        function cargarTabla(visitas) {
            const tbody = document.getElementById('visitasTableBody');
            tbody.innerHTML = '';

            visitas.forEach(visita => {
                const fila = document.createElement('tr');
                
                fila.innerHTML = `
                    <td>${visita.nombre}</td>
                    <td>${visita.dni}</td>
                    <td>${visita.telefono}</td>
                    <td>${formatearFechaVisualizacion(visita.fecha)}</td>
                    <td>${visita.hora_desde} - ${visita.hora_hasta}</td>
                    <td><span class="tipo-visita tipo-${visita.tipo}">${tiposTexto[visita.tipo]}</span></td>
                    <td>${motivosTexto[visita.motivo]}</td>
                    <td><span class="status status-${visita.estado}">${estadosTexto[visita.estado]}</span></td>
                    <td class="action-buttons">
                        ${visita.estado === 'autorizada' ? 
                            `<button class="btn-action btn-cancel" onclick="cancelarVisita(${visita.id})">Cancelar</button>
                             <button class="btn-action btn-edit" onclick="editarVisita(${visita.id})">Editar</button>` 
                            : ''}
                    </td>
                `;
                
                tbody.appendChild(fila);
            });
        }

        // Formatear fecha
        function formatearFechaVisualizacion(fecha) {
            const [ano, mes, dia] = fecha.split('-');
            return `${dia}/${mes}/${ano}`;
        }

        // Actualizar estadísticas
        function actualizarEstadisticas() {
            const hoy = new Date().toISOString().split('T')[0];
            const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
            
            const stats = {
                autorizadas: visitasFiltradas.filter(v => v.estado === 'autorizada').length,
                activas: visitasFiltradas.filter(v => v.estado === 'activa' && v.fecha === hoy).length,
                pendientes: visitasFiltradas.filter(v => v.estado === 'autorizada' && v.fecha >= hoy).length,
                esteMes: visitasFiltradas.filter(v => v.fecha >= inicioMes).length
            };

            document.getElementById('visitasAutorizadas').textContent = stats.autorizadas;
            document.getElementById('visitasActivas').textContent = stats.activas;
            document.getElementById('visitasPendientes').textContent = stats.pendientes;
            document.getElementById('visitasEsteMes').textContent = stats.esteMes;
        }

        // Aplicar filtros
        function aplicarFiltros() {
            const fecha = document.getElementById('fechaFiltro').value;
            const estado = document.getElementById('estadoFiltro').value;
            const tipo = document.getElementById('tipoFiltro').value;

            visitasFiltradas = misVisitas.filter(visita => {
                let cumpleFiltros = true;

                if (fecha && visita.fecha !== fecha) {
                    cumpleFiltros = false;
                }
                if (estado && visita.estado !== estado) {
                    cumpleFiltros = false;
                }
                if (tipo && visita.tipo !== tipo) {
                    cumpleFiltros = false;
                }

                return cumpleFiltros;
            });

            cargarTabla(visitasFiltradas);
            actualizarEstadisticas();
        }

        // Limpiar filtros
        function limpiarFiltros() {
            document.getElementById('fechaFiltro').value = '';
            document.getElementById('estadoFiltro').value = '';
            document.getElementById('tipoFiltro').value = '';
            
            visitasFiltradas = [...misVisitas];
            cargarTabla(visitasFiltradas);
            actualizarEstadisticas();
        }

        // Filtrar visitas de hoy
        function filtrarVisitasHoy() {
            const hoy = new Date().toISOString().split('T')[0];
            document.getElementById('fechaFiltro').value = hoy;
            aplicarFiltros();
        }

        // Cancelar visita
        function cancelarVisita(id) {
            if (confirm('¿Estás seguro de que quieres cancelar esta visita?')) {
                const visitaIndex = misVisitas.findIndex(v => v.id === id);
                if (visitaIndex !== -1) {
                    misVisitas[visitaIndex].estado = 'cancelada';
                    cargarTabla(visitasFiltradas);
                    actualizarEstadisticas();
                    alert('Visita cancelada exitosamente');
                }
            }
        }
            
        window.addEventListener("click", function(event) {
            const modal = document.querySelector(".modal.active"); // o el id del modal
                if (modal && event.target === modal) {
                    modal.classList.remove("active"); // o modal.style.display = "none";
            }
        });
        // Editar visita (redirige a la página de control de accesos)
        function editarVisita(id) {
            window.location.href = '../Seguridad/ControlAccesos/Invitado.php?edit=' + id;
        }

        // Exportar mis visitas
        function exportarMisVisitas() {
            let csv = 'Visitante,DNI,Teléfono,Fecha,Horario,Tipo,Motivo,Estado,Observaciones\n';
            
            visitasFiltradas.forEach(visita => {
                csv += `"${visita.nombre}",${visita.dni},"${visita.telefono}",${visita.fecha},"${visita.hora_desde} - ${visita.hora_hasta}","${tiposTexto[visita.tipo]}","${motivosTexto[visita.motivo]}","${estadosTexto[visita.estado]}","${visita.observaciones}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `mis_visitas_${clienteData.lote.toLowerCase().replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Funciones para el selector de tema
        function setTheme(theme) {
            currentTheme = theme;
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        }

        function applyTheme(theme) {
            const body = document.body;
            
            body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
            
            if (theme === 'light') {
                body.classList.add('theme-light');
            } else if (theme === 'nature') {
                body.classList.add('theme-nature');
            }
        }

        function toggleThemeMenu() {
            // Controlado por CSS hover
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            inicializarPagina();
            
            // Hamburguer menu
            const hamburger = document.getElementById('hamburger');
            if (hamburger) {
                hamburger.addEventListener('click', function() {
                    hamburger.classList.toggle('active');
                });
            }

            // Event listeners para filtros
            document.getElementById('fechaFiltro').addEventListener('change', aplicarFiltros);
            document.getElementById('estadoFiltro').addEventListener('change', aplicarFiltros);
            document.getElementById('tipoFiltro').addEventListener('change', aplicarFiltros);
        });
    </script>
</body>
</html>