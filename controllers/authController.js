const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'claveSecreta';
const JWT_EXPIRES_IN = '5m';

async function login(req, res) {
    const { username, password } = req.body;
    const user = userModel.getUserByUsername(username);

    if (!user) {
        return res.status(403).json({ code: 403, message: 'Usuario no encontrado' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
        return res.status(403).json({ code: 403, message: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign(
        { username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
        code: 200,
        message: 'Inicio de sesión exitoso',
        token
    });
}

async function createUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ code: 400, message: 'Faltan datos necesarios' });
    }

    const existingUser = userModel.getUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ code: 409, message: 'El usuario ya existe' });
    }

    const newUser = userModel.createUser(username, password);

    return res.status(201).json({
        code: 201,
        message: 'Usuario creado exitosamente',
        user: {
            username: newUser.username,
            apiKey: newUser.apiKey // Devolver la API key encriptada
        }
    });
}

async function getUserByApiKey(req, res) {
    const { apiKey } = req.params;
    
    const user = userModel.getUserByApiKey(apiKey); // Busca al usuario por la API key

    if (!user) {
        return res.status(404).json({ code: 404, message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ code: 200, user: { username: user.username } });
}

module.exports = { login, createUser, getUserByApiKey, JWT_SECRET };
