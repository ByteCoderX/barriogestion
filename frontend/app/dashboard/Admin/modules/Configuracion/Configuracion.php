<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador - Configuración</title>
    <link rel="stylesheet" href="../../index.css">
    <link rel="stylesheet" href="Configuracion.css">
</head>
<body>
    <?php include '../../includes/header.php'; ?>

    <div class="container">

        <!-- Sección Seguridad -->
        <div id="seguridad" class="config-section active">
            <h2 class="section-title">Configuración de Seguridad</h2>

            <div class="security-info">
                <strong>Importante:</strong> Como administrador, es crucial mantener una contraseña segura. 
                Utiliza una combinación de letras mayúsculas, minúsculas, números y símbolos.
            </div>

            <form id="passwordForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="currentPassword">Contraseña Actual *</label>
                        <input type="password" id="currentPassword" name="currentPassword" required placeholder="Ingrese su contraseña actual">
                    </div>
                    
                    <div class="form-group">
                        <label for="newPassword">Nueva Contraseña *</label>
                        <input type="password" id="newPassword" name="newPassword" required placeholder="Mínimo 8 caracteres">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Nueva Contraseña *</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirme la nueva contraseña">
                    </div>
                </div>

                <div class="password-requirements">
                    <h4>Requisitos de la contraseña:</h4>
                    <ul>
                        <li id="req-length">Mínimo 8 caracteres</li>
                        <li id="req-uppercase">Al menos una letra mayúscula</li>
                        <li id="req-lowercase">Al menos una letra minúscula</li>
                        <li id="req-number">Al menos un número</li>
                        <li id="req-special">Al menos un carácter especial (!@#$%^&*)</li>
                    </ul>
                </div>
                
                <button type="submit" class="btn">Cambiar Contraseña</button>
            </form>

            <hr style="margin: 2rem 0; border: 1px solid rgba(255, 255, 255, 0.1);">

            <h3 style="color: #ffffff; margin-bottom: 1rem;">Preguntas de Seguridad</h3>
            <p style="color: #d4d4d4; margin-bottom: 1rem;">Las preguntas de seguridad te ayudarán a recuperar tu cuenta en caso de olvido de contraseña.</p>
            
            <form id="securityQuestionsForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="question1">Pregunta 1 *</label>
                        <select id="question1" name="question1" required>
                            <option value="">Seleccionar pregunta...</option>
                            <option value="mascota">¿Cuál era el nombre de tu primera mascota?</option>
                            <option value="escuela">¿Cuál era el nombre de tu escuela primaria?</option>
                            <option value="madre">¿Cuál es el nombre de soltera de tu madre?</option>
                            <option value="ciudad">¿En qué ciudad naciste?</option>
                            <option value="color">¿Cuál es tu color favorito?</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="answer1">Respuesta 1 *</label>
                        <input type="text" id="answer1" name="answer1" required placeholder="Ingrese su respuesta">
                    </div>
                    
                    <div class="form-group">
                        <label for="question2">Pregunta 2 *</label>
                        <select id="question2" name="question2" required>
                            <option value="">Seleccionar pregunta...</option>
                            <option value="comida">¿Cuál es tu comida favorita?</option>
                            <option value="libro">¿Cuál es tu libro favorito?</option>
                            <option value="profesor">¿Cuál era el nombre de tu profesor favorito?</option>
                            <option value="trabajo">¿Cuál fue tu primer trabajo?</option>
                            <option value="calle">¿En qué calle vivías cuando eras niño?</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="answer2">Respuesta 2 *</label>
                        <input type="text" id="answer2" name="answer2" required placeholder="Ingrese su respuesta">
                    </div>
                </div>
                
                <button type="submit" class="btn">Guardar Preguntas de Seguridad</button>
            </form>

            <hr style="margin: 2rem 0; border: 1px solid rgba(255, 255, 255, 0.1);">

            <h3 style="color: #ffffff; margin-bottom: 1rem;">Historial de Cambios</h3>
            <div class="history-container" id="historyContainer">
                <p style="color: #d4d4d4; text-align: center; padding: 2rem;">No hay cambios registrados</p>
            </div>
        </div>
    </div>

    <script src="Configuracion.js"></script>
</body>
</html>