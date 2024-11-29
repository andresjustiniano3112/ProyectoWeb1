const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si el correo ya existe
        const userExists = await User.findOne({ where: { correo } });
        if (userExists) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear el usuario con tipo_usuario explícito
        const user = await User.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            tipo_usuario: 'cliente', // Aseguramos que sea cliente
        });

        res.status(201).json({ message: 'Usuario registrado con éxito.', user });
    } catch (err) {
        console.error('Error al registrar usuario:', err.message);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    // Validar campos
    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Buscar al usuario por correo
        const user = await User.findOne({ where: { correo } });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            user: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                tipo_usuario: user.tipo_usuario,
            },
        });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = { register, login }; // Asegúrate de exportar correctamente las funciones

