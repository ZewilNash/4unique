const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


const ReviewSchema = new mongoose.Schema({
    food: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "Please Provide Food!"],
    },

 
    review_link:{
        type: String,
        required: [true, "You Must Provide Review Link"],
        trim: true,
    },

    review_img:{
        type: String,
        required: [true, "You Must Provide Review Image"],
        trim: true,
    }

}, {timestamps:true});


module.exports = mongoose.model("Review", ReviewSchema);