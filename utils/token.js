const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens
const SECRET_KEY = 'authToken'; // Cambiar por una clave segura

// Generar un token con los datos del carrito
const generateToken = (cart) => {
    return jwt.sign({ cart }, SECRET_KEY, { expiresIn: '1h' });
};

// Verificar y decodificar un token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Token inválido.');
    }
};

module.exports = { generateToken, verifyToken };
