const express = require("express")
const app = express()
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const ordeRoutes = require('./routes/orderRoutes')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', productRoutes)
app.use('/api/v1', userRoutes)
app.use('/api/v1', cartRoutes)
app.use('/api/v1', ordeRoutes)


// app.get('/',(req, res, next)=>{
//     res.send('api working')
// })

module.exports = app