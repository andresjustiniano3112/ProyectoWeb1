const express = require('express');
const router = express.Router();
const { getProductsByCategory } = require('../controllers/productoController');

// Ruta para obtener productos por categoría
router.get('/category/:categoriaId', getProductsByCategory);

module.exports = router;
