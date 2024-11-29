document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso. Redirigiendo a la página de inicio de sesión.');
            window.location.href = '/login.html';
        } else {
            alert(data.message || 'Error al registrarse.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor.');
    }
});
