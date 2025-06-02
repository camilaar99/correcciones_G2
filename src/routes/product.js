const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        const fileName = 'producto-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage });

const validarCrearProducto = [
    body('teamName')
        .notEmpty().withMessage('El campo nombre no puede estar vacío').bail()
        .isLength({ min: 5 }).withMessage('El campo nombre debe tener mas de 5 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('El campo descripcion no puede estar vacío').bail()
        .isLength({ min: 20 }).withMessage('El campo descripción debe tener mas de 20 caracteres'),
    body('grupo')
        .notEmpty().withMessage('Debe elegir un grupo'),
    body('size').notEmpty().withMessage('Debe elegir un talle'),
    body('jugador').notEmpty().withMessage('El campo jugador no puede estar vacío'),
    body('imagen').custom((value, { req }) => {
        const file = req.file;
        const acceptedExtension = ['.jpg', '.png', '.gif', '.jpeg'];
        if (file) {
            const fileExtension = path.extname(file.originalname);
            if (acceptedExtension.includes(fileExtension)) {
                return true;
            }
            throw new Error('Extensión de archivo no permitida');
        }
        throw new Error('Tienes que subir una imagen');
    })
];

// Rutas
router.get('/probando', productsController.productView2);
router.get('/', productsController.productView);
router.get('/crear', adminMiddleware, productsController.create);
router.post('/', upload.single('imagen'), validarCrearProducto, productsController.store);
router.get('/edit', adminMiddleware, productsController.editPage);
router.get('/edit/:id', adminMiddleware, productsController.edit);
router.put('/updated/:id', upload.single('imagen'), validarCrearProducto, productsController.update);
router.get('/:id', productsController.productoDetail);
router.delete('/:id/delete', adminMiddleware, productsController.destroy);

module.exports = router;