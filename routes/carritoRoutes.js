const express = require('express');
const router = express.Router();
const { completarPedido, getPedidosPorUsuario } = require('../controllers/carritoController');

// Ruta para completar pedido
router.post('/complete', completarPedido);

// Ruta para obtener pedidos por usuario
router.get('/api/cart/orders/:id', getPedidosPorUsuario);

module.exports = router;
