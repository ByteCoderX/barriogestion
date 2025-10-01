const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

menu.addEventListener('click',()=>{
    sidebar.classList.toggle('menu-toggle');
    menu.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');
});

//main

// Script para el funcionamiento del dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar la fecha en el banner de bienvenida
    updateCurrentDate();
    
    // Funcionalidad para los accesos directos
    setupShortcutsEvents();
});

// Función para mostrar la fecha actual
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const today = new Date();
    
    // Formatear la fecha en español
    let formattedDate = today.toLocaleDateString('es-ES', options);
    // Capitalizar la primera letra
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    
    dateElement.textContent = formattedDate;
}

// Configurar eventos para los accesos directos
function setupShortcutsEvents() {
    const shortcutCards = document.querySelectorAll('.shortcut-card');
    
    shortcutCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtener el título del acceso directo
            const shortcutTitle = this.querySelector('h3').textContent;
            
            // Redireccionar según el acceso directo
            switch(shortcutTitle) {
                case 'Generar Expensas':
                    console.log('Redirigiendo a generación de expensas');
                    // window.location.href = './expensas/generar.php';
                    break;
                case 'Registrar Pago':
                    console.log('Redirigiendo a registro de pagos');
                    // window.location.href = './pagos/registrar.php';
                    break;
                case 'Registrar Gasto':
                    console.log('Redirigiendo a registro de gastos');
                    // window.location.href = './gastos/registrar.php';
                    break;
                case 'Nuevo Residente':
                    console.log('Redirigiendo a agregar residente');
                    // window.location.href = './residentes/agregar.php';
                    break;
                default:
                    break;
            }
        });
    });
}

// Función para crear gráficos (simulado por ahora)
// En una implementación real, usarías una biblioteca como Chart.js o similar
// Esta función es un placeholder para simular la funcionalidad
function createCharts() {
    // Placeholder para futura implementación de gráficos
    console.log('Generando gráficos estadísticos...');
    
    // Aquí se implementaría la lógica real para generar gráficos
    // utilizando Chart.js, D3.js u otra biblioteca de visualización
}

// Función para simular carga de datos del barrio
// En una aplicación real, esto obtendría datos de una API o base de datos
function loadBarrioData() {
    // Simulación de carga de datos
    console.log('Cargando datos del barrio...');
    
    // Aquí se implementaría la lógica real para cargar datos
    // mediante fetch, axios u otra biblioteca para solicitudes HTTP
}