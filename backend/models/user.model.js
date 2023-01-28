const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: {
    required: [true, "Please tell us your name"],
    type: String,
    trim: true,
    unique: true,
    maxlength: [50, "Max length exceeded"],
    minlength: [1, "min length exceeded"],
  },
  email: {
    required: [true, "Please tell us your email"],
    type: String,
    trim: true,
    unique: true,
    maxlength: [50, "Max length exceeded"],
    minlength: [1, "min length exceeded"],
  },
  password: {
    required: [true, "Please tell us your password"],
    type: String,
    maxlength: [20, "Max length exceeded"],
    minlength: [3, "min length exceeded"],
  },
});

schema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const userSchema = mongoose.model("user", schema);
module.exports = userSchema;
