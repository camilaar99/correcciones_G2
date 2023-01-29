var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController')
let db = require('../database/models');
let sequelize = db.sequelize

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const adminMiddleware = require('../middlewares/adminMiddleware');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let ruta = (path.join(__dirname, '..', '..', './public/img'))
        cb(null, ruta)
    },
    filename: (req, file, cb) => {
        console.log(file);
        const fileName = 'producto-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

const validarCrearProducto = [
    body('teamName')
        .notEmpty().withMessage('El campo nombre no puede estar vacío').bail(),
    body('descripcion')
        .notEmpty().withMessage('El campo descripcion no puede estar vacío'),
    body('grupo')
        .notEmpty().withMessage('Debe elegir un grupo'),
    body('size').notEmpty().withMessage('Debe elegir un talle'),
    body('jugador').notEmpty().withMessage('El campo jugador no puede estar vacío')
]





router.get('/probando', productsController.productView2)
router.get('/', productsController.productView)

/*** CREATE ONE PRODUCT ***/
router.get('/crear', adminMiddleware, productsController.create);
router.post('/', upload.single('imagen'), validarCrearProducto, productsController.store);


// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit', adminMiddleware, productsController.editPage);
router.get('/edit/:id', adminMiddleware, productsController.edit);
router.put('/updated/:id', upload.single('imagen'), validarCrearProducto, productsController.update);


/* Devolver un producto */

router.get('/:id', productsController.productoDetail);

/*** DELETE ONE PRODUCT***/
router.delete('/:id/delete', adminMiddleware, productsController.destroy);
module.exports = router;