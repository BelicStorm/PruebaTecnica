import { TabMenu } from 'primereact/tabmenu';

const HeaderComponent = ({items}) =>{
    let indexOfMenu = items.map(object => object.url).indexOf(window.location.pathname);
    console.log(indexOfMenu);
    return <TabMenu model={items} activeIndex={indexOfMenu} />
}

export default HeaderComponent