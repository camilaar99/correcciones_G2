function guestMiddleware(req, res, next){
    if (!req.session.usuarioLogueado){
        next();
    }
    else{
        res.send('Está página es solo para invitados')
    }
}

module.exports=guestMiddleware