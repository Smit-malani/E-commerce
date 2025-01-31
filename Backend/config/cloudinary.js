const cloudinary = require('cloudinary').v2

module.exports.cloudinaryConfig = async ()=>{
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
        console.log("cloudinary config done")
    } catch (err) {
        console.log(err)
        console.log("error while cloudinary config")
    }
}