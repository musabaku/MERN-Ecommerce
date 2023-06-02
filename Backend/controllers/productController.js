const Product = require("../models/productModels");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

    if (!product){
        return res.status(500).json({

        
        })

    }

  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({ success: true, product });
};

// module.exports = getAllProducts;
