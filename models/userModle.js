const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) {
//     return bcrypt.hash(this.password, 10, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       this.password = hash;
//       next();
//     });
//   }
//   next();
// });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createdPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resetToken;
};
//Export the model
module.exports = mongoose.model("User", userSchema);
