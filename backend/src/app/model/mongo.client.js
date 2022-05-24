const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.news = require("./news.model.js")(mongoose);

const client = () =>{
    db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        console.log("Connected to the database!");
        const news = await db.news.find({})
        if (news.length === 0) {
            try {
                await db.news.insertMany(
                    [
                        {title: "title",description: "description",content: "content",author:"author2",   status:"Archived",date: new Date(Date.now())},
                        {title: "title2",description: "description2",content: "content2",author:"author1",status:"New",date: new Date(Date.now())},
                        {title: "title3",description: "description3",content: "content3",author:"author2",status:"Archived",date: new Date(Date.now())},
                        {title: "title4",description: "description4",content: "content4",author:"author1",status:"New",date: new Date(Date.now())},
                        
                    ]
                );
                console.log("Demo data created")
            } catch (error) {
                console.log("Cannot create the mock data", error);
                process.exit();
            }
        }
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
}

module.exports = {
    client, db
}


