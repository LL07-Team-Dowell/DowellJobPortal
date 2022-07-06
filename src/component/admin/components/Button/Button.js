import "./style.css";

const Button = ({ handleClick, icon, text }) => {
    return <button className="add__Btn" type="button" onClick={handleClick}>
        {icon && <>{icon}</>}
        {text && <>{text}</>}
    </button>
}

export default Button;