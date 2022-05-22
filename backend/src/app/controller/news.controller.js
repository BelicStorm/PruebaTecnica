const mongo = require("../model/mongo.client.js");
const db = mongo.db
const News = db.news;

function newsException(mensaje) {
  return mensaje
}

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
        err.message || "Some error occurred while retrieving news."
    };
  }
};
const findNewNews = () => {
  News.find({status:"New"})
    .then(data => {
      return {
        result:data
      };
    })
    .catch(err => {
      return {
        error:true,
        errmsg:
          err.message || "Some error occurred while retrieving news."
      };
    });
}
const findArchivedNews = () => {

  News.find({status:"Archived"})
    .then(data => {
      return {
        result:data
      };
    })
    .catch(err => {
      return {
        error:true,
        errmsg:
          err.message || "Some error occurred while retrieving news."
      };
    });
}


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
// const setArchived = (req, res) => {
//   console.log(req.body);
//   if(!req.body.data || !req.body.data.title){
//     throw newsException("Data or title can not be empty")
//   }
//   const to_update = {
//     status:"Archived",
//     archivedDate:new Date(Date.now())
//   }
//   const title =  req.body.data.title
//   News.findOneAndUpdate({title:title}, to_update , { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//          throw newsException(`Cannot archive ${title}. Maybe was not found!`)
//       } else res.json({ result: `${title} was updated successfully.` });
//     })
//     .catch(err => {
//       throw newsException(`Can not update ${title}`)
//     });
// }
// const setDeleted = (req, res) => {
//   console.log(req.body);
//   if(!req.body.data || !req.body.data.title){
//     throw newsException("Data or title can not be empty")
//   }
//   const to_delete = {
//     status:"Deleted",
//     archivedDate:new Date(Date.now())
//   }
//   const title = req.body.data.title
//   News.findOneAndUpdate({title:title}, to_delete , { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//          throw newsException(`Cannot delete ${title}. Maybe was not found!`)
//       } else res.json({ result: `${title} was deleted successfully.` });
//     })
//     .catch(err => {
//       throw newsException(`Can not delete ${title}`)
//     });
// }
module.exports = {
  findAll, create, findNewNews, findArchivedNews
}