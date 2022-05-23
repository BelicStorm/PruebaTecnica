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
  useEffect(() => {
    const  {CONNECT,DISCONNECT,SOCKET_CONSUMER} = SocketConsumerModel
    consume({consumer:SOCKET_CONSUMER,consumerAction:CONNECT});
    return () => {
      consume({consumer:SOCKET_CONSUMER,consumerAction:DISCONNECT});
      dispatch({type:"delete"})
    }
  }, []);
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
