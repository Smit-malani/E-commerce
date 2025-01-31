const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const userAuth = require('../middleware/userAuth')


router.get('/get',userAuth.verifyUser, CartController.getUserCart)
router.post('/add',userAuth.verifyUser, CartController.addToCart)
router.patch('/update',userAuth.verifyUser, CartController.updateCart)
router.delete('/delete/:key', userAuth.verifyUser, CartController.removeItem)

module.exports = router