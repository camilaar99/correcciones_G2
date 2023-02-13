
module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jugador:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grupo_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
    

    };
    let config = {
        timestamps: true,
        
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate= function(models){
        Product.belongsTo(models.Grupo, {
            as: "grupo_equipo",
            foreignKey: "grupo_id"
        })
    }


    return Product
}