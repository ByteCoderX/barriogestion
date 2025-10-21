// JavaScript para pagar-expensas.php

let archivoSeleccionado = null;
let currentTheme = localStorage.getItem('theme') || 'dark';

document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema
    applyTheme(currentTheme);
    
    // Configurar área de carga
    setupUploadArea();
    
    // Configurar menú móvil
    setupMobileMenu();
});

// Configurar área de carga de archivos
function setupUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('comprobanteFile');

    // Click en el área de carga
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Cambio de archivo
    fileInput.addEventListener('change', (e) => {
        handleFileSelect(e.target.files[0]);
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    });
}

// Manejar selección de archivo
function handleFileSelect(file) {
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        showAlert('Por favor selecciona un archivo válido (PNG, JPG o PDF)', 'error');
        return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
        showAlert('El archivo no debe superar los 5MB', 'error');
        return;
    }

    archivoSeleccionado = file;
    
    // Mostrar vista previa
    showFilePreview(file);
    
    // Habilitar botón de confirmar
    document.getElementById('btnConfirmar').disabled = false;
    
    showAlert('Archivo cargado correctamente', 'success');
}

// Mostrar vista previa del archivo
function showFilePreview(file) {
    const uploadArea = document.getElementById('uploadArea');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const previewBody = document.getElementById('previewBody');

    uploadArea.style.display = 'none';
    filePreview.style.display = 'block';
    fileName.textContent = file.name;

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewBody.innerHTML = `<img src="${e.target.result}" alt="Comprobante">`;
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        previewBody.innerHTML = `
            <div class="pdf-preview">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3>${file.name}</h3>
                <p>Archivo PDF listo para enviar</p>
            </div>
        `;
    }
}

// Remover archivo
function removeFile() {
    archivoSeleccionado = null;
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('filePreview').style.display = 'none';
    document.getElementById('comprobanteFile').value = '';
    document.getElementById('btnConfirmar').disabled = true;
}

// Copiar dato individual
function copiarDato(id) {
    const elemento = document.getElementById(id);
    const texto = elemento.textContent;

    navigator.clipboard.writeText(texto).then(() => {
        showAlert('Copiado al portapapeles', 'success');
    }).catch(() => {
        showAlert('Error al copiar', 'error');
    });
}

// Copiar todos los datos
function copiarTodosDatos() {
    const titular = document.getElementById('titular').textContent;
    const cuit = document.getElementById('cuit').textContent;
    const banco = document.getElementById('banco').textContent;
    const cbu = document.getElementById('cbu').textContent;
    const alias = document.getElementById('alias').textContent;
    const monto = document.getElementById('monto').textContent;

    const textoCompleto = `
Datos para Transferencia:

Titular: ${titular}
CUIT: ${cuit}
Banco: ${banco}
CBU: ${cbu}
Alias: ${alias}
Monto: ${monto}
    `.trim();

    navigator.clipboard.writeText(textoCompleto).then(() => {
        showAlert('Todos los datos copiados al portapapeles', 'success');
    }).catch(() => {
        showAlert('Error al copiar', 'error');
    });
}

// Confirmar pago
function confirmarPago() {
    if (!archivoSeleccionado) {
        showAlert('Debes subir un comprobante', 'error');
        return;
    }

    // Simular envío de solicitud
    showAlert('Enviando solicitud de pago...', 'info');

    // Simular proceso de envío
    setTimeout(() => {
        // Crear datos de la solicitud (hardcodeado)
        const solicitud = {
            id: 'SOL-' + Date.now(),
            usuario: 'Juan Pérez',
            lote: 'Lote 25',
            periodo: 'Julio 2025',
            monto: 125000,
            fecha: new Date().toLocaleString('es-AR'),
            comprobante: archivoSeleccionado.name,
            estado: 'pendiente'
        };

        // Guardar en localStorage (simula base de datos)
        let solicitudes = JSON.parse(localStorage.getItem('solicitudesPago') || '[]');
        solicitudes.push(solicitud);
        localStorage.setItem('solicitudesPago', JSON.stringify(solicitudes));

        showAlert('Solicitud enviada correctamente. El administrador validará tu pago.', 'success');

        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = '../../../index.php';
        }, 2000);
    }, 1500);
}

// Mostrar alertas
function showAlert(message, type = 'info') {
    const existingAlerts = document.querySelectorAll('.temp-alert');
    existingAlerts.forEach(alert => alert.remove());

    const alert = document.createElement('div');
    alert.className = `temp-alert alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    const colores = {
        'success': 'background: linear-gradient(135deg, #4CAF50, #45a049);',
        'error': 'background: linear-gradient(135deg, #f44336, #da190b);',
        'info': 'background: linear-gradient(135deg, #2196F3, #1976D2);'
    };

    alert.style.cssText += colores[type] || colores['info'];

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-alerts]')) {
        style.setAttribute('data-alerts', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 4000);
}

// Configurar menú móvil
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        closeMenu.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        mobileMenuOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}

// Funciones de tema
function setTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
    
    if (theme === 'light') {
        body.classList.add('theme-light');
    } else if (theme === 'nature') {
        body.classList.add('theme-nature');
    }
}