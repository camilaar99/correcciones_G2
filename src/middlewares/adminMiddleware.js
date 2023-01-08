function adminMiddleware(req, res, next){
    if (req.session.usuarioAdmin){
        next();
    }
    else{
        res.send('Está página es solo para administradores')
    }
}

module.exports=adminMiddleware