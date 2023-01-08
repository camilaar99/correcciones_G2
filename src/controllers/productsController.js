const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
	archivo: productsFilePath,


	productView: function (req, res, next) {
		res.render('product')
	},


	productoDetail: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id == id);

		res.render('product', {
			product
		})
	},

	// // Root - Show all products
	// // index: (req, res) => {
	// // 	products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	// // 	res.render('products', { products })
	// // 	// Do the magic
	// // },

	// // // Detail - Detail from one product
	// // detail: (req, res) => {
	// // 	// Do the magic
	// // 	products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	// // 	const id_producto = req.params.id;
	// // 	var elemento2;
	// // 	products.forEach(function buscar_posicion_desdeid(elemento) {
	// // 		if (elemento.id == id_producto) {
	// // 			elemento2 = elemento;
	// // 		}
	// // 	})
	// // 	res.render('detail', { id_producto, 'producto_mostrar': elemento2, title: elemento2.name })
	// // },

	// Create - Form to create
	create: (req, res) => {
		res.render('crear');
		// 	// Do the magic
	},
	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			const productsFilePath = path.join(__dirname, '../data/products.json');
			let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			let indices = [];
			products.forEach(function (elemento) {
				indices.push(elemento.id)
			})
			let nuevoId = (Math.max(...indices)) + 1
			//agregar el nuevo item al array
			let nuevoProductos = products;


			if (req.file) {
				let itemNuevo = { id: nuevoId, ...req.body, imagen: req.file.filename }
				nuevoProductos.push(itemNuevo)
				//escribiendo el nuevo array en el archivo
				fs.writeFileSync(productsFilePath, JSON.stringify(nuevoProductos))
				res.redirect('../shop')
			}
			else {
				res.render('crear')
			}
		}
		else {
			res.render('crear', { errors: errors.array(), old: req.body })
		}




	},


	editPage: (req,res)=>{
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
	
		res.render('modificar',{usuarios: products})
	},
	// Update - Form to edit
	edit: (req, res) => {
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const id_producto = req.params.id;
		var elemento2;
		products.forEach(function buscar_posicion_desdeid(elemento) {
			if (elemento.id == id_producto) {
				elemento2 = elemento;
			}
		})
		res.render('editar', { id_producto, 'productToEdit': elemento2, title: elemento2.name })
	},
	// Update - Method to update
	update: (req, res) => {

		//leer JSON y guardarlo en un array
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		//leer el id del producto desde el request
		const id_producto = Number(req.params.id);
		//filter donde se devuelven todos los elemetos del array MENOS el pedido por request
		let nuevoProductos = products.filter(valor => valor.id != id_producto)
		if (req.file) {
			//agregar el nuevo item modificado al array sin el
			let itemEditado = { id: id_producto, ...req.body, imagen: req.file.filename }
			nuevoProductos.push(itemEditado)
			//escribiendo el nuevo array en el archivo
			fs.writeFileSync(productsFilePath, JSON.stringify(nuevoProductos))

			//volver a leer el nuevo archivo
			products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			//devolver todo el objeto con el id que quiere el usuario, no se si esto está bien, solo lo hice para evitar un for 
			var elemento2;
			products.forEach(function buscar_posicion_desdeid(elemento) {
				if (elemento.id == id_producto) {
					elemento2 = elemento;
				}
			})
			console.log(req.file.filename)
			res.render('product', { id_producto, producto: elemento2, title: elemento2.name })
		}
		else {
			var elemento2;
			products.forEach(function buscar_posicion_desdeid(elemento) {
				if (elemento.id == id_producto) {
					elemento2 = elemento;
				}
			})
			res.render('editar', { id_producto, 'productToEdit': elemento2, title: elemento2.name })
		}

	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		//leer el id del producto desde el request
		const id_producto = (req.params.id);
		//filter donde se devuelven todos los elemetos del array MENOS el pedido por request
		let nuevoProductos = products.filter(valor => valor.id != id_producto)
		fs.writeFileSync(productsFilePath, JSON.stringify(nuevoProductos));
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect('/product/edit')

	}
};

module.exports = controller;