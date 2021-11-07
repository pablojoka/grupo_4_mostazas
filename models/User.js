

const fs = require('fs');

const User = {
    fileName: './data/users.json',
    //BUSCAR A TODOS LOS USUARIOS
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },
    //MEOTODO PARA GENERAR UN ID
    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1
    },
    //BUSCAR A TODOS LOS USUARIOS
    findAll: function () {
        return this.getData();
    },
    //BUSCAR USUARIO POR ID
    findByPk: function (id) {
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound
    },
    // BUCAR A USUARIO POR EMAIL

    findByField: function (field, text) {
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound
    },
    //GUARDAR UN USUARIO
     crear: function(userData){
        let allUsers = this.findAll()
        let newUser = { 
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser
    },
    // BORRAR UN USUARIO
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true

    }
}

module.exports = User