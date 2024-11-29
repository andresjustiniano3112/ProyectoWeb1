document.addEventListener('DOMContentLoaded', () => {
    const categoriesTable = document.getElementById('categoriesTable');
    const addCategoryForm = document.getElementById('addCategoryForm');

    // Cargar categorías desde la base de datos
    async function loadCategories() {
        try {
            const response = await fetch('/api/categories');
            const categories = await response.json();

            categoriesTable.innerHTML = categories
                .map(
                    (category) => `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.nombre}</td>
                    <td>
                        <button class="edit-category" data-id="${category.id}">Editar</button>
                        <button class="delete-category" data-id="${category.id}">Eliminar</button>
                    </td>
                </tr>`
                )
                .join('');
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    }

    // Agregar categoría
    addCategoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addCategoryForm);
        const name = formData.get('nombre');

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: name }),
            });

            if (response.ok) {
                alert('Categoría añadida.');
                loadCategories();
                addCategoryForm.reset();
            } else {
                alert('Error al añadir categoría.');
            }
        } catch (error) {
            console.error('Error al añadir categoría:', error);
        }
    });

    // Manejar edición y eliminación
    categoriesTable.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (target.classList.contains('edit-category')) {
            const newName = prompt('Nuevo nombre de la categoría:');
            if (!newName) return;

            try {
                const response = await fetch(`/api/categories/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: newName }),
                });

                if (response.ok) {
                    alert('Categoría actualizada.');
                    loadCategories();
                } else {
                    alert('Error al actualizar categoría.');
                }
            } catch (error) {
                console.error('Error al actualizar categoría:', error);
            }
        } else if (target.classList.contains('delete-category')) {
            if (!confirm('¿Seguro que quieres eliminar esta categoría?')) return;

            try {
                const response = await fetch(`/api/categories/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Categoría eliminada.');
                    loadCategories();
                } else {
                    alert('Error al eliminar categoría.');
                }
            } catch (error) {
                console.error('Error al eliminar categoría:', error);
            }
        }
    });

    // Cargar categorías al inicio
    loadCategories();
});
