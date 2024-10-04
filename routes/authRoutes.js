const express = require ('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post ('/login', authController.login);
router.post('/crearUsuario', authController.createUser); // Nueva ruta
router.get('/usuario/:apiKey', authController.getUserByApiKey); // Nueva ruta


module.exports = router;
