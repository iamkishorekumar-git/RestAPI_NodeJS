const express = require("express")

const router = express.Router()

router.get("/",(req,res,next)=>
{
  res.status(200).json({
    message:'Handling GET request - products'
  })
})

router.post("/",(req,res,next)=>
{
  res.status(201).json({
    message:'Handling POST request - products'
  })
})

router.get('/:productId',(req,res,next)=>
{
  const prodID = req.params.productId

  if(prodID == "special")
  {
    res.status(200).json({
      message:"You're Special Id memeber Welcome !!",
      id:prodID
    })
  }
  else
  {
    res.status(200).json({
      message:"handling praticule productId"
    })
  }
})

router.patch('/:productId',(req,res,next)=>
{
  res.status(200).json({
    message :"updated particular productId"
  })
})

router.delete('/:productId',(req,res,next)=>
{
  console.log(req);
  res.status(200).json({
    message :"delete particular productId"
  })
})


module.exports = router
