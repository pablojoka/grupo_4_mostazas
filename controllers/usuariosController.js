const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('../models/User')


const controller = {
    register: (req,res) => {
        return res.render('register.ejs');
    },
    processRegister:(req, res)=>{
           const resultValidations =  validationResult (req);
               
           if( resultValidations.errors.length  >0){
               return res.render('register',{
                   errors : resultValidations.mapped(),
                   oldData: req.body
               })
           }

           let userInDb = User.findByField('email' , req.body.email)
           if(userInDb){
               return res.render('register',{
                errors : {
                    email: { 
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
            
           }

           let userTocreate={
               ...req.body,
               contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
               contraseña2: bcryptjs.compareSync(req.body.contraseña2, req.body.contraseña),
               avatar: req.file.filename
           }
           let userCreated = User.create(userTocreate)
           res.redirect('/login');
        
    },
    login: (req,res) => {
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render('userProfile')
    },
}

module.exports = controller;