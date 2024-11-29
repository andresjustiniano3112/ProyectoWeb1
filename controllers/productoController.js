const Producto = require('../models/producto');

const getProductsByCategory = async (req, res) => {
    const { categoriaId } = req.params;

    try {
        const products = await Producto.findAll({
            where: { categoria_id: categoriaId },
        }); 

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos.' });
    }
};

module.exports = { getProductsByCategory };
