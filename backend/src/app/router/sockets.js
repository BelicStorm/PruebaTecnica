const news = require("../controller/news.controller.js");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id);

    const emitNewNews = async () =>{
        const test = await news.findNewNews()
        socket.emit("server:findNewNews", test);
    }
    const emitArchivedNews = async () =>{
      const test = await news.findArchivedNews()
      socket.emit("server:findArchivedNews", test);
    }
    
    //Get listeners
    socket.on("client:findNewNews", async () => {
        emitNewNews()
    });
    socket.on("client:findArchivedNews", async () => {
        emitArchivedNews()
    });

    //Post listeners
    socket.on("client:createNewArticle", async (data) => {
        const test = await news.create(data)
        if (test?.error) {
            socket.emit("server:createError", test);
        }
        await emitNewNews()
        
    });
    socket.on("client:archiveArticle", async (data) => {
      const test = await news.setArchived(data)
      if (test?.error) {
          socket.emit("server:archiveError", test);
      }
      await emitNewNews()
      
    });
    socket.on("client:deleteArticle", async (data) => {
      const test = await news.setDeleted(data)

      if (test?.error) {
          socket.emit("server:deleteError", test);
      }
      await emitArchivedNews()
      
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};