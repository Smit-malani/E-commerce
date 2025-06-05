const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cartdata:{
        type: Object,
        default:{}
    }
},{
    minimize: false
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel