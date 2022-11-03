const express = require("express")

const router = express.Router()
const Order = require("../models/order")
const mongoose = require("mongoose")

router.get("/",(req,res,next)=>
{
Order.find().then(docs=>
{
  res.status(200).json(docs)
}).catch(err=>
{
  error: err
})
})

router.post("/",(req,res,next)=>
{
  const order = new Order({
    _id : mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: req.body.quantity
})

order.save().then(result =>
{
  res.status(201).json(result)
}).catch(err=>
{
  //console.log(err);
  res.status(500).json({
    error:err
  })
})
})

router.get('/:orderId',(req,res,next)=>
{
  const orderId = req.params.orderId

  if(orderId == "special")
  {
    res.status(200).json({
      message:"You've a special order memeber Welcome !!",
      id:orderId
    })
  }
  else
  {
    res.status(200).json({
      message:"handling praticular orderId"
    })
  }
})

router.delete('/:orderId',(req,res,next)=>
{
const id = req.params.orderId
Order.deleteOne({_id:id})
.then(result =>
{
  res.status(200).json(result)
}).catch( err =>
  {
    console.log(err);
    res.status(500).json({
      error:err
    })
  }
)

})


module.exports = router
