const User = require("../modals/User");
const bcrypt = require("bcryptjs");

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
    forgotPass,
    changePass
}