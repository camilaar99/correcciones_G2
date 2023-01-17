const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let db = require('../database/models');
let sequelize = db.sequelize

const controller = {
	archivo: productsFilePath,


	productView2: function (req, res) {
		db.Product.findAll().then(function (result) {
			res.send(result)
			// 	//res.render(result)
		})
	},

	productView: function (req, res, next) {
		db.Product.findAll().then(function (result) {
			res.render('shop', { products: result })
			//res.send(result)
		})
	},


	productoDetail: (req, res) => {
		const id = req.params.id;

		db.Product.findByPk(id).then(function (result) {

			res.render('product', { product: result })
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
	store: async function (req, res) {
		try {
			let errors = validationResult(req);
			if (errors.isEmpty()) {

				let created = await db.Product.create({
					teamName: req.body.teamName,
					size: req.body.size,
					jugador: req.body.jugador,
					imagen: req.file.filename,
					price: req.body.price,
					grupo: req.body.grupo

				})
				res.redirect('/product')


			}
			else {
				res.render('crear', { errors: errors.array(), old: req.body })
			}


		}

		catch (e) {
			res.send(e)
			console.log(e);
		}


	}
	,


	editPage: async function (req, res) {

		try {
			let productos = await db.Product.findAll();
			res.render('modificar', { usuarios: productos })

		} catch (error) {
			res.render(error)
		}
	},
	// Update - Form to edit
	edit: async function (req, res) {
		try {

			const id_producto = req.params.id;
			let edited = await db.Product.findByPk(id_producto);
			res.render('editar', { id_producto, 'productToEdit': edited, title: edited.teamName })
		} catch (error) {
			res.send(error)
		}



	},
	// Update - Method to update
	update: async function (req, res) {


		try {

			






			let errors = validationResult(req);
			if (errors.isEmpty()) {
				console.log(errors)
				let id_producto = req.params.id;
				console.log(id_producto)
				console.log(req.body)
				let updated = await db.Product.update(
					{
						teamName: req.body.teamName,
						size: req.body.size,
						jugador: req.body.jugador,
						imagen: req.file.filename,
						price: req.body.price,
						grupo: req.body.grupo

					},
					{
						where: {
							id: id_producto
						}

					}

				)


				res.redirect('/product')

			}
			else{

				
				let old= {
					id: req.params.id,
					teamName: req.body.teamName,
					size: req.body.size,
					jugador: req.body.jugador,
					price: req.body.price,
					grupo: req.body.grupo
				}
				
				
				res.render('editar', { errors: errors.array(), 'productToEdit': old })
			}


		} catch (error) {
			res.send(error)
		}


	},

	// Delete - Delete one product from DB
	destroy: async function(req, res)  {


		try {
			let id_producto=req.params.id;
			let deleted= await db.Product.destroy(
				{
					where: {id: id_producto
					
					},  force: true
				}
			)
			res.redirect('/product/edit')

		} catch (error) {
			res.send(error)
		}
		
		
		
		

	}
};

module.exports = controller;