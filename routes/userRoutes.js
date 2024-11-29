const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, getAllUsers,createUser,updateUser,deleteUser, getUsers} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Rutas
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);


// Rutas para gestión de usuarios
router.get('/', getAllUsers); // Listar todos los usuarios
router.post('/', createUser); // Crear un nuevo usuario
router.put('/:id', updateUser); // Actualizar un usuario por ID
router.delete('/:id', deleteUser); // Eliminar un usuario por ID

module.exports = router;




