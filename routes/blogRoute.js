const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middelwares/authMiddelware");

const {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogWithNumViews,
  likeBlog,
} = require("../controller/blogCtrl");

router.route("/").get(getAllBlog).post(authMiddleware, isAdmin, createBlog);
router.route("/all").get(getAllBlogWithNumViews);
router.route("/likes").put(authMiddleware, likeBlog);
router
  .route("/:id")
  .get(getBlog)
  .put(authMiddleware, isAdmin, updateBlog)
  .delete(authMiddleware, isAdmin, deleteBlog);

module.exports = router;
