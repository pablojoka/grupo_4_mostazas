const express = require('express');
const router = express.Router();

const path = require('path')
const multer = require('multer')

const storage= multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, '../public/imagenes/avatars');
    },
    filename:(req,res,cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.fileName)}`;
        cb(null,)
    },
})
const uploadFile= multer ({storage})
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