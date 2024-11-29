document.addEventListener('DOMContentLoaded', async () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTableBody');
    const nameInput = document.getElementById('nombre');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('contraseña');
    const roleSelect = document.getElementById('tipo_usuario');

    // Cargar usuarios al iniciar
    const loadUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            userTable.innerHTML = '';
            users.forEach((user) => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.nombre}</td>
                        <td>${user.correo}</td>
                        <td>${user.tipo_usuario}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                userTable.insertAdjacentHTML('beforeend', row);
            });
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    await loadUsers();

    // Validaciones de campos
    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^\S+$/;

        if (!nameRegex.test(nameInput.value)) {
            alert('El nombre debe contener solo letras y espacios.');
            return false;
        }

        if (!emailRegex.test(emailInput.value)) {
            alert('Ingresa un correo válido.');
            return false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            alert('La contraseña no debe contener espacios.');
            return false;
        }

        return true;
    };

    // Manejar el envío del formulario
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newUser = {
            nombre: nameInput.value,
            correo: emailInput.value,
            contraseña: passwordInput.value,
            tipo_usuario: roleSelect.value,
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert('Usuario creado exitosamente.');
                userForm.reset();
                await loadUsers();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al crear usuario.');
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
        }
    });

    // Función para editar usuario
    window.editUser = async (id) => {
        const newName = prompt('Ingrese el nuevo nombre del usuario:');
        const newEmail = prompt('Ingrese el nuevo correo del usuario:');
        const newRole = prompt('Ingrese el nuevo tipo de usuario (cliente/admin):');

        if (!newName || !newEmail || !newRole) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: newName, correo: newEmail, tipo_usuario: newRole }),
            });

            if (response.ok) {
                alert('Usuario actualizado exitosamente.');
                await loadUsers();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al actualizar el usuario.');
            }
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    };

    // Función para eliminar usuario
    window.deleteUser = async (id) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');

        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Usuario eliminado exitosamente.');
                await loadUsers();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al eliminar el usuario.');
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };
});
