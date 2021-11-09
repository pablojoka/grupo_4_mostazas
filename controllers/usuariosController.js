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
           let userTocreate={
               ...req.body,
               //password: bcryptjs.hashSync(req.body.password, 10),
               avatar: req.file.filename
           }
           User.create(userTocreate)
           res.send('usted se a registrado');
        
    },
    login: (req,res) => {
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render('userProfile')
    },
}

module.exports = controller;