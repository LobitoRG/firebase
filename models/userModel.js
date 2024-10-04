const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // Importa uuid para generar IDs únicos

let users = [
    {
        username: 'admin',
        password: bcrypt.hashSync('12345', 10), // Contraseña encriptada
        apiKey: bcrypt.hashSync(uuidv4(), 10) // Genera y encripta una API key
    },
    {
        username: 'user',
        password: bcrypt.hashSync('12345', 10), // Contraseña encriptada
        apiKey: bcrypt.hashSync(uuidv4(), 10) // Genera y encripta una API key
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
    const newApiKey = bcrypt.hashSync(uuidv4(), 10); // Genera y encripta la API key
    const newUser = {
        username,
        password: hashedPassword,
        apiKey: newApiKey // Almacena la API key encriptada
    };
    users.push(newUser);
    return newUser;
}

module.exports = {
    getUserByUsername,
    createUser,
    getUserByApiKey
};
