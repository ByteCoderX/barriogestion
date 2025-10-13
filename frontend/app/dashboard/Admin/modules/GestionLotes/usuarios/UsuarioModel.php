<?php
require_once '../../../../Utils/database/connection.php';

class UsuarioModel {
    private $pdo;

    public function __construct() {
        $this->pdo = conectarDB();
    }

    public function obtenerTodos() {
        $stmt = $this->pdo->query("SELECT * FROM usuarios");
        return $stmt->fetchAll();
    }

    public function obtenerPorId($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE id_usuario = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function insertar($datos) {
        $stmt = $this->pdo->prepare("INSERT INTO usuarios (nombre, apellido, direccion, contacto, rol, id_parcela, dni, clave_usuario, nro_carnet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $passAndDni = $datos['clave_usuario'] . $datos['dni'];
        $passHashed = password_hash($passAndDni, PASSWORD_DEFAULT);

        return $stmt->execute([
            $datos['nombre'], $datos['apellido'], $datos['direccion'],
            $datos['contacto'], $datos['rol'], $datos['id_parcela'],
            $datos['dni'], $passHashed, $datos['nro_carnet']
        ]);
    }

    public function actualizar($id, $datos) {
        $stmt = $this->pdo->prepare("UPDATE usuarios SET nombre=?, apellido=?, direccion=?, contacto=?, rol=?, id_parcela=?, dni=?, clave_usuario=?, nro_carnet=? WHERE id_usuario=?");
        return $stmt->execute([
            $datos['nombre'], $datos['apellido'], $datos['direccion'],
            $datos['contacto'], $datos['rol'], $datos['id_parcela'],
            $datos['dni'], $datos['clave_usuario'], $datos['nro_carnet'], $id
        ]);
    }

    public function eliminar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM usuarios WHERE id_usuario = ?");
        return $stmt->execute([$id]);
    }
}