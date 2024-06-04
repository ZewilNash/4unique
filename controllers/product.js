const Product = require("../modals/Product");
const Cart = require("../modals/Cart");

const generateUniqueId = require('generate-unique-id');

const User = require("../modals/User");
const midtransClient = require('midtrans-client');

const createProduct = async (req,res) => {
    const {name,price,category,size,description,images} = req.body;

    if(images.length === 0){
        return res.status(400).json({success:false, msg:"Please Provide Images before inserting any of the fields"});
    }

    const product = await Product.create({name , price , category , size , description , images});

    res.status(201).json({product , success:true, msg:"Product Created Successfully"});
}

const updateProduct = async (req,res) => {
    const {name,price,category,size,description,images} = req.body;


    if(!name || !price || !category || !size || !description || !images){
        return res.status(400).json({success:false, msg:"FILL ALL FIELDS BEFORE UPDATING"});
    }

    const {foodId} = req.params;

    const edit_product = await Product.findOne({_id:foodId});

  

    if(images.length === 0){
        return res.status(400).json({success:false, msg:"Please Provide Images before inserting any of the fields"});
    }

    if(!edit_product){
        return res.status(404).json({msg:"No Food Found!" , success:false})
    }

    const product = await Product.findOneAndUpdate({_id:foodId} , {$set:{name,price,category,size,description,images}} , {new:true})

    const deleteFoodFromCart = await Cart.deleteMany({food:foodId});

    

    res.status(200).json({product , success:true, msg:"Product Updated Successfully" , deleteFoodFromCart});
}


const addToFavourite = async (req,res) => {
    const {foodId,userId} = req.params;

    let user_fav

    const user = await User.findOne({_id:userId});

    
    
    if(!user){
        return res.status(404).json({msg:"No User Found!" , success:false})
    }

    

    let matchArr = user_fav ? user_fav.favourites.filter(id => String(id) === String(foodId)) : user.favourites.filter(id => String(id) === String(foodId));

    if(matchArr.length === 1){
        return res.status(400).json({msg:"You Already Added This To Favourite!" , success:false})
    }




  user_fav =  await User.findOneAndUpdate(
        { _id: user._id }, 
        { $push: { favourites: foodId } },{useFindAndModify: false}
        
    );

    
    

    res.status(200).json({msg:"Item Added To Favourite!" , success:true})

}

const removeFromFav = async (req,res) => {
    const {foodId,userId} = req.params;

    

    const user = await User.findOne({_id:userId});

    
    
    
    if(!user){
        return res.status(404).json({msg:"No User Found!" , success:false})
    }

    

    const updatedFavourites = user.favourites.filter(id => String(id) !== String(foodId));


     user_fav =  await User.findOneAndUpdate(
        { _id: user._id }, 
        { favourites: updatedFavourites},
        {useFindAndModify: false}
        
    );
    

    res.status(200).json({msg:"Item Removed From Favourite!" , success:true})

}


const deleteFood = async (req,res) => {
    const {foodId} = req.params;
    const product = await Product.findOne({_id:foodId});

    if(!product){
        return res.status(404).json({msg:"No Product Found!" , success:false})
    }

    const deletedProduct = await Product.findOneAndDelete({_id:foodId});

    const deleteFoodFromCart = await Cart.deleteMany({food:foodId});

    res.status(200).json({deletedProduct , msg:"Food Deleted Successfully" , success:true , deleteFoodFromCart});
}

const getSingleFood = async (req,res) => {
    const {foodId} = req.params;

  
    

    const food = await Product.findOne({_id:foodId});


    if(!food){
        return res.status(404).json({msg:"No Food Found!" , success:false})
    }

    res.status(200).json({food , msg:"food found" , success:true});
}

const addToCart = async (req,res) => {
    const {userId , productId} = req.params;
    const {qty} = req.body;
    const user = await User.findOne({_id:userId});
    const product = await Product.findOne({_id:productId});



    if(!user || !product){
        return res.status(404).json({msg:"No Food Found!" , success:false})
    }

  
    

    const isMatchCart = await Cart.find({user:user._id , food:product._id});

  
    

    if(isMatchCart.length > 0){
  
        await Cart.findOneAndUpdate({user:isMatchCart[0].user , food:isMatchCart[0].food},{$set:{qty:Number(isMatchCart[0].qty) + Number(qty)}} , {new:true, useFindAndModify:false})

        return res.status(200).json({msg:`We Updated The Item Quantity By ${qty}` , success:true}) 
    }

    const cart = await Cart.create({
        user:user._id,
        food:product._id,
        qty:qty
    });

    res.status(200).json({msg:"Item Added To Cart" , success:true})


}


const prepareOrder = async (req,res) => {
    const id = generateUniqueId({
        includeSymbols: ['@','#','|'],
        excludeSymbols: ['0']
      });
  const {amount , first_name,last_name,email,phone} = req.body;
// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : true,
        serverKey : process.env.PAYMENT_SERVER_KEY,
        clientKey:process.env.PAYMENT_CLIENT_KEY
    });

let parameter = {
    "transaction_details": {
        "order_id": `${id}`,
        "gross_amount": amount
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone
    }
};

let token = "";


await snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        
        
        let transactionToken = transaction.token;
       
        token = transactionToken;
    })



if(!token){
    return res.status(400).json({success:false,msg:"Token Not generated!"})
}


res.status(200).json({success:true , token:token})

}



module.exports = {
    createProduct,
    addToFavourite,
    removeFromFav,
    deleteFood,
    getSingleFood,
    updateProduct,
    addToCart,
    prepareOrder
}