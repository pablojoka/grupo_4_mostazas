 /**********requires *********/
 const express = require('express');
 const path = require('path')
 const methodOverride = require('method-override'); //agregue este requerimiento para poder usar el put y el delete a futuro
 const {validationResult} = require ('express-validator');
 const multer  = require('multer')
 const session = require('express-session')
 const cookies = require('cookie-parser')

 const userLoggedMiddleware= require('./middlewares/userLoggedMiddleware')
 /**********express *******/
 const app = express();
 app.use(express.static('public'));
 
 // ************ Middlewares - (don't touch) ************
 app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
 app.use(express.urlencoded({ extended: false }));
 app.use(express.json()); // Para poder leer el body
 app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
 app.use(express.urlencoded({extended: false}));
 app.use(session({
     secret: 'es un secreto',
     resave: false,
     saveUninitialized: false,
 }));
 app.use(cookies())
 app.use(userLoggedMiddleware)
 


 
 /**********template engine ******/
 app.set('view engine','ejs');
 app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas
 
 
 // ************ Route System require and use() - (don't touch) ************
 const mainRouter = require('./routes/main'); // Rutas main
 const productsRouter = require('./routes/productos'); // Rutas /productos
 const userRouter = require('./routes/usuarios'); //Rutas Usuarios
 
 app.use('/', mainRouter);
 app.use('/productos', productsRouter);
 app.use('/usuario', userRouter);
 
 app.listen(4000, ()=>{
     console.log('Servidor corriendo en http://localhost:4000/');
 });
 