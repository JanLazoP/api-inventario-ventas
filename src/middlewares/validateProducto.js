export const validarProducto = (req,res,next) => {
    const { sku, nombre, precio, stock } = req.body;

    if(!sku || sku.trim() === ""){
        return res.status(400).json({
            error: "El SKU es obligatorio"
        });
    }

    if(!nombre || nombre.trim() === ""){
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    if(precio === undefined || precio <= 0){
        return res.status(400).json({
            error: "El precio debe ser mayor a 0"
        });
    }

    if(!Number.isInteger(stock) || stock < 1){
        return res.status(400).json({
            error: "El stock debe ser un entero positivo"
        });
    }

    next();
}