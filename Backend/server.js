const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/DB')
const {cloudinaryConfig} = require('./config/cloudinary')
const app = require('./app')
const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`server is runnig on PORT ${PORT}`)
    connectDB()
    cloudinaryConfig()
})