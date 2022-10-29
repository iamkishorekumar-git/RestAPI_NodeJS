const express = require("express")

const router = express.Router()

router.get("/",(req,res,next)=>
{
  res.status(200).json({
    message:'fetching orders'
  })
})

router.post("/",(req,res,next)=>
{
  res.status(201).json({
    message:'orders created'
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

router.delete('/:productId',(req,res,next)=>
{
  console.log(req);
  res.status(200).json({
    message :"delete particular orderId"
  })
})


module.exports = router
