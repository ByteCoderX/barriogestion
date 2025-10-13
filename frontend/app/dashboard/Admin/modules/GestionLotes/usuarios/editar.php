<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: UserList.php');
    exit('ID no válido');
}

$usuario = $model->obtenerPorId($id);

if (!$usuario) {
    header('Location: UserList.php');
    exit('Usuario no encontrado');
}

$mensaje = '';
$tipo_mensaje = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $model->actualizar($id, $_POST);
        $mensaje = 'Usuario actualizado correctamente';
        $tipo_mensaje = 'success';
        // Recargar los datos del usuario
        $usuario = $model->obtenerPorId($id);
    } catch (Exception $e) {
        $mensaje = 'Error al actualizar el usuario: ' . $e->getMessage();
        $tipo_mensaje = 'error';
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barrio Gestión - Editar Usuario</title>
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="./EditarUsuarioStyle.css?v=2">
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
        <div class="editar-container">
            <!-- Header de la sección -->
            <div class="presen-seccion">
                <div class="presen-contenido">
                    <h1>Editar Usuario</h1>
                    <p>Modifica la información del usuario: <?= htmlspecialchars($usuario['nombre'] . ' ' . $usuario['apellido']) ?></p>
                    <div class="presen-fecha">
                        <span id="current-date">Cargando fecha...</span>
                    </div>
                </div>
            </div>

            <br>

            <!-- Sección de acciones rápidas -->
             <br>
            <div class="actions-container">
                <a href="UserList.php" class="btn-back">
                <div class="action-card">
                    <div class="action-icon">
                        <img src="../../assets/icons/listas.png" alt="Volver">
                    </div>
                    <div class="action-info">
                        <h3>Volver a Lista</h3>
                        <p>Regresar a la lista de usuarios</p>
                    </div>
                </div>
                </a>
                <div class="action-card">
                    <div class="action-icon">
                        <img src="../../assets/icons/usuarios-alt.svg" alt="Nuevo Usuario">
                    </div>
                    <div class="action-info">
                        <h3>Crear Usuario</h3>
                        <p>Agregar nuevo usuario al sistema</p>
                    </div>
                    <a href="create.php" class="action-button">
                        <img src="../../assets/icons/iconmas.png" alt="Agregar">
                    </a>
                </div>
            </div>

            <!-- Formulario de edición -->
            <div class="seccion-titulo">
                <h2>Información del Usuario</h2>
                <span class="total-users">ID: <?= $usuario['id_usuario'] ?></span>
            </div>

            <!-- Mensajes de estado -->
            <?php if ($mensaje): ?>
                <div class="alert <?= $tipo_mensaje ?>">
                    <img src="../../assets/icons/<?= $tipo_mensaje === 'success' ? 'check' : 'alert' ?>.svg" alt="<?= $tipo_mensaje ?>">
                    <?= htmlspecialchars($mensaje) ?>
                </div>
            <?php endif; ?>

            <!-- Información adicional -->
            <div class="form-info">
                <h4>Información importante</h4>
                <p>Asegúrate de completar todos los campos obligatorios. Los cambios se guardarán inmediatamente al presionar "Actualizar Usuario".</p>
            </div>

            <div class="editar-form-container">
                <form method="POST" class="editar-form" id="editarForm">
                    <div class="form-group">
                        <label for="nombre">
                            Nombre <span class="required">*</span>
                        </label>
                        <input type="text" id="nombre" name="nombre" value="<?= htmlspecialchars($usuario['nombre']) ?>" required>
                        <div class="input-status" id="nombreStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="apellido">
                            Apellido <span class="required">*</span>
                        </label>
                        <input type="text" id="apellido" name="apellido" value="<?= htmlspecialchars($usuario['apellido']) ?>" required>
                        <div class="input-status" id="apellidoStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="dni">
                            DNI <span class="required">*</span>
                        </label>
                        <input type="text" id="dni" name="dni" value="<?= htmlspecialchars($usuario['dni']) ?>" required pattern="[0-9]{7,8}" title="El DNI debe tener 7 u 8 dígitos">
                        <div class="input-status" id="dniStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="contacto">
                            Contacto <span class="required">*</span>
                        </label>
                        <input type="tel" id="contacto" name="contacto" value="<?= htmlspecialchars($usuario['contacto']) ?>" required>
                        <div class="input-status" id="contactoStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="direccion">
                            Dirección <span class="required">*</span>
                        </label>
                        <textarea id="direccion" name="direccion" required placeholder="Ingrese la dirección completa"><?= htmlspecialchars($usuario['direccion']) ?></textarea>
                        <div class="input-status" id="direccionStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="rol">
                            Rol <span class="required">*</span>
                        </label>
                        <select id="rol" name="rol" required>
                            <option value="">Seleccionar rol</option>
                            <option value="3" <?= $usuario['rol'] == 3 ? 'selected' : '' ?>>Administrador</option>
                            <option value="2" <?= $usuario['rol'] == 2 ? 'selected' : '' ?>>Seguridad</option>
                            <option value="1" <?= $usuario['rol'] == 1 ? 'selected' : '' ?>>Residente</option>
                        </select>
                        <div class="input-status" id="rolStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="id_parcela">
                            Número de Parcela
                        </label>
                        <input type="number" id="id_parcela" name="id_parcela" value="<?= htmlspecialchars($usuario['id_parcela']) ?>" min="1" placeholder="Número de parcela">
                        <div class="input-status" id="parcelaStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="nro_carnet">
                            Número de Carnet
                        </label>
                        <input type="number" id="nro_carnet" name="nro_carnet" value="<?= htmlspecialchars($usuario['nro_carnet']) ?>" min="1" placeholder="Número de carnet">
                        <div class="input-status" id="carnetStatus"></div>
                    </div>

                    <div class="form-group">
                        <label for="clave_usuario">
                            Clave <span class="required">*</span>
                        </label>
                        <input type="password" id="clave_usuario" name="clave_usuario" value="<?= htmlspecialchars($usuario['clave_usuario']) ?>" required minlength="6">
                        <div class="input-status" id="claveStatus"></div>
                    </div>

                    <div class="form-buttons">
                        <a href="UserList.php" class="btn btn-secondary">
                            <img src="../../assets/icons/cancelar.png" alt="Cancelar">
                            Cancelar
                        </a>
                        <button type="submit" class="btn btn-primary" id="submitBtn">
                            <img src="../../assets/icons/actualizardatos.png" alt="Guardar">
                            Actualizar Usuario
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

            // Validación en tiempo real
            const form = document.getElementById('editarForm');
            const inputs = form.querySelectorAll('input, select, textarea');

            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    validateField(this);
                });

                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });

            // Validación del formulario
            form.addEventListener('submit', function(e) {
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                }
            });

            function validateField(field) {
                const statusDiv = document.getElementById(field.id + 'Status');
                let isValid = true;
                let message = '';

                // Validación específica por campo
                switch(field.id) {
                    case 'nombre':
                    case 'apellido':
                        if (!field.value.trim()) {
                            isValid = false;
                            message = 'Este campo es obligatorio';
                        } else if (field.value.length < 2) {
                            isValid = false;
                            message = 'Debe tener al menos 2 caracteres';
                        } else {
                            message = 'Válido';
                        }
                        break;

                    case 'dni':
                        if (!field.value.trim()) {
                            isValid = false;
                            message = 'El DNI es obligatorio';
                        } else if (!/^\d{7,8}$/.test(field.value)) {
                            isValid = false;
                            message = 'El DNI debe tener 7 u 8 dígitos';
                        } else {
                            message = 'DNI válido';
                        }
                        break;

                    case 'contacto':
                        if (!field.value.trim()) {
                            isValid = false;
                            message = 'El contacto es obligatorio';
                        } else if (field.value.length < 10) {
                            isValid = false;
                            message = 'Número de contacto muy corto';
                        } else {
                            message = 'Contacto válido';
                        }
                        break;

                    case 'direccion':
                        if (!field.value.trim()) {
                            isValid = false;
                            message = 'La dirección es obligatoria';
                        } else if (field.value.length < 5) {
                            isValid = false;
                            message = 'Dirección muy corta';
                        } else {
                            message = 'Dirección válida';
                        }
                        break;

                    case 'rol':
                        if (!field.value) {
                            isValid = false;
                            message = 'Debe seleccionar un rol';
                        } else {
                            message = 'Rol seleccionado';
                        }
                        break;

                    case 'clave_usuario':
                        if (!field.value.trim()) {
                            isValid = false;
                            message = 'La clave es obligatoria';
                        } else if (field.value.length < 6) {
                            isValid = false;
                            message = 'La clave debe tener al menos 6 caracteres';
                        } else {
                            message = 'Clave válida';
                        }
                        break;

                    case 'id_parcela':
                    case 'nro_carnet':
                        if (field.value && field.value < 1) {
                            isValid = false;
                            message = 'Debe ser un número positivo';
                        } else if (field.value) {
                            message = 'Número válido';
                        }
                        break;
                }

                // Aplicar estilos de validación
                if (statusDiv) {
                    statusDiv.textContent = message;
                    statusDiv.className = 'input-status ' + (isValid ? 'success' : 'error');
                }

                return isValid;
            }
        });
    </script>
</body>
</html>
