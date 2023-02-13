const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');


let db = require('../database/models');
let sequelize = db.sequelize

const controller = {

	productView2: function (req, res) {
		db.Product.findAll({
			include: [{ association: "grupo_equipo" }]
		}).then(function (result) {
			res.send(result)
		})
	},

	productView: function (req, res, next) {
		db.Product.findAll({
			where: { size: "Small" }
		}).then(function (result) {
			res.render('shop', { products: result })
		})
	},


	productoDetail: (req, res) => {
		const id = req.params.id;

		db.Product.findByPk(id).then(function (result) {

			res.render('product', { product: result })
		})
	},
	// Create - Form to create
	create: (req, res) => {
		res.render('crear');

	},
	// Create -  Method to store
	store: async function (req, res) {
		try {
			let errors = validationResult(req);
			if (errors.isEmpty()) {

				function grupoElegido(grupo) {
					switch (grupo) {
						case "A":
							return 1
						case "B":
							return 2

						case "C":
							return 3
						case "D":
							return 4
						case "E":
							return 5
						case "F":
							return 6
						case "G":
							return 7
						case "H":
							return 8
					}
				}


				let created = await db.Product.create({
					teamName: req.body.teamName,
					size: req.body.size,
					jugador: req.body.jugador,
					imagen: req.file.filename,
					price: req.body.price,
					grupo_id: grupoElegido(req.body.grupo)

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
			let edited = await db.Product.findByPk(id_producto,{include: ["grupo_equipo"]});

			edited.grupo=edited.grupo_equipo.grupo
			res.render('editar', { id_producto, 'productToEdit': edited, title: edited.teamName })
		} catch (error) {
			res.send(error)
		}



	},
	// Update - Method to update
	update: async function (req, res) {

		function grupoElegido(grupo) {
			switch (grupo) {
				case "A":
					return 1
				case "B":
					return 2

				case "C":
					return 3
				case "D":
					return 4
				case "E":
					return 5
				case "F":
					return 6
				case "G":
					return 7
				case "H":
					return 8
			}
		}

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
						grupo_id: grupoElegido(req.body.grupo)

					},
					{
						where: {
							id: id_producto
						}

					}

				)


				res.redirect('/product')

			}
			else {


				let old = {
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
	destroy: async function (req, res) {


		try {
			let id_producto = req.params.id;
			let deleted = await db.Product.destroy(
				{
					where: {
						id: id_producto

					}, force: true
				}
			)
			res.redirect('/product/edit')

		} catch (error) {
			res.send(error)
		}





	}
};

module.exports = controller;