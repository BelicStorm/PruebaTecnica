import React from 'react';

/* Creamos un contexto para manejar el puntero del socket */
const SocketContext = React.createContext();
const defaultState = {socket:undefined}

function socketReducer(state, action) {
  switch (action.type) {
    case 'connect': {
      const socketData = {socket:action.socket}
      return socketData
    }
    case 'delete': {
      const socket = action.socket
      socket.close();
      return defaultState
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

/* Provider que usaremos para poder acceder al reducer para obtener el contexto o modificarlo */
function SocketProvider({children}) {
  const [state, dispatch] = React.useReducer(socketReducer, defaultState )

  const value = {state, dispatch}
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

/* Hook que usaremos para poder manejar el contexto del socket */
function useSocket() {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a socketProvider')
  }
  return context
}

export {SocketProvider, useSocket}