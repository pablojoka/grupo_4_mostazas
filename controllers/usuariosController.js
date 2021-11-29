const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('../database/models/User')


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
    loginProcess:(req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
        if(userToLogin){
            let isOkThePassword = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña)
            if(isOkThePassword){
                delete userToLogin.contraseña
                req.session.userLogged= userToLogin;

                if(req.body.recordar){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 2})
                }
                return res.redirect('/usuario/perfil')
         
            } 
            return res.render('login',{
                errors:{
                    email:{
                        msg:'Las credenciales son invalidas'
                    }
                }
                });
            }
        return res.render('login',{
            errors:{
                email:{
                    msg:'No se encuentra este email en nuestra base de datos'
                }
            }
        })
    },
    profile: (req, res) => {
         
        return res.render('profile',{
            user: req.session.userLogged
        })
    },

    logout:(req,res)=>{
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = controller;