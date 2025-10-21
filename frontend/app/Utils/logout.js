import { baseURL } from '../config/config';

document.addEventListener('DOMContentLoaded', () => {
    async function logoutFunction() {
        try {
            await fetch(`${baseURL}/bg/v1/auth/logout`, {
                method: 'POST',
                headers: { 'x-api-key': 'hola' },
                credentials: 'include'
            });
        } catch (err) {
            console.warn('Error al cerrar sesión en el backend:', err);
        }

        localStorage.removeItem('userdata');
        window.location.href = "/barriogestion/frontend/app/login.html";
    }

    const logoutDesktop = document.getElementById('logoutBtnDesktop');
    const logoutMobile = document.getElementById('logoutBtnMobile');

    if (logoutDesktop) logoutDesktop.addEventListener('click', logoutFunction);
    if (logoutMobile) logoutMobile.addEventListener('click', logoutFunction);

});