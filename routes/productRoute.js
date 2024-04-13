const express = require("express");
const router = express.Router();
const { createProduct, getAllProduct ,getaProduct} = require("../controller/productCtrl");

router.route("/").get(getAllProduct).post(createProduct);
router.route("/:id").get(getaProduct);

module.exports = router;
