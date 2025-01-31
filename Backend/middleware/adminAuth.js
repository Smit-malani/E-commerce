const { verifyJwtToken } = require("../utils/verifyJwtToken")


module.exports.verifyAdmin = async (req,res,next)=>{
    try {        
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({success: false, message: "Please sign in"})
        }
        const decoded = await verifyJwtToken(token)
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: 'Access denied, not an admin' });
        }
        next()
    } catch (err) {
        console.log('Error in adminAuth middleware:', err);
        res.status(401).json({ success: false, message: 'Invalid token, authorization denied' });
    }
}