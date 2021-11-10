const express = require ('express');
const router = express.Router();
const multer = require('multer');

//Controller
const usersController = require('../controllers/usuariosController');

//Middlewares
const uploadFile = require('../middlewares/uploadFile');
const validations = require('../middlewares/validations');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
// Formulario de registro
router.get('/registro', guestMiddleware , usersController.register);

//Procesar el registro
router.post('/registro', uploadFile.single('avatar'), validations, usersController.processRegister)

//Formulario de login
router.get('/login',guestMiddleware, usersController.login);

//Proceso de login
router.post('/login', usersController.loginProcess);

//Perfil de Usuario
router.get('/perfil/',authMiddleware, usersController.profile);

//logout
router.get('/logout/', usersController.logout);

module.exports = router;