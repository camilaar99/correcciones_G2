const fs = require('fs');
const path = require('path');
var express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const userFilePath = path.join(__dirname, '../data/users.json');
let user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
let db = require('../database/models');
let sequelize = db.sequelize;
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	register: (req, res) => {
		res.render('register')
	},
	saveRegister: (req, res) => {


		let errors = validationResult(req);
		if (errors.isEmpty()) {
			// users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
			// let indices=[];
			// users.forEach(function (elemento) {
			// 	indices.push(elemento.id)	
			// })
			// let nuevoId=(Math.max(...indices))+1
			// //agregar el nuevo item al array
			// let nuevoUsuario=users;

			// req.body={
			//     "firstName": req.body.firstName,
			//     "lastName": req.body.lastName,
			//     "email": req.body.email,
			//     "password": bcrypt.hashSync(req.body.password,10),
			//     "type": req.body.type,
			// }


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


			// 	let itemNuevo = { id: nuevoId, ...req.body, avatar: req.file.filename }
			// 	nuevoUsuario.push(itemNuevo)
			// 	//escribiendo el nuevo array en el archivo
			// 	fs.writeFileSync(userFilePath, JSON.stringify(nuevoUsuario))
			// 	res.redirect('./log')


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



			//     for (let i=0; i<usersJSON.length; i++ ){
			//         if (usersJSON[i].email==req.body.email && bcrypt.compareSync(req.body.password, usersJSON[i].password)){
			//             let usuarioALoguearse=usersJSON[i];

			//             req.session.usuarioLogueado=usuarioALoguearse;


			// 			 if (usuarioALoguearse.type=="Admin"){
			// 				req.session.usuarioAdmin=usuarioALoguearse;
			// 			 	res.render('administrator')
			// 			 }
			// 			 else{
			//              res.render('shop')}
			//             break;

			//         }

			//     }
			//     if (!usuarioALoguearse){
			//         res.render('log', {errors: [{msg: 'Credenciales inválidas'}]})
			//     }

			//     if (req.body.recordame){
			//         res.cookie('recordame', req.session.usuarioLogueado.email, {maxAge: 60000});
			//     }
		}
		else {
			res.render('log', { errors: errors.array() })
		}
	},

	paginaAdmin: (req, res) => {
		res.render('administrator')
	},

	listarUsuarios: (req, res) => {
		db.User.findAll({ raw: true}).then(function(users){
			res.redirect('/users/admin')
			console.log(JSON.stringify(users))
		
		 })
	},

	detail: (req, res) => {
		// Do the magic
	// 	users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
	// 	const id_usuario = req.params.id;
	// 	var elemento2;
	// 	users.forEach(function buscar_posicion_desdeid(elemento) {
	// 		if (elemento.id == id_usuario) {
	// 			elemento2 = elemento;
	// 		}
	// 	})
	// 	res.render('detalle-usuario', { id_usuario, 'usuario_mostrar': elemento2 })
	db.User.findByPk(req.params.id).then((user)=>{
		res.render('detalle-usuario', { id_usuario, 'usuario_mostrar': user })
	})
	 },

	editarVista: (req, res) => {
		// users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
		// let usuarioModificar = req.params.id

		// users.forEach(usuario => {
		// 	if (usuario.id == usuarioModificar) {
		// 		res.render('edit-user', { old: usuario })
		// 	}
		// })

		db.User.findByPk(req.params.id).then((user)=>{
			res.render('edit-user', { old: user })
		})

	},

	saveEdit: (req, res) => {
		//leer JSON y guardarlo en un array
		users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
		//leer el id del usuario desde el request
		const id_usuario = Number(req.params.id);
		//filter donde se devuelven todos los elemetos del array MENOS el pedido por request
		let nuevoUsuarios = users.filter(valor => valor.id != id_usuario)
		if (req.file) {
			//agregar el nuevo item modificado al array sin el
			let itemEditado = { id: id_usuario, ...req.body, avatar: req.file.filename }
			nuevoUsuarios.push(itemEditado)
			//escribiendo el nuevo array en el archivo
			fs.writeFileSync(userFilePath, JSON.stringify(nuevoUsuarios))

			//volver a leer el nuevo archivo
			users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
			//devolver todo el objeto con el id que quiere el usuario, no se si esto está bien, solo lo hice para evitar un for 
			var elemento2;
			users.forEach(function buscar_posicion_desdeid(elemento) {
				if (elemento.id == id_usuario) {
					elemento2 = elemento;
				}
			})
			console.log(req.file.filename)
			res.render('listaUsuarios', { usuarios: users })
			//res.render('detalle-usuario', { id_usuario, 'usuario_mostrar': elemento2 })
		}
		else {
			//agregar el nuevo item modificado al array sin el
			let itemEditado = { id: id_usuario, ...req.body, avatar: "cristiano.jpg" }
			nuevoUsuarios.push(itemEditado)
			//escribiendo el nuevo array en el archivo
			fs.writeFileSync(userFilePath, JSON.stringify(nuevoUsuarios))

			//volver a leer el nuevo archivo
			users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
			//devolver todo el objeto con el id que quiere el usuario, no se si esto está bien, solo lo hice para evitar un for 
			var elemento2;
			users.forEach(function buscar_posicion_desdeid(elemento) {
				if (elemento.id == id_usuario) {
					elemento2 = elemento;
				}
			})

			res.render('listaUsuarios', { usuarios: users })
			//res.render('detalle-usuario', { id_usuario, 'usuario_mostrar': elemento2 })
		}
	},

	deleteUser: (req, res) => {
		users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
		//leer el id del usuario desde el request
		const id_usuario = (req.params.id);
		//filter donde se devuelven todos los elemetos del array MENOS el pedido por request
		let nuevoUsuarios = users.filter(valor => valor.id != id_usuario)
		fs.writeFileSync(userFilePath, JSON.stringify(nuevoUsuarios));
		users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
		res.redirect('/users/admin/listar')
	},

	perfilUsuario: (req, res) => {
		users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
		const id_usuario = res.locals.usuario.id;

		res.render('perfil', { usuario: res.locals.usuario })
	},
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
		
	}

};

module.exports = controller;
