<?php
require_once 'UsuarioModel.php';
$model = new UsuarioModel();
$usuarios = $model->obtenerTodos();
?>

<h2>Lista de Usuarios</h2>
<a href="create.php">Agregar Usuario</a>
<table border="1">
    <tr>
        <th>ID</th><th>Nombre</th><th>Apellido</th><th>Acciones</th>
    </tr>
    <?php foreach ($usuarios as $u): ?>
        <tr>
            <td><?= $u['id_usuario'] ?></td>
            <td><?= $u['nombre'] ?></td>
            <td><?= $u['apellido'] ?></td>
            <td>
                <a href="editar.php?id=<?= $u['id_usuario'] ?>">Editar</a> |
                <a href="eliminar.php?id=<?= $u['id_usuario'] ?>" onclick="return confirm('¿Seguro?')">Eliminar</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
