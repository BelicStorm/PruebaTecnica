import io from 'socket.io-client';

const connectProductor = () => {
    console.log("Hola");
    const newSocket = io("http://localhost:6868",{transports: ['websocket']});
    return newSocket
}

const disconnectProductor = (socket) => {
    socket.close();
}

export {
    connectProductor,
    disconnectProductor
}