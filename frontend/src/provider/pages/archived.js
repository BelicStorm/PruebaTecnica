import CardComponent from "../components/card";
import ButtonComponent from "../components/button";
import { useEffect, useState } from "react";
import { useSocket } from "../utils/socket.context";
import useConsumerReducer from "../router/consumer";
import { SocketConsumerModel } from "../../core/model/queries";


const Archived = () => {
  const [news, setNews] = useState([]); //estado de las noticias
  const [, consume] = useConsumerReducer(); //forma de llamar a los endpoints del core
  const {state} = useSocket() //Contexto del socket
  const {SOCKET_CONSUMER,FIND_ARCHIVED,OFF_ARCHIVED, SET_ARTICLE_DELETED} = SocketConsumerModel //acciones del modelo

  //Creamos un listener que seteara el nuevo estado de las noticias cada vez que el socket emita una respuesta a ala que este suscrito el componente
  const newsListener = (data) => {
    if (!data.error) {
      setNews(data.result)
    }else {
      console.log(data);
    }
  };
  //Consumimos del endpoint que emite la peticion de borrar el articulo seleccionado
  const deleteArticle = (title) =>{
    consume({consumer:SOCKET_CONSUMER,consumerAction:SET_ARTICLE_DELETED,variables:{socket:state.socket, title:title } });
  }
  /* Cuando el componente se monte o el estado que contiene el contexto del socket 
     cambie pero este no esté vacio, nos suscribiremos al emisor de las noticias archivadas.
     Cuando el componente se desmonte, apagaremos el listener.
  */
  useEffect(() => {
    if (state.socket) {
      consume({consumer:SOCKET_CONSUMER,consumerAction:FIND_ARCHIVED,variables:{socket:state.socket, action:newsListener} });
    }
    return () => {
      if (state.socket) {
        consume({consumer:SOCKET_CONSUMER,consumerAction:OFF_ARCHIVED,variables:{socket:state.socket, action:newsListener} });
      }
    };
  }, [state.socket]);

  /* Creamos las cartas que contienen las noticias. A estas les pasamos la accion de borrarse. */
  const transformArchivedContent = () =>{
    let to_return = []
    to_return = news.map((newsElement)=>{
      const {title,description,content,date,author} = newsElement
      return <CardComponent 
                key={`key-${title}`}
                footer={
                  <span>
                      <ButtonComponent label="Delete"
                                       icon="pi-trash"
                                       action={()=>deleteArticle(title)} 
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
  return <div className="Archived-container" style={{
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center"
  }}>
      { news.length > 0 ? transformArchivedContent() : ""}
  </div>
};

export default Archived;
