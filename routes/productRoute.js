const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middelwares/authMiddelware");

const {
  createProduct,
  getAllProduct,
  getaProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../controller/productCtrl");

router
  .route("/")
  .get(getAllProduct)
  .post(authMiddleware, isAdmin, createProduct);

router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router
  .route("/:id")
  .get(getaProduct)
  .put(authMiddleware, isAdmin, updateProduct)
  .delete(authMiddleware, isAdmin, deleteProduct);

module.exports = router;
