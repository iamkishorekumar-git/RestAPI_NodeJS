const express = require("express")
app = express()
const productRouters = require("./api/routes/product")
const ordersRouters = require("./api/routes/orders")
const userRouters = require("./api/routes/user")
const morgan = require("morgan")
const mongoose = require("mongoose")
//const bodyParser = require("body-parser")

const uri = "mongodb+srv://rest-api-shop:rest-api-shop@rest-api.6evwfqc.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose
  .connect(process.env.URI || uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.use((morgan("dev")))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use((req,res,next)=>
{
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use("/products",productRouters)
app.use("/orders",ordersRouters)
app.use("/user",userRouters)

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
