const mongoose = require('mongoose')
const { Schema } = mongoose

const logSchema = new Schema({
    actionType: {
      type: String,
      enum: ['DELETED', 'UPDATED', 'CREATED']
    },
    dataType: {
        type: String,
        enum: ['PRODUCT', 'USER']
    },
      createdAt: {
        type: Date,
        default: new Date(),
    },
    userId: Number,
    isAdmin: Number,
    productId: Number,
})


module.exports = mongoose.model('Log', logSchema)