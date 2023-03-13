const helpers = {}

helpers.isAuthenticated = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  }
  req.flash('error_msg','not_authenticated')
  res.redirect('/user/signin')


}

module.exports = helpers;