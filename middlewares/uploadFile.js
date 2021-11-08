const express = require('express');
const router = express.Router();

const path = require('path')
const multer = require('multer');
const { body }= require('express-validator')



const storage= multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, './public/imagenes/avatars');
    },
    filename:(req,file,cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,fileName)
    },
})
const uploadFile= multer ({ storage })

module.exports= uploadFile; 