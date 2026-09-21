import { Cliente } from "../models/index.js";

export const obtenerClientes = async (req, res) => {
    try{
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    }catch(error){
        console.error('Error al obtener los clientes:', error.message)

        res.status(500).json({
            error: "Error al obtener los clientes"
        });
    }
}

export const crearCliente = async (req, res) => {
    try{
        const { nombre, email, telefono, direccion } = req.body

        const cliente = await Cliente.create({
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion
        });

        res.status(201).json({
            mensaje: "Cliente creado con éxito",
            cliente
        })
    }catch(error){
        console.error('Error al crear el cliente:', error.message)

        res.status(500).json({
            error: "Error al crear el cliente"
        });
    }
}

export const actualizarCliente = async (req, res) => {
    try{

        const { id } = req.params;
        const {nombre, email, telefono, direccion } = req.body;

        const cliente = await Cliente.findByPk(id);

        if(!cliente){
            return res.status(404).json({
                error: "Cliente no encontrado"
            });
        }

        cliente.nombre = nombre;
        cliente.email = email;
        cliente.telefono = telefono;
        cliente.direccion = direccion;


        await cliente.save();

        res.status(200).json({
            mensaje: "Cliente actualizado con éxito",
            cliente
        });

    }catch(error){
        console.error('Error al actualizar al cliente:', error.message)

        res.status(500).json({
            error: "Error al actualizar al cliente"
        });
    }
}

export const eliminarCliente = async (req, res) => {
    try{
        const { id } = req.params;

        const cliente = Cliente.findByPk(id);

        if(!cliente){
            return res.status(404).json({
                error: "Cliente no encontrado"
            });
        }

        await cliente.destroy();

        res.status(200).json({
            mensaje: "Cliente eliminado con éxito"
        });

    }catch(error){
        console.error('Error al eliminar al cliente:', error.message)

        res.status(500).json({
            error: "Error al eliminar al cliente"
        });
    }
}