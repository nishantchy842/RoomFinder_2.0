const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./db/Connectdb");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const messagesRouter = require("./routes/messageRoute");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../client/src/uploads"))
);

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//connect database
connectDb();

//routes
app.use("/api/auth", userRoute);
app.use("/api/room", roomRoute);
app.use("/", messagesRouter);

io.on("connection", (socket) => {
  //receive user's data from the front end˚
  socket.on("messages", (usersData) => {
    // io.emit("messages", usersData);
    socket.join(usersData._id);
    console.log(usersData._id);
    socket.emit("Connected!");
  });
  console.log(`A user ${socket.id} is connected.`);
});

server.listen(process.env.PORT, () => {
  console.log(`Server running is port ${process.env.PORT}`);
});
