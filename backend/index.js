const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
