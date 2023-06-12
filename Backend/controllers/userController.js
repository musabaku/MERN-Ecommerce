const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchasynerror");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "public id",
      url: "imageurl",
    },
  });

  sendToken(user,200,res);

});

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler("Please enter your email and password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Please enter correct email and password",401))
      }
      
      const isPasswordMatched = await user.comparePassword(password)
      
      if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid email and password",401))
      
    }

    sendToken(user,200,res);
})

exports.logout = catchAsyncErrors(async(req,res,next)=>{

  res.cookie(token,null,{
    expires: new Date(Date.now()),
    httpOnly : true,
  })

  res.status(200).json({
    success:true,
    message :"Logged Out"
  })
})