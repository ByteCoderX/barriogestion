<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();

$id = $_GET['id'] ?? null;
if (!$id) exit('ID no válido');

$usuario = $model->obtenerPorId($id);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $model->actualizar($id, $_POST);
    header('Location: listUsers.php');
    exit;
}
?>

<h2>Editar Usuario</h2>
<form method="POST">
    Nombre: <input name="nombre" value="<?= $usuario['nombre'] ?>"><br>
    Apellido: <input name="apellido" value="<?= $usuario['apellido'] ?>"><br>
    Dirección: <input name="direccion" value="<?= $usuario['direccion'] ?>"><br>
    Contacto: <input name="contacto" value="<?= $usuario['contacto'] ?>"><br>
    Rol: <input name="rol" type="number" value="<?= $usuario['rol'] ?>"><br>
    Parcela: <input name="id_parcela" type="number" value="<?= $usuario['id_parcela'] ?>"><br>
    DNI: <input name="dni" value="<?= $usuario['dni'] ?>"><br>
    Clave: <input name="clave_usuario" value="<?= $usuario['clave_usuario'] ?>"><br>
    Carnet: <input name="nro_carnet" type="number" value="<?= $usuario['nro_carnet'] ?>"><br>
    <button type="submit">Actualizar</button>
</form>
