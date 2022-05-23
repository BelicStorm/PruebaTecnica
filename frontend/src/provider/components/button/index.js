import { Button } from 'primereact/button';

const ButtonComponent = ({label,icon,buttonStyle,action,isLoading}) =>{
    const styles = {
        primary:"",
        secondary:"p-button-secondary"
    }
    const args = {
        label: label,
        className: styles[buttonStyle],
        loading:isLoading,
        icon:icon,
        loadingIcon: isLoading ? "pi pi-spin pi-sun"  : "",
        onClick:action

    }
    return <Button {...args} />
}

export default ButtonComponent
