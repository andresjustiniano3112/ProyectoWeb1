const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generar token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: '1d' });
};

// Registro de usuario
const registerUser = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        // Validar si el usuario ya existe
        const userExists = await User.findOne({ where: { correo } });
        if (userExists) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Crear usuario
        const user = await User.create({
            nombre,
            correo,
            contraseña: hashedPassword,
        });

        res.status(201).json({
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            tipo_usuario: user.tipo_usuario,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
};

const loginUser = async (req, res) => {
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

        // Enviar respuesta con tipo_usuario
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


// Perfil del usuario
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (user) {
            res.json({
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                tipo_usuario: user.tipo_usuario,
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del usuario.' });
    }
};










// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'nombre', 'correo', 'tipo_usuario'], // Campos que deseas traer
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios.' });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { nombre, correo, contraseña, tipo_usuario } = req.body;

    try {
        // Validar si el correo ya existe
        const existingUser = await User.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear usuario
        const newUser = await User.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            tipo_usuario,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario.' });
    }
};

const updateUser = async (req, res) => {
    const { nombre, correo, contraseña, tipo_usuario } = req.body;
    const { id } = req.params;

    // Validar los campos
    if (!nombre || !correo || !tipo_usuario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        let hashedPassword = user.contraseña;
        if (contraseña) {
            // Encriptar nueva contraseña si se proporciona
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(contraseña, salt);
        }

        await user.update({
            nombre,
            correo,
            contraseña: hashedPassword,
            tipo_usuario,
        });

        res.status(200).json({ message: 'Usuario actualizado con éxito.' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario.' });
    }
};

// Eliminar un usuario existente
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado con éxito.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario.' });
    }
};






module.exports = {registerUser,loginUser,getProfile,getAllUsers, createUser, updateUser, deleteUser};
