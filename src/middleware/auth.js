const jwt = require('jsonwebtoken')
const process = require('process')

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('')[1]
    const { userId, isAdmin } = jwt.verify(
      token,
      process.env.SECRET,)
    req.body = {
      userId,
      isAdmin
    }
    return next()    
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Unathorized' })
  }
}
module.exports = checkAuth