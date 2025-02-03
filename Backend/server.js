const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/DB')
const {cloudinaryConfig} = require('./config/cloudinary')
const app = require('./app')
const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`server is runnig on PORT ${port}`)
    connectDB()
    cloudinaryConfig()
})