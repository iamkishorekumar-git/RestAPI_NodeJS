const mongoose = require("mongoose")
const OrderSchema = mongoose.Schema({
  _id : mongoose.Types.ObjectId,
  product :{type: mongoose.Types.ObjectId, required:true,ref:'Product'},
  quantity : {type:Number,required:true}
})

module.exports = mongoose.model('Order', OrderSchema);
