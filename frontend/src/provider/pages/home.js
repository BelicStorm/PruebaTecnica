import CardComponent from "../components/card";
import ButtonComponent from "../components/button";
import { useEffect, useState } from "react";
import { useSocket } from "../utils/socket.context";
import useConsumerReducer from "../router/consumer";
import { SocketConsumerModel } from "../../core/model/queries";


const Home = () => {
  const [news, setNews] = useState([]); //estado de las noticias
  const [, consume] = useConsumerReducer(); //forma de llamar a los endpoints del core
  const {state} = useSocket() //Contexto del socket
  const {FIND_NEW_NEWS,OFF_NEW_ARTICLE,SOCKET_CONSUMER,SET_ARTICLE_ARCHIVED} = SocketConsumerModel //acciones del modelo

  //Creamos un listener que seteara el nuevo estado de las noticias cada vez que el socket emita una respuesta a ala que este suscrito el componente
  const newsListener = (data) => {
    if (!data.error) {
      setNews(data.result)
    }else {
      console.log(data);
    }
    
  };
  //Consumimos del endpoint que emite la peticion de archivar el articulo seleccionado
  const setArchived = (title) =>{
    consume({consumer:SOCKET_CONSUMER,consumerAction:SET_ARTICLE_ARCHIVED,variables:{socket:state.socket, title:title } });
  }
  /* Cuando el componente se monte o el estado que contiene el contexto del socket 
     cambie pero este no esté vacio, nos suscribiremos al emisor de las nuevas noticias.
     Cuando el componente se desmonte, apagaremos el listener.
  */
  useEffect(() => {
    if (state.socket) {
      consume({consumer:SOCKET_CONSUMER,consumerAction:FIND_NEW_NEWS,variables:{socket:state.socket, action:newsListener} });
    }
    return () => {
      if (state.socket) {
        consume({consumer:SOCKET_CONSUMER,consumerAction:OFF_NEW_ARTICLE,variables:{socket:state.socket, action:newsListener} });
      }
    };
  }, [state.socket]);

  /* Creamos las cartas que contienen las noticias. A estas les pasamos la accion de archivarse. */
  const transformHomeContent = () =>{
    let to_return = []
    to_return = news.map((newsElement)=>{
      const {title,description,content,date,author} = newsElement
      return <CardComponent 
                key={`key-${title}`}
                footer={
                  <span>
                      <ButtonComponent label="Archive"
                                       icon="pi-folder-open"
                                       action={()=>setArchived(title)} 
                                       buttonStyle="primary" 
                                       isLoading={false}></ButtonComponent>
                  </span>
                } 
                title={title}
                subTitle={description}
                content={
                  <div>
                    <p>{content}</p>
                    <p>{author} - {date}</p>
                  </div>
                }></CardComponent>
    })
    return to_return
  }
  return <div className="Home-container" style={{
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center"
  }}>
      { news.length > 0 ? transformHomeContent() : ""}
  </div>
};

export default Home;
