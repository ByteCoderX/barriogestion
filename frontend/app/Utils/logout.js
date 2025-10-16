document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const resSettings = await fetch('../../settings.json');
        const settings = await resSettings.json();
        const apiUrl = settings.API_URL;

        await fetch(`${apiUrl}/bg/v1/auth/logout`, {
            method: 'POST',
            headers: { 'x-api-key': 'hola' },
            credentials: 'include'
        });
    } catch (err) {
        console.warn('Error al cerrar sesión en el backend:', err);
    }

    localStorage.removeItem('userdata');

    window.location.href = "../../login.html";
});
