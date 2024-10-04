const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Función para generar una API key segura para URLs
function generateApiKey() {
    const apiKey = uuidv4(); // Genera un UUID
    const base64ApiKey = Buffer.from(apiKey).toString('base64'); // Convierte a base64
    const safeApiKey = base64ApiKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Base64 URL seguro
    return safeApiKey;
}

let users = [
    {
        username: 'admin',
        password: bcrypt.hashSync('12345', 10), // Contraseña encriptada
        apiKey: generateApiKey() // Genera una API key segura
    },
    {
        username: 'user',
        password: bcrypt.hashSync('12345', 10), // Contraseña encriptada
        apiKey: generateApiKey() // Genera una API key segura
    }
];

function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

function getUserByApiKey(apiKey) {
    return users.find(user => user.apiKey === apiKey);
}

function createUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newApiKey = generateApiKey(); // Genera una API key segura
    const newUser = {
        username,
        password: hashedPassword,
        apiKey: newApiKey // Almacena la API key segura
    };
    users.push(newUser);
    return newUser;
}

module.exports = {
    getUserByUsername,
    createUser,
    getUserByApiKey
};

