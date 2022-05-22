const news = require("./app/controller/news.controller.js");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id);

    const emitNewNews = async () =>{
        const test = await news.findAll()
        socket.emit("server:findNewNews", test);
    }

    socket.on("client:findNewNews", async () => {
        const test = await news.findAll()
        socket.emit("server:findNewNews", test);
    });
    socket.on("client:findArchivedNews", async () => {
        const test = await news.findAll()
        socket.emit("server:findArchivedNews", test);
    });
    socket.on("client:createNewArticle", async (data) => {
        const test = await news.create(data)
        console.log("socket result",test);
        if (test?.error) {
            socket.emit("server:createError", test);
        }
        await emitNewNews()
        
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};