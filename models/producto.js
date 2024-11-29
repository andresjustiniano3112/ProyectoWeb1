    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/db');
    

    const Producto = sequelize.define('Producto', {
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(255),
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Categorias',
                key: 'id',
            },
        },
    }, {
        tableName: 'productos',
        timestamps: false,
    });


    module.exports = Producto;
