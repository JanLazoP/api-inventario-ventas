export const validarCliente = (req, res, next) => {
    const { nombre, email } = req.body;

    if(!nombre || nombre.trim() === ""){
        return res.status(400).json({
            error: "El nombre es obligatorio"
        })
    }

    if(!email || email.trim() === ""){
        return res.status(400).json({
            error: "El email es obligatorio"
        })
    }

    next();
}