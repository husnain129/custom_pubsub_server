const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3006;
const cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
  console.log("pubsub connection");
  socket.on("disconnect", () => {
    console.log("pubsub disconnected");
  });

  socket.on("pubsub_route", ({ route }) => {
    console.log("pubsub data = ", route);
    io.emit("pubsub", route);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
