const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./producto');


const DetallePedido = sequelize.define('DetallePedido', {
    pedido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pedidos', // Nombre de la tabla
            key: 'id',
        },
    },
    producto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Productos',
            key: 'id',
        },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'detalle_pedidos',
    timestamps: false,

});

DetallePedido.belongsTo(Producto, { as: 'Producto', foreignKey: 'producto_id' });

module.exports = DetallePedido;
