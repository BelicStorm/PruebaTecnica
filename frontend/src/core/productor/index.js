import {connectProductor,disconnectProductor} from "./socketIo/productor"

const socketProductor = {
    socketConnect: connectProductor,
    socketDisconnect: disconnectProductor 
}

export {
    socketProductor
}