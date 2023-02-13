
module.exports = (sequelize, DataTypes) => {
    let alias = 'Grupo';
    let cols = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    grupo: {
        type: DataTypes.STRING,
        allowNull: false    
    }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Grupo = sequelize.define(alias, cols, config);


    Grupo.associate= function(models){
        Grupo.hasMany(models.Product, {
            as: "grupo_equipo",
            foreignKey: "grupo_id"
        })
    }


    return Grupo
}