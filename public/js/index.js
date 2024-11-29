document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('authButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const perfilLink = document.getElementById('perfilLink');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Cambiar "Iniciar Sesión" a "Cerrar Sesión"
        authButton.innerHTML = '<a href="#" id="logout">Cerrar Sesión</a>';
        perfilLink.style.display = 'inline';
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            localStorage.removeItem('carrito'); 
            alert('Has cerrado sesión.');
            window.location.href = 'index.html'; // Redirigir a la misma página
        });

        // Mostrar un mensaje de bienvenida con el nombre del usuario
        welcomeMessage.textContent = `¡Bienvenido, ${user.nombre}!`;
    } else {
        // Si no hay usuario autenticado, asegura que el botón diga "Iniciar Sesión"
        authButton.innerHTML = '<a href="login.html">Iniciar Sesión</a>';
        perfilLink.style.display = 'none';
    }
    
});
