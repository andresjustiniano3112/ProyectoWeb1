document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carritoContainer');
    const totalElement = document.getElementById('total');

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        totalElement.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;

    carrito.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Precio: $${item.price.toFixed(2)}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        carritoContainer.appendChild(div);
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
});

document.getElementById('checkout').addEventListener('click', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!user) {
        alert('Debes iniciar sesión para completar el pedido.');
        window.location.href = 'login.html';
        return;
    }

    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    try {
        const response = await fetch('/api/cart/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: user.id, carrito }),
        });

        if (response.ok) {
            alert('Pedido completado con éxito.');
            localStorage.removeItem('carrito');
            window.location.href = 'index.html';
        } else {
            alert('Error al completar el pedido.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor.');
    }
});


