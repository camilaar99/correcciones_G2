const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const registerController = {
    registerView: function (req, res, next) {
        res.render('register')
    },
    newUser: function (req, res, next) {
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let indices=[];
		users.forEach(function (elemento) {
			indices.push(elemento.id)	
		})
		let nuevoId=(Math.max(...indices))+1
		//agregar el nuevo item al array
		let nuevoUsuario=users;
        
        req.body={
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": req.body.password,
            "type": req.body.type
        }

        //res.send(req.body)
		
		 if (req.file) {
			let itemNuevo = { id: nuevoId, ...req.body, image: req.file.filename }
			nuevoUsuario.push(itemNuevo)
			//escribiendo el nuevo array en el archivo
			fs.writeFileSync(usersFilePath, JSON.stringify(nuevoUsuario))
			res.redirect('./')
		 }
		 else {
		 	res.render('register')
		 }		
    }
}

module.exports = registerController