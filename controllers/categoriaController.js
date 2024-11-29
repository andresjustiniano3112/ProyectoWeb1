const Categoria = require('../models/categoria');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Categoria.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error al obtener categorías.' });
    }
};



// Obtener todas las categorías
const getCategories = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error al obtener categorías.' });
    }
};

// Crear una nueva categoría
const addCategory = async (req, res) => {
    const { nombre } = req.body;

    try {
        const nuevaCategoria = await Categoria.create({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ message: 'Error al crear categoría.' });
    }
};

// Actualizar categoría
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }

        categoria.nombre = nombre;
        await categoria.save();

        res.json({ message: 'Categoría actualizada.' });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ message: 'Error al actualizar categoría.' });
    }
};

// Eliminar categoría
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si hay productos asociados a la categoría
        const productosAsociados = await Producto.findAll({
            where: { categoria_id: id },
        });

        if (productosAsociados.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar la categoría porque tiene productos asociados.',
            });
        }

        // Eliminar la categoría
        const categoria = await Categoria.destroy({
            where: { id },
        });

        if (categoria) {
            res.status(200).json({ message: 'Categoría eliminada con éxito.' });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada.' });
        }
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


module.exports = { getAllCategories, getCategories, addCategory, updateCategory, deleteCategory };
