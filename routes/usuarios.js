const express = require ('express');
const router = express.Router();

//Controller
const usersController = require('../controllers/usuariosController');

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');

// Formulario de registro
router.get('/register', usersController.register);

//Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister)

//Formulario de login
router.get('/login', usersController.login);

//Perfil de Usuario
router.get('/perfil/:usuarioId', usersController.perfil);

module.exports = router