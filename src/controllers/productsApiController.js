const db = require('../database/models')

module.exports = {
    all: async (req, res) => {
        // Fetch products and groups in parallel
        const [products, grupos] = await Promise.all([
            db.Product.findAll({ include: ['grupo_equipo'] }),
            db.Grupo.findAll({ include: ['grupo_equipo'] })
        ]);

        // Build countByGroup
        const countByGroup = {};
        grupos.forEach(grupo => {
            countByGroup[grupo.grupo] = grupo.grupo_equipo.length;
        });

        // Build products array
        const productsArr = products.map(product => ({
            id: product.id,
            teamName: product.teamName,
            jugador: product.jugador,
            price: product.price,
            grupo: product.grupo_id,
            imagen: `http://localhost:8000/img/${product.imagen}`,
            detail: `/api/products/${product.id}`
        }));

        return res.json({
            count: products.length,
            countByGroup,
            products: productsArr
        });
    },

    detail: async (req, res) => {
        const product = await db.Product.findByPk(req.params.id, { include: ['grupo_equipo'] });
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        return res.json({
            id: product.id,
            teamName: product.teamName,
            imagen: `http://localhost:8000/img/${product.imagen}`,
            size: product.size,
            jugador: product.jugador,
            asociations: [product.grupo_equipo],
            created_at: product.crated_at,
            updated_at: product.updated_at,
            deleted_at: product.deleted_at
        });
    },

    all2: async (req, res) => {
        const products = await db.Product.findAll({ include: ['grupo_equipo'] });
        res.json(products);
    }
};