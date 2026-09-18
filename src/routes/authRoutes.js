import express from 'express';
import { login } from '../controllers/authController.js';
import verificarToken from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/login', login);
router.get('/', verificarToken, (req,res) => {
    res.json({
        mensaje: "hola"
    })
});

export default router;