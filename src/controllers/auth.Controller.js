const AuthService = require('../services/auth.sevice')

// login auth
const login = async (req, res) => {
  const { email, password } = req.body
  const token = await AuthService.login({ email, password })
  if (token) {    
    return res.status(200).json({ token })
  }
  return res.json({
    message: 'User not found',
  })
}
// sign up auth
const signup = async (req, res) => {
    const { 
        firstName,
        lastName,
        email, 
        password,
        phoneNumber
    } = req.body
    const signup = await AuthService.regist({
        firstName, 
        lastName, 
        email, 
        password,
        phoneNumber})
    res.send(signup)
}
module.exports = {
  login,  
  signup
} 
    