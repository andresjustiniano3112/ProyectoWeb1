const express = require('express');
const { verifyToken } = require('../utils/token');
const Pedido = require('../models/pedido'); // Modelo de pedidos
const DetallePedido = require('../models/detallePedido'); // Modelo de detalles
const router = express.Router();

router.post('/complete', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.body.userId; // Usuario logueado

    if (!token || !userId) {
        return res.status(401).json({ message: 'Usuario no autenticado o carrito vacío.' });
    }

    try {
        const decoded = verifyToken(token);
        const cart = decoded.cart;

        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío.' });
        }

        // Crear el pedido
        const pedido = await Pedido.create({
            usuario_id: userId,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });

        // Crear los detalles del pedido
        const detalles = cart.map((item) => ({
            pedido_id: pedido.id,
            producto_id: item.productId,
            cantidad: item.quantity,
            subtotal: item.price * item.quantity,
        }));
        await DetallePedido.bulkCreate(detalles);

        res.status(201).json({ message: 'Pedido completado con éxito.' });
    } catch (error) {
        console.error('Error al completar pedido:', error);
        res.status(500).json({ message: 'Error al procesar el pedido.' });
    }
});

module.exports = router;
