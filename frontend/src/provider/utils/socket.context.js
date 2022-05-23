import React from 'react';

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

function SocketProvider({children}) {
  const [state, dispatch] = React.useReducer(socketReducer, defaultState )

  const value = {state, dispatch}
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

function useSocket() {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a socketProvider')
  }
  return context
}

export {SocketProvider, useSocket}