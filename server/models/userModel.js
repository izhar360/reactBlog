import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "please enter your name!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email!"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please enter password!"],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  passwordConfirm: {
    type: String,
    required: [true, "please enter password to confirm!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords do not match!",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPass = async (ComingOne, HashedOne) => {
  return await bcrypt.compare(ComingOne, HashedOne);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  //  console.log(this.passwordChangedAt);
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
const User = mongoose.model("User", userSchema);
export default User;
