const mongoose = require("mongoose")

const userSchema =mongoose.Schema(
    {
        _id : mongoose.Types.ObjectId,
        email : {type:String,required:true,unquie:true},
        password : {type:String,required:true}
    }
)

module.exports = mongoose.model("User",userSchema)