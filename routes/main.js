const express = require('express');
const router = express.Router();

// ************ Controller Require ************

const mainController = require('../controllers/mainController');
//const productosController = require ('../controllers/productosControllers')


router.get('/', mainController.index); 
router.get('/carrito', mainController.carrito); 
router.get('/registro', mainController.registro); 
router.get('/login', mainController.login); 
router.get('/crear-producto', mainController.crear); 
router.get('/editar-producto', mainController.editar); 




//router.post('/search', mainController.search);
router.get('/search', mainController.search);



module.exports = router;
