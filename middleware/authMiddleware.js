const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (req, res, next) => {
    const user = req.headers['x-user']; // Obtenemos el usuario del encabezado personalizado.

    if (!user) {
        return res.status(401).json({ message: 'No autorizado, usuario no encontrado.' });
    }

    try {
        req.user = JSON.parse(user); // Parseamos el JSON del usuario.
        next();
    } catch (error) {
        return res.status(401).json({ message: 'No autorizado, datos de usuario inválidos.' });
    }
};

module.exports = authMiddleware;

