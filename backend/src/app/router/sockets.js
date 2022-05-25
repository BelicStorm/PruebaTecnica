const news = require("../controller/news.controller.js");

module.exports = (io) => {
  io.on("connection", (socket) => {

    console.log("nuevo socket connectado:", socket.id);

    //Buscamos todas las noticias con un estado de nuevas y las emitimos en todos los canales
    const emitNewNews = async () =>{
        const test = await news.findNewNews()
        io.emit("server:findNewNews", test);
    }
    //Buscamos todas las noticias con un estado de archivadas y las emitimos en todos los canales
    const emitArchivedNews = async () =>{
      const test = await news.findArchivedNews()
      io.emit("server:findArchivedNews", test);
    }
    
    //Get listeners
    socket.on("client:findNewNews", async () => {
        emitNewNews()
    });
    socket.on("client:findArchivedNews", async () => {
        emitArchivedNews()
    });

    //Post listeners

    //Creamos una nueva noticia y emitimos todas las nuevas noticias
    socket.on("client:createNewArticle", async (data) => {
        const test = await news.create(data)
        if (test?.error) {
            io.emit("server:createError", test);
        }
        await emitNewNews()
        
    });
    //Archivamos una noticia y emitimos todas las nuevas noticias y todas las noticias archivadas
    socket.on("client:archiveArticle", async (data) => {
      const test = await news.setArchived(data)
      if (test?.error) {
          io.emit("server:archiveError", test);
      }
      await emitNewNews()
      await emitArchivedNews()
    });
    //Borramos una noticia archivada y emitimos todas las noticias archivadas restantes
    socket.on("client:deleteArticle", async (data) => {
      const test = await news.setDeleted(data)

      if (test?.error) {
          io.emit("server:deleteError", test);
      }
      await emitArchivedNews()
      
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};