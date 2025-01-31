const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    orderStatus:{
        type: String,
        required: true,
        default: 'order placed'
    },
    paymentStatus:{
        type: Boolean,
        required: true,
        default: false
    },
    date:{
        type: Number,
        required: true
    }
})

const orderModel = mongoose.model('order', orderSchema)
module.exports = orderModel