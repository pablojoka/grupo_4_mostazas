 /**********requires *********/

const express = require('express');
const app = express();
//const path = require('path')
//const methodOverride = require('method-override'); //agregue este requerimiento para poder usar el put y el delete a futuro

/**********express *******/
app.use(express.static('public'));


/**********template engine ******/
app.set('veiw engine','ejs');

app.listen(4000, ()=>{
    console.log('Servidor corriendo en http://localhost:4000/');
});

app.get('/', (req,res)=>{
    res.render(__dirname + '/views/index.ejs');
});

app.get('/productDetail', (req,res)=>{
    res.render(__dirname + '/views/productDetail.ejs');
 });
app.get('/carrito', (req,res)=>{
    res.render(__dirname + '/views/productCart.ejs');
});

app.get('/registro', (req,res)=>{
    res.render(__dirname + '/views/register.ejs');
});

app.get('/login', (req,res)=>{
    res.render(__dirname + '/views/login.ejs');
});
app.get('/crear-producto', (req,res)=>{
    res.render(__dirname + '/views/crear-producto.ejs');
});
app.get('/editar-producto', (req,res)=>{
    res.render(__dirname + '/views/editar-producto.ejs');
});
             /* Sistema de ruteo */
// const rutaMain = require('./router/main)
//app.use('/',rutaMain);
    
//const rutasProductos = require('./routes/productos')

//app.use('/productDetail', rutasProducto);
//app.use('/productDetail/detalle', rutasProducto);
//app.use(./productDetail/crear, rutasproductos);