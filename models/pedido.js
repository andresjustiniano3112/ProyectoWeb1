const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const DetallePedido = require('./detallePedido'); // Importa DetallePedido

const Pedido = sequelize.define('Pedido', {
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios',
            key: 'id',
        },
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'pedidos',
    timestamps: false,
});

// Relación con DetallePedido
Pedido.hasMany(DetallePedido, { foreignKey: 'pedido_id' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

module.exports = Pedido;
