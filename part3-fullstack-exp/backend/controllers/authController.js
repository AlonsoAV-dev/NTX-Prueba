const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret-key';

// Usuario hardcodeado
const USUARIO = {
    username: 'admin',
    password: 'admin123'
};

// Realiza el login y genera el token JWT
const login = (req, res) => {
    const { username, password } = req.body;

    if (username === USUARIO.username && password === USUARIO.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
        return res.json({ token, message: 'Login exitoso' });
    }

    return res.status(401).json({ error: 'Credenciales inválidas' });
};

module.exports = {
    login
};
