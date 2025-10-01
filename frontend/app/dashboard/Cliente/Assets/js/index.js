const main = document.getElementById('main');


//main

// Script para el funcionamiento del dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar la fecha en el banner de bienvenida
    updateCurrentDate();
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
// Funcionamiento del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    
    // Función para abrir el menú
    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el menú
    function closeMenuFunc() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    if (hamburger) hamburger.addEventListener('click', openMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMenuFunc);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenuFunc);
    
    // Cerrar menú al hacer clic en un enlace
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', closeMenuFunc);
    });
    
    // Cargar fecha actual (ya existe en tu código)
    updateCurrentDate();
});