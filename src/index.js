const express = require('express')

const connect=require("./configs/db")
const userController=require("./controllers/user.controller") 
const productController=require('./controllers/product.controller')
const{register,login}=require("./controllers/auth.controller")

const app = express()
app.use(express.json())

const cors=require("cors")
app.use(cors())
const port=process.env.PORT ||9875

app.post('/register',register)
app.post('/login',login)

app.use("/users",userController)
app.use('/product',productController)

app.listen(port, async function () {
    try {
        await connect()
        console.log(`listening on port ${port}`)
    } catch (error) {
        console.log('error:', error)
    }
})