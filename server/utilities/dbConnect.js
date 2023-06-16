require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on("error", (error) => console.log(error));

  db.once("open", () => console.log("connected to database"));
};