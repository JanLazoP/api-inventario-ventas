export const validarVenta = (req, res, next) => {
    const { productoId, clienteId, cantidad, total } = req.body

    if(!productoId){
        return res.status(400).json({
            error: "El producto es obligatorio"
        });
    }

    if(!clienteId){
        return res.status(400).json({
            error: "El cliente es obligatorio"
        });
    }

    if(!Number.isInteger(cantidad) || cantidad < 1){
        return res.status(400).json({
            error: "La cantidad debe ser un entero positivo"
        });
    }
    if(total === undefined || total <= 0){
        return res.status(400).json({
            error: "El total debe ser mayor a 0"
        });
    }

    next();
}