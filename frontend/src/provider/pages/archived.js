import CardComponent from "../components/card";
import ButtonComponent from "../components/button";
import { useEffect, useState } from "react";
import { useSocket } from "../utils/socket.context";
import useConsumerReducer from "../router/consumer";
import { SocketConsumerModel } from "../../core/model/queries";


const Archived = () => {
  const [news, setNews] = useState([]);
  const [, consume] = useConsumerReducer();
  const {state} = useSocket()
  const {SOCKET_CONSUMER,FIND_ARCHIVED,OFF_ARCHIVED} = SocketConsumerModel

  const newsListener = (data) => {
    console.log(data);
    setNews(data.result)
  };

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

  const transformArchivedContent = () =>{
    let to_return = []
    to_return = news.map((newsElement)=>{
      const {title,description,content,date,author} = newsElement
      return <CardComponent 
                key={`key-${title}`}
                footer={
                  <span>
                      <ButtonComponent label="Delete"
                                       action={()=>console.log(title)} 
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
  return <div className="Archived-container">
      { news.length > 0 ? transformArchivedContent() : ""}
  </div>
};

export default Archived;
