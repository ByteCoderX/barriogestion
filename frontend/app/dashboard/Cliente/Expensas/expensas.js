// JavaScript para la funcionalidad de la sección de expensas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeExpensas();
    setupEventListeners();
    updateDaysRemaining();
});



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

