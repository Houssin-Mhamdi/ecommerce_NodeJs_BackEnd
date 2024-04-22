const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middelwares/authMiddelware");

const { createBlog } = require("../controller/blogCtrl");

router.route("/").post(authMiddleware, isAdmin, createBlog);
//router.route("/:id").get(getaProduct).put(authMiddleware,isAdmin,updateProduct).delete(authMiddleware,isAdmin,deleteProduct);

module.exports = router;
