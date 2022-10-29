const express = require("express")
app = express()
const productRouters = require("./api/routes/product")
const ordersRouters = require("./api/routes/orders")

app.use("/products",productRouters)
app.use("/orders",ordersRouters)

module.exports = app
