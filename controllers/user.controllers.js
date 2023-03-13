const userCtrl = {}
const passport = require('passport')

const user = require('../models/User.js')
const { request } = require('../server.js')
userCtrl.renderSingUpForm = (req, res) =>{
  res.render('users/signup')
}

userCtrl.signup = async (req, res) =>{
  const errors = [];
  const {name, email, password, confirmPassword} = req.body;
  
  if(password != confirmPassword){
    errors.push({text: 'los password no coinciden'})
  }
  if(password.length < 4){
    errors.push({text: 'El password debe ser de almenos 4 caracteres'})
  }
  if(errors.length > 0){
    res.render('users/signup',{errors,
    name, email, password, confirmPassword})

  }
  else{
    const  emailUser = await user.findOne({email:email})
    if(emailUser){
      req.flash('error_msg', 'El mail ya esta en uso')
      res.redirect('/user/signup')
    }else{
      const newUser = new user({name:email, email:email, password:password});

      newUser.password = await newUser.encryptPassword(password)
      await newUser.save()
      req.flash('success_msg','Estas Registrado')

      res.redirect('/user/signin')

    }

    
  }

}



userCtrl.renderSigninForm = (req, res) =>{

  res.render('users/signin')
}



userCtrl.signin = passport.authenticate('local',{
  failureRedirect:'/user/signin',
  successRedirect:'/products',
  failureFlash:true
})


userCtrl.logout = (req, res) =>{

  req.logout(function(err) {
        if (err) { return next(err); }
        else {
          req.flash('success_msg',"Te has deslogueado correctamente")
        }
        res.redirect('/user/signin')
      }
  
  
  );



}

module.exports = userCtrl;