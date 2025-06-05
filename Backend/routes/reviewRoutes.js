const express = require('express')
const router = express.Router()
const userAuth = require('../middleware/userAuth')
const reviewController = require('../controllers/reviewController')

router.post('/review/:productId',userAuth.verifyUser,reviewController.addReview)

router.delete('/review/:reviewId',userAuth.verifyUser,reviewController.deleteReview)


module.exports = router