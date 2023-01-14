function adminMiddleware(req, res, next){
    if (req.session.usuarioLogueado.type=="Admin" &&  req.session.usuarioLogueado ){
        next()        
    }
    else{
        res.send('Está página es solo para administradores')
    }
}

module.exports=adminMiddleware