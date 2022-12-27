var express = require('express');
var router = express.Router();
const path=require('path')
const registerController=require('../controllers/registerController')

const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        let ruta=(path.join(__dirname,'..','..','./public/img'))
        cb(null,ruta)
    },
    filename: (req, file, cb)=>{
        console.log(file);
        const fileName='usr-'+ Date.now() +path.extname(file.originalname);
        cb(null,fileName)
    }
})

const upload=multer({storage: storage})
/* GET home page. */
router.get('/', registerController.registerView);
router.post('/', upload.single('avatar'), registerController.newUser)

module.exports = router;