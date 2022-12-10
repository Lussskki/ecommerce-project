const User = require('../db/models/user.model')
const jwt = require('jsonwebtoken')
const Log = require('../db/mongdb/models/log.mode')
//for development
const process = require('process')
const bcrypt = require('bcrypt')
//login
const login = async ({
    email, password
  }) => {
    
    const user = await User.findOne({
      where: {
        email
      }
    })
    
    const isPasswordTrue = true 
    if (user && isPasswordTrue) {
      const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
          },
          process.env.SECRET,
          {
            expiresIn: '1h'
          }
        )
      return token
    }
    return false 
  }
   
  
  
  //signup
  const regist = async ({firstName, lastName, email, password, phoneNumber}) => {
  
    if(!email.includes('@') || !firstName || !lastName || password.length < 8 || phoneNumber.length < 9 ){
      return {message:'Not filled in correctly'}  
    }
  
    if(!/^[0-9,+]+$/.test(phoneNumber)){
      return ({message: 'phoneNumber must be only number'})
    }
  
    const checkEmail = await User.findOne({
        where: {
            email
        } 
    })
    const checkPhoneNumber = await User.findOne({
        where: {
            phoneNumber
         }
    })
      
    if(checkEmail || checkPhoneNumber){
        return { message:'User already exists'}
    }
    
    try {
      const hash = bcrypt.hashSync(password, Number(process.env.SALT_AMOUNT));
    
    await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        phoneNumber
      });
  
      const creationLog = new Log({
        actionType: 'CREATED',
        dataType: 'USER'
      });
  
      await creationLog.save()
  
    return { message: 'User Registerd'}
  
  } catch (e) {
    
    return { message: 'Server error' }
  }
  }
  
  
  
  
  
  module.exports = {
    login,
    regist
  }