const mongoose = require('mongoose')
const signale = require('signale')


const connectionString = `mongodb+srv://lukaguledani:1324@project1.wvh8t5b.mongodb.net/test`

try {
    mongoose.connect(connectionString)
    signale.success('MongoDb:Connect: success')
} catch (err) {
    signale.error('MongoDb: error while connection: ',err )
}

module.exports = mongoose