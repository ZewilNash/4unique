const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const Cart = require("../modals/Cart");
const Order = require("../modals/Order");
const Report = require("../modals/Report");
const BookedOrder = require("../modals/BookedOrder");
const Food = require("../modals/Product");
const FoodReview = require("../modals/FOODREVIEW");
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const Category = require("../modals/CATEGORY");
const generateUniqueId = require('generate-unique-id');

const signup = async (req,res) => {

    const {fullname , email , password} = req.body;

    const user = await User.create({fullname , email, password});

  
    const token = await user.createToken();

    res.status(201).json({user:{_id:user._id , fullname:user.fullname , email:user.email,role:user.role}, token , msg:"User Created Successfully" , success:true});
}


const login = async (req,res) => {

    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg:"Please provide email and password",success:false});
    }

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).json({msg:"Invalid Credentials" , success:false});
    }

    const isMatch = await user.comparePasswords(req.body.password);

    if(!isMatch){
        return res.status(400).json({msg:"Invalid Credentials" , success:false});
    }

    const token = await user.createToken();

    res.status(200).json({user:{_id:user._id , fullname:user.fullname ,     email:user.email,role:user.role}, token ,  msg:"User Logged In Successfully" , success:true});
}


const getUserCartLength = async (req,res) => {
    const {id} = req.params;

    const user = await User.findOne({_id:id});

    if(!user){
        return res.status(404).json({msg:"User Not Found" , success:false});
    }

    const cart = await Cart.find({user:user._id});

    res.status(200).json({cartLength:cart.length});
}

const deleteFromCart = async (req,res) => {
    const {userId , foodId} = req.params;

    const user = await User.findOne({_id:userId});

    if(!user){
        return res.status(404).json({msg:"User Not Found" , success:false});
    }

    const findCart = await Cart.find({user:user._id , food:foodId});

    if(findCart.length === 0){
        return res.status(404).json({msg:"Food Not Found" , success:false});
    }

    await Cart.findOneAndDelete({user:user._id , food:foodId} , {useFindAndModify:false});

    res.status(200).json({msg:"Item Removed Successfully" , success:true})
}

const updateCartQty = async (req,res) => {
    const {userId , foodId} = req.params;

    const user = await User.findOne({_id:userId});

    if(!user){
        return res.status(404).json({msg:"User Not Found" , success:false});
    }

    const findCart = await Cart.find({user:user._id , food:foodId});

    if(findCart.length === 0){
        return res.status(404).json({msg:"Food Not Found" , success:false});
    }

    await Cart.findOneAndUpdate({user:user._id , food:foodId} , {qty:Number(req.body.qty)} , {useFindAndModify:false});

    res.status(200).json({msg:"Item Quantity Updated Successfully" , success:true})
}


const makeOrder = async (req,res) => {
    const order = await Order.create({...req.body});

    res.status(200).json({success:true , msg:"Your Order Has Been Made!" , order});
}

const getCart = async (req,res) => {
    const {id} = req.params;

    const user = await User.findOne({_id:id});

    if(!user){
        return res.status(404).json({msg:"User Not Found" , success:false});
    }

    const cart = await Cart.find({user:user._id}).populate("food");

   

    res.status(200).json({success:true,cart:cart})
}

const deleteCart = async (req,res) => {
    const {id} = req.params;

    const user = await User.findOne({_id:id});

    if(!user){
        return res.status(404).json({msg:"User Not Found" , success:false});
    }

    const deleted_cart = await Cart.deleteMany({user:user._id});

    res.status(200).json({success:true,msg:"Deleted Cart Successfully" , deleted_cart})
}

const sendReport = async (req,res) => {
    const {orderId,report , name , email , phone} = req.body;

    
    // just for test
    const order = await Order.find({_id:orderId});

    

    if(order.length === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    // create report
    const report_obj = await Report.create({
        order:orderId,
        report:report,
        name,
        email,
        phone
    });

    res.status(200).json({success:true , msg:"Report Sent Successfully,W'll Contact You Soon.." , report_obj})
}

const getAllOrders = async (req,res) => {
    const orders = await Order.find({})

    res.status(200).json({orders,success:true}).sort("createdAt");
}

const getOrder = async (req,res) => {
    const {id} = req.params;

    const order = await Order.find({_id:id}).sort("createdAt");

    if(order.lenght === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    res.status(200).json({order,success:true});
}
const getBookedOrder = async (req,res) => {
    const {id} = req.params;

    const order = await BookedOrder.find({_id:id}).sort("createdAt");

    if(order.lenght === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    res.status(200).json({order:order[0],success:true});
}


const editBookedOrder = async (req,res) => {
    const {id} = req.params;
    const {status , isPaid} = req.body;

    if(!status || !isPaid){
        return res.status(400).json({msg:"YOU MUST PROVIDE STATUS && ISPAID" , success:false});
    }

    const order = await BookedOrder.find({_id:id});
    
    if(order.lenght === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    await BookedOrder.findOneAndUpdate({_id:id} , {status:status , isPaid:isPaid} , {useFindAndModify:false});

    // send 
    let Pusher = require('pusher');
    let pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER
    });

    pusher.trigger('notifications', 'order_status', {data:order});
    
    global.io.on('connection', function (socket) {
        socket.emit('statusUpdated' , order);
    });

  
    // global.pusher.trigger("my-channel", "my-event", {
    //         message: `YOUR ORDER NUMBER ${order.order_num} IS READY PLEASE COME TO TAKE IT, THIS ORDER INCLUDES (${order.cart[0].food[0].name})`,
    // });
   

    res.status(200).json({msg:"Order Updated Successfully" , success:true})

}
const editOrder = async (req,res) => {
    const {id} = req.params;
    const {status , isPaid} = req.body;

    if(!status || !isPaid){
        return res.status(400).json({msg:"YOU MUST PROVIDE STATUS && ISPAID" , success:false});
    }

    const order = await Order.find({_id:id});
    
    if(order.lenght === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    await Order.findOneAndUpdate({_id:id} , {status:status , isPaid:isPaid} , {useFindAndModify:false});

    // send 
    
    
    res.status(200).json({msg:"Order Updated Successfully" , success:true})

}

const deleteOrder = async (req,res) => {
    const {id} = req.params;
    const order = await Order.find({_id:id});
    
    if(order.lenght === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    await Order.findOneAndDelete({_id:id} , {useFindAndModify:false});

    res.status(200).json({msg:"Order Deleted Successfully" , success:true})

}  
const deleteBookedOrder = async (req,res) => {
    const {id} = req.params;
    const order = await BookedOrder.find({_id:id});
    
    if(order.lenght === 0){
        return res.status(404).json({msg:"Order Not Found" , success:false});
    }

    await BookedOrder.findOneAndDelete({_id:id} , {useFindAndModify:false});

    res.status(200).json({msg:"Order Deleted Successfully" , success:true})

}  

const findOrder = async (req,res) => {
    let {text} = req.body;
    
    
    // { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
    


    const order = await Order.find({_id:text})
    
    
    if(order.lenght === 0){
        return res.status(400).json({msg:"Order Not Found" , success:false});
    }

    res.status(200).json({success:true , order:order[0]})

}
const findBookedOrder = async (req,res) => {
    let {text} = req.body;
    
    
    // { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
    


    const order = await BookedOrder.find({_id:text})
    
  
    
    if(order.lenght === 0){
        return res.status(400).json({msg:"Order Not Found" , success:false});
    }

    res.status(200).json({success:true , order:order[0]})

}

const deleteReport = async (req,res) => {
    const {id} = req.params;
    const report = await Report.find({_id:id});

    if(report.lenght === 0){
        return res.status(404).json({msg:"report Not Found" , success:false});
    }

    await Report.findByIdAndDelete({_id:id});

    res.status(200).json({success:true, msg:"Report Deleted Successfully"})
}

const findReport = async (req,res) => {
    const {id} = req.params;
    const report = await Report.find({order:id});


    if(report.lenght === 0){
        return res.status(404).json({msg:"report Not Found" , success:false});
    }

    res.status(200).json({report:report[0] , success:true})
}


const getAllOrderWithStatus = async (req,res) => {
    const {status} = req.params;
    const orders = await Order.find({status:status}).sort("createdAt")

    res.status(200).json({success:true , orders})
}

const getAllBookedOrderWithStatus = async (req,res) => {
    const {status} = req.params;
    const orders = await BookedOrder.find({status:status}).sort("createdAt")

    res.status(200).json({success:true , orders})
}

const deleteUser = async (req,res) => {
    const {id} = req.params;

    const user = await User.find({_id:id});

    if(user.lenght === 0){
        return res.status(404).json({msg:"user Not Found" , success:false});
    }

    await User.findOneAndDelete({_id:user[0]._id},{useFindAndModify:false});

    res.status(200).json({success:true,msg:"User Deleted Successfully"})
}
const updateUser = async (req,res) => {
    const {id} = req.params;
    const {fullname,email,role} = req.body;

    if(!fullname || !email || !role){
        return res.status(400).json({msg:"YOU MUST PROVIDE FULLNAME && EMAIL && ROLE" , success:false});
    }

    const user = await User.find({_id:id});

    if(user.lenght === 0){
        return res.status(404).json({msg:"user Not Found" , success:false});
    }

    await User.findOneAndUpdate({_id:user[0]._id},{fullname,email,role},{useFindAndModify:false});

    res.status(200).json({user:user[0],success:true,msg:"User Updated Successfully"})
}

const getUser = async (req,res) => {
    const {id} = req.params;

    const user = await User.find({_id:id});

    if(user.lenght === 0){
        return res.status(404).json({msg:"user Not Found" , success:false});
    }

  
    res.status(200).json({user:user[0],success:true,msg:"User Found Successfully"})
}

const deleteAllCanceledOrders = async (req,res) => {
    await Order.deleteMany({status:"canceled"});

    res.status(200).json({success:true,msg:"Orders Deleted Successfully"})
}

const deleteAllCompletedOrders = async (req,res) => {
    await BookedOrder.deleteMany({status:"completed"});

    res.status(200).json({success:true,msg:"Orders Deleted Successfully"})
}


const deleteAllDeliveredOrders = async (req,res) => {
    await Order.deleteMany({status:"delivered"});

    res.status(200).json({success:true,msg:"Orders Deleted Successfully"})
}

const getUserOrders = async (req,res) => {
    const {id} = req.params;
    const user = await User.find({_id:id});

    
    

    if(user.lenght === 0){
        return res.status(404).json({msg:"user Not Found" , success:false});
    }

    const userOrders = await BookedOrder.find({email:user[0].email});

    
    

     if(userOrders.lenght === 0){
        return res.status(404).json({msg:"user has no orders" , success:false});
     }

     res.status(200).json({userOrders , success:true})

}


const bookOrder = async (req,res) => {
    
    const order = await BookedOrder.create({...req.body});

    

    res.status(200).json({success:true , msg:`WE BOOK YOUR ORDER SUCCESSFULLY!` , order:order});
}

const makeReview = async (req,res) => {
    const {id} = req.params;
    const {review_link , review_img} = req.body;

    const food = await Food.find({name:id});

    
    if(food.lenght === 0){
        return res.status(404).json({msg:"Food Not Found" , success:false});
    }

    const review = await FoodReview.create({
        food:food[0]._id,
        review_link , review_img
    })

    res.status(201).json({success:true,msg:"Review Created Successfully" , review})
}

const getFoodReviews = async (req,res) => {
    const {id} = req.params;
    const food = await Food.find({_id:id});

    if(food.lenght === 0){
        return res.status(404).json({msg:"Food Not Found" , success:false});
    }

    const reviews = await FoodReview.find({food:id});


    res.status(200).json({success:true, reviews})

}

const deleteReview = async (req,res) => {
    const {id} = req.params;

    const review = await FoodReview.find({_id:id});

    if(review.lenght === 0){
        return res.status(404).json({msg:"review Not Found" , success:false});
    }

    await FoodReview.findOneAndDelete({_id:id});

    res.status(200).json({success:true, msg:"Review Deleted Successfully"})
}

const createCategory = async (req,res) => {
    const {category , image} = req.body;

    const foodCategories = await Food.find({}, { category: 1, _id: 0 })


    const found = foodCategories.some(el => el.category === category);

    if (found){
        return res.status(400).json({msg:"Category already exists" , success:false});
    }

    const categoryItem = await Category.create({
        category,
        image
    });

    res.status(201).json({success:true,msg:"Category Has Been Added Successfully" , category:categoryItem})


}

const getCategory = async (req,res) => {
    const categories = await Category.find({});

    res.status(200).json({success:true,categories})
}

const getSingleCategory = async (req,res) => {
    const {category} = req.params;

    const categoryItem = await Category.find({category:category});


    if (categoryItem.length === 0){
        return res.status(404).json({msg:"category Not Found" , success:false});
    }

    res.status(200).json({success:true,category:categoryItem[0]})
}

const deleteCategory = async (req,res) => {
    const {category} = req.params;

    const check = await Category.find({category:category});

    if(check.length === 0){
        return res.status(404).json({msg:"category Not Found" , success:false});
    }

    await Category.findOneAndDelete({category:category});

    await Food.deleteMany({category:category})

    res.status(200).json({success:true,msg:"Category Deleted Successfully"});
}

const updateCategory = async (req,res) => {
    const {category} = req.params;
    const {categoryItem , image} = req.body;

  
    

    if(!categoryItem || !image){
        return res.status(400).json({msg:"YOU MUST PROVIDE IMAGE && CATEGORY NAME" , success:false});
    }


    const check = await Category.find({category:category});

    if(check.length === 0){
        return res.status(404).json({msg:"category Not Found" , success:false});
    }

    await Category.findOneAndUpdate({category:category} , {category:categoryItem , image} , {useFindAndModify:false});

    await Food.updateMany({category:category} , {"$set":{"category": categoryItem}})

    res.status(200).json({success:true,msg:"Category Updated Successfully"});
}


const forgotPass = async (req,res) => {
    const {email} = req.body;

    const user = await User.find({email:email});

   
    

    if(user.length === 0){
        return res.status(404).json({msg:"THIS EMAIL IS NOT EXIST , ENTER AN EMAIL THAT EXISTS" , success:false});
    }


    const randomCode = generateUniqueId({
        includeSymbols: ['@','#','|'],
        excludeSymbols: ['0']
      });

    

    const updated = await User.findOneAndUpdate({_id:user[0]._id},{code:randomCode},{useFindAndModify:false});

 

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
        to: user[0].email,
        subject: 'FOOD4UNIQUE FORGOT PASSWORD',
        html: `<p>FOOD4UNIQUE SAYS: </p><h1>YOUR CODE IS : <b>${randomCode}</b></h1>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('');
        }
    });

    res.status(200).json({msg:"WE HAVE SEND CODE TO YOUR EMAIL" , success:true})
}


const changePass = async (req,res) => {
    const {email,code,newPass,confirmNewPass} = req.body;
    const user = await User.find({email:email});

   
    

    if(user.length === 0){
        return res.status(404).json({msg:"THIS EMAIL IS NOT EXIST , ENTER AN EMAIL THAT EXISTS" , success:false});
    }

   
    


    if(user[0].code !== code){
        return res.status(400).json({msg:"INVALID CODE!!" , success:false});
    }

    if(newPass.length < 8){
        return res.status(400).json({msg:"PASSWORD LENGTH SHOULD BE AT LEAST 8 CHARACTERS LONG" , success:false});
    }


    if(newPass !== confirmNewPass){
        return res.status(400).json({msg:"PASSWORD & CONFIRM PASSWORD SHOULD MATCH" , success:false});
    }

   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(newPass , salt);

   const updated = await User.findOneAndUpdate({_id:user[0]._id},{password:hashedPass},{useFindAndModify:false});

   res.status(200).json({msg:"WE HAVE UPDATED YOUR PASSWORD SUCCESSFULLY" , success:true})


}

module.exports = {
    signup,
    login,
    getUserCartLength,
    deleteFromCart,
    updateCartQty,
    makeOrder,
    getCart,
    deleteCart,
    sendReport,
    getAllOrders,
    getOrder,
    editOrder,
    deleteOrder,
    findOrder,
    deleteReport,
    findReport,
    getAllOrderWithStatus,
    deleteUser,
    updateUser,
    getUser,
    deleteAllDeliveredOrders,
    deleteAllCanceledOrders,
    getUserOrders,
    bookOrder,
    findBookedOrder,
    deleteBookedOrder,
    getBookedOrder,
    getAllBookedOrderWithStatus,
    deleteAllCompletedOrders,
    editBookedOrder,
    makeReview,
    getFoodReviews,
    deleteReview,
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    getSingleCategory,
    forgotPass,
    changePass
}