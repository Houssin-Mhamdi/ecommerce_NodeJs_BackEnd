const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getaProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productCtrl");

router.route("/").get(getAllProduct).post(createProduct);
router.route("/:id").get(getaProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
