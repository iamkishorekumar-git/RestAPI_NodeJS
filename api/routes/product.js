const express = require("express")

const router = express.Router()
const Product = require("../models/product")
const mongoose = require("mongoose")

router.get("/",(req,res,next)=>
{
  Product.find().exec().then((docs)=>
{
  res.status(200).json(docs)
}).catch(err=>
{
  res.status(500).json({error:err})
})
})

router.post("/",(req,res,next)=>
{
  const product = new Product({
    _id : new mongoose.Types.ObjectId(),
    name: req.body.name,
    price:req.body.price
  })
  product.save().then(result=>
  {
    console.log(result);
    res.status(201).json({
      message:'Handling POST request - products',
      createdProduct : result
    })
  })
  .catch(err=>
  {
    res.status(500).json({
      error:err
    })
  })
})

router.get('/:productId',(req,res,next)=>
{
  const prodID = req.params.productId
  Product.findById(prodID).exec().then((doc)=>
{
  if(doc)
  {
      res.status(200).json(doc)
  }
  else {
    res.status(404).json({message:"No valid entry for provided ID"})
  }
}).catch(err =>
{
  console.log(err);
  res.status(500).json(
    {
      error :err
    }
  )
})
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
