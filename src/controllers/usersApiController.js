const db = require('../database/models')

module.exports = {
    all: async (req, res) => {
        try {
            const users = await db.User.findAll();
            const usersArr = users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                detail: `/api/users/${user.id}`
            }));
            return res.json({
                total: users.length,
                count: users.length,
                users: usersArr
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    },
    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: user.type,
                image: `http://localhost:8000/img/users/${user.avatar}`
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener usuario' });
        }
    }
};