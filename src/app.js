import express from 'express';
import sequelize from './config/db.js';
import './models/index.js';
import authRoutes from './routes/authRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/ventas', ventaRoutes);

try{
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL mediante Sequelize exitosa');

    await sequelize.sync();
    console.log('Modelos sincronizados');

    app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
    
}catch(error){
    console.error('Error al conectar con PostgreSQL:', error.message);
}
