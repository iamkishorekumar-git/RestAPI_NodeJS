const express = require("express")

const router = express.Router()
const User = require("../models/user")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const { json } = require("body-parser");

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).then(result => {

        if (result.length > 1) {
            return res.status(409).json({
                message: "user already exists"
            })
        }
        else {

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {

                    console.log(err);
                    return res.status(500).json({

                        error: err
                    })
                } else {

                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })

                    user.save().then(result => {
                        res.status(201).json({
                            message: "new user created"

                        })
                    }).catch(err => {

                        console.log(err);

                        res.status(500).json({
                            error: err
                        })
                    })

                }
            })


        }
    })
})


router.post("/login",(req,res,next)=>
{
    User.find(req.body.email).then(user =>
        {
            if(user.length<1)
            {
                res.status(404).json({
                    message:"Mail doesn't exist"
                })
            }
        }
        

    ).catch(err=>
        {
            console.log(err)
            res.status(400).json(
                {
                    error:err
                }
            )
        })

})

router.delete('/:userId',(req,res,next)=>
{
    console.log(req)
    console.log("id",req.params.userId);
    User.deleteOne({_id:req.params.userId}).then(result=>
        {
            res.status(201).json(
                {
                    message:"User deleted"
                }
            )
        }).catch(err=>
            {
                console.log(err)
                res.status(400).json(
                    {
                        error:err
                    }
                )
            })

})

module.exports = router;