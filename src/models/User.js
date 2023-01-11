const fs=require('fs');
//const { max } = require('moment');
const path=require('path');
const { all } = require('../app');

const User={
    fileName:  path.join(__dirname, '../data/users.json'),

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function(){
        return this.getData();
    },
    generateId: function(){
        let allUsers= this.findAll();
    
        let userId=allUsers.map(user => user.id
        );
        return Math.max(...userId)+1;
        
    },

    findByPK: function(id){
        let allUsers=this.findAll();
        let userFound=allUsers.find(user=>user.id==id);
        return userFound;

    },

    findByField: function(field, text){
        let allUsers=this.findAll();
        let userFound=allUsers.find(user=>user[field]==text);
        return userFound;

    },

    create: function(userData){
        let allUsers=this.findAll();
        let newUser={
            id: this.generateId(),
            ...userData
        } 
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;

    },

    delete: function(id){
        let allUsers=this.findAll();
        let finalUsers=allUsers.filter(user=>user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }

}

module.exports=User;