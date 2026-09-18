import express from 'express';
import sequelize from './config/db.js';
import './models/index.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);

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
