require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const dbConnect = require("./utilities/dbConnect");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
dbConnect();

app.use("/auth", authRouter);
app.use("/users", userRouter);


app.use("*", (req, res) => {
  console.log("in * condition of app.use");
  res.status(500).json(`Internal Server Error at ${req.originalUrl}`);
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening at port ${process.env.PORT}`);
});
