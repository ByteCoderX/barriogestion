<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();

$id = $_GET['id'] ?? null;
if ($id) {
    $model->eliminar($id);
}
header('Location: UserList.php');
