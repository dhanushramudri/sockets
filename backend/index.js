const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client-side origin
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("New connection");

  socket.emit("message", "Welcome to the chat"); // Initial welcome message

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("join", ({ room, name }) => {
    console.log("join", room, name);
    socket.join(room);
    io.to(room).emit("notification", `${name} has joined the ${room}`);
  });

  socket.on("messageRoom", ({ room, message }) => {
    console.log("message", room, message);
    io.to(room).emit("message", message); // Broadcast message to room
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
