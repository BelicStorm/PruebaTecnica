import CardComponent from "../components/card";
import ButtonComponent from "../components/button";
import { useEffect, useState } from "react";
import { useSocket } from "../utils/socket.context";
import useConsumerReducer from "../router/consumer";
import { SocketConsumerModel } from "../../core/model/queries";

const testData = [
  {title:"News - 1",description:"The short text describing this is a new.",
                    content:"The incredible long long long long long text describing this is a new.",
                    date:"12/12/22",author:"Jon Doe"},
  {title:"News - 2",description:"The short text describing this is a new.",
                    content:"The incredible long long long long long text describing this is a new.",
                    date:"12/12/22",author:"Jon Doe"},
  {title:"News - 3",description:"The short text describing this is a new.",
                    content:"The incredible long long long long long text describing this is a new.",
                    date:"12/12/22",author:"Jon Doe"},
  {title:"News - 4",description:"The short text describing this is a new.",
                    content:"The incredible long long long long long text describing this is a new.",
                    date:"12/12/22",author:"Jon Doe"},
  {title:"News - 5",description:"The short text describing this is a new.",
                    content:"The incredible long long long long long text describing this is a new.",
                    date:"12/12/22",author:"Jon Doe"},
  {title:"News - 6",description:"The short text describing this is a new.",
                    content:"The incredible long long long long long text describing this is a new.",
                    date:"12/12/22",author:"Jon Doe"},
]
const Home = () => {
  const [news, setNews] = useState([]);
  const [consumerResult, consume] = useConsumerReducer();
  const {state, dispatch} = useSocket()
  const newsListener = (data) => {
    console.log(data);
    setNews(data.result)
  };
  useEffect(() => {
    const {FIND_NEW_NEWS,OFF_NEW_ARTICLE,SOCKET_CONSUMER} = SocketConsumerModel
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
                                       action={()=>console.log("Action over "+title)} 
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
