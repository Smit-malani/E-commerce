const { verifyJwtToken } = require("../utils/verifyJwtToken")

module.exports.verifyUser = async(req, res, next)=>{
    try {                  
        const token = req.headers.authorization.split(' ')[1]        
        if(!token){
            return res.status(401).json({success: false, message: "Please sign in"})
        }

        const decoded = await verifyJwtToken(token)
        req.user = decoded.id
        next()
    } catch (err) {
        console.log('Error in adminAuth middleware:', err);
        res.status(401).json({ success: false, message: 'Invalid token, authorization denied' });
    }
}