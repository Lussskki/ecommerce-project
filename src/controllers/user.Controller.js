const userService = require('../services/user.service')

//fetch all data
const getUsers = async (req, res)=> {
    const data = await userService.getAllUsers()  
    res.json(data)
}
//add user from db
const addUser = async (req, res)=>{
    const adminId = req.useruserId
    const { firstName, 
        lastName, 
        email, 
        password, 
        phoneNumber, 
        isAdmin } = req.body
    const result = await userService.addUser({ adminId, 
        firstName, 
        lastName, 
        email, 
        password, 
        phoneNumber, 
        isAdmin })
    res.json(result)
} 
//update user from db
const updateUser = async (req, res) => {
    try{
        const adminId  = req.userId
        const { userId } = req.params
        const { firstName, 
            lastName, 
            email, 
            password, 
            phoneNumber } = req.body
        
        const updateUser = await userService.updateUser({adminId, 
            userId, 
            firstName, 
            lastName, 
            email, 
            password, 
            phoneNumber})
        res.status(200).json(updateUser)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'SERVER ERROR'
          })  
    }
}
//delete user from db
const deleteUser = async (req, res)=> {
    try {
        const { userId } = req.params
        const adminId = req.useruserId
        
        const deleteUser = await userService.deleteUser({userId, adminId})
        res.json(deleteUser)

    } catch (e) {
         console.log(e);
        return res.status(500).json({
            message: 'Server error'
          });
    }
}


 module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}