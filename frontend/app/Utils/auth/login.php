<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../../login.html?error=metodo");
    exit;
}

$dni = trim($_POST['dni']);
$clave = trim($_POST['clave']);
$endpoint = "https://api.bringfeel.com.ar/bg/v1/auth/login";

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-key: hola"
]);

$data = json_encode([
    "dni" => $dni,
    "password" => $clave
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

//manejo de cookies
curl_setopt($ch, CURLOPT_COOKIEJAR, __DIR__ . '/cookies.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, __DIR__ . '/cookies.txt');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

//si login correcto
if ($httpCode === 200) {
    $userData = json_decode($response, true);

    $_SESSION['dni'] = $userData['dni'];
    $_SESSION['id'] = $userData['id'];
    $_SESSION['admin'] = $userData['admin'];

    //redirigir segun el rol
    if (!empty($userData['admin']) && $userData['admin'] === true) {
        header("Location: ../../dashboard/Admin/");
    } else {
        header("Location: ../../dashboard/Cliente/");
    }
    exit;
} else {
    header("Location: ../../login.html?error=credenciales");
    exit;
}
?>
