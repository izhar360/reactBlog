import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
//const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');
import { promisify } from "util";

const getToken = (id) => {
  return JWT.sign({ id: id }, "jwt_secret_that_is_very_Simple_toguess", {
    expiresIn: "90d",
  });
};

export const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = getToken(newUser._id);
    // const token = JWT.sign({ id: newUser._id }, process.env.jwt_secret, {
    //   expiresIn: process.env.expires_in
    // });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    // get user credential from body
    const { email, password } = req.body;

    //check if both are provided
    if (!password || !email) {
      return res.status(401).json({
        status: "failed",
        message: "please provide both email and password!",
      });
    }

    //get & check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPass(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email and password!",
      });
    }

    const token = getToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const protect = async (req, res, next) => {
  // check if header contains auth token
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    }

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "please login to get access!",
      });
    }

    const decoded = await promisify(JWT.verify)(
      token,
      "jwt_secret_that_is_very_Simple_toguess"
    );
    // console.log(decoded);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "failed",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    // 4) Check if user changed password after the token was issued

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "failed",
        message: "User recently changed password! Please log in again.",
      });
    }

    req.user = currentUser;

    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err,
    });
  }
};
