
require("dotenv").config();
const express = require("express")
const app = express()

const userRoutes = require('./Routes/userRoutes')
const busRoutes = require('./Routes/busRoutes')
const routes = require('./Routes/routes')
const bookRoutes = require('./Routes/bookingRoutes')

const connectDb = require("./config/db")
const cors = require("cors")

const PORT = process.env.PORT || 3000
connectDb()
app.use(express.json())
app.use(cors())

app.use(express.static("public"))
// app.get("/",(req, res) =>{
//     res.json({message:"hello world"})
// })

app.use('/user',userRoutes)
app.use('/bus',busRoutes);
app.use('/routes',routes)
app.use('/book',bookRoutes)

app.listen(PORT,(err)=>{
    console.log(`app is listening on ${PORT}`)
})