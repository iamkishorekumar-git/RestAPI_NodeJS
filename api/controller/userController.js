const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

exports.user_signup =  (req, res, next) => {
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
}

exports.user_login = (req,res,next)=>
{
    User.find({email : req.body.email}).then(user =>
        {
            if(user.length<1)
            {
                res.status(404).json({
                    message:"Mail doesn't exist"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>
            {
                if(err) return(res.status(400).json({error:err}))
                if(result) 
                {
                   const token =  jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                    },"jwtKey",{
                        expiresIn : "1h"
                    })
                    
                    return res.status(200).json({
                        message: "auth succes",
                        token : token
                    })
                }
            })
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

}


exports.user_delete = (req,res,next)=>
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

}