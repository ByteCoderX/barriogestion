<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuario - Configuración</title>
    <link rel="stylesheet" href="../../index.css?v=18">
    <link rel="stylesheet" href="Configuracion.css?v=17">
</head>
<body>
    <?php include '../../includes/header.php'; ?>

    <div class="container">
        <!-- Navegación de configuración -->
        <div class="settings-nav">
            <div class="nav-buttons">
                <button class="nav-btn active" onclick="showSection('perfil')">Perfil</button>
                <button class="nav-btn" onclick="showSection('seguridad')">Seguridad</button>
                <button class="nav-btn" onclick="showSection('notificaciones')">Notificaciones</button>
            </div>
        </div>

        <div id="alertContainer"></div>

        <!-- Sección Perfil -->
        <div id="perfil" class="config-section active">
            <h2 class="section-title">Configuración del Perfil</h2>

            <form id="perfilForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="telefono">Teléfono *</label>
                        <input type="tel" id="telefono" name="telefono" value="<?php echo $_SESSION['barriogestion']['userdata']['contact']; ?>" required placeholder="Ej: +54 9 11 1234-5678">
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" value="<?php echo $_SESSION['barriogestion']['userdata']['email']; ?>" required placeholder="email@ejemplo.com">
                    </div>
                </div>

                <button type="submit" class="btn">Guardar Cambios</button>
            </form>
        </div>

        <!-- Sección Seguridad -->
        <div id="seguridad" class="config-section">
            <h2 class="section-title">Configuración de Seguridad</h2>

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
                
                <button type="submit" class="btn">Cambiar Contraseña</button>
            </form>

            <hr style="margin: 2rem 0; border: 1px solid rgba(255, 255, 255, 0.1);">

            <h3 style="color: #ffffff; margin-bottom: 1rem;">Preguntas de Seguridad</h3>
            <form id="securityQuestionsForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="question1">Pregunta 1</label>
                        <select id="question1" name="question1">
                            <option value="">Seleccionar pregunta...</option>
                            <option value="mascota">¿Cuál era el nombre de tu primera mascota?</option>
                            <option value="escuela">¿Cuál era el nombre de tu escuela primaria?</option>
                            <option value="madre">¿Cuál es el nombre de soltera de tu madre?</option>
                            <option value="ciudad">¿En qué ciudad naciste?</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="answer1">Respuesta 1</label>
                        <input type="text" id="answer1" name="answer1" placeholder="Ingrese su respuesta">
                    </div>
                    
                    <div class="form-group">
                        <label for="question2">Pregunta 2</label>
                        <select id="question2" name="question2">
                            <option value="">Seleccionar pregunta...</option>
                            <option value="comida">¿Cuál es tu comida favorita?</option>
                            <option value="libro">¿Cuál es tu libro favorito?</option>
                            <option value="profesor">¿Cuál era el nombre de tu profesor favorito?</option>
                            <option value="trabajo">¿Cuál fue tu primer trabajo?</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="answer2">Respuesta 2</label>
                        <input type="text" id="answer2" name="answer2" placeholder="Ingrese su respuesta">
                    </div>
                </div>
                
                <button type="submit" class="btn">Guardar Preguntas de Seguridad</button>
            </form>
        </div>

        <!-- Sección Notificaciones -->
        <div id="notificaciones" class="config-section">
            <h2 class="section-title">Configuración de Notificaciones</h2>


            <h3 style="color: #ffffff; margin-bottom: 1rem;">Notificaciones de Visitas</h3>
            
            <div class="switch-container">
                <span class="switch-label">Notificar cuando llegue una visita</span>
                <label class="switch">
                    <input type="checkbox" id="visitaNotification" checked>
                    <span class="slider"></span>
                </label>
            </div>

            <div class="switch-container">
                <span class="switch-label">Enviar notificación por Email</span>
                <label class="switch">
                    <input type="checkbox" id="emailNotification" checked>
                    <span class="slider"></span>
                </label>
            </div>

            <div class="switch-container">
                <span class="switch-label">Enviar notificación por WhatsApp</span>
                <label class="switch">
                    <input type="checkbox" id="whatsappNotification">
                    <span class="slider"></span>
                </label>
            </div>

            <h3 style="color: #ffffff; margin: 2rem 0 1rem 0;">Notificaciones del Sistema</h3>

            <div class="switch-container">
                <span class="switch-label">Notificaciones de expensas</span>
                <label class="switch">
                    <input type="checkbox" id="expensasNotification" checked>
                    <span class="slider"></span>
                </label>
            </div>

            <div class="switch-container">
                <span class="switch-label">Recordatorios de vencimientos</span>
                <label class="switch">
                    <input type="checkbox" id="vencimientosNotification" checked>
                    <span class="slider"></span>
                </label>
            </div>

            <div class="switch-container">
                <span class="switch-label">Novedades y anuncios del barrio</span>
                <label class="switch">
                    <input type="checkbox" id="anunciosNotification" checked>
                    <span class="slider"></span>
                </label>
            </div>

            <div class="switch-container">
                <span class="switch-label">Notificaciones de mantenimiento</span>
                <label class="switch">
                    <input type="checkbox" id="mantenimientoNotification">
                    <span class="slider"></span>
                </label>
            </div>

            <h3 style="color: #ffffff; margin: 2rem 0 1rem 0;">Configuración de Horarios</h3>
            
            <form id="notificationScheduleForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="horaInicio">No molestar desde</label>
                        <input type="time" id="horaInicio" name="horaInicio" value="22:00">
                    </div>
                    
                    <div class="form-group">
                        <label for="horaFin">No molestar hasta</label>
                        <input type="time" id="horaFin" name="horaFin" value="08:00">
                    </div>
                    
                    <div class="form-group">
                        <label for="frecuenciaVisitas">Frecuencia notificaciones de visitas</label>
                        <select id="frecuenciaVisitas" name="frecuenciaVisitas">
                            <option value="inmediata">Inmediata</option>
                            <option value="cada_5min">Cada 5 minutos</option>
                            <option value="cada_15min">Cada 15 minutos</option>
                            <option value="cada_30min">Cada 30 minutos</option>
                            <option value="solo_resumen">Solo resumen diario</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" class="btn">Guardar Configuración de Horarios</button>
            </form>
        </div>
    </div>

    

    <script>
        // Base de datos del usuario (simulada con localStorage)
        class ConfiguracionUsuarioDB {
            constructor() {
                this.storageKey = 'barrio_gestion_config';
                this.loadUserData();
            }

            loadUserData() {
                try {
                    const savedData = localStorage.getItem(this.storageKey);
                    if (savedData) {
                        this.userData = JSON.parse(savedData);
                    } else {
                        this.initializeDefaultData();
                    }
                } catch (error) {
                    console.error('Error cargando configuración:', error);
                    this.initializeDefaultData();
                }
            }

            initializeDefaultData() {
                this.userData = {
                    perfil: {
                        nombre: 'Juan Pérez',
                        telefono: '+54 9 11 1234-5678',
                        email: 'juan.perez@email.com',
                        lote: 'Lote 15',
                        foto: null
                    },
                    seguridad: {
                        password: 'mi_password_123',
                        pregunta1: '',
                        respuesta1: '',
                        pregunta2: '',
                        respuesta2: ''
                    },
                    notificaciones: {
                        visitaNotification: true,
                        emailNotification: true,
                        whatsappNotification: false,
                        expensasNotification: true,
                        vencimientosNotification: true,
                        anunciosNotification: true,
                        mantenimientoNotification: false,
                        horaInicio: '22:00',
                        horaFin: '08:00',
                        frecuenciaVisitas: 'inmediata'
                    }
                };
                this.saveData();
            }

            saveData() {
                try {
                    localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
                } catch (error) {
                    console.error('Error guardando configuración:', error);
                }
            }

            updatePerfil(data) {
                this.userData.perfil = { ...this.userData.perfil, ...data };
                this.saveData();
            }

            updateSeguridad(data) {
                this.userData.seguridad = { ...this.userData.seguridad, ...data };
                this.saveData();
            }

            updateNotificaciones(data) {
                this.userData.notificaciones = { ...this.userData.notificaciones, ...data };
                this.saveData();
            }

            getUserData() {
                return this.userData;
            }
        }

        // Inicializar base de datos
        const configDB = new ConfiguracionUsuarioDB();
        let passwordVisible = false;

        // Referencias DOM
        const alertContainer = document.getElementById('alertContainer');

        // Función para mostrar alertas
        function showAlert(message, type = 'success') {
            alertContainer.innerHTML = `
                <div class="alert alert-${type}">
                    ${message}
                </div>
            `;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 5000);
        }

        // Función para mostrar secciones
        window.showSection = function(sectionName) {
            // Ocultar todas las secciones
            const sections = document.querySelectorAll('.config-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Remover clase active de todos los botones
            const buttons = document.querySelectorAll('.nav-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Mostrar la sección seleccionada
            document.getElementById(sectionName).classList.add('active');
            
            // Activar el botón correspondiente
            event.target.classList.add('active');

            // Cargar datos específicos de la sección
            loadSectionData(sectionName);
        };

        // Cargar datos de cada sección
        function loadSectionData(section) {
            const userData = configDB.getUserData();
            
            if (section === 'perfil') {
                document.getElementById('nombre').value = userData.perfil.nombre;
                document.getElementById('telefono').value = userData.perfil.telefono;
                document.getElementById('email').value = userData.perfil.email;
                document.getElementById('lote').value = userData.perfil.lote;
                
                if (userData.perfil.foto) {
                    document.getElementById('profilePhoto').innerHTML = `<img src="${userData.perfil.foto}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                }
            } else if (section === 'notificaciones') {
                const notifications = userData.notificaciones;
                document.getElementById('visitaNotification').checked = notifications.visitaNotification;
                document.getElementById('emailNotification').checked = notifications.emailNotification;
                document.getElementById('whatsappNotification').checked = notifications.whatsappNotification;
                document.getElementById('expensasNotification').checked = notifications.expensasNotification;
                document.getElementById('vencimientosNotification').checked = notifications.vencimientosNotification;
                document.getElementById('anunciosNotification').checked = notifications.anunciosNotification;
                document.getElementById('mantenimientoNotification').checked = notifications.mantenimientoNotification;
                document.getElementById('horaInicio').value = notifications.horaInicio;
                document.getElementById('horaFin').value = notifications.horaFin;
                document.getElementById('frecuenciaVisitas').value = notifications.frecuenciaVisitas;
            }
        }

        // Manejo de foto de perfil
        document.getElementById('photoInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const photoContainer = document.getElementById('profilePhoto');
                    photoContainer.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                    
                    // Guardar en la configuración
                    configDB.updatePerfil({ foto: e.target.result });
                    showAlert('Foto de perfil actualizada correctamente', 'success');
                };
                reader.readAsDataURL(file);
            }
        });

        // Función para eliminar foto
        window.removePhoto = function() {
            document.getElementById('profilePhoto').innerHTML = '👤';
            configDB.updatePerfil({ foto: null });
            showAlert('Foto de perfil eliminada', 'success');
        };

        // Función para mostrar/ocultar contraseña
        window.togglePassword = function() {
            const passwordDisplay = document.getElementById('passwordDisplay');
            const userData = configDB.getUserData();
            
            if (passwordVisible) {
                passwordDisplay.textContent = '••••••••••••';
                passwordVisible = false;
            } else {
                passwordDisplay.textContent = userData.seguridad.password;
                passwordVisible = true;
            }
        };

        // Manejo de formularios
        document.getElementById('perfilForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const perfilData = Object.fromEntries(formData);
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(perfilData.email)) {
                showAlert('Por favor ingrese un email válido', 'error');
                return;
            }

            // Validar teléfono argentino
            const phoneRegex = /^\+54\s9\s\d{2,4}\s\d{4}-\d{4}$/;
            if (!phoneRegex.test(perfilData.telefono)) {
                showAlert('El teléfono debe tener formato argentino: +54 9 11 1234-5678', 'error');
                return;
            }

            configDB.updatePerfil(perfilData);
            showAlert('Perfil actualizado correctamente', 'success');
        });

        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const passwordData = Object.fromEntries(formData);
            const userData = configDB.getUserData();
            
            // Verificar contraseña actual
            if (passwordData.currentPassword !== userData.seguridad.password) {
                showAlert('La contraseña actual es incorrecta', 'error');
                return;
            }

            // Verificar que las nuevas contraseñas coincidan
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                showAlert('Las nuevas contraseñas no coinciden', 'error');
                return;
            }

            // Verificar longitud mínima
            if (passwordData.newPassword.length < 8) {
                showAlert('La nueva contraseña debe tener al menos 8 caracteres', 'error');
                return;
            }

            configDB.updateSeguridad({ password: passwordData.newPassword });
            showAlert('✅ Contraseña cambiada correctamente', 'success');
            this.reset();
        });

        document.getElementById('securityQuestionsForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const securityData = Object.fromEntries(formData);
            
            // Validar que ambas preguntas estén completas
            if (!securityData.question1 || !securityData.answer1 || 
                !securityData.question2 || !securityData.answer2) {
                showAlert('Por favor complete ambas preguntas y respuestas', 'error');
                return;
            }

            configDB.updateSeguridad({
                pregunta1: securityData.question1,
                respuesta1: securityData.answer1,
                pregunta2: securityData.question2,
                respuesta2: securityData.answer2
            });
            
            showAlert('Preguntas de seguridad guardadas correctamente', 'success');
        });

        document.getElementById('notificationScheduleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const scheduleData = Object.fromEntries(formData);
            
            // Obtener estados de todos los switches
            const notificationData = {
                ...scheduleData,
                visitaNotification: document.getElementById('visitaNotification').checked,
                emailNotification: document.getElementById('emailNotification').checked,
                whatsappNotification: document.getElementById('whatsappNotification').checked,
                expensasNotification: document.getElementById('expensasNotification').checked,
                vencimientosNotification: document.getElementById('vencimientosNotification').checked,
                anunciosNotification: document.getElementById('anunciosNotification').checked,
                mantenimientoNotification: document.getElementById('mantenimientoNotification').checked
            };
            
            configDB.updateNotificaciones(notificationData);
            showAlert('Configuración de notificaciones guardada correctamente', 'success');
        });

        // Guardar cambios de switches en tiempo real
        const switches = document.querySelectorAll('input[type="checkbox"]');
        switches.forEach(switch_ => {
            switch_.addEventListener('change', function() {
                const notificationData = {};
                notificationData[this.id] = this.checked;
                configDB.updateNotificaciones(notificationData);
            });
        });

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            loadSectionData('perfil');
            
            // Aplicar tema guardado
            const currentTheme = localStorage.getItem('theme') || 'dark';
            applyTheme(currentTheme);
            
            // Manejo del menú hamburguesa
            document.getElementById('hamburger').addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });

        // Funciones de tema
        function setTheme(theme) {
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        }

        function applyTheme(theme) {
            const body = document.body;
            
            // Remover todas las clases de tema
            body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
            
            // Aplicar el tema seleccionado
            if (theme === 'light') {
                body.classList.add('theme-light');
            } else if (theme === 'nature') {
                body.classList.add('theme-nature');
            }
            // El tema oscuro no necesita clase adicional (es el por defecto)
        }

        function toggleThemeMenu() {
            // Esta función puede ser usada si quieres controlar el menú por JavaScript
            // Por ahora el menú se controla con CSS hover
        }
    </script>
</body>
</html>