require('dotenv').config()
require('./db/connection')
require('./db/mongdb/connectionMongo')

//express
const express = require('express')
const app = express()
const port =  3000

//for development
const signale = require('signale')
const bodyParser = require('body-parser')

//json()files
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
const auth = require('./routes/router.auth')
const product = require('./routes/router.product')
const user = require('./routes/router.user')
const checkAuth = require('./middleware/auth')
const onlyAdmin = require('./middleware/onlyAdmin')
app.use('/auth',auth)
app.use('/products',product)
app.use('/users',user)
//middleware
app.use(checkAuth)
app.use(onlyAdmin)






app.listen(port,() => {
    signale.success(`Server listens to port ${port}`)
  })
