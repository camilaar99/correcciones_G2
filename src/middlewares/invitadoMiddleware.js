function invitadoMiddleware(req, res, next) {


    res.locals.invitado=false;
    

    if (req.session.usuarioLogueado){
        console.log("middleware del invitado on")
        res.locals.usuario=req.session.usuarioLogueado;
        res.locals.invitado=true;
        console.log("puse los locals usuario")
        next();
        
        
    }

    console.log("fajnjdhfia")
    next();






}

module.exports=invitadoMiddleware