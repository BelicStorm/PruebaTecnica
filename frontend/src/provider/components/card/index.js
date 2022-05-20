import { Card } from 'primereact/card';

const CardComponent = ({footer, content, title, subTitle}) =>{
    const cardfooter = footer

    return <Card style={{ margin: '2em' }} title={title} subTitle={subTitle} footer={cardfooter}>
                {content}
            </Card>
}

export default CardComponent