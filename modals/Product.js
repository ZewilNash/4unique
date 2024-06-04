const mongoose = require("mongoose");

const {pusher} = require("../api/app")

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Provide a name for product"],
        trim:true,
        minlength:5,
        maxlength:50,
        unique:true
    },

    price:{
        type:Number,
        required:[true , "Provide a price for product"],
        trim:true
    },

    category:{
        type:String,
        required:[true , "Provide a category for product"],
        trim:true,
        minlength:5,
        maxlength:100
    },

    size:[

        {
            type:String,
            required:[true,"provide a size"],
            trim:true
        },
    ],

    description:{
        type:String,
        required:[true , "Provide a description for product"],
        trim:true,
        minlength:10
    },
    images:[

        {
            type:String,
            required:[true,"provide an image"],
            trim:true
        }
    ],

} , {timestamps:true});


ProductSchema.pre("save" , async function () {
    let Pusher = require('pusher');
    let pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER
    });

    const food = this

    pusher.trigger('notifications', 'food_added', {data:food});

    global.io.on('connection', function (socket) {
        socket.emit('foodadded' , food);
    });
   
})

module.exports = mongoose.model("Product" , ProductSchema);