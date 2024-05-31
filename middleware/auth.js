const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const authenticateRoute = async (req,res,next) => {
    const userToken = req.headers.authorization;

    // console.log(userToken);
    


    if(!userToken || !userToken.startsWith("Bearer ")){

        if(req.method === "GET"){
            res.status(401);
            return res.render("pages/unauthorized/index");
        }

        return res.status(401).json({msg:"Invalid Authorization"});
    }

    const token = userToken.split(" ")[1];

    const decoded = await jwt.verify(token , process.env.JWT_SECRET);

   
    

    if(!decoded){
        if(req.method === "GET"){
            res.status(401);
            return res.render("pages/unauthorized/index");
        }

        return res.status(401).json({msg:"Invalid Authorization"});
    }

    const user = await User.findOne({_id:decoded.id});

    if(!user){

        if(req.method === "GET"){
            res.status(401);
            return res.render("pages/unauthorized/index");
        }

        return res.status(401).json({msg:"Invalid Authorization"});
    }

    req.user = user

    next();

}


module.exports  = authenticateRoute;