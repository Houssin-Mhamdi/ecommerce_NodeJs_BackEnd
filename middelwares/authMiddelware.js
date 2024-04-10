const jwt = require("jsonwebtoken");
const User = require("../models/userModle.js");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {j
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login agin ");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

module.exports = { authMiddleware };
