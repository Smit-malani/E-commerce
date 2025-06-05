const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    images:{
        type: Array,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    sizes:{
        type: Array,
        required: true
    },
    bestSeller:{
        type: Boolean
    },
    offerEnabled:{
        type: Boolean,
        default: true
    },
    discount:{
        type: Number,
        default: null
    },
    discountedPrice:{
        type: Number,
        default: null
    },
    review:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ]
},{timestamps:true})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel