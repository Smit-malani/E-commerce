const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const adminAuth = require('../middleware/adminAuth')
const upload = require('../middleware/multer')

router.get('/products', productController.getProducts)

router.get('/product/:productId', productController.getProductById)

router.post('/addproduct', upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]) , adminAuth.verifyAdmin, productController.addProduct)

router.delete('/remove/:productId', adminAuth.verifyAdmin, productController.removeProduct)

router.patch('/update/:productId',adminAuth.verifyAdmin,productController.updateProduct)


module.exports = router