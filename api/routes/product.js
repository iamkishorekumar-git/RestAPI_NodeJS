const express = require("express")

const router = express.Router()
const Product = require("../models/product")
const mongoose = require("mongoose")

router.get("/",(req,res,next)=>
{
  Product.find().exec().then((docs)=>
{
  if(docs)
  {
    res.status(200).json(docs)
  }
  else {
    {
      res.status(404).json({
        message: "No Entries found"
      })
    }
  }

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
 const id = req.params.productId

 const updateOps = {}
 for(const ops of req.body)
 {
   updateOps[ops.propName] = ops.value
 }

 Product.update({_id:id},{$set: updateOps}).exec().then( result =>
 {
   res.status(200).json(result)
 }).catch(err=>
 {
   console.log(err);
   res.status(500).json({
     error:err
   })
 })


})

router.delete('/:productId',(req,res,next)=>
{
  const id = req.params.productId
  console.log(id);
  Product.deleteOne({_id :id}).exec().then(result =>
  {
    res.status(200).json(result)
  }).catch(err=>
  {
    res.status(500).json({
      error:err
    })
  })
})


module.exports = router
