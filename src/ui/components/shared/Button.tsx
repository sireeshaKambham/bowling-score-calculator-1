// Button component

interface IButton {
    name: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<IButton> = (props) => {
    return (
        <>
        <button onClick={props.onClick} className={`button ${props.className}`}>{props.name}</button>
        </>
    )
}
export default Button;