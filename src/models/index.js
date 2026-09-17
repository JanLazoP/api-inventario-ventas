import sequelize from "../config/db.js";

import Categoria from "./categoria.js";
import Producto from "./producto.js";
import Cliente from "./cliente.js";
import Venta from "./venta.js";

Categoria.hasMany(Producto,{
    foreignKey: "categoriaId"
});

Producto.belongsTo(Categoria, {
    foreignKey: "categoriaId"
});

Producto.hasMany(Venta, {
    foreignKey: "productoId"
});

Venta.belongsTo(Producto, {
    foreignKey: "productoId"
});

Cliente.hasMany(Venta, {
    foreignKey: "clienteId"
});

Venta.belongsTo(Cliente, {
    foreignKey: "clienteId"
});

export { sequelize, Categoria, Producto, Cliente, Venta };