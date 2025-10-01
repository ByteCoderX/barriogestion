<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $model->insertar($_POST);
    header('Location: UserList.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barrio Gestion - Crear Usuario</title>
    <link rel="stylesheet" href="../../index.css?=v30">
    <link rel="stylesheet" href="./CreateUserStyle.css?=v67">
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
        <div class="create-user-container">
            <!-- Header de la sección -->
            <div class="presen-seccion">
                <div class="presen-contenido">
                    <h1>Crear Nuevo Usuario</h1>
                    <p>Complete los datos para agregar un nuevo usuario al sistema de gestión del barrio.</p>
                    <div class="presen-fecha">
                        <span id="current-date">Cargando fecha...</span>
                    </div>
                </div>
            </div>

            <!-- Navegación breadcrumb -->
             <br>
            
            <div class="breadcrumb">
                <a href="./UserList.php" class="breadcrumb-link">
                    <img src="../../assets/icons/volver.png" alt="Volver">
                    Volver a Lista de Usuarios
                </a>
            </div>

            <!-- Formulario de creación -->
            <div class="form-container">
                <div class="form-header">
                    <div class="form-icon">
                        <img src="../../assets/icons/usuarios-alt.svg" alt="Nuevo Usuario">
                    </div>
                    <div class="form-title">
                        <h2>Información del Usuario</h2>
                        <p>Complete todos los campos requeridos</p>
                    </div>
                </div>

                <form method="POST" class="user-form" id="userForm">
                    <div class="form-grid">
                        <!-- Información Personal -->
                        <div class="form-section">
                            <h3 class="section-title">
                                <img src="../../assets/icons/usuario.png" alt="Información Personal">
                                Información Personal
                            </h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="nombre">Nombre *</label>
                                    <input type="text" id="nombre" name="nombre" required>
                                </div>
                                <div class="form-group">
                                    <label for="apellido">Apellido *</label>
                                    <input type="text" id="apellido" name="apellido" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="dni">DNI *</label>
                                    <input type="text" id="dni" name="dni" required>
                                </div>
                                <div class="form-group">
                                    <label for="contacto">Contacto</label>
                                    <input type="text" id="contacto" name="contacto">
                                </div>
                            </div>
                        </div>

                        <!-- Información de Residencia -->
                        <div class="form-section">
                            <h3 class="section-title">
                                <img src="../../assets/icons/hogar.png" alt="Residencia">
                                Información de Residencia
                            </h3>
                            <div class="form-row">
                                <div class="form-group full-width">
                                    <label for="direccion">Dirección *</label>
                                    <input type="text" id="direccion" name="direccion" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="id_parcela">Parcela *</label>
                                    <input type="number" id="id_parcela" name="id_parcela" required>
                                </div>
                                <div class="form-group">
                                    <label for="nro_carnet">Número de Carnet</label>
                                    <input type="number" id="nro_carnet" name="nro_carnet">
                                </div>
                            </div>
                        </div>

                        <!-- Información del Sistema -->
                        <div class="form-section">
                            <h3 class="section-title">
                                <img src="../../assets/icons/sistemages.png" alt="Sistema">
                                Información del Sistema
                            </h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="rol">Rol *</label>
                                    <select id="rol" name="rol" required>
                                        <option value="">Seleccionar rol</option>
                                        <option value="3">Administrador</option>
                                        <option value="2">Seguridad</option>
                                        <option value="1">Residente</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="clave_usuario">Clave de Usuario *</label>
                                    <input type="password" id="clave_usuario" name="clave_usuario" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de acción -->
                    <div class="form-actions">
                        <a href="./UserList.php" class="btn-cancel">
                            <img src="../../assets/icons/cancelar.png" alt="Cancelar">
                            Cancelar
                        </a>
                        <button type="submit" class="btn-submit">
                            <img src="../../assets/icons/crearusuario.png" alt="Guardar">
                            Crear Usuario
                        </button>
                    </div>
                </form>
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

            // Validación del formulario
            const form = document.getElementById('userForm');
            const inputs = form.querySelectorAll('input[required], select[required]');

            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                });
            });

            // Validación del DNI
            const dniInput = document.getElementById('dni');
            dniInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            // Validación de números de parcela y carnet
            const numberInputs = document.querySelectorAll('input[type="number"]');
            numberInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value < 0) {
                        this.value = 0;
                    }
                });
            });

            // Validación antes de enviar
            form.addEventListener('submit', function(e) {
                let hasErrors = false;
                
                inputs.forEach(input => {
                    if (input.value.trim() === '') {
                        input.classList.add('error');
                        hasErrors = true;
                    }
                });

                if (hasErrors) {
                    e.preventDefault();
                    alert('Por favor, complete todos los campos requeridos.');
                }
            });
        });
    </script>
</body>
</html>
