<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_COOKIE['refreshToken'])) {
    header("Location: ../../login.html");
    exit;
}

function cargarSettings() {
    $rootPath = dirname(__DIR__, 2);
    $json = file_get_contents($rootPath . '/settings.json');
    return json_decode($json, true);
}

$settings = cargarSettings();
$apiUrl = $settings['API_URL'];

$refreshToken=$_COOKIE['refreshToken'];
$endpoint = $apiUrl . '/bg/v1/auth/validator';

$ch=curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-key: hola",
    "Cookie: refreshToken=$refreshToken"
]);
$response=curl_exec($ch);
$httpCode=curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    header("Location: ../../login.html");
    exit;
}
?>
