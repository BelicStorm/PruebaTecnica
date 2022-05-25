import { Route, Routes, } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../utils/socket.context";
import Home from "../pages/home";
import Archived from "../pages/archived";

import useConsumerReducer from './consumer'
import {SocketConsumerModel} from "../../core/model/queries/"

const Router = () => {

  const [consumerResult, consume] = useConsumerReducer();
  const {_,dispatch} = useSocket()
  /* Cuando la aplicacion inicie consumiremos del endpoint encargado de conectar el websocket. Cuando la aplicacion se desmonte nos desconectaremos */
  useEffect(() => {
    const  {CONNECT,DISCONNECT,SOCKET_CONSUMER} = SocketConsumerModel
    consume({consumer:SOCKET_CONSUMER,consumerAction:CONNECT});
    return () => {
      consume({consumer:SOCKET_CONSUMER,consumerAction:DISCONNECT});
      dispatch({type:"delete"})
    }
  }, []);
  /* Cuando haya un cambio en la respuesta del consumer y esta sea que se ha conectado sin problemas, guardaremos el puntero del socket en el contexto de la aplicacion  */
  useEffect(()=>{
    if (consumerResult) {
      dispatch({type:"connect", socket:consumerResult.result})
    }
  },[consumerResult])

  return (
    <>
      <Routes>
        <Route exact path='/' element={ <Home /> }  />
        <Route exact path='/archived' element={ <Archived /> }  />
      </Routes>
    </>
  );
};

export default Router;
