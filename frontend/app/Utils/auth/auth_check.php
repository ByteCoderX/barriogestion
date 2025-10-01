<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

//bloquea si no hay sesion
if (!isset($_SESSION['dni']) || empty($_SESSION['dni'])) {
    header("Location: ../../login.html");
    exit;
}

//verifica acceso según el rol requerido
//$requiredAdmin se define en el index del dashboard
if (!isset($requiredAdmin)) $requiredAdmin = false;

if ($requiredAdmin && (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true)) {
    //intenta acceder a Admin siendo usuario normal
    header("Location: ../../dashboard/Cliente/");
    exit;
}

if (!$requiredAdmin && (isset($_SESSION['admin']) && $_SESSION['admin'] === true)) {
    //intenta acceder a Cliente siendo Admin
    header("Location: ../../dashboard/Admin/");
    exit;
}
?>
