<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$endpoint = "https://api.bringfeel.com.ar/bg/v1/auth/validator";

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-key: hola"
]);

//usa las cookies guardadas en login.php
curl_setopt($ch, CURLOPT_COOKIEFILE, __DIR__ . '/cookies.txt');
curl_exec($ch);

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

//si la sesión no es vslida, redirige al login
if ($httpCode !== 200) {
    header("Location: ../../login.html");
    exit;
}
?>
