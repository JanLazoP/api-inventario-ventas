import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    sku: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    precio: {
        type: DataTypes.DECIMAL(10,2),
        validate: {
            min: 0.01
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    categoriaId: {
        type: DataTypes.INTEGER
    }
},{
    tableName: 'Productos',
    timestamps: false
});

export default Producto;