import { baseURL } from '../../config/config';

async function validarSesion() {
  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    window.location.href = '../../login.html';
    return;
  }

  try {
    const response = await fetch(`${baseURL}/bg/v1/auth/validator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'hola'
      },
      credentials: 'include'
    });

    if (response.status !== 200) {
      window.location.href = '../../login.html';
    }

  } catch (error) {
    console.error('Error validando sesión:', error);
    window.location.href = '../../login.html';
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

validarSesion();
