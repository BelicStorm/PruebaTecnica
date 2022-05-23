import {connectProductor,disconnectProductor} from "./socketIo/productor"
import sockets from "./socketIo/sockets"

const socketProductor = {
    socketConnect: connectProductor,
    socketDisconnect: disconnectProductor 
}

export {
    socketProductor,sockets
}