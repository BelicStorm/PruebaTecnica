import HeaderComponent from "../header";

const defaultMenu = [
    {label:'New News',icon:'pi pi-fw pi-file'},
    {label:'Archived News',icon:'pi pi-fw pi-file'}
]

const Layout = ({children}) => {
    return <>
        <HeaderComponent items={defaultMenu}/>
        {children}
    </>
}

export default Layout