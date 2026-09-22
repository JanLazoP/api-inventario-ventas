import express from 'express';
import verificarToken from '../middlewares/authMiddleware.js';
import {validarCliente} from '../middlewares/validateCliente.js';
import { obtenerClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerCliente);
router.post('/', verificarToken, validarCliente, crearCliente);
router.put('/:id', verificarToken, validarCliente, actualizarCliente);
router.delete('/:id', verificarToken, eliminarCliente);

export default router;

