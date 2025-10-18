// JavaScript para la funcionalidad de la sección de expensas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeExpensas();
    setupEventListeners();
    updateDaysRemaining();
});

function initializeExpensas() {
    // Datos de ejemplo de las expensas
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
    
    // Guardar datos en el objeto window para acceso global
    window.expensasData = expensasData;
}

function setupEventListeners() {
    // Event listeners para botones "Ver Detalle"
    const botonesDetalle = document.querySelectorAll('.btn-comprobante');
    
    botonesDetalle.forEach((boton, index) => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determinar qué expensa mostrar (actual o anterior)
            const tipoExpensa = index === 0 ? 'actual' : 'anterior';
            mostrarDetalleExpensa(tipoExpensa);
        });
    });

    // Cerrar modal al presionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            cerrarModal();
        }
    });
}

function mostrarDetalleExpensa(tipo) {
    const datos = window.expensasData[tipo];
    
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

function cerrarModal() {
    const modal = document.querySelector('.modal-detalle');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function descargarComprobante() {
    // Mostrar alerta de descarga
    showAlert('Descargando comprobante...', 'info');
    
    setTimeout(() => {
        showAlert('Comprobante descargado correctamente', 'success');
    }, 1500);
}

// Función para actualizar días restantes
function updateDaysRemaining() {
    const diasRestantesElements = document.querySelectorAll('.dias-restantes');
    
    diasRestantesElements.forEach(element => {
        const fechaVencimiento = new Date('2025-07-10');
        const hoy = new Date();
        const diferenciaDias = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
        
        if (diferenciaDias > 0) {
            element.textContent = `${diferenciaDias} días`;
            element.style.color = diferenciaDias <= 5 ? '#ff4444' : '#ffaa00';
        } else if (diferenciaDias === 0) {
            element.textContent = 'Vence hoy';
            element.style.color = '#ff4444';
        } else {
            element.textContent = `Vencida hace ${Math.abs(diferenciaDias)} días`;
            element.style.color = '#ff4444';
            
            const expensaItem = element.closest('.expensa-item');
            if (expensaItem) {
                expensaItem.classList.add('vencida');
                expensaItem.classList.remove('pendiente');
            }
        }
    });
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

// Funciones de utilidad
const ExpensasUtils = {
    formatearMonto: function(monto) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(monto);
    },
    
    formatearFecha: function(fecha) {
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    },
    
    calcularDiasVencimiento: function(fechaVencimiento) {
        const hoy = new Date();
        const vencimiento = new Date(fechaVencimiento);
        const diferencia = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
        return diferencia;
    }
};