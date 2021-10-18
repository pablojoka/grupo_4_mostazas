// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ************ Controller Require ************
const productosController = require('../controllers/productosControllers');

// ************ Multer ************

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, './public/imagenes');
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage: storage});





// Devolver todos los productos  
router.get('/', productosController.index);


// Devolver un producto 
router.get('/detalle/:id/', productosController.detalle); 

// Crear un producto

router.get('/crear/', productosController.crear); 
router.post('/',upload.single("imagenes"),  productosController.store);

 //Editar un producto 
router.get('/editar/:id', productosController.editar); 
router.post('/editar/:id', upload.single("imagenes"), productosController.subir);

// Eliminar un producto 
router.delete('/delete/:id', productosController.eliminar);

module.exports = router;









/*const express = require('express')
const router = express.Router();

const productosControllers = require('../controllers/productosControllers')
//ruta principal de los productos
router.get ('/', productosControllers.index)
    
//detalle de un producto en especifico
router.get ('/productDetail/detalle',productosControllers.detalleProducto);

//agregar un producto
router.get('/productDetail', productosControllers.crearProducto)
router.post('/productdetail', productosControllers.agregarProducto)


module.exports=router; */