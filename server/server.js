require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID:${socket.id} joined the room ${data}`);
  });

  socket.on("send_msg", (data) => {
    socket.to(data.room).emit("received_msg", data);
  });

  // socket.on("diconnect", () => {
  //   console.log("User disconnected:", socket.id);
  // });
});

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

server.listen(process.env.PORT, () => {
  console.log(`server is listening at port ${process.env.PORT}`);
});
