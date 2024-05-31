const User = require("../modals/User")

const isAdmin = async (req,res,next) => {
    const _id = req.user._id;
 

    const user = await User.findOne({_id:_id});


    if(!user){
        
        if(req.method === "GET"){
            res.status(401);
            return res.render("pages/unauthorized/index");
        }

        return res.status(401).json({msg:"Unauthorized" , success:false});
    }

    if(user.role === "user"){
        
        if(req.method === "GET"){
            res.status(401);
            return res.render("pages/unauthorized/index");
        }

        return res.status(401).json({msg:"You're Unauthorized" , success:false});
    }

    next();
}

module.exports = isAdmin;