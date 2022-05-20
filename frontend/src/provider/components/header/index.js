import { Menubar } from 'primereact/menubar';

const HeaderComponent = ({items}) =>{
    return <Menubar
            model={items}
        />
}

export default HeaderComponent