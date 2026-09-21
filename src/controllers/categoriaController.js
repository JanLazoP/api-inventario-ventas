import { Categoria } from "../models/index.js";

export const obtenerCategorias = async (req, res) => {
    try{
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    }catch(error){
        console.error('Error al obtener las categorías:', error.message)

        res.status(500).json({
            error: "Error al obtener las categorías"
        });
    }
}

export const crearCategoria = async (req, res) => {
    try{
        const { nombre, descripcion } = req.body

        const categoria = await Categoria.create({
            nombre: nombre,
            descripcion: descripcion
        });

        res.status(201).json({
            mensaje: "Categoría creada con exito",
            categoria
        })
    }catch(error){
        console.error('Error al crear la categoría:', error.message)

        res.status(500).json({
            error: "Error al crear la categoría"
        });
    }
}

export const actualizarCategoria = async (req, res) => {
    try{

        const { id } = req.params;
        const {nombre, descripcion } = req.body;

        const categoria = await Categoria.findByPk(id);

        if(!categoria){
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        categoria.nombre = nombre;
        categoria.descripcion = descripcion;

        await categoria.save();

        res.status(200).json({
            mensaje: "Categoría actualizada con éxito",
            categoria
        });

    }catch(error){
        console.error('Error al actualizar la categoría:', error.message)

        res.status(500).json({
            error: "Error al actualizar la categoría"
        });
    }
}

export const eliminarCategoria = async (req, res) => {
    try{
        const { id } = req.params;

        const categoria = Categoria.findByPk(id);

        if(!categoria){
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        await categoria.destroy();

        res.status(200).json({
            mensaje: "Categoría eliminada con éxito"
        });

    }catch(error){
        console.error('Error al eliminar la categoría:', error.message)

        res.status(500).json({
            error: "Error al eliminar la categoría"
        });
    }
}