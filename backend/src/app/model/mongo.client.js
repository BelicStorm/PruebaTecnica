const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const {mockData} = require("../controller/news.controller.js")

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.news = require("./news.model.js")(mongoose);

/**
 * @mongoClient - Create a connection to the db and create a mock data if the db is empty
 *  */ 
const client = () =>{
    db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        console.log("Connected to the database!");
        await mockData()
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
}

module.exports = {
    client, db
}


