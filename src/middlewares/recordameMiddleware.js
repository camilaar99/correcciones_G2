const db = require("../database/models");
let sequelize = db.sequelize;
function recordameMiddleware(req, res, next) {
    if (req.cookies.recordame && !req.session.usuarioLogueado) {
        
        db.User.findOne({
            where: {
                email: req.cookies.recordame
            }
        }).then(function(result){
            req.session.usuarioLogueado = result;


        })
    }
    next();






}

module.exports=recordameMiddleware