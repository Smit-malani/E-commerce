const mongoose = require('mongoose')

const reviewShema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
},{timestamps:true})

const reviewModel = mongoose.model('review',reviewShema)


module.exports = reviewModel