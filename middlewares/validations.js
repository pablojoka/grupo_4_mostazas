const express = require('express');
const router = express.Router();

const path = require('path')
const multer = require('multer');
const{body}=require('express-validator')


const usersController = require('../controllers/usuariosController');


const validations = [
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electronico')
    .bail().isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario'),
    body('fullName').notEmpty().withMessage('Tienes que escribir tu nombre y apellido'),
    body('contraseña').notEmpty().withMessage('Tienes que escribir una contraseña '),
    body('contraseña2').notEmpty().withMessage('Confirmar la Contraseña'),
    body('avatar').custom((value, {req})=>{
        let file = req.file;
        let aceptedExtensions = ['.jpg','.png', 'gif'];
        
        if(!file){
            throw new Error('Tienes que subir una imagen')
        }else{
            let fileExtensions = path.extname(file.originalname)
            if (!aceptedExtensions.includes(fileExtensions)){
                throw new Error (`Las extensiones de archivos son ${aceptedExtensions.join(',')}`)
    
            }
        }
         return true;
    })

]
module.exports = validations;