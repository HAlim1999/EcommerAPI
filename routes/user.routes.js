const {Router} = require('express')
const router = Router();

const {renderSingUpForm ,signup, renderSigninForm, signin ,logout } = require('../controllers/user.controllers.js')

router.get('/user/signup', renderSingUpForm)

router.post('/user/signup', signup)

router.get('/user/signin', renderSigninForm)

router.post('/user/signin', signin)

router.get('/user/logout', logout)

module.exports = router;