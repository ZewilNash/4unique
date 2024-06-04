const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
   food:{
       type:mongoose.Types.ObjectId,
       ref:"Product",
       required:[true , "Please Provide Food To Add!"],
   },

   qty:{
        type:Number,
        required:[true , "Please Provide Quantity First!"],
   },


   user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true , "Please Provide Cart Owner To Add!"],
   }

} , {timestamps:true});



module.exports = mongoose.model("Cart" , CartSchema);