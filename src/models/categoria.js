import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: true
    }   
}, {
    tableName: 'categorias',
    timestamps: false
});

export default Categoria;