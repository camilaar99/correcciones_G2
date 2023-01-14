
// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

let db=require('../database/models');
let sequelize=db.sequelize


//const guestMiddleware=require('../middlewares/guestMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let ruta = (path.join(__dirname, '..', '..', './public/img/users'))
        cb(null, ruta)
    },
    filename: (req, file, cb) => {
        console.log(file);
        const fileName = 'usuario-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

const validarCrear=[
    // body('firstName').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    // body('lastName').notEmpty().withMessage('El campo apellido no puede estar vacío'),
    // body('password').notEmpty().withMessage('El campo contraseña no puede estar vacío'),
   
    // body('email').isEmail().withMessage('Campo email no válido')
    body('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        // .custom((value, {req})=>{
        //     let userInDB=userModel.findByField('email',req.body.email);
        //     if (userInDB){
        //         throw new Error ('Usuario ya registrado, inicie sesión');
        //     }
        //     else {
        //         return true;
        //     }
        // })
        ,
    body('firstName')
        .notEmpty().withMessage('El campo nombre no puede estar vacío'),
    body('password')
        .notEmpty().withMessage('El campo password no puede estar vacío').bail()
        .isLength({min:3}).withMessage('La contraseña debe tener mas de 3 caracteres'),
        body('avatar').custom((value, {req})=>{
            let file = req.file;
            let acceptedExtension= ['.jpg', '.png', '.gif', '.jpeg'];
            
            
            if (file){
                let fileExtension=path.extname(file.originalname)
                if (acceptedExtension.includes(fileExtension)){
                    return true;
                }
                else{
                    throw new Error ('Extensión de archivo no permitida');
                }
                
            }
            else{
                throw new Error ('Tienes que subir una imagen');
            }
            
        })
]

const validarLogin = [
    body('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('El campo password no puede estar vacío').bail()
        .isLength({min:3}).withMessage('La contraseña debe tener mas de 3 caracteres')
]



// ************ Controller Require ************


const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware=require('../middlewares/adminMiddleware');
//const { route } = require('.');

/*** GET ALL PRODUCTS ***/

router.get('/prueba', (req,res)=>{
    db.User.findAll().then(function(result){
            res.send(result)
		
        })
});
router.get('/', (req,res)=>{res.send("Estas autenticado")})
router.get('/register', userController.register);
router.post('/log',upload.single('avatar'), validarCrear, userController.saveRegister);

router.get('/log', userController.login);
router.post('/', validarLogin, userController.saveLogin);



router.get('/admin', adminMiddleware, userController.paginaAdmin);
router.get('/admin/listar',userController.listarUsuarios); 






router.get('/edit/:id',userController.editarVista);
//router.put('/admin/listar', adminMiddleware,upload.single('avatar'),userController.saveEdit);

router.delete('/:id/delete', adminMiddleware, userController.deleteUser)

router.get('/profile',authMiddleware, userController.perfilUsuario);


router.get('/logout', userController.logout)
//router.get('/solousuarios',authMiddleware, (req,res)=>{ res.send('Hola '+ req.session.usuarioLogueado.email)});
// /*** CREATE ONE PRODUCT ***/ 
//router.get('/create/', productsController.create); 
// router.post('/', logDBMiddleware, upload.single('image'), validarCrear,productsController.store); 


// /*** GET ONE PRODUCT ***/ 
// router.get('/:id/', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
// router.get('/edit/:id', productsController.edit); 
// router.put('/:id',logDBMiddleware, upload.single('image'), productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
// router.delete('/:id/delete', productsController.destroy); 


module.exports = router;
