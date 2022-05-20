const mongo = require("../model/mongo.client.js");
const db = mongo.db
const News = db.news;




const findAll = (req, res) => {
  const title = req?.query?.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  News.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    });
};

module.exports = {
  findAll
}