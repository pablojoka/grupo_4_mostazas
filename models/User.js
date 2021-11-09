//guardar  al usuario en la DB
//2 buscar al usuario al loguear por su email
//3 buscar a un usuario por su id
//4 editar la informacion de un usuario 
//5 eliminar usuario

const { text } = require('express');
const fs= require('fs');
const { all } = require('../routes/usuarios');

const User={

    fileName:'./data/users.json',
    //buscar a todos los usuario
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); 
    },
    //generador de id para los nuevos usuarios
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser= allUsers.pop();
        if(lastUser){
            return lastUser.id + 1 ;
        }
        return 1
    },
    //buscar a todos los usuario
    findAll: function(){
        return this.getData();
    },
    //buscar a usuario por Id
    findByPk: function(id){
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },
    //para buscar por algun parametro que nosotros querramos
    findByField: function(field, text){
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound;
    },


    create: function(userData){
        let allUsers = this.findAll();
        let newUser= {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        return newUser

    },
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser=> oneUser.id !==id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
        return true

    }
}
console.log(User.findAll())
module.exports=User;