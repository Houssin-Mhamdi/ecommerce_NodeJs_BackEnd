const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getaUser,
  deleteaUser,
  updateUser,
} = require("../controller/userCtrl");
const { authMiddleware } = require("../middelwares/authMiddelware");

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUsers);
router
  .route("/:id")
  .get(authMiddleware, getaUser)
  .delete(deleteaUser)
  .put(updateUser);
module.exports = router;
