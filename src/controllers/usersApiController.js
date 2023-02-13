const db = require('../database/models')

module.exports =  {
    all: async (req, res) => {
        let response = {
            total: 0,
            users: []
        }
        let users = await db.User.findAll()
        response.total = users.length

        response.users = users.map(user => {
             let userDetail = {
                 id: user.id,
                 firstName: user.firstName,
                 lastName: user.lastName,
                 email:  user.email,
                 detail: `/api/users/${user.id}`        
             }
             return userDetail
         })
        return res.json(response)
    },
    detail: async (req, res) => {
        let user = await db.User.findByPk(req.params.id)
        let response = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type
        }
        return res.json(response)
    }
}