require("dotenv").config();
const jwt = require("jsonwebtoken");
const AppError = require("../utilities/appError");
const UserModel = require("../models/user.model");

module.exports = async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("no token found", 400));
  }

  try {
    const decodedToken = jwt.verify(token, "login1946");

    if (!decodedToken) {
      return next(new AppError("unable to decode token", 400));
    }
    const user = await UserModel.findById(decodedToken.id);
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("issue in protect middleware", 400));
  }
};
