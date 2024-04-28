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
} = require("../controller/productCtrl");

router
  .route("/")
  .get(getAllProduct)
  .post(authMiddleware, isAdmin, createProduct);

router.put("/wishlist", authMiddleware, addToWishList);
router
  .route("/:id")
  .get(getaProduct)
  .put(authMiddleware, isAdmin, updateProduct)
  .delete(authMiddleware, isAdmin, deleteProduct);

module.exports = router;
