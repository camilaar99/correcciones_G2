const db = require("../database/models");
let sequelize = db.sequelize;
function recordameMiddleware(req, res, next) {
    if (req.cookies.recordame && !req.session.usuarioLogueado) {
        // const userFilePath = path.join(__dirname, '../data/users.json');
        // let user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        // let usersJSON = user;
        // for (let i = 0; i < usersJSON.length; i++) {
        //     if (usersJSON[i].email == req.cookies.recordarme) {
        //         let usuarioALoguearse = usersJSON[i];
        //         req.session.usuarioLogueado = usuarioALoguearse;
        //         break;

        //     }

        // }
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