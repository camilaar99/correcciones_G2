function invitadoMiddleware(req, res, next) {

    res.locals.invitado=false;
    

    if (req.session.usuarioLogueado){
        res.locals.invitado=true;
        res.locals.usuario=req.session.usuarioLogueado;
        console.log("soy middleware");
        console.log(res.locals.usuario);
    }

    console.log("fajnjdhfia")
    next();






}

module.exports=invitadoMiddleware