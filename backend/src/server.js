require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongo = require("./app/model/mongo.client.js")
const router= require("./app/routes/news.routes.js")

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongo.client()

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/news", router.newsRouter)

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});