const express = require("express")
app = express()
const productRouters = require("./api/routes/product")
const ordersRouters = require("./api/routes/orders")
const morgan = require("morgan")

app.use((morgan("dev")))
app.use("/products",productRouters)
app.use("/orders",ordersRouters)

app.use((req,res,next)=>
{
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})

app.use((error,req,res,next)=>
{
  res.status(error.status || 500).json({
    error:{
      message : error.message
    }
  })
})


module.exports = app
