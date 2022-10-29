const express = require("express")
app = express()
const productRouters = require("./api/routes/product")
const ordersRouters = require("./api/routes/orders")

app.use("/products",productRouters)
app.use("/orders",ordersRouters)
app.use("/",(req,res,next)=>
{
  res.status(200).json({
    message:"Welcome to rest API creatin using NodeJS"
  })
})

module.exports = app
