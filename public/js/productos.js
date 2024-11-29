document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const categoriaId = params.get('categoriaId');
    const categoryName = params.get('nombre');
    const categoryTitle = document.getElementById('categoryTitle');
    const productsContainer = document.getElementById('productsContainer');

    categoryTitle.textContent = `Productos de ${categoryName}`;

    try {
        const response = await fetch(`/api/products/category/${categoriaId}`);
        const products = await response.json();

        if (!products || products.length === 0) {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        products.forEach((product) => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                <img src="${product.imagen || 'default.jpg'}" alt="${product.nombre}" />
                <h3>${product.nombre}</h3>
                <p>${product.descripcion || 'Sin descripción'}</p>
                <p><strong>Precio:</strong> $${product.precio}</p>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precio}">Añadir al carrito</button>
            `;
            productsContainer.appendChild(div);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.id;
                const productName = button.closest('.product-card').querySelector('h3').textContent;
                const productPrice = parseFloat(button.closest('.product-card').querySelector('p strong').nextSibling.textContent.trim().slice(1));
        
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
                // Verifica si el producto ya existe en el carrito
                const existingProduct = carrito.find(item => item.id === productId);
        
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    carrito.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
                }
        
                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert('Producto añadido al carrito.');
            });
        });
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});
