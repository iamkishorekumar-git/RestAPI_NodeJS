const express = require("express")
const moment = require("moment")
const router = express.Router()
const Product = require("../models/product")
const mongoose = require("mongoose")
const multer = require("multer")


const storage = multer.diskStorage({

  destination : function(req,file,cb)
  {
    cb(null,"./uploads")
  },

  filename : function(req,file,cb)
  {
    console.log(file)
    cb(null,moment().format()+ file.originalname )
  }
})

// file filter


const fileFilter = (req,file,cb)=>
{
  //reject a file

  if(file.mimetype ==="image/jpeg" || file.mimetype ==="image/png")
  {
    cb(null,true)
  }
  else{
    cb(new Error("File Type not Supported, Only png,Jpeg are allowed to upload"),false)
  }

}

const Upload = multer({
  storage:storage,
  limits: { fileSize: 1024*1024 * 2},
  fileFilter:fileFilter
})

router.get("/",(req,res,next)=>
{
  Product.find().exec().then((docs)=>
{
  if(docs)
  {
    res.status(200).json({

      count : docs.length,
      products : docs.map(doc=>
        {
         return {
          _id : doc._id,
          name : doc.name,
          price : doc.price,
          productURL : doc.productURL,
          request: {
            type:"GET",
            url :"https://localhost:8080/products" + doc._id 

          }
         } 

        })
    })
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

router.post("/",Upload.single("productImage"),(req,res,next)=>
{
  console.log(req.file);
  const product = new Product({
    _id : new mongoose.Types.ObjectId(),
    name: req.body.name,
    price:req.body.price,
    productURL:req.file.path
  })
  product.save().then(result=>
  {
    console.log(result);
    res.status(201).json({
      message:'Product Created',
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

 Product.updateOne({_id:id},{$set: updateOps}).exec().then( result =>
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
