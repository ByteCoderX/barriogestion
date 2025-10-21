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
                        <a href="PagarExpensas/PagarExpensas.php" class="btn-pagar">Pagar Ahora</a>
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
                        '<a href="PagarExpensas/PagarExpensas.php" class="btn-pagar-modal">Pagar Ahora</a>' : 
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
// Función mejorada para descargar comprobante
// Reemplaza la función descargarComprobante() en expensas.php

function descargarComprobante() {
    showAlert('Generando comprobante...', 'info');
    
    // Obtener datos de la expensa anterior (pagada)
    const datos = expensasData.anterior;
    
    // Crear el contenido HTML del comprobante
    const comprobanteHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    background: white;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #4CAF50;
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #4CAF50;
                    font-size: 28px;
                    margin-bottom: 10px;
                }
                .header p {
                    color: #666;
                    font-size: 14px;
                }
                .badge {
                    display: inline-block;
                    background: #4CAF50;
                    color: white;
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .info-section {
                    margin: 30px 0;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                }
                .info-section h2 {
                    color: #333;
                    font-size: 18px;
                    margin-bottom: 15px;
                    border-bottom: 2px solid #4CAF50;
                    padding-bottom: 10px;
                }
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                }
                .info-row:last-child {
                    border-bottom: none;
                }
                .info-label {
                    font-weight: bold;
                    color: #666;
                }
                .info-value {
                    color: #333;
                }
                .table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                .table th {
                    background: #4CAF50;
                    color: white;
                    padding: 12px;
                    text-align: left;
                    font-weight: bold;
                }
                .table td {
                    padding: 10px 12px;
                    border-bottom: 1px solid #ddd;
                }
                .table tbody tr:hover {
                    background: #f5f5f5;
                }
                .table tfoot td {
                    background: #f0f0f0;
                    font-weight: bold;
                    font-size: 16px;
                    color: #4CAF50;
                    padding: 15px 12px;
                }
                .total-amount {
                    text-align: center;
                    margin: 30px 0;
                    padding: 20px;
                    background: #e8f5e9;
                    border-radius: 8px;
                }
                .total-amount h3 {
                    color: #4CAF50;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .total-amount .amount {
                    font-size: 36px;
                    font-weight: bold;
                    color: #2e7d32;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    padding-top: 20px;
                    border-top: 2px solid #ddd;
                    color: #666;
                    font-size: 12px;
                }
                .qr-code {
                    text-align: center;
                    margin: 20px 0;
                }
                .transaction-box {
                    background: #fff3cd;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #ffc107;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>COMPROBANTE DE PAGO</h1>
                <p>Barrio Gestión - Administración de Expensas</p>
                <div class="badge">PAGADA</div>
            </div>

            <div class="info-section">
                <h2>Información del Pago</h2>
                <div class="info-row">
                    <span class="info-label">Período:</span>
                    <span class="info-value">${datos.mes}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fecha de Emisión:</span>
                    <span class="info-value">${datos.fechaEmision}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fecha de Vencimiento:</span>
                    <span class="info-value">${datos.fechaVencimiento}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fecha de Pago:</span>
                    <span class="info-value">${datos.fechaPago}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Método de Pago:</span>
                    <span class="info-value">${datos.metodoPago}</span>
                </div>
            </div>

            <div class="transaction-box">
                <strong>Número de Transacción:</strong> ${datos.numeroTransaccion}
            </div>

            <div class="info-section">
                <h2>Detalle de Conceptos</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th style="text-align: right;">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${datos.detalle.map(item => `
                            <tr>
                                <td>${item.concepto}</td>
                                <td style="text-align: right;">$${item.monto.toLocaleString('es-AR')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>TOTAL</td>
                            <td style="text-align: right;">$${datos.monto.toLocaleString('es-AR')}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="total-amount">
                <h3>Monto Total Abonado</h3>
                <div class="amount">$${datos.monto.toLocaleString('es-AR')}</div>
            </div>

            <div class="footer">
                <p><strong>Barrio Gestión</strong></p>
                <p>Administración de Consorcios y Expensas</p>
                <p>Este comprobante certifica el pago de las expensas correspondientes al período indicado.</p>
                <p style="margin-top: 10px;">Documento generado el ${new Date().toLocaleString('es-AR')}</p>
            </div>
        </body>
        </html>
    `;

    // Crear un Blob con el contenido HTML
    const blob = new Blob([comprobanteHTML], { type: 'text/html' });
    
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Comprobante_${datos.mes.replace(/ /g, '_')}_${datos.numeroTransaccion}.html`;
    
    // Simular clic en el enlace
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Liberar el objeto URL
    URL.revokeObjectURL(link.href);
    
    setTimeout(() => {
        showAlert('Comprobante descargado correctamente', 'success');
    }, 500);
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