const mongoose = require('mongoose')
 async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")
        console.log("DB connected Successsfully")
    } catch (err) {
        console.error(err)
        console.log("DB does not connected Successfully")
    }
 }

 module.exports = connectDB