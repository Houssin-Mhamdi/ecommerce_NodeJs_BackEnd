const Product = require("../models/productModle");
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongodbId.js");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaproduct = await Product.findById(id);
    res.json(getaproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteProduct = await Product.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully", deleteProduct });
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {
  createProduct,
  getAllProduct,
  getaProduct,
  updateProduct,
  deleteProduct,
};
