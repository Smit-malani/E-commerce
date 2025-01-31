const { cloudinaryConfig } = require("../config/cloudinary")
const cloudinary = require('cloudinary').v2
const productModel = require("../models/productModel")

module.exports.getProducts = async(req, res)=>{
    try {
        const product = await productModel.find({})
        if(!product){
            return res.status(404).json({ message: 'Product Not Found', success: false })
        }

        res.status(200).json({product, message:'all product', success:true})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error', success: false})
    }
}

module.exports.getProductById = async(req, res)=>{
    try {
        const {productId} = req.params        

        const productById =  await productModel.findOne({_id: productId})
        if(!productById){
            return res.status(404).json({ message: 'Product Not Found', success: false })
        }

        res.status(200).json({product: productById, message:'all product', success:true})

    } catch (err) {
        console.log(err)
        res.json({message: 'internal server error', success: false})
    }
}

module.exports.addProduct = async(req, res)=>{
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body
        if (!name || !description || !price || !category || !subCategory || !sizes || !bestseller) {
            return res.status(400).json({success: false, message: 'All fields are required.'})
        }
        
        const files = req.files
        if (!files || Object.keys(files).length === 0) {
          return res.status(400).json({ success: false, message: "At least one image is required." });
        }

        const uploadedImages = []

        for(const key in files){
            const imageBuffer = files[key][0].buffer
            const base64Image = `data:${files[key][0].mimetype};base64,${imageBuffer.toString("base64")}`

            const result = await cloudinary.uploader.upload(base64Image,{
                folder:"E-commerce"
            })
            if (!result) {
                return res.status(500).json({ success: false, message: "Image upload failed." });
            }
            uploadedImages.push({
                public_id: result.public_id,
                secure_url: result.secure_url
            })
            
        }

        const product = await productModel.create({
            name, 
            description, 
            price, 
            category, 
            subCategory, 
            sizes, 
            bestSeller :bestseller,
            images: uploadedImages
        })

        if(!product){
            return res.status(400).json({ message: 'Product Not Added', success: false })
        }
        return res.status(201).json({product, message: 'Product Added successfully', success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error', success: false})
    }
}

module.exports.removeProduct = async(req, res)=>{
    try {
        const {productId} = req.params
        
        const isproduct = await productModel.findById(productId)
        if(!isproduct){
            return res.status(404).json({message: 'product not found', success: false})
        }

        const result = await productModel.findByIdAndDelete(productId)
        if(!result){
            return res.status(400).json({message: 'Product not deleted', success: false })
        }

        return res.status(200).json({message: 'Product deleted successfully', success: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error', success: false})
    }
}