const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')


router.post('/login', userController.loginUser)

router.post('/register', userController.registerUser)

router.post('/admin-login',userController.adminLogin)    

router.get('/userDetails', userAuth.verifyUser, userController.getUser)

router.patch('/userUpdate', userAuth.verifyUser, userController.updateUser)

module.exports = router