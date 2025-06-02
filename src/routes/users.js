// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'));
    },
    filename: (req, file, cb) => {
        const fileName = 'usuario-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage });

const validarCrear = [
    body('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('firstName')
        .notEmpty().withMessage('El campo nombre no puede estar vacío').bail()
        .isLength({ min: 2 }).withMessage('El campo nombre debe tener al menos dos caracteres'),
    body('lastName')
        .notEmpty().withMessage('El campo apellido no puede estar vacío').bail()
        .isLength({ min: 2 }).withMessage('El campo apellido debe tener al menos dos caracteres'),
    body('password')
        .notEmpty().withMessage('El campo password no puede estar vacío').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener mas de 3 caracteres'),
    body('avatar').custom((value, { req }) => {
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

const validarEditar = [
    body('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('firstName')
        .notEmpty().withMessage('El campo nombre no puede estar vacío'),
    body('avatar').custom((value, { req }) => {
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

const validarLogin = [
    body('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('El campo password no puede estar vacío').bail()
        .isLength({ min: 3 }).withMessage('La contraseña debe tener mas de 3 caracteres')
];

// Rutas
router.get('/prueba', async (req, res) => {
    const users = await require('../database/models').User.findAll();
    res.send(users);
});
router.get('/register', userController.register);
router.post('/log', upload.single('avatar'), validarCrear, userController.saveRegister);
router.get('/log', userController.login);
router.post('/', validarLogin, userController.saveLogin);
router.get('/admin', adminMiddleware, userController.paginaAdmin);
router.get('/admin/listar', userController.listarUsuarios);
router.get('/edit/:id', adminMiddleware, userController.editarVista);
router.put('/updated/:id', upload.single('avatar'), validarEditar, userController.saveEdit);
router.delete('/:id/delete', adminMiddleware, userController.deleteUser);
router.get('/profile', authMiddleware, userController.perfilUsuario);
router.get('/logout', userController.logout);

module.exports = router;
