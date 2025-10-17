function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('closeMenu');

    if (!hamburger || !mobileMenu || !overlay || !closeBtn) return;

    const openMenu = () => {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al clickear un link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

document.addEventListener('DOMContentLoaded', initHamburgerMenu);
