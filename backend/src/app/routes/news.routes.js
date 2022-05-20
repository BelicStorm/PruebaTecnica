
const news = require("../controller/news.controller.js");
  
var newsRouter = require("express").Router();

newsRouter.get("/", news.findAll );


module.exports = {
  newsRouter
}
// news.findAll()