import jwt from 'jsonwebtoken';

export const login = (req, res) => {
    const { usuario, password } = req.body;

    if(usuario!== 'admin' || password !== '1234') {
        return res.status(401).json({
            error: 'Credenciales incorrectas'
        });
    }

    const token = jwt.sign( { usuario: usuario},process.env.JWT_SECRET,{ expiresIn: '1h'} );

    res.json({
        mensaje: 'Login exitoso',
        token: token
    });
};