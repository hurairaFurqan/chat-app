const catchAsync = require("../utilities/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  req.params = req.user;
  next();
});

exports.getUser = catchAsync(async (req, res) => {
  const user = req.params;
  if (user) {
    const person = {
      name: user.name,
      email: user.email,
    };
    return res.json(person);
  }
  return next(new AppError("no user found against this id", 400));
});
