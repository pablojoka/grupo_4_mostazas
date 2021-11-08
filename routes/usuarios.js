const express = require ('express');
const router = express.Router();
const multer = require('multer');

//Controller
const usersController = require('../controllers/usuariosController');

//Middlewares
const uploadFile = require('../middlewares/uploadFile');
const validations = require('../middlewares/validations');

// Formulario de registro
router.get('/registro', usersController.register);

//Procesar el registro
router.post('/registro', uploadFile.single('avatar'), validations, usersController.processRegister)

//Formulario de login
router.get('/login', usersController.login);

//Perfil de Usuario
router.get('/perfil/:usuarioId', usersController.profile);

module.exports = router;