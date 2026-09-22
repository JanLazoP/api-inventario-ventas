import express from 'express';
import verificarToken from '../middlewares/authMiddleware.js';
import {validarVenta} from '../middlewares/validateVenta.js';
import { obtenerVentas, obtenerVenta, crearVenta, actualizarVenta, eliminarVenta } from '../controllers/ventaController.js';

const router = express.Router();

router.get('/', obtenerVentas);
router.get('/:id', obtenerVenta);
router.post('/', verificarToken, validarVenta, crearVenta);
router.put('/:id', verificarToken, validarVenta, actualizarVenta);
router.delete('/:id', verificarToken, eliminarVenta);

export default router;