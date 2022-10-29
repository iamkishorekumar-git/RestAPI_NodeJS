const express = require("express")

app = express()

app.use((req,res,next)=>
{
    res.status(200).json({
        message:"Working Fine !"
    })
})

module.exports = app
