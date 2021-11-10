const User = require('../models/User')


function userLoggedMiddleware(req, res , next) {
    res.locals.isLogged = true
    let emailInCookie= req.cookies.userEmail;
    console.log(emailInCookie);

    //User.findByField('email', emailInCookie)
         
    if(req.session.userLogged){
        res.locals.isLogged = false
        res.locals.userLogged= req.session.userLogged
    }
    if(req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    } 


   
    next()
}


module.exports=userLoggedMiddleware