

module.exports=(sequelize, dataTypes)=>{
    let alias='User';

    let cols={
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
        },
        firstName:{
            type: dataTypes.STRING

        },
        lastName:{
            type: dataTypes.STRING

        },
        email:{
            type: dataTypes.STRING

        },
        password:{
            type: dataTypes.STRING

        },
        type:{
            type: dataTypes.STRING

        },
        avatar:{
            type: dataTypes.STRING

        }
    };

    let config={
        tableName:"users",
        timestamps: true

    };

    const User=sequelize.define(alias, cols, config);
    return User
    
}

