const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


const CategorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: [true, "You Must Provide Category"],
        trim: true,
        unique: true
    },

    image:{
        type: String,
        required: [true, "You Must Provide Image For Category"],
        trim: true,
    }

}, {timestamps:true});


module.exports = mongoose.model("Category", CategorySchema);