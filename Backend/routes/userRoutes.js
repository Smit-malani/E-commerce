const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/login', userController.loginUser)

router.post('/register', userController.registerUser)

router.post('/admin-login',userController.adminLogin)

module.exports = router