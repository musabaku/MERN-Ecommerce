const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");

// Create product

exports.createProduct = Func(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// update product

exports.updateProduct = Func(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
});
// delete product

exports.deleteProduct = Func(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});
// get one product

exports.getProductDetails = Func(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
// get all product

exports.getAllProducts = Func(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({ success: true, product });
});

// module.exports = getAllProducts;
