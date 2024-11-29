const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define(
    'categoria', 
    {
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: 'categorias',
        timestamps: false,
    }
);

module.exports = Categoria;
