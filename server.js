import express from 'express'
const app = express()
import env from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import dbconnect from './config/db.js';
import favouriteRoutes from './routes/favouriteRoutes.js'
import CartRoutes from './routes/CartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
// import path from "path"

// const _dirname = path.resolve();

env.config()

dbconnect();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/book', bookRoutes)
app.use('/api/v1/fav', favouriteRoutes)
app.use('/api/v1/cart', CartRoutes)
app.use('/api/v1/order', orderRoutes)

// app.use(express.static(path.join(__dirname, "./FrontEnd/dist")))
// app.get('*', (_, res)=>{
//     res.sendFile(path.resolve(__dirname, "./FrontEnd/dist/index.html" ))
// })

app.get('/',(req, res)=>{
    res.send("server start")
});
const Port = process.env.PORT || 8080; 

app.listen(Port, ()=>{
    console.log("port connected")
})


