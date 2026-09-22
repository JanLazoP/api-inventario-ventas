import { Producto, Categoria } from "../models/index.js";

export const obtenerProductos = async (req, res) => {
    try{
        const productos = await Producto.findAll({
            include: {
                model: Categoria
            }
        });
        res.status(200).json(productos);
    }catch(error){
        console.error('Error al obtener los productos:', error.message)

        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }
}

export const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id, {
            include: {
                model: Categoria
            }
        });

        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrada"
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        console.error("Error al obtener producto:", error.message);

        res.status(500).json({
            error: "Error al obtener producto"
        });
    }
};

export const crearProducto = async (req, res) => {
    try{
        const { sku , nombre, precio, stock, categoriaId } = req.body

        const producto = await Producto.create({
            sku: sku,
            nombre: nombre,
            precio: precio,
            stock: stock,
            categoriaId: categoriaId
        });

        res.status(201).json({
            mensaje: "Producto creado con exito",
            producto
        })
    }catch(error){
        console.error('Error al crear el producto:', error.message)

        res.status(500).json({
            error: "Error al crear el producto"
        });
    }
}

export const actualizarProducto = async (req, res) => {
    try{

        const { id } = req.params;
        const { sku , nombre, precio, stock, categoriaId } = req.body

        const producto = await Producto.findByPk(id);

        if(!producto){
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        producto.sku = sku;
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        producto.categoriaId = categoriaId;

        await producto.save();

        res.status(200).json({
            mensaje: "Producto actualizado con éxito",
            producto
        });

    }catch(error){
        console.error('Error al actualizar el producto:', error.message)

        res.status(500).json({
            error: "Error al actualizar el producto"
        });
    }
}

export const eliminarProducto = async (req, res) => {
    try{
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if(!producto){
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        await producto.destroy();

        res.status(200).json({
            mensaje: "Producto eliminado con éxito"
        });

    }catch(error){
        console.error('Error al eliminar el producto:', error.message)

        res.status(500).json({
            error: "Error al eliminar el producto"
        });
    }
}