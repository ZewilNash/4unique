const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();



const OrderSchema = new mongoose.Schema({
    cart: [],

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please Provide Order Owner To Add!"],
    },

    name: {
        type: String,
        required: [true, "You Must Provide name"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "You Must Provide email"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ]
    },

    phone: {
        type: String,
        required: [true, "You Must Provide Phone Number"],
        trim: true,
    },

    address: {
        type: String,
        required: [true, "You Must Provide Address"],
        trim: true,
    },
    confirmed_address: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        required: [true, "You Must Provide State"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "You Must Provide Country"],
        trim: true,
    },

    zip_code: {
        type: String,
        required: [true, "You Must Provide Country"],
        trim: true
    },
    road: {
        type: String
    },
    village: {
        type: String
    },

    leisure:{
        type: String
    },

    status:{
        type: String,
        required: [true, "You Must Provide Status"],
        trim: true,
        enum:["pending" , "delivered" , "canceled" , "onway"],
        default:"pending"
    },

    isPaid:{
        type: Boolean,
        required: [true, "You Must Provide IsPaid"],
        trim: true,
    },

   


}, {timestamps:true});


OrderSchema.pre("save" , function () {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS,
        },
       
      });
      
      var mailOptions = {
        from: process.env.GMAIL,
        to: process.env.GMAIL,
        subject: 'NEW ORDER IS MADE PLEASE CHECK THE ADNIN PAGE NOTE THE ORDER ID PLEASE',
        html: `<p>ORDER ID: </p><h1>${this._id}</h1>, <p>ORDER OWNER: </p><h1>${this.name}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('');
        }
      });
})


module.exports = mongoose.model("Order", OrderSchema);