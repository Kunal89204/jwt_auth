const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('database is connected')
        })
        .catch((error) => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;