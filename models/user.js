const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
    'usuario', // Nombre del modelo
    {
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        tipo_usuario: {
            type: DataTypes.STRING(10),
            defaultValue: 'cliente',
        },
    },
    {
        tableName: 'usuarios', // Asegúrate de usar el nombre exacto de la tabla en la base de datos
        timestamps: false,    // No añadir columnas de timestamps (createdAt, updatedAt)
    }
);

module.exports = User;
