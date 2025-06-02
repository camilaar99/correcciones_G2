const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');

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

// Rutas admin
router.get('/', adminController.adminView);
router.get('/crear/', adminController.adminCrear);
router.post('/crear', adminController.crearStore);
router.get('/modificar', adminController.adminModificar);
router.put('/product/:id', upload.single('imagen'), adminController.modificarUpdate);
router.delete('/product/:id', adminController.modificarDestroy);

module.exports = router;

