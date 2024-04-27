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
    const getBlog = await Blog.findById(id).populate("likes");
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
const getAllBlogWithNumViews = asyncHandler(async (req, res) => {
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

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  const blog = await Blog.findById(blogId);
  const loginUserId = await req?.user?._id;
  const isLiked = blog?.isLiked;
  const alreadyDisLiked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { dislikes: loginUserId }, isDisliked: false },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: loginUserId }, isLiked: false },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getAllBlog,
  getAllBlogWithNumViews,
  likeBlog,
  disliketheBlog,
};
