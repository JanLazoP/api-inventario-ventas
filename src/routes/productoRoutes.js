import express from 'express';
import verificarToken from '../middlewares/authMiddleware.js';
import {validarProducto} from '../middlewares/validateProducto.js';
import { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/productoController.js';

const router = express.Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', verificarToken, validarProducto, crearProducto);
router.put('/:id', verificarToken, validarProducto, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

export default router;