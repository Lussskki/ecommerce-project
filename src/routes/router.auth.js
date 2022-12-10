const router = require('express').Router()
const AuthController = require('../controllers/auth.Controller')


//auth login
router.post('/login', AuthController.login)
//auth sign up
router.post('/signup', AuthController.signup)


module.exports = router