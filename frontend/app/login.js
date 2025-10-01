// Obtener elementos del DOM
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');

// Función para mostrar el popup
function showPopup() {
    popupOverlay.style.display = 'block';
    popupOverlay.classList.remove('bounce-out');

    // Forzar un reflow para asegurar que el display se aplique antes de la animación
    popupOverlay.offsetHeight;

    popupOverlay.classList.add('show', 'bounce-in');
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo

    // Remover la clase bounce-in después de la animación
    setTimeout(() => {
        popupOverlay.classList.remove('bounce-in');
    }, 600);
}

// Función para cerrar el popup
function hidePopup() {
    popupOverlay.classList.remove('show', 'bounce-in');
    popupOverlay.classList.add('bounce-out');

    // Ocultar el popup después de la animación
    setTimeout(() => {
        popupOverlay.style.display = 'none';
        popupOverlay.classList.remove('bounce-out');
        document.body.style.overflow = 'auto'; // Restaura el scroll
    }, 400);
}

// Event listeners
forgotPasswordLink.addEventListener('click', function (e) {
    e.preventDefault(); // Evita que el enlace navegue
    showPopup();
});

closePopup.addEventListener('click', hidePopup);

// Cerrar popup al hacer clic fuera del contenido
popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
        hidePopup();
    }
});

// Cerrar popup con la tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('show')) {
        hidePopup();
    }
});

