<?php
// get-user-data.php
session_start();

// Headers para AJAX
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Verificar si el usuario está logueado
    if (!isset($_SESSION['id_usuario'])) {
        throw new Exception('Usuario no autenticado');
    }

    
    
    $host = '127.0.0.1';
    $dbname = 'tesisde_v2';
    $username = 'tesisde';         
    $password = 'quepasalarva';             
    
    // Crear conexión PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener datos del usuario logueado
    $sql = "SELECT 
                id_usuario,
                nombre, 
                apellido, 
                direccion, 
                contacto, 
                rol, 
                id_parcela, 
                dni,
                password,
                NOW() as ultimo_acceso
            FROM usuarios 
            WHERE id_usuario = ?";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_SESSION['id_usuario']]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$usuario) {
        throw new Exception('Usuario no encontrado');
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'data' => $usuario,
        'message' => 'Datos cargados correctamente'
    ]);
    
} catch (Exception $e) {
    // Manejo de errores
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'data' => null
    ]);
}
?>