const User = require("../models/userModle.js");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json({ message: "user created successfully", newUser });
  } else {
    throw new Error("User Already Exjsists");
  }
});
module.exports = {
  createUser,
};
