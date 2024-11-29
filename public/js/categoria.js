document.addEventListener('DOMContentLoaded', async () => {
    const categoriesContainer = document.getElementById('categoriesContainer');

    try {
        const response = await fetch('/api/categories');
        const categories = await response.json();

        categories.forEach((category) => {
            const div = document.createElement('div');
            div.className = 'category-card';
            div.textContent = category.nombre;
            div.addEventListener('click', () => {
                window.location.href = `productos.html?categoriaId=${category.id}&nombre=${encodeURIComponent(category.nombre)}`;
            });
            categoriesContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
});
