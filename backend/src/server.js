require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongo = require("./app/model/mongo.client.js")
const io = require("socket.io")
const sockets = require("./sockets.js")
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongo.client()

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
const httpserver = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const ws = new io.Server(httpserver)

sockets(ws)
