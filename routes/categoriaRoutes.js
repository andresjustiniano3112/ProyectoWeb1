const express = require('express');
const router = express.Router();
const { getAllCategories,getCategories, addCategory, updateCategory, deleteCategory } = require("../controllers/categoriaController");

// Ruta para obtener todas las categorías
router.get('/', getAllCategories);


router.get('/', getCategories); // Obtener todas las categorías
router.post('/', addCategory); // Crear categoría
router.put('/:id', updateCategory); // Actualizar categoría
router.delete('/:id', deleteCategory); // Eliminar categoría

module.exports = router;
