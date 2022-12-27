function authMiddleware(req, res, next){
    if (req.session.usuarioLogueado){
        next();
    }
    else{
        res.send('Logueate primero')
    }



    
}

module.exports=authMiddleware