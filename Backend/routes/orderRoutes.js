const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const adminAuth = require('../middleware/adminAuth')
const userAuth = require('../middleware/userAuth')


//payment
router.post('/place', userAuth.verifyUser, orderController.placeOrder)//cash payment

//admin features
router.get('/list',adminAuth.verifyAdmin, orderController.allOrder) // for admin
router.patch('/status', adminAuth.verifyAdmin, orderController.updateStatus)// update status from admin side

//User features
router.get('/userorders', userAuth.verifyUser, orderController.userOrders)

module.exports = router