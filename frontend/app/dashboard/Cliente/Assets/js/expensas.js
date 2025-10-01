// JavaScript para la funcionalidad de la sección de expensas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeExpensas();
    setupEventListeners();
    updateDaysRemaining();
});

// Función para inicializar la sección de expensas
function initializeExpensas() {
    // Agregar animaciones de fade-in a los elementos
    const elements = document.querySelectorAll('.expensa-item, .resumen-card');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
    
    // Configurar tooltips
    setupTooltips();
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    const filtroButtons = document.querySelectorAll('.btn-filtrar, .btn-limpiar');
    filtroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-filtrar')) {
                aplicarFiltros();
            } else {
                limpiarFiltros();
            }
        });
    });
    
    // Detectar cambios en los selects de filtros
    const filtroSelects = document.querySelectorAll('.filtro-select');
    filtroSelects.forEach(select => {
        select.addEventListener('change', aplicarFiltros);
    });
    
    // Botones de detalles
    const detalleButtons = document.querySelectorAll('.btn-detalle');
    detalleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleDetalles(this);
        });
    });
    
    // Botones de descarga
    const downloadButtons = document.querySelectorAll('.btn-descargar');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            descargarPDF(this);
        });
    });
    
    // Botones de comprobante
    const comprobanteButtons = document.querySelectorAll('.btn-comprobante-item');
    comprobanteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarComprobante(this);
        });
    });
}

// Función para mostrar/ocultar detalles de una expensa
function toggleDetalles(button) {
    const expensaItem = button.closest('.expensa-item');
    const detalles = expensaItem.querySelector('.expensa-detalles');
    
    if (expensaItem.classList.contains('expanded')) {
        // Colapsar
        expensaItem.classList.remove('expanded');
        detalles.style.display = 'none';
        button.textContent = 'Ver Detalles';
        
        // Animación de colapso
        detalles.style.maxHeight = '0';
        detalles.style.opacity = '0';
        
        setTimeout(() => {
            if (!expensaItem.classList.contains('expanded')) {
                detalles.style.display = 'none';
            }
        }, 300);
    } else {
        // Expandir
        expensaItem.classList.add('expanded');
        detalles.style.display = 'block';
        button.textContent = 'Ocultar Detalles';
        
        // Animación de expansión
        setTimeout(() => {
            detalles.style.maxHeight = 'none';
            detalles.style.opacity = '1';
        }, 10);
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const anoSelect = document.getElementById('ano-select');
    const estadoSelect = document.getElementById('estado-select');
    
    const anoSeleccionado = anoSelect.value;
    const estadoSeleccionado = estadoSelect.value;
    
    const expensaItems = document.querySelectorAll('.expensa-item');
    
    // Mostrar loading
    mostrarLoading();
    
    setTimeout(() => {
        expensaItems.forEach(item => {
            let mostrar = true;
            
            // Filtrar por año (simulado - en una app real se obtendría del data attribute o similar)
            if (anoSeleccionado !== '2025') {
                // Simulamos que solo tenemos datos de 2025
                mostrar = false;
            }
            
            // Filtrar por estado
            if (estadoSeleccionado !== 'todas') {
                const tieneClase = item.classList.contains(estadoSeleccionado.slice(0, -1)); // Remove 's' from plural
                if (estadoSeleccionado === 'pendientes' && !item.classList.contains('pendiente')) {
                    mostrar = false;
                } else if (estadoSeleccionado === 'pagadas' && !item.classList.contains('pagada')) {
                    mostrar = false;
                } else if (estadoSeleccionado === 'vencidas' && !item.classList.contains('vencida')) {
                    mostrar = false;
                }
            }
            
            // Aplicar filtro con animación
            if (mostrar) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
        
        ocultarLoading();
        mostrarResultadosFiltros();
    }, 500);
}

// Función para limpiar filtros
function limpiarFiltros() {
    const anoSelect = document.getElementById('ano-select');
    const estadoSelect = document.getElementById('estado-select');
    
    anoSelect.value = '2025';
    estadoSelect.value = 'todas';
    
    const expensaItems = document.querySelectorAll('.expensa-item');
    expensaItems.forEach(item => {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease-in';
    });
    
    // Mostrar mensaje de filtros limpiados
    mostrarNotificacion('Filtros eliminados', 'success');
}

// Función para mostrar loading
function mostrarLoading() {
    const listaExpensas = document.querySelector('.expensas-lista');
    const loadingHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <span>Aplicando filtros...</span>
        </div>
    `;
    
    // Crear elemento temporal de loading
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = loadingHTML;
    loadingElement.classList.add('loading-overlay');
    listaExpensas.appendChild(loadingElement);
}

// Función para ocultar loading
function ocultarLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Función para mostrar resultados de filtros
function mostrarResultadosFiltros() {
    const expensaItems = document.querySelectorAll('.expensa-item');
    const itemsVisibles = Array.from(expensaItems).filter(item => 
        item.style.display !== 'none'
    ).length;
    
    mostrarNotificacion(`Se encontraron ${itemsVisibles} expensas`, 'info');
}

// Función para actualizar días restantes
function updateDaysRemaining() {
    const diasRestantesElements = document.querySelectorAll('.dias-restantes');
    
    diasRestantesElements.forEach(element => {
        const fechaVencimiento = new Date('2025-07-10'); // Ejemplo
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
            
            // Agregar indicador de vencimiento
            const expensaItem = element.closest('.expensa-item');
            if (expensaItem) {
                expensaItem.classList.add('vencida');
                expensaItem.classList.remove('pendiente');
            }
        }
    });
}

// Función para descargar PDF
function descargarPDF(button) {
    const expensaItem = button.closest('.expensa-item');
    const periodo = expensaItem.querySelector('.expensa-periodo h3').textContent;
    
    // Mostrar loading en el botón
    const textoOriginal = button.textContent;
    button.textContent = 'Descargando...';
    button.disabled = true;
    
    // Simular descarga
    setTimeout(() => {
        // En una aplicación real, aquí se haría la petición al servidor
        console.log(`Descargando PDF para: ${periodo}`);
        
        // Simular creación de enlace de descarga
        const link = document.createElement('a');
        link.href = '#'; // En una app real sería la URL del PDF
        link.download = `expensa_${periodo.replace(' ', '_')}.pdf`;
        
        mostrarNotificacion(`PDF de ${periodo} descargado correctamente`, 'success');
        
        // Restaurar botón
        button.textContent = textoOriginal;
        button.disabled = false;
    }, 2000);
}

// Función para mostrar comprobante
function mostrarComprobante(button) {
    const expensaItem = button.closest('.expensa-item');
    const periodo = expensaItem.querySelector('.expensa-periodo h3').textContent;
    const numeroComprobante = expensaItem.querySelector('.valor').textContent;
    
    // Crear modal para mostrar comprobante
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Comprobante de Pago</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="comprobante-info">
                    <div class="comprobante-row">
                        <span class="label">Período:</span>
                        <span class="valor">${periodo}</span>
                    </div>
                    <div class="comprobante-row">
                        <span class="label">Número de comprobante:</span>
                        <span class="valor">${numeroComprobante}</span>
                    </div>
                    <div class="comprobante-row">
                        <span class="label">Estado:</span>
                        <span class="valor estado-pagada">PAGADO</span>
                    </div>
                    <div class="comprobante-row">
                        <span class="label">Fecha de procesamiento:</span>
                        <span class="valor">${new Date().toLocaleDateString('es-ES')}</span>
                    </div>
                </div>
                <div class="comprobante-actions">
                    <button class="btn-primary">Descargar PDF</button>
                    <button class="btn-secondary">Enviar por Email</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listener para cerrar modal
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion-toast', tipo);
    notificacion.textContent = mensaje;
    
    // Estilos para la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#ff4444' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notificacion);
    
    // Remover automáticamente después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.remove();
            }
        }, 300);
    }, 3000);
}

// Función para configurar tooltips
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.classList.add('tooltip');
    });
}

// Función para exportar datos (funcionalidad adicional)
function exportarDatos(formato = 'excel') {
    const expensas = [];
    const expensaItems = document.querySelectorAll('.expensa-item:not([style*="display: none"])');
    
    expensaItems.forEach(item => {
        const periodo = item.querySelector('.expensa-periodo h3').textContent;
        const monto = item.querySelector('.monto-principal').textContent;
        const estado = item.querySelector('.estado-badge').textContent;
        
        expensas.push({
            periodo,
            monto,
            estado
        });
    });
    
    console.log(`Exportando ${expensas.length} expensas en formato ${formato}:`, expensas);
    mostrarNotificacion(`Datos exportados correctamente (${formato})`, 'success');
}

// Agregar estilos CSS para animaciones y modales
const styles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: linear-gradient(135deg, #000, #333);
        border-radius: 1rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        color: white;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #666;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 1.3rem;
    }
    
    .close-modal {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.3rem;
        transition: background-color 0.3s ease;
    }
    
    .close-modal:hover {
        background-color: #666;
    }
    
    .comprobante-info {
        margin-bottom: 1.5rem;
    }
    
    .comprobante-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .comprobante-row:last-child {
        border-bottom: none;
    }
    
    .comprobante-row .label {
        color: #ccc;
    }
    
    .comprobante-row .valor {
        font-weight: 600;
        color: white;
    }
    
    .estado-pagada {
        color: #4CAF50 !important;
    }
    
    .comprobante-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
    }
`;

// Agregar los estilos al documento
if (!document.getElementById('expensas-dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'expensas-dynamic-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
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

// Exponer funciones globales para uso en HTML
window.toggleDetalles = toggleDetalles;
window.aplicarFiltros = aplicarFiltros;
window.limpiarFiltros = limpiarFiltros;
window.exportarDatos = exportarDatos;