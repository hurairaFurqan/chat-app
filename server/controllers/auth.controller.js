require("dotenv").config();
const userModel = require("../models/user.model");

const AppError = require("../utilities/appError");
const bcrypt = require("bcrypt");

const catchAsync = require("../utilities/catchAsync");
const jwt = require("jsonwebtoken");
exports.SignUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = new userModel({
    name: name,
    email: email,
    password: password,
  });

  try {
    await user.save();
  } catch (error) {
    return next(new AppError("unable to save data in DB", 400));
  }
  return res.status(200).json({
    status: "Success",
  });
});

exports.SignIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email or password", 400));
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("no user found against this email", 400));
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return next(new AppError("password not match", 403));
  }

  if (match) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        iat: Math.floor(Date.now / 1000),
        id: user._id,
      },
      process.env.jwtSecret
    );

    const person = {
      name: user.name,
      email: user.email,
    };
    return res.status(200).json({ token: token, person });
  }
});
