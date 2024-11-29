require('dotenv').config(); // Cargar variables del archivo .env
const express = require('express');
const sequelize = require('./config/db'); 
const path = require('path');


// importar rutas
const authRoutes = require('./routes/authRoutes'); 
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriaRoutes);
app.use('/api/products', productoRoutes);
app.use('/api/cart', carritoRoutes);
app.use(carritoRoutes);

app.use('/api/users', userRoutes);



// Probar la conexión antes de iniciar el servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
        app.listen(3000, () => {
            console.log('Servidor corriendo en http://localhost:3000');
        });
    })
    .catch(err => console.error('Error al conectar a la base de datos:', err));

