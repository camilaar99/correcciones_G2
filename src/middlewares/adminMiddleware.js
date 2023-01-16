function adminMiddleware(req, res, next){
    if (req.session.usuarioLogueado ){
        if (req.session.usuarioLogueado.type=="Admin"  ){
            next()        
        }
        else{
            res.send('Está página es solo para administradores')
        }
    }
    else{
        res.send('logueate primero')
    }
}

module.exports=adminMiddleware