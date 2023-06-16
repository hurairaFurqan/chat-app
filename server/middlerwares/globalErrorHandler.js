const AppError = require("../utilities/appError");

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  console.log("ERR CAUGHT IN GLOBAL MIDDLEWARE".red.bold);
  console.log(`ERR ${err}`.brightRed.bgBrightWhite.bold);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  sendErrorDev(err, res);
};
