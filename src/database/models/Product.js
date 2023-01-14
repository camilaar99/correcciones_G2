
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
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grupo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_precio: {
        type: DataTypes.DATE,
        allowNull: false
    }

    };
    let config = {
        timestamps: true,
        
    }
    const Product = sequelize.define(alias, cols, config);
    return Product
}