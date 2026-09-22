import express from 'express';
import verificarToken from '../middlewares/authMiddleware';
import validarProducto from '../middlewares/validateProducto.js';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/productoController.js';

const router = express.Router();

router.get('/', obtenerProductos);
router.post('/', verificarToken, validarProducto, crearProducto);
router.put('/:id', verificarToken, validarProducto, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

export default router;