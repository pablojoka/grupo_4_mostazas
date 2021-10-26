const fs = require('fs');
const path = require('path');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/products.json');
const tazas = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {
		res.render("productos.ejs", {
			tazas: tazas
		})
	},

	// (get) Detail - Detalle de un producto
	detalle: (req, res) => {
		const id = req.params.id;
		const taza = tazas.find(taza => {
			return taza.id == id
		})
        res.render("productDetail.ejs", { 
			taza: taza
		})
	},

	// (get) Create - Formulario para crear
    
	crear: (req, res) => {  
		res.render("crear-producto.ejs"); 
	},
	
	// (post) Create - Método para guardar la info
	store: (req, res) => {
		console.log(req.body);
		const newProduct = {
			id: tazas[tazas.length - 1].id +1,
			nombre: req.body.nombre,
			precio: req.body.precio,
			categoria: req.body.categoria,
			material: req.body.material,
			descripcion: req.body.descripcion,
			imagen: req.file.filename 
			/* ...req.body,*/ 
		}

		tazas.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(tazas, null, " "));
		res.redirect("/productos");
	},

	// (get) Update - Formulario para editar
	editar: (req, res) => {
		const id = req.params.id;
		const product = tazas.find(taza => {
			return taza.id == id
		})
	
		res.render("editar-producto", {
			taza: product
		})
	},

	// (post) Update - Método para actualizar la info
	subir: (req, res) => {
		const id = req.params.id;
		let productToEdit = tazas.find(taza => taza.id == id);
		
		productToEdit = {
			id: productToEdit.id,
			...req.body, 
			imagen: req.file ? req.file.filename : productToEdit.imagen
		}
		let tazaEditada= tazas;
		tazas.forEach( (taza, index) => {
			if(taza.id== id){
				tazaEditada[index]=productToEdit
			}
			
		});

		

		fs.writeFileSync(productsFilePath, JSON.stringify(tazaEditada, null, " "));
		res.redirect("/productos")
	},

	// (delete) Delete - Eliminar un producto de la DB
	    eliminar : (req, res) => {
		let id = req.params.id;
		let productosFinales = tazas.filter(taza=>{
			return id != taza.id
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(productosFinales, null, " "))//se le pone null y comillas con espacio para que en el JSON quede uno elemento abajo
		res.redirect("/productos")
	}
};

module.exports = controller;




















/*const controlador={
    index:(req, res)=>{
        res.render();('index de productos'); //tendria que ir la ruta de los productos
    },
    detalleProducto:(req, res)=>{
        res.send();('detalle del producto');//detalle de cada taza individual
    },
    crearProducto:(req, res)=>{
        res.render('creador de productos')//plantilla para crear productos
},
    agregarProducto: (req,res)=>{
        let productoNuevo=req.body
        res.send(req.body);
    }
};

module.exports = controlador*/