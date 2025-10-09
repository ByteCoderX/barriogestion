(async () => {
    try {
        const res = await fetch('https://api.bringfeel.com.ar/bg/v1/auth/validator', {
            method: 'POST',
            headers: { 'x-api-key': 'hola' },
            credentials: 'include'
        });

        if (!res.ok) {
            localStorage.removeItem('userdata');
            window.location.href = '/login.html';
            return;
        }

        const userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
        const requiredAdmin = false; // cambiar a true si la página requiere admin
        if (requiredAdmin && !userdata.admin) {
            window.location.href = '/login.html';
        }

    } catch (err) {
        window.location.href = '/login.html';
    }
})();
