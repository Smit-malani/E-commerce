const userModel = require("../models/userModel")


module.exports.getUserCart = async(req, res)=>{
    try {
        const userId = req.user

        const userData = await userModel.findById(userId)
        let cartData = await userData?.cartdata

        res.status(200).json({message:'Cart Data', success:true, cartData})

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false})
    }    
}

module.exports.addToCart = async(req, res)=>{
    try {
        const userId = req.user
        const {itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartdata

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartdata:cartData})
        res.status(200).json({message:'Added to Cart', success:true})

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false})
    }
}

module.exports.updateCart = async(req, res)=>{
    try {
        const userId = req.user
        const {itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartdata

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartdata:cartData})
        res.status(200).json({message:'Cart Updated', success:true})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false})
    }    
}

module.exports.removeItem = async(req, res)=>{
    try {
        const userId = req.user
        const {key} = req.params
        const productId = key.split('_')[0]
        const size = key.split('_')[1]  
        
        if(!productId || !size){
            return res.status(400).json({ message: 'Product ID and size are required', success: false})
        }

        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).json({message: 'User not found' , success: false})
        }

        if(!user.cartdata[productId] || !user.cartdata[productId][size]){
            return res.status(404).json({ message: "Product not found in cart", success: false})
        }

        await userModel.findByIdAndUpdate(userId,{
            $unset:{[`cartdata.${productId}.${size}`] : ''}
        }, {new: true})

        const updatedUser = await userModel.findById(userId)

        if(Object.keys(updatedUser.cartdata[productId]).length == 0){
            await userModel.findByIdAndUpdate(userId, {
                $unset:{[`cartdata.${productId}`]: ''}
            },{new: true})
        }

        await user.save()
        res.status(200).json({ message: "Item removed successfully.", cartData: updatedUser.cartdata });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal server error', success: false}) 
    }
}
