const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Importa las funciones del controlador

// Ruta para registrar usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router; // Exporta el router
