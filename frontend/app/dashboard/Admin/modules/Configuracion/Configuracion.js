// Datos del administrador en memoria
let adminData = {
    password: 'admin123',
    pregunta1: '',
    respuesta1: '',
    pregunta2: '',
    respuesta2: ''
};

let history = [];

// Función para agregar entrada al historial
function addHistoryEntry(action) {
    const entry = {
        action,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    history.unshift(entry);
    
    // Mantener solo los últimos 10 registros
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    updateHistoryDisplay();
}

// Actualizar visualización del historial
function updateHistoryDisplay() {
    const container = document.getElementById('historyContainer');
    
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = '<p style="color: #d4d4d4; text-align: center; padding: 2rem;">No hay cambios registrados</p>';
        return;
    }

    container.innerHTML = history.map(entry => `
        <div class="history-item">
            <div class="history-icon">
                <img src="../../assets/icons/candado.svg" alt="icono">
            </div>
            <div class="history-content">
                <div class="history-action">${entry.action}</div>
                <div class="history-date">${entry.date}</div>
            </div>
        </div>
    `).join('');
}

// Función para mostrar alertas
function showAlert(message, type = 'success') {
    // Crear contenedor de alertas si no existe
    let alertContainer = document.getElementById('alertContainer');
    
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alertContainer';
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '100px';
        alertContainer.style.left = '50%';
        alertContainer.style.transform = 'translateX(-50%)';
        alertContainer.style.zIndex = '9999';
        alertContainer.style.width = '90%';
        alertContainer.style.maxWidth = '600px';
        document.body.appendChild(alertContainer);
    }
    
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-error' : 'alert-info';
    
    const iconSrc = type === 'success' ? '../../assets/icons/candado.svg' : 
                    type === 'error' ? '../../assets/icons/error.svg' : '../../assets/icons/info.svg';
    
    alertContainer.innerHTML = `
        <div class="alert ${alertClass}" style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="alert-icon"><img src="${iconSrc}" alt="icono"></span>
            <span>${message}</span>
        </div>
    `;
    
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
    
    // Scroll hacia arriba para ver la alerta
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Activar el botón correspondiente si se hizo clic
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    // Cargar datos específicos de la sección
    loadSectionData(sectionName);
};

// Cargar datos de la sección
function loadSectionData(section) {
    if (section === 'seguridad') {
        // Cargar preguntas de seguridad si existen
        const question1 = document.getElementById('question1');
        const answer1 = document.getElementById('answer1');
        const question2 = document.getElementById('question2');
        const answer2 = document.getElementById('answer2');
        
        if (question1 && adminData.pregunta1) {
            question1.value = adminData.pregunta1;
        }
        if (answer1 && adminData.respuesta1) {
            answer1.value = adminData.respuesta1;
        }
        if (question2 && adminData.pregunta2) {
            question2.value = adminData.pregunta2;
        }
        if (answer2 && adminData.respuesta2) {
            answer2.value = adminData.respuesta2;
        }
        
        // Actualizar historial
        updateHistoryDisplay();
    }
}

// Validación de contraseña segura
function validatePasswordStrength(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Actualizar UI de requisitos
    updateRequirement('req-length', requirements.length);
    updateRequirement('req-uppercase', requirements.uppercase);
    updateRequirement('req-lowercase', requirements.lowercase);
    updateRequirement('req-number', requirements.number);
    updateRequirement('req-special', requirements.special);

    return Object.values(requirements).every(req => req === true);
}

function updateRequirement(elementId, isMet) {
    const element = document.getElementById(elementId);
    if (element) {
        const originalText = element.textContent.replace(/^[^\w\s]*\s*/, '');
        if (isMet) {
            element.style.color = '#00ff88';
            element.innerHTML = '<span class="req-icon req-check"><img src="../../assets/icons/tick.svg" alt="check"></span> ' + originalText;
        } else {
            element.style.color = '#ff4444';
            element.innerHTML = '<span class="req-icon req-error"><img src="../../assets/icons/error.svg" alt="error"></span> ' + originalText;
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los requisitos de contraseña
    const requirements = ['length', 'uppercase', 'lowercase', 'number', 'special'];
    requirements.forEach(req => {
        updateRequirement(`req-${req}`, false);
    });
    
    // Cargar datos iniciales
    loadSectionData('seguridad');
    
    // Validación en tiempo real de la nueva contraseña
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
        });
    }

    // Manejo del formulario de cambio de contraseña
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const passwordData = Object.fromEntries(formData);
            
            // Verificar contraseña actual
            if (passwordData.currentPassword !== adminData.password) {
                showAlert('La contraseña actual es incorrecta', 'error');
                return;
            }

            // Verificar que las nuevas contraseñas coincidan
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                showAlert('Las nuevas contraseñas no coinciden', 'error');
                return;
            }

            // Verificar que la nueva contraseña sea diferente a la actual
            if (passwordData.newPassword === passwordData.currentPassword) {
                showAlert('La nueva contraseña debe ser diferente a la actual', 'error');
                return;
            }

            // Validar fortaleza de la contraseña
            if (!validatePasswordStrength(passwordData.newPassword)) {
                showAlert('La nueva contraseña no cumple con los requisitos de seguridad', 'error');
                return;
            }

            // Actualizar contraseña
            adminData.password = passwordData.newPassword;
            addHistoryEntry('Contraseña actualizada');
            
            showAlert('Contraseña cambiada correctamente. Por seguridad, se recomienda cerrar sesión e iniciar con la nueva contraseña.', 'success');
            
            // Limpiar formulario
            this.reset();
            
            // Resetear los indicadores de requisitos
            requirements.forEach(req => {
                updateRequirement(`req-${req}`, false);
            });
        });
    }

    // Manejo del formulario de preguntas de seguridad
    const securityQuestionsForm = document.getElementById('securityQuestionsForm');
    if (securityQuestionsForm) {
        securityQuestionsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const securityData = Object.fromEntries(formData);
            
            // Validar que ambas preguntas estén completas
            if (!securityData.question1 || !securityData.answer1 || 
                !securityData.question2 || !securityData.answer2) {
                showAlert('Por favor complete ambas preguntas y respuestas', 'error');
                return;
            }

            // Validar que las preguntas sean diferentes
            if (securityData.question1 === securityData.question2) {
                showAlert('Las preguntas de seguridad deben ser diferentes', 'error');
                return;
            }

            // Validar que las respuestas tengan al menos 3 caracteres
            if (securityData.answer1.length < 3 || securityData.answer2.length < 3) {
                showAlert('Las respuestas deben tener al menos 3 caracteres', 'error');
                return;
            }

            // Actualizar preguntas de seguridad
            adminData.pregunta1 = securityData.question1;
            adminData.respuesta1 = securityData.answer1;
            adminData.pregunta2 = securityData.question2;
            adminData.respuesta2 = securityData.answer2;
            
            addHistoryEntry('Preguntas de seguridad actualizadas');
            showAlert('Preguntas de seguridad guardadas correctamente', 'success');
        });
    }

    // Manejo del menú hamburguesa si existe
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Prevenir que el usuario salga sin guardar cambios
let formChanged = false;

// Detectar cambios en formularios
setTimeout(() => {
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', () => {
            formChanged = true;
        });
    });

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            formChanged = false;
        });
    });
}, 500);

window.addEventListener('beforeunload', (e) => {
    if (formChanged) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});