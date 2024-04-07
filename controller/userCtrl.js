const User = require("../models/useModle.js");

const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create new user
    const newUser = User.create(req.body);
    res.json({ message: "user created successfully", newUser });
  } else {
    res.json({ message: "user already exists", success: false });
  }
};

module.exports = {
  createUser,
};
