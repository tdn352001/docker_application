const mongoose = require('mongoose')

async function connectDB() {
    const username = process.env.MONGO_INITDB_ROOT_USERNAME
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD
    const dbName = process.env.MONGO_DB_NAME
    const dbUrl = `mongodb://${username}:${password}@mongo:27017/${dbName}?authSource=admin`

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('connect db successfully')
        })
        .catch(err => {
            console.log('connect db Failed')
            console.log(err)
        })
}


module.exports = { connectDB }