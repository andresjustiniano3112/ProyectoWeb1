const { Sequelize } = require('sequelize');

// Configuración de la conexión
const sequelize = new Sequelize(
    process.env.DB_NAME || 'TiendaLibros',   // Nombre de la base de datos
    process.env.DB_USER || 'postgres',       // Usuario
    process.env.DB_PASSWORD || 'Andresjv3112', // Contraseña
    {
        host: process.env.DB_HOST || 'localhost', // Host
        port: process.env.DB_PORT || 5432,       // Puerto
        dialect: 'postgres',                    // Motor de la base de datos
        logging: false,                         // Desactiva logs
    }
);

module.exports = sequelize;
