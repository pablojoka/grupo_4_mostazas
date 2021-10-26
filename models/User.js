

const fs = require('fs');

const User ={
    fileName: './data/users.json',

    getData: function(){
        return fs.readFileSync(this.fileName, 'utf-8')
    },

    crear: function(userData){

    }
}

console.log(User.getData())