const Blog = require("../models/blogModle.js");
const User = require("../models/userModle.js");
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId.js");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (err) {}
});

module.exports = { createBlog };
