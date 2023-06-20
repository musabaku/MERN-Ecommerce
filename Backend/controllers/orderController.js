const Order = require("../models/orderModel");
const Product = require("../models/productModels");
const catchAsyncErrors = require("../middleware/catchasynerror");
const ErrorHandler = require("../utils/errorhandler");

// create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
  });

  res.status(201).json({
    success:true,
    order,
  })
});


exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

  const order = await Order.findById(req.params.id).populate("user","name email")
  if(!order){
    return next(new ErrorHandler("Order not found",400));
  }

  res.status(200).json({
    success:true,
    order,
  })
})
// logged in user orders 
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{

  const order = await Order.find({user:req.user._id})
 

  res.status(200).json({
    success:true,
    order,
  })
})
