
const news = require("../controller/news.controller.js");
  
var newsRouter = require("express").Router();

newsRouter.get("/all", news.findAll );
newsRouter.get("/", news.findNewNews );
newsRouter.get("/archived", news.findArchivedNews );
newsRouter.post("/createNew", news.create );
newsRouter.put("/setArchived",news.setArchived);
newsRouter.put("/delete",news.setDeleted);


module.exports = {
  newsRouter
}
// news.findAll()