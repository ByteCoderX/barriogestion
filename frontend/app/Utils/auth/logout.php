<?php
require '../../config/config.php';

// Iniciamos la sesion
session_start();

if(!isset($_SESSION['usuario'])){
    header("location:$loginURL");
}

// Destruir todo en esta sesión
session_destroy();

header("Location:$loginURL");
?>