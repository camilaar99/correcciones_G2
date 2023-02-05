function authMiddleware(req, res, next){
    if (req.session.usuarioLogueado){
        next();
    }
    else{
        let home='/'
        res.send('Logueate primero, volver al home')
    }



    
}

module.exports=authMiddleware