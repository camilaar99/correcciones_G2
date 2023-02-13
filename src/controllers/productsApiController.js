const db = require('../database/models')

module.exports =  {

    all: async (req, res) => {
        let response = {
            count: 0,
            countByGroup: {},
            products: [], 
        }
        let products = await db.Product.findAll({include: ["grupo_equipo"]})
        let grupos = await db.Grupo.findAll({include: ["grupo_equipo"]})
        grupos.forEach(grupo => response.countByGroup[grupo.grupo] = grupo.grupo_equipo.length)
        response.count = products.length
        response.products = products.map(product => {
            let productDetail = {
                id: product.id,
                teamName: product.teamName,
                 jugador: product.jugador,
                 price: product.price,
                 grupo: product.grupo_id,
                 detail: `/api/products/${product.id}`
            }
            return productDetail
        })
        return res.json(response)      
    },

    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id,{include: ["grupo_equipo"]})

        let response = {
            id: product.id,
            teamName: product.teamName, 
            imagen: `http://localhost:3030${product.imagen}`,
            size: product.size,
            jugador: product.jugador,
            asociations: [product.grupo_equipo],
            created_at: product.crated_at,
            updated_at: product.updated_at,
            deleted_at: product.deleted_at
        }
        
        return res.json(response)
    },
    all2: async(req,res)=>{
        let products = await db.Product.findAll({include: ["grupo_equipo"]})
        res.json(products)

    }

}