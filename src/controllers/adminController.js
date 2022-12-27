const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const adminController = {
    adminView: function (req, res, next) {
        res.render('administrator')
    },
    adminCrear: function (req, res, next) {
        res.render('crear')
    },
    crearStore: (req,res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let indices=[];
		products.forEach(function (elemento) {
			indices.push(elemento.id)	
		})
		let nuevoId=(Math.max(...indices))+1
		//agregar el nuevo item al array
		let nuevoProductos=products;
		
		
		 if (req.file) {
			let itemNuevo = { id: nuevoId, ...req.body, image: req.file.filename }
			nuevoProductos.push(itemNuevo)
			//escribiendo el nuevo array en el archivo
			fs.writeFileSync(productsFilePath, JSON.stringify(nuevoProductos))
			res.redirect('./product')
		 }
		 else {
		 	res.render('crear')
		 }
    },

    adminModificar: function (req, res, next) {
        res.render('modificar')
    },
    modificarUpdate: (req, res) => {
        const id = req.params.id;
        const productToEdit = products.find(product => product.id == id);
        const editProduct = {
            id: id,
            teamName: req.body.teamName,
            Size: req.body.Size,
            offer: req.body.offer,
            price: req.body.price
        }
        products.forEach((product, index) => {
            if(product.id == id) {
                products[index] = editProduct;
            }
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect('/shop');
    },
    modificarDestroy: (req, res) => {
        const id = req.params.id;

        const finalProduct = products.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProduct, null, " "));
        res.redirect('/shop');
    }
}

