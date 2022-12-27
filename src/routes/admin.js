var express = require('express');
var router = express.Router();

const adminController=require('../controllers/adminController')

const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        let ruta=(path.join(__dirname,'..','..','./public/img'))
        cb(null,ruta)
    },
    filename: (req, file, cb)=>{
        console.log(file);
        const fileName='producto-'+ Date.now() +path.extname(file.originalname);
        cb(null,fileName)
    }
})

const upload=multer({storage: storage})

/* GET home page. */
router.get('/', adminController.adminView);

//get y post de crear productos
router.get('/crear/', adminController.adminCrear);
router.post('/crear', adminController.crearStore);


//get y put de modificar
router.get('/modificar', adminController.adminModificar);
router.put('/product/:id', upload.single('imagen'), adminController.modificarUpdate);

//delete
router.delete('/product/:id', adminController.modificarDestroy);

