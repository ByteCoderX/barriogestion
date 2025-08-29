// Función para agregar animaciones
function addAnimations() {
    // Animación para los elementos de detalle
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('slide-in-left');
        }, 100 * index);
    });

    // Animación para las tarjetas de información adicional
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-in-right');
        }, 200 + (100 * index));
    });

    // Animación para los botones de acción
    setTimeout(() => {
        const actionButtons = document.querySelectorAll('.btn-action');
        actionButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.add('fade-in');
            }, 50 * index);
        });
    }, 800);
}

// Función para configurar event listeners
function setupEventListeners() {
    setupActionButtons();
    setupNavigation();
    setupHoverEffects();
    setupRefreshButton();
}

// Función para configurar los botones de acción
function setupActionButtons() {
    const downloadBtn = document.querySelector('.btn-primary');
    const printBtn = document.querySelector('.btn-secondary');
    const shareBtn = document.querySelector('.btn-tertiary');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCarnet);
    }

    if (printBtn) {
        printBtn.addEventListener('click', printCarnet);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', shareCarnet);
    }
}

// Función para configurar la navegación
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los elementos
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Agregar clase active al elemento clickeado
            this.parentElement.classList.add('active');
            
            // Simular navegación (en una app real redirigiría)
            const itemText = this.textContent.trim();
            showNotification(`Navegando a: ${itemText}`, 'info');
        });
    });
}

// Función para configurar botón de actualizar
function setupRefreshButton() {
    // Agregar botón de refresh en el header del carnet
    const carnetHeader = document.querySelector('.carnet-header .carnet-title');
    if (carnetHeader && !document.getElementById('refresh-btn')) {
        const refreshBtn = document.createElement('button');
        refreshBtn.id = 'refresh-btn';
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
        refreshBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 8px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        refreshBtn.title = 'Actualizar datos';
        refreshBtn.addEventListener('click', refreshUserData);
        
        refreshBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.3)';
            this.style.transform = 'scale(1.1)';
        });
        
        refreshBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
            this.style.transform = 'scale(1)';
        });
        
        carnetHeader.style.position = 'relative';
        carnetHeader.appendChild(refreshBtn);
    }
}

// Función para configurar efectos hover mejorados
function setupHoverEffects() {
    const detailItems = document.querySelectorAll('.detail-item');
    
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Efecto especial para el carnet card
    const carnetCard = document.querySelector('.carnet-card');
    if (carnetCard) {
        carnetCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        carnetCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Función para descargar el carnet
function downloadCarnet() {
    if (!userData) {
        showNotification('No hay datos de usuario disponibles para descargar.', 'error');
        return;
    }

    const button = event.target.closest('.btn-primary');
    
    // Agregar estado de carga
    button.classList.add('loading');
    button.disabled = true;
    
    // Simular descarga
    setTimeout(() => {
        // En una aplicación real, esto generaría un PDF o imagen
        showNotification('¡Carnet descargado exitosamente!', 'success');
        
        // Crear datos para descarga
        const carnetData = {
            usuario: `${userData.nombre} ${userData.apellido}`,
            dni: userData.dni,
            parcela: userData.id_parcela,
            fecha: new Date().toLocaleDateString('es-AR')
        };
        
        // Simular descarga de archivo (en producción usarías una librería como jsPDF)
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(carnetData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `carnet_${userData.nombre}_${userData.apellido}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        
        // Remover estado de carga
        button.classList.remove('loading');
        button.disabled = false;
        
        // Efecto visual de éxito
        button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        setTimeout(() => {
            button.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        }, 2000);
        
    }, 2000);
}

// Función para imprimir el carnet
function printCarnet() {
    if (!userData) {
        showNotification('No hay datos de usuario disponibles para imprimir.', 'error');
        return;
    }

    const button = event.target.closest('.btn-secondary');
    
    // Efecto visual
    button.classList.add('loading');
    
    setTimeout(() => {
        // Abrir diálogo de impresión
        window.print();
        
        button.classList.remove('loading');
        showNotification('Preparando impresión...', 'info');
    }, 500);
}

// Función para compartir el carnet
function shareCarnet() {
    if (!userData) {
        showNotification('No hay datos de usuario disponibles para compartir.', 'error');
        return;
    }

    const button = event.target.closest('.btn-tertiary');
    
    // Efecto visual
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        
        const shareData = {
            title: 'Mi Carnet Digital',
            text: `Carnet de ${userData.nombre} ${userData.apellido} - Barrio Privado`,
            url: window.location.href
        };
        
        // Verificar si el navegador soporta Web Share API
        if (navigator.share) {
            navigator.share(shareData).then(() => {
                showNotification('¡Carnet compartido exitosamente!', 'success');
            }).catch((error) => {
                console.log('Error al compartir:', error);
                fallbackShare();
            });
        } else {
            // Fallback para navegadores que no soportan Web Share API
            fallbackShare();
        }
    }, 100);
}

// Función fallback para compartir
function fallbackShare() {
    // Copiar URL al portapapeles
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('¡URL copiada al portapapeles!', 'success');
        }).catch(() => {
            showShareModal();
        });
    } else {
        showShareModal();
    }
}

// Función para mostrar modal de compartir
function showShareModal() {
    const modal = createShareModal();
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Cerrar modal al hacer click fuera
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Función para crear modal de compartir
function createShareModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    const userName = userData ? `${userData.nombre} ${userData.apellido}` : 'Usuario';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-share-alt"></i> Compartir Carnet</h3>
                <button class="modal-close" onclick="closeModal(this.closest('.modal'))">&times;</button>
            </div>
            <div class="modal-body">
                <p>Compartir carnet de: <strong>${userName}</strong></p>
                <div style="display: flex; gap: 1rem; margin: 1.5rem 0; justify-content: center;">
                    <button onclick="shareVia('whatsapp')" style="background: #25D366; color: white; border: none; padding: 0.8rem 1.2rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button onclick="shareVia('email')" style="background: #3498db; color: white; border: none; padding: 0.8rem 1.2rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                    <button onclick="copyUrl()" style="background: #95a5a6; color: white; border: none; padding: 0.8rem 1.2rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-copy"></i> Copiar URL
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Función para cerrar modal
function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Función para compartir vía diferentes plataformas
function shareVia(platform) {
    const url = encodeURIComponent(window.location.href);
    const userName = userData ? `${userData.nombre} ${userData.apellido}` : 'Usuario';
    const text = encodeURIComponent(`Mi Carnet Digital - ${userName} - Barrio Privado`);
    
    let shareUrl;
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${text}&body=Ve mi carnet digital: ${decodeURIComponent(url)}`;
            break;
        default:
            copyUrl();
            return;
    }
    
    window.open(shareUrl, '_blank');
    closeModal(document.querySelector('.modal'));
    showNotification(`¡Compartiendo vía ${platform}!`, 'success');
}

// Función para copiar URL
function copyUrl() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            closeModal(document.querySelector('.modal'));
            showNotification('¡URL copiada al portapapeles!', 'success');
        }).catch(() => {
            fallbackCopyUrl(url);
        });
    } else {
        fallbackCopyUrl(url);
    }
}

// Función fallback para copiar URL
function fallbackCopyUrl(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        closeModal(document.querySelector('.modal'));
        showNotification('¡URL copiada al portapapeles!', 'success');
    } catch (err) {
        showNotification('No se pudo copiar la URL', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Función para mostrar notificaciones mejoradas
function showNotification(message, type = 'info') {
    // Remover notificación anterior si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        max-width: 350px;
    `;
    
    // Colores según el tipo
    const colors = {
        success: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #3498db, #2980b9)',
        warning: 'linear-gradient(135deg, #f39c12, #e67e22)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.8rem;">
            <i class="fas fa-${getIconForType(type)}" style="font-size: 1.2rem;"></i>
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.parentElement.style.transform='translateX(100%)'" 
                    style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.7; transition: opacity 0.3s;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }
    }, 5000);
}

// Función auxiliar para obtener iconos según el tipo
function getIconForType(type) {
    const icons = {
        success: 'check-circle',
        error: 'times-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

// Función para manejar errores globales
function handleGlobalError(error) {
    console.error('Error global:', error);
    showNotification('Ha ocurrido un error inesperado. Intente recargar la página.', 'error');
}

// Función para validar datos del usuario
function validateUserData(data) {
    const requiredFields = ['id_usuario', 'nombre', 'apellido', 'dni'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Campo requerido faltante: ${field}`);
        }
    }
    
    // Validaciones específicas
    if (data.dni && !/^\d{7,8}$/.test(data.dni.toString())) {
        console.warn('DNI parece tener formato incorrecto:', data.dni);
    }
    
    if (data.rol && (data.rol < 1 || data.rol > 5)) {
        console.warn('Rol fuera del rango esperado:', data.rol);
    }
    
    return true;
}

// Función para exportar datos como JSON (para debugging)
function exportUserData() {
    if (!userData) {
        showNotification('No hay datos para exportar', 'warning');
        return;
    }
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `datos_usuario_${userData.id_usuario}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    URL.revokeObjectURL(url);
    showNotification('Datos exportados correctamente', 'success');
}

// Función para debug - mostrar datos en consola
function debugUserData() {
    console.group('🔍 Debug - Datos del Usuario');
    console.log('userData:', userData);
    console.log('Elementos DOM actualizados:');
    
    const fields = ['user-id', 'user-nombre', 'user-apellido', 'user-dni', 'user-contacto', 'user-direccion', 'user-rol', 'user-parcela'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        console.log(`${field}:`, element ? element.textContent : 'No encontrado');
    });
    
    console.groupEnd();
}

// Event listeners para teclas de atajo (para desarrollo)
document.addEventListener('keydown', function(e) {
    // Ctrl + R = Refresh data
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        refreshUserData();
    }
    
    // Ctrl + D = Debug
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        debugUserData();
    }
    
    // Ctrl + E = Export data
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportUserData();
    }
});

// Manejo de errores no capturados
window.addEventListener('error', function(e) {
    handleGlobalError(e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    handleGlobalError(e.reason);
});

// Exportar funciones para uso global
window.downloadCarnet = downloadCarnet;
window.printCarnet = printCarnet;
window.shareCarnet = shareCarnet;
window.shareVia = shareVia;
window.copyUrl = copyUrl;
window.closeModal = closeModal;
window.refreshUserData = refreshUserData;
window.updateUserData = updateUserData;
window.debugUserData = debugUserData;
window.exportUserData = exportUserData;

// Mensaje de inicialización
console.log('🎯 Carnet Digital - Sistema inicializado correctamente');
console.log('💡 Atajos disponibles:');
console.log('   - Ctrl + R: Recargar datos');
console.log('   - Ctrl + D: Debug datos'); 
console.log('   - Ctrl + E: Exportar datos');// carnet.js - Funcionalidades dinámicas para Mi Carnet

// Variable global para almacenar datos del usuario
let userData = null;

// Configuración de la API (ajusta según tu backend)
const API_CONFIG = {
    baseUrl: '/api', // Cambia por tu URL de API
    endpoints: {
        userData: '/user/data',
        updateUser: '/user/update'
    }
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Función principal de inicialización
async function initializePage() {
    console.log('Inicializando página Mi Carnet...');
    
    try {
        // Mostrar loading en todos los campos
        showLoadingStates();
        
        // Intentar cargar datos del usuario
        await loadUserData();
        
        // Configurar funcionalidades una vez cargados los datos
        setupEventListeners();
        setCurrentDate();
        addAnimations();
        
    } catch (error) {
        console.error('Error al inicializar:', error);
        handleLoadingError();
    }
}

// Función para mostrar estados de carga
function showLoadingStates() {
    const loadingElements = document.querySelectorAll('[data-field]');
    loadingElements.forEach(element => {
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        element.style.opacity = '0.7';
    });
    
    // Loading en header también
    const headerName = document.getElementById('header-user-name');
    if (headerName) {
        headerName.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
    }
}

// Función para cargar datos del usuario
async function loadUserData() {
    try {
        // Opción 1: Obtener datos de la sesión del servidor (recomendado)
        const response = await fetchUserDataFromServer();
        
        if (response.success) {
            userData = response.data;
            updateCarnetDisplay(userData);
            return;
        }
        
        // Opción 2: Si no hay servidor, usar datos de localStorage
        const localData = getStoredUserData();
        if (localData) {
            userData = localData;
            updateCarnetDisplay(userData);
            return;
        }
        
        // Opción 3: Datos de ejemplo para desarrollo
        console.warn('No se pudieron obtener datos del servidor. Usando datos de ejemplo.');
        userData = getExampleUserData();
        updateCarnetDisplay(userData);
        
    } catch (error) {
        console.error('Error cargando datos del usuario:', error);
        
        // Fallback a datos de ejemplo
        userData = getExampleUserData();
        updateCarnetDisplay(userData);
        
        showNotification('Error al cargar datos. Mostrando datos de ejemplo.', 'warning');
    }
}

// Función para obtener datos del servidor
async function fetchUserDataFromServer() {
    try {
        const response = await fetch('/get-user-data.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin' // Para mantener la sesión
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log('Error en fetch del servidor:', error);
        return { success: false, error: error.message };
    }
}

// Función para obtener datos almacenados localmente
function getStoredUserData() {
    try {
        const stored = localStorage.getItem('userData');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error al obtener datos locales:', error);
        return null;
    }
}

// Función con datos de ejemplo (para desarrollo)
function getExampleUserData() {
    return {
        id_usuario: 2,
        nombre: "Francisco",
        apellido: "Pepe", 
        dni: "12345678",
        contacto: "911",
        direccion: "Av. Principal 123, Barrio Privado",
        rol: 3,
        id_parcela: 15,
        password: "$2y$10$mQqHZCPPeSBaNhgHwdKo6eL.GesSsYMsrR3XC/ACWNGI...",
        fecha_creacion: new Date().toISOString(),
        ultimo_acceso: new Date().toISOString()
    };
}

// Función principal para actualizar la visualización del carnet
function updateCarnetDisplay(data) {
    console.log('Actualizando carnet con datos:', data);
    
    // Actualizar ID del usuario
    const userIdElement = document.getElementById('user-id');
    if (userIdElement) {
        userIdElement.textContent = data.id_usuario;
    }
    
    // Actualizar nombre completo en header
    const headerName = document.getElementById('header-user-name');
    if (headerName) {
        headerName.textContent = `${data.nombre} ${data.apellido}`;
        headerName.style.opacity = '1';
    }
    
    // Actualizar todos los campos de datos
    const fieldMappings = {
        'user-nombre': data.nombre,
        'user-apellido': data.apellido,
        'user-dni': data.dni,
        'user-contacto': data.contacto,
        'user-direccion': data.direccion,
        'user-rol': data.rol,
        'user-parcela': data.id_parcela
    };
    
    // Aplicar datos a cada campo
    Object.keys(fieldMappings).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            const value = fieldMappings[elementId];
            element.textContent = value;
            element.style.opacity = '1';
            
            // Aplicar clases especiales según el tipo de campo
            applySpecialFieldStyles(elementId, value, element);
        }
    });
    
    // Actualizar información de seguridad
    updateSecurityInfo(data);
    
    // Aplicar animaciones de entrada
    setTimeout(() => {
        const carnetCard = document.querySelector('.carnet-card');
        if (carnetCard) {
            carnetCard.classList.add('fade-in');
        }
    }, 200);
    
    showNotification('¡Carnet cargado exitosamente!', 'success');
}

// Función para aplicar estilos especiales según el tipo de campo
function applySpecialFieldStyles(elementId, value, element) {
    switch(elementId) {
        case 'user-rol':
            // Aplicar clase de rol específica
            element.className = `role-badge role-${value}`;
            
            // Agregar texto descriptivo del rol
            const roleNames = {
                1: 'Administrador',
                2: 'Propietario', 
                3: 'Residente',
                4: 'Invitado'
            };
            
            const roleName = roleNames[value] || 'Usuario';
            element.textContent = `${value} - ${roleName}`;
            break;
            
        case 'user-parcela':
            element.className = 'parcela-number';
            break;
            
        case 'user-dni':
            // Formatear DNI con separadores
            element.textContent = formatDNI(value);
            break;
            
        case 'user-contacto':
            // Formatear teléfono si es necesario
            element.textContent = formatPhone(value);
            break;
    }
}

// Función para actualizar información de seguridad
function updateSecurityInfo(data) {
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const date = new Date(data.ultimo_acceso || Date.now());
        lastUpdateElement.textContent = date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Actualizar hash de seguridad (mostrar solo parte)
    const hashElement = document.querySelector('.hash-code');
    if (hashElement && data.password) {
        const shortHash = data.password.substring(0, 20) + '...';
        hashElement.textContent = shortHash;
        hashElement.title = 'Hash completo: ' + data.password; // Tooltip con hash completo
    }
}

// Función para manejar errores de carga
function handleLoadingError() {
    const loadingElements = document.querySelectorAll('[data-field]');
    loadingElements.forEach(element => {
        element.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i> Error al cargar';
        element.style.opacity = '1';
    });
    
    const headerName = document.getElementById('header-user-name');
    if (headerName) {
        headerName.textContent = 'Error al cargar usuario';
    }
    
    showNotification('Error al cargar los datos del usuario. Intente recargar la página.', 'error');
}

// Funciones de formato
function formatDNI(dni) {
    if (!dni) return dni;
    // Formato: 12.345.678
    return dni.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatPhone(phone) {
    if (!phone) return phone;
    // Aquí puedes agregar formato específico para teléfonos
    return phone;
}

// Función para establecer la fecha actual
function setCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        currentDateElement.textContent = now.toLocaleDateString('es-AR', options);
    }
}

// Función para actualizar datos (para uso futuro con formularios)
async function updateUserData(newData) {
    try {
        showNotification('Actualizando datos...', 'info');
        
        // Enviar actualización al servidor
        const response = await fetch('/update-user-data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: JSON.stringify(newData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            // Actualizar datos locales
            Object.assign(userData, newData);
            
            // Actualizar visualización
            updateCarnetDisplay(userData);
            
            // Guardar en localStorage como backup
            localStorage.setItem('userData', JSON.stringify(userData));
            
            showNotification('¡Datos actualizados correctamente!', 'success');
        } else {
            throw new Error(result.message || 'Error al actualizar datos');
        }
        
    } catch (error) {
        console.error('Error actualizando datos:', error);
        showNotification('Error al actualizar los datos. Intente nuevamente.', 'error');
    }
}

// Función para recargar datos del usuario
async function refreshUserData() {
    showNotification('Recargando datos...', 'info');
    
    try {
        await loadUserData();
        showNotification('¡Datos recargados exitosamente!', 'success');
    } catch (error) {
        console.error('Error al recargar:', error);
        showNotification('Error al recargar los datos.', 'error');
    }
}

// Función para agregar animaciones
function addAnimations() {
    // Animación para los elementos de detalle
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('slide-in-left');
        }, 100 * index);
    });

    // Animación para las tarjetas de información adicional
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-in-right');
        }, 200 + (100 * index));
    });

    // Animación para los botones de acción
    setTimeout(() => {
        const actionButtons = document.querySelectorAll('.btn-action');
        actionButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.add('fade-in');
            }, 50 * index);
        });
    }, 800);
}

// Función para configurar event listeners
function setupEventListeners() {
    // Event listeners para los botones de acción
    setupActionButtons();
    
    // Event listener para el menú de navegación
    setupNavigation();
    
    // Event listeners para efectos hover mejorados
    setupHoverEffects();
}

// Función para configurar los botones de acción
function setupActionButtons() {
    const downloadBtn = document.querySelector('.btn-primary');
    const printBtn = document.querySelector('.btn-secondary');
    const shareBtn = document.querySelector('.btn-tertiary');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCarnet);
    }

    if (printBtn) {
        printBtn.addEventListener('click', printCarnet);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', shareCarnet);
    }
}

// Función para configurar la navegación
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los elementos
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Agregar clase active al elemento clickeado
            this.parentElement.classList.add('active');
            
            // Simular navegación (en una app real redirigiría)
            const itemText = this.textContent.trim();
            showNotification(`Navegando a: ${itemText}`, 'info');
        });
    });
}

// Función para configurar efectos hover mejorados
function setupHoverEffects() {
    const detailItems = document.querySelectorAll('.detail-item');
    
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Efecto especial para el carnet card
    const carnetCard = document.querySelector('.carnet-card');
    if (carnetCard) {
        carnetCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        carnetCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Función para descargar el carnet
function downloadCarnet() {
    const button = event.target.closest('.btn-primary');
    
    // Agregar estado de carga
    button.classList.add('loading');
    button.disabled = true;
    
    // Simular descarga
    setTimeout(() => {
        // En una aplicación real, esto generaría un PDF o imagen
        showNotification('¡Carnet descargado exitosamente!', 'success');
        
        // Simular descarga de archivo
        const link = document.createElement('a');
        link.download = `carnet_${userData.nombre}_${userData.apellido}.pdf`;
        link.href = '#'; // En una app real, sería la URL del PDF generado
        document.body.appendChild(link);
        // link.click(); // Descomenta para simular descarga real
        document.body.removeChild(link);
        
        // Remover estado de carga
        button.classList.remove('loading');
        button.disabled = false;
        
        // Efecto visual de éxito
        button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        setTimeout(() => {
            button.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        }, 2000);
        
    }, 2000);
}

// Función para imprimir el carnet
function printCarnet() {
    const button = event.target.closest('.btn-secondary');
    
    // Efecto visual
    button.classList.add('loading');
    
    setTimeout(() => {
        // Abrir diálogo de impresión
        window.print();
        
        button.classList.remove('loading');
        showNotification('Preparando impresión...', 'info');
    }, 500);
}

// Función para compartir el carnet
function shareCarnet() {
    const button = event.target.closest('.btn-tertiary');
    
    // Efecto visual
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        
        // Verificar si el navegador soporta Web Share API
        if (navigator.share) {
            navigator.share({
                title: 'Mi Carnet Digital',
                text: `Carnet de ${userData.nombre} ${userData.apellido} - Barrio Privado`,
                url: window.location.href
            }).then(() => {
                showNotification('¡Carnet compartido exitosamente!', 'success');
            }).catch((error) => {
                console.log('Error al compartir:', error);
                fallbackShare();
            });
        } else {
            // Fallback para navegadores que no soportan Web Share API
            fallbackShare();
        }
    }, 100);
}

// Función fallback para compartir
function fallbackShare() {
    // Copiar URL al portapapeles
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('¡URL copiada al portapapeles!', 'success');
        }).catch(() => {
            showShareModal();
        });
    } else {
        showShareModal();
    }
}

// Función para mostrar modal de compartir
function showShareModal() {
    const modal = createShareModal();
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Función para crear modal de compartir
function createShareModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-share-alt"></i> Compartir Carnet</h3>
                <button class="modal-close" onclick="closeModal(this.closest('.modal'))">&times;</button>
            </div>
            <div class="modal-body">
                <p>Comparte tu carnet digital:</p>
                <div style="display: flex; gap: 1rem; margin: 1rem 0;">
                    <button onclick="shareVia('whatsapp')" style="background: #25D366; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button onclick="shareVia('email')" style="background: #3498db; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                    <button onclick="copyUrl()" style="background: #95a5a6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-copy"></i> Copiar URL
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Función para cerrar modal
function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Función para compartir vía diferentes plataformas
function shareVia(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Mi Carnet Digital - ${userData.nombre} ${userData.apellido}`);
    
    let shareUrl;
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${text}&body=Ve mi carnet digital: ${url}`;
            break;
        default:
            copyUrl();
            return;
    }
    
    window.open(shareUrl, '_blank');
    closeModal(document.querySelector('.modal'));
    showNotification(`¡Compartiendo vía ${platform}!`, 'success');
}

// Función para copiar URL
function copyUrl() {
    const url = window.location.href;
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    closeModal(document.querySelector('.modal'));
    showNotification('¡URL copiada al portapapeles!', 'success');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    // Colores según el tipo
    const colors = {
        success: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #3498db, #2980b9)',
        warning: 'linear-gradient(135deg, #f39c12, #e67e22)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Función auxiliar para obtener iconos según el tipo
function getIconForType(type) {
    const icons = {
        success: 'check-circle',
        error: 'times-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

// Función para actualizar datos del carnet (para uso futuro con API)
function updateCarnetData(newData) {
    Object.assign(userData, newData);
    
    // Actualizar elementos en el DOM
    const updates = {
        nombre: newData.nombre,
        apellido: newData.apellido,
        dni: newData.dni,
        contacto: newData.contacto,
        direccion: newData.direccion,
        rol: newData.rol,
        parcela: newData.parcela
    };
    
    Object.keys(updates).forEach(key => {
        const element = document.querySelector(`[data-field="${key}"]`);
        if (element) {
            element.textContent = updates[key];
        }
    });
    
    showNotification('¡Datos actualizados correctamente!', 'success');
}

// Funciones para eventos especiales
function addSpecialEffects() {
    // Efecto de partículas en hover sobre el carnet
    const carnetCard = document.querySelector('.carnet-card');
    if (carnetCard) {
        carnetCard.addEventListener('mouseenter', createParticleEffect);
    }
}

function createParticleEffect(event) {
    const rect = event.target.getBoundingClientRect();
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #3498db;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1000);
    }
}

// Agregar estilos de animación para partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Inicializar efectos especiales
setTimeout(addSpecialEffects, 1000);

// Exportar funciones para uso global
window.downloadCarnet = downloadCarnet;
window.printCarnet = printCarnet;
window.shareCarnet = shareCarnet;
window.shareVia = shareVia;
window.copyUrl = copyUrl;
window.closeModal = closeModal;