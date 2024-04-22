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
  } catch (err) {
    throw new Error(err);
  }
});

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getBlog = await Blog.find();
    res.json({
      success: true,
      message: "Get blog successfully",
      getBlog,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (err) {
    throw new Error(err);
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    throw new Error(err);
  }
});
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id);
    await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });
    res.json({
      success: true,
      message: "Get blog successfully",
      getBlog,
    });
  } catch (err) {
    throw new Error(err);
  }
});
const getAllBlogWithNumViews= asyncHandler(async (req, res) => {
    try {
      const blogs = await Blog.find({ numViews: { $gt: 10 } });
      res.json({
        success: true,
        message: "Get blogs with numViews greater than 10 successfully",
        blogs,
      });
    } catch (err) {
      throw new Error(err);
    }
  });
  
  module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getAllBlog,
    getAllBlogWithNumViews,
  };

