<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $model->insertar($_POST);
    header('Location: listUsers.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Usuario</title>
    <link rel="stylesheet" href="styles/create.css">
</head>
<body>

<div class="form-container">
    <h2>Agregar Usuario</h2>
    <form method="POST">
        <div class="form-grid">

            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input name="nombre" id="nombre" required>
            </div>

            <div class="form-group">
                <label for="apellido">Apellido</label>
                <input name="apellido" id="apellido" required>
            </div>

            <div class="form-group">
                <label for="direccion">Dirección</label>
                <input name="direccion" id="direccion" required>
            </div>

            <div class="form-group">
                <label for="contacto">Contacto</label>
                <input name="contacto" id="contacto" required>
            </div>

            <div class="form-group">
                <label for="rol">Rol</label>
                <input name="rol" id="rol" type="number" required>
            </div>

            <div class="form-group">
                <label for="id_parcela">Parcela</label>
                <input name="id_parcela" id="id_parcela" type="number" required>
            </div>

            <div class="form-group">
                <label for="dni">DNI</label>
                <input name="dni" id="dni" required>
            </div>

            <div class="form-group">
                <label for="clave_usuario">Clave</label>
                <input name="clave_usuario" id="clave_usuario" type="password" required>
            </div>

            <div class="form-group">
                <label for="nro_carnet">Carnet</label>
                <input name="nro_carnet" id="nro_carnet" type="number" required>
            </div>

        </div>

        <div class="btn-container">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="listUsers.php" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>

</body>
</html>
