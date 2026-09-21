import express from 'express';
import verificarToken from '../middlewares/authMiddleware.js'
import { validarCategoria } from '../middlewares/validateCategoria.js';
import { obtenerCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/', obtenerCategorias);
router.post('/', verificarToken, validarCategoria, crearCategoria);
router.put('/:id', verificarToken, validarCategoria,  actualizarCategoria);
router.delete('/:id', verificarToken, validarCategoria,  eliminarCategoria);

export default router;