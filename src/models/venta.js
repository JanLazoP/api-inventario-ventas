import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },

    productoId:{
        type: DataTypes.INTEGER
    },

    clienteId: {
        tpye: DataTypes.INTEGER
    }

}, {
    tableName: 'ventas',
    timestamps: false
});

export default Venta;