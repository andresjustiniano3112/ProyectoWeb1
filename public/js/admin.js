

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (!user || user.tipo_usuario !== 'admin') {
        alert('Acceso denegado. Debes ser administrador para acceder a esta página.');
        window.location.href = 'index.html'; // Redirige al inicio
    }

    welcomeMessage.textContent = `¡Bienvenido, ${user.nombre}!`;
});




