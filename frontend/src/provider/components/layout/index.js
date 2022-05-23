import HeaderComponent from "../header";

const defaultMenu = [
    {label:'New News',icon:'pi pi-fw pi-file', url:"/"},
    {label:'Archived News',icon:'pi pi-fw pi-file', url:"/archived"}
]

const Layout = ({children}) => {
    return <>
        <HeaderComponent items={defaultMenu}/>
        {children}
    </>
}

export default Layout