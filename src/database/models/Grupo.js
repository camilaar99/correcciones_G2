module.exports = (sequelize, DataTypes) => {
    const Grupo = sequelize.define('Grupo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        grupo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    });

    Grupo.associate = models => {
        Grupo.hasMany(models.Product, {
            as: 'grupo_equipo',
            foreignKey: 'grupo_id'
        });
    };

    return Grupo;
};