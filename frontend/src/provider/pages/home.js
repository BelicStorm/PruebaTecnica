import CardComponent from "../components/card";
import ButtonComponent from "../components/button";
import { useEffect, useState } from "react";
import { useSocket } from "../utils/socket.context";
import useConsumerReducer from "../router/consumer";
import { SocketConsumerModel } from "../../core/model/queries";


const Home = () => {
  const [news, setNews] = useState([]);
  const [, consume] = useConsumerReducer();
  const {state} = useSocket()
  const {FIND_NEW_NEWS,OFF_NEW_ARTICLE,SOCKET_CONSUMER,SET_ARTICLE_ARCHIVED} = SocketConsumerModel

  const newsListener = (data) => {
    if (!data.error) {
      setNews(data.result)
    }else {
      console.log(data);
    }
    
  };
  const setArchived = (title) =>{
    consume({consumer:SOCKET_CONSUMER,consumerAction:SET_ARTICLE_ARCHIVED,variables:{socket:state.socket, title:title } });
  }

  useEffect(() => {
    
    console.log("va");
    if (state.socket) {
      consume({consumer:SOCKET_CONSUMER,consumerAction:FIND_NEW_NEWS,variables:{socket:state.socket, action:newsListener} });
    }
    return () => {
      if (state.socket) {
        consume({consumer:SOCKET_CONSUMER,consumerAction:OFF_NEW_ARTICLE,variables:{socket:state.socket, action:newsListener} });
      }
    };
  }, [state.socket]);

  const transformHomeContent = () =>{
    let to_return = []
    to_return = news.map((newsElement)=>{
      const {title,description,content,date,author} = newsElement
      return <CardComponent 
                key={`key-${title}`}
                footer={
                  <span>
                      <ButtonComponent label="Archive"
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
  return <div className="Home-container">
      { news.length > 0 ? transformHomeContent() : ""}
  </div>
};

export default Home;
