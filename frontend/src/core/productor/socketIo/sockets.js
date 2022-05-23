const sockets = {
    emit:{
        findNewNews:(socket)=>{
            socket.emit("client:findNewNews")
        },
        findArchived:(socket)=>{
            socket.emit("client:findArchivedNews")
        },
        archiveArticle:(socket,article)=>{
            socket.emit("client:archiveArticle",article)
        }
    },
    listener:{
        onNewArticle:(socket,action)=>{
            console.log("on");
            socket.on("server:findNewNews", action);
        },
        onArchived:(socket,action)=>{
            socket.on("server:findArchivedNews", action);
        },
        offNewArticle:(socket,action)=>{
            console.log("off");
            socket.off("server:findNewNews", action);
        },
        offArchived:(socket,action)=>{
            socket.on("server:findArchivedNews", action);
        },
    }
}

export default sockets