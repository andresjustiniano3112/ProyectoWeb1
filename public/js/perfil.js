document.addEventListener('DOMContentLoaded', async () => {
    const ordersContainer = document.getElementById('ordersContainer');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        ordersContainer.innerHTML = '<p>Debes iniciar sesión para ver tus pedidos.</p>';
        return;
    }

    try {
        const response = await fetch(`/api/cart/orders/${user.id}`);
        if (!response.ok) {
            throw new Error('Error al cargar los pedidos');
        }

        const pedidos = await response.json();

        if (pedidos.length === 0) {
            ordersContainer.innerHTML = '<p>No tienes pedidos registrados.</p>';
            return;
        }

        pedidos.forEach((pedido) => {
            const pedidoDiv = document.createElement('div');
            pedidoDiv.classList.add('pedido');
            pedidoDiv.innerHTML = `
                <h2>Pedido #${pedido.id}</h2>
                <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
                <p><strong>Fecha:</strong> ${new Date(pedido.fecha).toLocaleDateString()}</p>
                <h3>Detalles:</h3>
                <ul>
                    ${pedido.DetallePedidos.map((detalle) => {
                        const nombreProducto = detalle.Producto?.nombre || 'Producto desconocido';
                        const precioProducto = parseFloat(detalle.Producto?.precio || 0).toFixed(2);
                        return `
                            <li>
                                Producto: ${nombreProducto}, 
                                Cantidad: ${detalle.cantidad}, 
                                Subtotal: $${precioProducto}
                            </li>`;
                    }).join('')}
                </ul>
            `;
            ordersContainer.appendChild(pedidoDiv);
        });
    } catch (error) {
        console.error('Error al cargar los pedidos:', error);
        ordersContainer.innerHTML = '<p>Error al cargar los pedidos. Intenta nuevamente más tarde.</p>';
    }
});
