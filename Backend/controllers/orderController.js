const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')


// cash on delivey order
module.exports.placeOrder = async(req, res)=>{
    try {
        const userId = req.user
        const {items, amount, address} = req.body.orderData

        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            orderStatus: 'order placed',
            paymentStatus: false,
            date: Date.now()
        })

        if(!order){
            return res.status(400).json({ message: 'Order Not Placed', success: false })
        }

        await userModel.findByIdAndUpdate(userId,{cartdata: {}})
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartdata

        return res.status(201).json({message: 'Order placed successfully', success: true, cartData })

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false})
    }
}

//All order for admin panel
module.exports.allOrder = async(req, res)=>{
    try {
        const orders = await orderModel.find({})
        if(!orders){
            return res.status(404).json({message: 'No order yet', success:false})
        }
        res.status(200).json({message: 'Order fetch Successfully', success:true, orders})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success:false})
    }
}

//update order status from admin panel
module.exports.updateStatus = async(req, res)=>{
    try {
        const {orderId, status} = req.body
        if(status == "Delivered"){
            await orderModel.findByIdAndUpdate(orderId,{paymentStatus: true})
        }else{
            await orderModel.findByIdAndUpdate(orderId, {orderStatus: status, paymentStatus: false})
        }
        res.status(200).json({message: 'Status updated', success: true})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false})
    }
}

//All order for user panel
module.exports.userOrders = async(req, res)=>{
    try {
        const userId = req.user
        const order = await orderModel.find({userId})
        if(!order){
            return res.status(404).json({message: 'Order not found', success:false})
        }
        res.status(200).json({message: 'Order get successfully', success: true, order})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false})
    }
}

 

