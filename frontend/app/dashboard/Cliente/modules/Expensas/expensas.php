<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expensas - Barrio Gestión</title>
    <link rel="stylesheet" href="../../index.css?v=18">
    <link rel="stylesheet" href="./expensas.css?v=120">
</head>
<body>
    <?php include '../../includes/header.php'; ?>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="expensas-header">
                <div class="header-content">
                    <h1>Gestión de Expensas</h1>
                    <p>Consulta y gestiona tus expensas mensuales</p>
                    <div class="breadcrumb">
                        <a href="../../index.php">Inicio</a> > <span>Expensas</span>
                    </div>
                </div>
                <div class="header-actions">
                    <a href="Historial/Historial.php" class="btn-secondary">Ver Historial</a>
                </div>
            </div>

            <!-- Resumen -->
            <div class="expensas-resumen">
                <div class="resumen-card pendiente">
                    <div class="card-icon">
                        <img src="../../assets/icons/expensas.png" alt="Expensa Pendiente">
                    </div>
                    <div class="card-info">
                        <h3>Expensa Actual</h3>
                        <div class="monto">$125,000</div>
                        <div class="estado-badge pendiente">PENDIENTE</div>
                        <div class="vencimiento">Vence: 10 de Julio 2025</div>
                    </div>
                    <div class="card-actions">
                        <a href="pagar-expensas.php" class="btn-pagar">Pagar Ahora</a>
                        <button class="btn-comprobante" data-tipo="actual">Ver Detalle</button>
                    </div>
                </div>

                <div class="resumen-card pagada">
                    <div class="card-icon">
                        <img src="../../assets/icons/pagos.png" alt="Expensa Pagada">
                    </div>
                    <div class="card-info">
                        <h3>Último Pago</h3>
                        <div class="monto">$118,500</div>
                        <div class="estado-badge pagada">PAGADA</div>
                        <div class="fecha-pago">Pagada: 8 de Junio 2025</div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-comprobante" data-tipo="anterior">Ver Comprobante</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    
    <script>
// Variables globales
let currentTheme = localStorage.getItem('theme') || 'dark';

// Datos de las expensas
const expensasData = {
    actual: {
        mes: "Julio 2025",
        monto: 125000,
        vencimiento: "10 de Julio 2025",
        fechaEmision: "01/07/2025",
        estado: "PENDIENTE",
        detalle: [
            { concepto: "Expensas Comunes", monto: 80000 },
            { concepto: "Fondo de Reserva", monto: 15000 },
            { concepto: "Seguro", monto: 12000 },
            { concepto: "Administración", monto: 10000 },
            { concepto: "Servicios Generales", monto: 8000 }
        ]
    },
    anterior: {
        mes: "Junio 2025",
        monto: 118500,
        fechaPago: "8 de Junio 2025",
        fechaEmision: "01/06/2025",
        fechaVencimiento: "10/06/2025",
        estado: "PAGADA",
        metodoPago: "Transferencia",
        numeroTransaccion: "TXN-20250608-001",
        detalle: [
            { concepto: "Expensas Comunes", monto: 76000 },
            { concepto: "Fondo de Reserva", monto: 15000 },
            { concepto: "Seguro", monto: 12000 },
            { concepto: "Administración", monto: 9500 },
            { concepto: "Servicios Generales", monto: 6000 }
        ]
    }
};

// Aplicar tema guardado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema
    applyTheme(currentTheme);
    
    // Configurar menú móvil existente
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

    // Configurar botones de detalle de expensas
    setupExpensasButtons();
});

// Configurar botones de expensas
function setupExpensasButtons() {
    const botones = document.querySelectorAll('.btn-comprobante');
    console.log('Botones encontrados:', botones.length);
    
    botones.forEach((boton, index) => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el tipo de expensa del atributo data-tipo
            const tipo = this.getAttribute('data-tipo') || (index === 0 ? 'actual' : 'anterior');
            console.log('Mostrando expensa tipo:', tipo);
            
            mostrarDetalleExpensa(tipo);
        });
    });
}

// Mostrar modal de detalle
function mostrarDetalleExpensa(tipo) {
    const datos = expensasData[tipo];
    
    if (!datos) {
        console.error('No se encontraron datos para el tipo:', tipo);
        return;
    }
    
    // Remover modal existente si hay
    const modalExistente = document.querySelector('.modal-detalle');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Crear el modal con el detalle
    const modal = document.createElement('div');
    modal.className = 'modal-detalle';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Detalle de Expensa - ${datos.mes}</h2>
                <button class="btn-cerrar" onclick="cerrarModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detalle-info">
                    <div class="info-row">
                        <span class="label">Período:</span>
                        <span class="value">${datos.mes}</span>
                    </div>
                    ${datos.fechaEmision ? `
                    <div class="info-row">
                        <span class="label">Fecha de Emisión:</span>
                        <span class="value">${datos.fechaEmision}</span>
                    </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="label">${tipo === 'actual' ? 'Vencimiento:' : 'Fecha de Vencimiento:'}</span>
                        <span class="value">${tipo === 'actual' ? datos.vencimiento : datos.fechaVencimiento}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Estado:</span>
                        <span class="value"><span class="estado-badge ${datos.estado.toLowerCase()}">${datos.estado}</span></span>
                    </div>
                    ${tipo === 'anterior' && datos.fechaPago ? `
                    <div class="info-row">
                        <span class="label">Fecha de Pago:</span>
                        <span class="value">${datos.fechaPago}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Método de Pago:</span>
                        <span class="value">${datos.metodoPago}</span>
                    </div>
                    ${datos.numeroTransaccion ? `
                    <div class="info-row">
                        <span class="label">Número de Transacción:</span>
                        <span class="value">${datos.numeroTransaccion}</span>
                    </div>
                    ` : ''}
                    ` : ''}
                    <div class="info-row total">
                        <span class="label">Total:</span>
                        <span class="value">$${datos.monto.toLocaleString('es-AR')}</span>
                    </div>
                </div>
                
                <div class="detalle-conceptos">
                    <h3>Conceptos</h3>
                    <table class="tabla-conceptos">
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${datos.detalle.map(item => `
                                <tr>
                                    <td>${item.concepto}</td>
                                    <td>$${item.monto.toLocaleString('es-AR')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr class="total-row">
                                <td><strong>Total</strong></td>
                                <td><strong>$${datos.monto.toLocaleString('es-AR')}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <div class="modal-actions">
                    ${tipo === 'actual' ? 
                        '<a href="pagar-expensas.php" class="btn-pagar-modal">Pagar Ahora</a>' : 
                        '<button class="btn-descargar" onclick="descargarComprobante()">Descargar Comprobante</button>'
                    }
                    <button class="btn-cerrar-secundario" onclick="cerrarModal()">Cerrar</button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="cerrarModal()"></div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar la aparición del modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Cerrar modal
function cerrarModal() {
    const modal = document.querySelector('.modal-detalle');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Descargar comprobante
function descargarComprobante() {
    showAlert('Descargando comprobante...', 'info');
    
    setTimeout(() => {
        showAlert('Comprobante descargado correctamente', 'success');
    }, 1500);
}

// Mostrar alerta
function showAlert(message, type = 'info') {
    // Remover alertas existentes
    const existingAlerts = document.querySelectorAll('.temp-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Crear nueva alerta
    const alert = document.createElement('div');
    alert.className = `temp-alert alert alert-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'}`;
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

// Cerrar modal con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});

// Funciones para el selector de tema
function setTheme(theme) {
    currentTheme = theme;
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

    <script src="../../assets/js/index.js?v=5"></script>

</body>
</html>