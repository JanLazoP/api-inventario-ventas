import { Venta, Producto, Cliente, Categoria } from "../models/index.js";

export const obtenerVentas = async (req, res) => {
    try{
        const ventas = await Venta.findAll({
            include: [
                {
                    model: Producto
                },
                {
                    model: Cliente
                }
            ]
        });
        res.status(200).json(ventas);
    }catch(error){
        console.error('Error al obtener las ventas:', error.message)

        res.status(500).json({
            error: "Error al obtener las ventas"
        });
    }
}

export const obtenerVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const venta = await Venta.findByPk(id, {
            include:[
                {
                    model: Producto
                },
                {
                    model: Cliente
                }
            ]
        });

        if (!venta) {
            return res.status(404).json({
                error: "Venta no encontrada"
            });
        }

        res.status(200).json(venta);

    } catch (error) {
        console.error("Error al obtener venta:", error.message);

        res.status(500).json({
            error: "Error al obtener venta"
        });
    }
};

export const crearVenta = async (req, res) => {
    try{
        const { cantidad, total, productoId, clienteId} = req.body

        const venta = await Venta.create({
            cantidad: cantidad,
            total: total,
            productoId: productoId,
            clienteId: clienteId
        });

        res.status(201).json({
            mensaje: "Venta creada con exito",
            venta
        })
    }catch(error){
        console.error('Error al crear la venta:', error.message)

        res.status(500).json({
            error: "Error al crear la venta"
        });
    }
}

export const actualizarVenta = async (req, res) => {
    try{

        const { id } = req.params;
        const { cantidad, total, productoId, clienteId} = req.body

        const venta = await Venta.findByPk(id);

        if(!venta){
            return res.status(404).json({
                error: "Venta no encontrada"
            });
        }

        venta.cantidad = cantidad;
        venta.total = total;
        venta.productoId = productoId;
        venta.clienteId = clienteId;

        await venta.save();

        res.status(200).json({
            mensaje: "Venta actualizada con éxito",
            venta
        });

    }catch(error){
        console.error('Error al actualizar la venta:', error.message)

        res.status(500).json({
            error: "Error al actualizar la venta"
        });
    }
}

export const eliminarVenta = async (req, res) => {
    try{
        const { id } = req.params;

        const venta = await Venta.findByPk(id);

        if(!venta){
            return res.status(404).json({
                error: "Venta no encontrada"
            });
        }

        await venta.destroy();

        res.status(200).json({
            mensaje: "Venta eliminada con éxito"
        });

    }catch(error){
        console.error('Error al eliminar la venta:', error.message)

        res.status(500).json({
            error: "Error al eliminar la venta"
        });
    }
}