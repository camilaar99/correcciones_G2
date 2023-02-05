//const fs = require('fs');
const path = require('path');
var express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

let db = require('../database/models');
let sequelize = db.sequelize;


const controller = {
	register: (req, res) => {
		res.render('register')
	},
	saveRegister: (req, res) => {
		
		let errors = validationResult(req);
		if (errors.isEmpty()) {

			db.User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10),
				type: req.body.type,
				avatar: req.file.filename

			}).then(function (usuarios) {
				res.redirect('./log')
			})


	


		}
		else {
			res.render('register', { errores: errors.array(), old: req.body })
		}
	},
	login: (req, res) => {
		res.render('log')
	},



	saveLogin: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {



			db.User.findOne({
				where: {
					email: req.body.email
				}
			}).then((result) => {

				if (result && bcrypt.compareSync(req.body.password, result.password)) {
					let usuarioALoguearse = result;



					if (usuarioALoguearse.type == 'Admin') {
						req.session.usuarioLogueado = usuarioALoguearse;
						req.session.usuarioAdmin = usuarioALoguearse;
						res.cookie('admin', "Admin", { maxAge: 60000 });
						if (req.body.recordame) {
							res.cookie('recordame', req.session.usuarioLogueado.email, { maxAge: 60000 });
						}
						res.redirect('/users/admin')
					}
					else {
						if (req.body.recordame) {
							res.cookie('recordame', req.session.usuarioLogueado.email, { maxAge: 60000 });
						}
						req.session.usuarioLogueado = usuarioALoguearse;
						res.redirect('/users/profile')
					}


					req.session.usuarioLogueado = usuarioALoguearse;

				}
				else {
					res.render('log', { errors: [{ msg: 'Contraseña incorrecta' }] })
				}

				if (!result) {
					res.render('log', { errors: [{ msg: 'Credenciales inválidas' }] })
				}



			})



		}
		else {
			res.render('log', { errors: errors.array() })
		}
	},

	paginaAdmin: (req, res) => {
		res.render('administrator')
	},

	listarUsuarios: async function (req, res) {
		try {
			const users = await db.User.findAll()
			res.render('listaUsuarios', {
				usuarios: users
			})
		} catch (error) {
			res.send(error)
		}





	},

	detail: (req, res) => {
		
		db.User.findByPk(req.params.id).then((user) => {
			res.render('detalle-usuario', { id_usuario, 'usuario_mostrar': user })
		})
	},

	editarVista: (req, res) => {
		
		db.User.findByPk(req.params.id).then((user) => {
			res.render('edit-user', { old: user })
		})

	},

	saveEdit: async function (req, res) {


		try {

			let errors = validationResult(req);
			let id_usuario = req.params.id
			if (errors.isEmpty()) {
				
				let edited = await db.User.update({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					type: req.body.type,
					avatar: req.file.filename
				}, {
					where: {
						id: id_usuario
					}
				})




				res.redirect('/users/admin/listar')
			}

			else{

				old={
					id: id_usuario,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					type: req.body.type
				}
				res.render('edit-user', { errors: errors.array(), old })
			}

		} catch (error) {
			res.send(error)
		}

		
	},

	deleteUser: async function(req, res) {
		try {
			let id_usuario=req.params.id;
			let deleted= await db.User.destroy({
			where: {
				id: id_usuario
			}
		})

		res.redirect('/users/admin/listar')
			
		} catch (error) {
			res.send(error)
		}
		
	},

	perfilUsuario: (req, res) => {
		
		const id_usuario = res.locals.usuario.id;

		res.render('perfil', { usuario: res.locals.usuario })
	},
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');

	}

};

module.exports = controller;
