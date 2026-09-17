import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    telefono: {
        type: DataTypes.STRING(100),
        allowNull: true
    },

    direccion: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
}, {
    tableName: 'clientes',
    timestamps: false
});

export default Cliente;