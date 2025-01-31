const jwt = require('jsonwebtoken')


module.exports.verifyJwtToken = async(token)=>{
    try {
        let data = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}