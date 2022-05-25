import { Card } from 'primereact/card';

const CardComponent = ({footer, content, title, subTitle}) =>{
    const cardfooter = footer

    return <Card style={{ margin: '4em 0em 0em 0em', "width":"75%",
    "boxShadow": "blue 0px 0px 0px 2px inset, rgb(255 255 255) 10px -10px 0px -3px, rgb(31 193 27) 10px -10px, rgb(255 255 255) 20px -20px 0px -3px, rgb(255 217 19) 20px -20px, rgb(255 255 255) 30px -30px 0px -3px, rgb(255 156 85) 30px -30px, rgb(255 255 255) 40px -40px 0px -3px, rgb(255 85 85) 40px -40px"
    }} title={title} subTitle={subTitle} footer={cardfooter}>
                {content}
            </Card>
}

export default CardComponent