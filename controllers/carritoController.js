const Pedido = require('../models/pedido');
const DetallePedido = require('../models/detallePedido');
const Producto = require('../models/producto');

const completarPedido = async (req, res) => {
    const { usuario_id, carrito } = req.body;

    if (!usuario_id || !carrito || carrito.length === 0) {
        return res.status(400).json({ message: 'Datos inválidos o carrito vacío.' });
    }

    try {
        const nuevoPedido = await Pedido.create({
            usuario_id,
            total: carrito.reduce((acc, item) => acc + item.price * item.quantity, 0),
        });

        const detalles = carrito.map(item => ({
            pedido_id: nuevoPedido.id,
            producto_id: item.id,
            cantidad: item.quantity,
            subtotal: item.price * item.quantity,
        }));

        await DetallePedido.bulkCreate(detalles);

        return res.status(201).json({ message: 'Pedido completado con éxito.' });
    } catch (error) {
        console.error('Error al completar el pedido:', error);
        return res.status(500).json({ message: 'Error al procesar el pedido.' });
    }
};


const getPedidosPorUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.id; // Obtén el id del usuario desde los parámetros

        if (!usuarioId) {
            return res.status(400).json({ error: 'El ID de usuario es requerido' });
        }

        const pedidos = await Pedido.findAll({
            where: { usuario_id: usuarioId },
            include: [
                {
                    model: DetallePedido,
                    as: 'DetallePedidos',
                    include: [
                        {
                            model: Producto, // Incluye los datos del producto
                            as: 'Producto',
                            attributes: ['nombre', 'precio'], // Especifica los atributos que quieres obtener
                        },
                    ],
                },
            ],
        });

        if (!pedidos || pedidos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron pedidos para este usuario.' });
        }

        const formattedPedidos = pedidos.map((pedido) => ({
            ...pedido.toJSON(),
            total: parseFloat(pedido.total),
            DetallePedidos: pedido.DetallePedidos.map((detalle) => ({
                ...detalle.toJSON(),
                subtotal: parseFloat(detalle.subtotal),
                Producto: detalle.Producto, // Incluye el producto en la respuesta
            })),
        }));

        res.json(formattedPedidos);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};



  module.exports = { getPedidosPorUsuario, completarPedido };