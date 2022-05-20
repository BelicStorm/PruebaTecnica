import CardComponent from "../components/card";
import ButtonComponent from "../components/button";

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
  const transformHomeContent = () =>{
    let to_return = []
    to_return = testData.map((newsElement)=>{
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
      { transformHomeContent()}
  </div>
};

export default Home;
