const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").put(getAllReviews).delete(isAuthenticatedUser,deleteReviews);

module.exports = router;
