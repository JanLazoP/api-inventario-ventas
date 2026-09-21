import express from 'express';
import verificarToken from '../middlewares/authMiddleware';
import validarCliente from '../middlewares/validateCliente.js';
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', obtenerClientes);
router.post('/', verificarToken, validarCliente, crearCliente);
router.put('/:id', verificarToken, validarCliente, actualizarCliente);
router.delete('/:id', verificarToken, validarCliente, eliminarCliente);

export default router;

