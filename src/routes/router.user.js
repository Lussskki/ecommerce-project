const router= require('express').Router()
//controller
const userController = require('../controllers/user.Controller')

//fetch all data method
router.get('/',userController.getUsers)
//add user to db
  router.post('/',userController.addUser)
//update user  from db
  router.put('/:userId',userController.updateUser)
//delete user from db 
  router.delete('/:userId',userController.deleteUser)
  
module.exports = router
