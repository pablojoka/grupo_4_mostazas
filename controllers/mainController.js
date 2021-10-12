
const fs = require('fs');
const path = require('path');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/products.json');
const tazas = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('index.ejs', {
			tazas: tazas
		})//productos(si se agrega alguna seccion, hay que hacer un filter, para llamarla al producto deseado)// faltaria tener un JSON de los productos para poder llamarlo en el controller y usarlo en la vista
	},
	productDetail: (req, res) => {
		res.render('productDetail.ejs')
	},
	carrito: (req, res) => {
		res.render('productCart.ejs')
	},
	registro: (req, res) => {
		res.render('register.ejs')
	},
	login: (req, res) => {
		res.render('login.ejs')
	},
	crear: (req, res) => {
		res.render('crear-producto.ejs')
	},
	editar: (req, res) => {
		res.render('editar-producto.ejs')
	},
	search: (req, res) => {
		let search = req.query.keywords;
		let filteredProducts = tazas.filter(taza => {
			return taza.name.toLowerCase().includes(search)
		});

		res.render('results', {
			filteredProducts: filteredProducts,
			search: search,
			toThousand: toThousand,
		});
		res.render("results")
	}
}

module.exports = controller


