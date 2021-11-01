const express = require('express');
const router = express.Router();

const path = require('path')
const multer = require('multer');
const { body }= require('express-validator')

const storage= multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, './public/imagenes/avatars');
    },
    filename:(req,res,cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,)
    },
})
const uploadFile= multer ({storage})
//Controller
const usersController = require('../controllers/usuariosController');
const validations = [
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electronico').bail().isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario'),
    body('fullName').notEmpty().withMessage('Tienes que escribir tu nombre y apellido'),
    body('contraseña').notEmpty().withMessage('Tienes que escribir una contraseña '),
    body('contraseña2').notEmpty().withMessage('confirmar la contraseña'),
    body('avatar').custom((value, {req})=>{
        let file = req.file;
        let aceptedExtensions = ['.jpg','.png', 'gif'];
        let fileExtensions = path.extname(file.originalname)
        if(!file){
            throw new Error('tienes que subir una imagen')
        }else{
            if (aceptedExtensions.includes()){
                throw new Error (`Las extensiones de atchivos son ${aceptedExtensions.join(',')}`)
    
            }
        } return true;
    })

]

//Middlewares
//const uploadFile = require('../middlewares/multerMiddleware');
//const validations = require('../middlewares/validateRegisterMiddleware');

// Formulario de registro
router.get('/register', usersController.register);

//Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, validations , usersController.processRegister)

//Formulario de login
router.get('/login', usersController.login);

//Perfil de Usuario
router.get('/perfil/:usuarioId', usersController.profile);

module.exports = router