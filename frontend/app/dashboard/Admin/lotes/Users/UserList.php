<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();
$usuarios = $model->obtenerTodos();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barrio Gestion - Lista de Usuarios</title>
    <link rel="stylesheet" href="../../index.css?=v14">
    <link rel="stylesheet" href="./UserlistStyle.css?=v2">
</head>
<body>
    <header>
        <div class="izq">
            <div class="LogoApp">
                <img src="../../assets/icons/logoheader.webp" alt="icono-barriogestion" class="logo">
            </div>
            <nav class="menu-principal">
                <a href="../../index.php" class="menu-item">Inicio</a>
                <div class="dropdown">
                    <a href="#" class="menu-item">Mi Barrio</a>
                    <div class="dropdown-content">
                        <a href="../../expensas.php">Gestionar Gastos</a>
                        <a href="../../pagar-expensas.php">Gestionar Pagos</a>
                        <a href="../../historial-pagos.php">Gestionar Ingresos</a>
                        <a href="../../historial-pagos.php">Gestionar Fondos</a>
                        <a href="../../historial-pagos.php">Gestionar Expensas</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a class="menu-item">Gestion Lotes</a>
                    <div class="dropdown-content">
                        <a href="../../mapa-barrio.php">Gestionar Grupo Hogar</a>
                        <a href="../../reservas.php">Gestionar Espacios</a>
                        <a href="../../lotes/carnet.php">Gestionar Carnet</a>
                        <a href="./UserList.php">Gestionar Usuarios</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="#" class="menu-item">Seguridad</a>
                    <div class="dropdown-content">
                        <a href="../../control-acceso.php">Historial de Accesos</a>
                        <a href="../../permisos.php">Gestionar Permisos</a>
                        <a href="../../visitas.php">Gestionar Accesos</a>
                    </div>
                </div>
                <a href="../../reclamos.php" class="menu-item">Configuracion</a>
            </nav>
        </div>
        <div class="derecha">
            <a href="../../notificaciones.php" class="icono-header">
                <img src="../../assets/icons/notificacion.png" alt="notificaciones">
                <span class="notification-badge" id="notificationCount">3</span>
            </a>
            <a href="../../reclamos.php" class="icono-header">
                <img src="../../assets/icons/reclamos.png" alt="Reclamos">
            </a>
            <div class="IdSession">
                <h1 class="texto">Administrador</h1>
                <a href="../../../../Utils/auth/logout.php"><h2>Cerrar Sesión</h2></a>
            </div>
        </div>
    </header>

    <main id="main">
        <div class="usuarios-container">
            <!-- Header de la sección -->
            <div class="presen-seccion">
                <div class="presen-contenido">
                    <h1>Gestión de Usuarios</h1>
                    <p>Administra los usuarios del sistema de gestión del barrio.</p>
                    <div class="presen-fecha">
                        <span id="current-date">Cargando fecha...</span>
                    </div>
                </div>
            </div>

            <br>

            <!-- Sección de acciones rápidas -->

            <br>
            
            <div class="actions-container">
                <a href="create.php" class="newuser">
                <div class="action-card">
                    <div class="action-icon">
                        <img src="../../assets/icons/usuarios-alt.svg" alt="Nuevo Usuario">
                    </div>
                    <div class="action-info">
                        <h3>Nuevo Usuario</h3>
                        <p>Agregar nuevo usuario al sistema</p>
                    </div>
                    
                </div>
            </a>
                <div class="action-card">
                    <div class="action-icon">
                        <img src="../../assets/icons/search.svg" alt="Buscar">
                    </div>
                    <div class="action-info">
                        <h3>Buscar Usuario</h3>
                        <p>Filtrar por nombre o apellido</p>
                    </div>
                    <div class="search-input-container">
                        <input type="text" id="searchUsers" placeholder="Buscar...">
                    </div>
                </div>
            </div>

            <!-- Lista de usuarios -->
            <div class="seccion-titulo">
                <h2>Lista de Usuarios</h2>
                <span class="total-users">Total: <?= count($usuarios) ?> usuarios</span>
            </div>
            
            <div class="usuarios-table-container">
                <?php if (count($usuarios) > 0): ?>
                    <div class="table-wrapper">
                        <table class="usuarios-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="th-content">
                                            <span>ID</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="th-content">
                                            <span>Nombre</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="th-content">
                                            <span>Apellido</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="th-content">
                                            <span>Acciones</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($usuarios as $u): ?>
                                    <tr class="usuario-row">
                                        <td class="usuario-id"><?= $u['id_usuario'] ?></td>
                                        <td class="usuario-nombre"><?= htmlspecialchars($u['nombre']) ?></td>
                                        <td class="usuario-apellido"><?= htmlspecialchars($u['apellido']) ?></td>
                                        <td class="usuario-acciones">
                                            <div class="acciones-buttons">
                                                <a href="editar.php?id=<?= $u['id_usuario'] ?>" class="btn-accion editar" title="Editar usuario">
                                                    <img src="../../assets/icons/edituser.png" alt="Editar">
                                                </a>
                                                <a href="eliminar.php?id=<?= $u['id_usuario'] ?>" 
                                                   class="btn-accion eliminar" 
                                                   onclick="return confirm('¿Está seguro que desea eliminar este usuario?')"
                                                   title="Eliminar usuario">
                                                    <img src="../../assets/icons/deleteuser.png" alt="Eliminar">
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <div class="no-users">
                        <div class="no-users-icon">
                            <img src="../../assets/icons/usuarios-alt.svg" alt="Sin usuarios">
                        </div>
                        <h3>No hay usuarios registrados</h3>
                        <p>Comienza agregando el primer usuario al sistema</p>
                        <a href="create.php" class="btn-primary">
                            <img src="../../assets/icons/add.svg" alt="Agregar">
                            Agregar Usuario
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </main>

    <script>
        // Cargar fecha actual
        document.addEventListener('DOMContentLoaded', function() {
            const fechaElement = document.getElementById('current-date');
            const opciones = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const fechaActual = new Date().toLocaleDateString('es-ES', opciones);
            fechaElement.textContent = fechaActual;

            // Funcionalidad de búsqueda
            const searchInput = document.getElementById('searchUsers');
            const usuarioRows = document.querySelectorAll('.usuario-row');

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                usuarioRows.forEach(row => {
                    const nombre = row.querySelector('.usuario-nombre').textContent.toLowerCase();
                    const apellido = row.querySelector('.usuario-apellido').textContent.toLowerCase();
                    
                    if (nombre.includes(searchTerm) || apellido.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>