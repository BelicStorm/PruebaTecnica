const mongo = require("../model/mongo.client.js");
const db = mongo.db
const News = db.news;

/**
 * @mockData - create a set of articles with diferent status
 */
const mockData = async () =>{
  const news = await News.find({})
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
          return false
      } catch (error) {
          console.log("Cannot create the mock data", error);
          process.exit();
      }
  }
}


/* Format the exeption message */
function newsException(mensaje) {
  return mensaje
}

/* Queries */
const findAll = async () => {
  try {
    const result = await News.find({})
    return {
      result:result
    };
  } catch (error) {
    return {
      error:true,
      errmsg:
        error.message || "Some error occurred while retrieving news."
    };
  }
};
const findNewNews = async () => {
  try {
    const result = await News.find({status:"New"},null, {sort: "-date"})
    return {
      result:result
    };
  } catch (error) {
    return {
      error:true,
      errmsg:
        error.message || "Some error occurred while retrieving news."
    };
  }
}
const findArchivedNews = async () => {
  try {
    const result = await News.find({status:"Archived"},null, {sort: "-archiveDate"})
    return {
      result:result
    };
  } catch (error) {
    return {
      error:true,
      errmsg:
        error.message || "Some error occurred while retrieving news."
    };
  }
}

/* Mutations */
/** 
 * @create Create an article
 * @params data:{
 *  title: String,
    description: String,
    content: String,
    author: String,
 * }
 */
const create = async (data) => {
  try {
    if(!data){
      throw newsException("Data can not be empty")
    }
    const {title, description, content, author} = data
      if([title, description, content, author].some(element=> element===undefined)){
        throw newsException("All the content are required")
      }
    const NewsSechemaToSave = new News({
      title: title,
      description: description,
      content: content,
      author:author,
      status:"New",
      date: new Date(Date.now())
    });
    await NewsSechemaToSave.save(NewsSechemaToSave)

  } catch (error) {
    console.log(error);
   return { result: "", error:true, message:error }
  } 
}
/** 
 * @setArchived Change the article status to Archived
 * @params data:{
 *  title: String
 * }
 */
const setArchived = async (data) => {
  try {
    if(!data || !data.title){ //If the data param or data.title is empty
      throw newsException("Data or title can not be empty")
    }
    const to_update = {
      status:"Archived",
      archivedDate:new Date(Date.now())
    }
    const title =  data.title
    const result = await News.findOneAndUpdate({title:title}, to_update , { useFindAndModify: false })
    if (!result) { //if any article is found
      throw newsException(`Cannot archive ${title}. Maybe was not found!`)
    }
  } catch (error) {
    console.log(error);
    return { result: "", error:true, message:error }
  }
}
/** 
 * @setDeleted Change the article status to Deleted
 * @params data:{
 *  title: String
 * }
 */
const setDeleted = async (data) => {
 try {
  if(!data || !data.title){
    throw newsException("Data or title can not be empty")
  }
  const to_delete = {
    status:"Deleted",
    archivedDate:new Date(Date.now())
  }
  const title = data.title
  const result = await News.findOneAndUpdate({title:title}, to_delete , { useFindAndModify: false })
  if (!result) {
    throw newsException(`Cannot delete ${title}. Maybe was not found!`)
  }
 } catch (error) {
  console.log(error);
  return { result: "", error:true, message:error }
 }
}


module.exports = {
  findAll, create, findNewNews, findArchivedNews, setArchived, setDeleted, mockData
}