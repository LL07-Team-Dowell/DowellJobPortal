import "./style.css";

const Button = ({ handleClick, icon, text, isDisabled }) => {
    return <button className="add__Btn" type="button" onClick={handleClick} disabled={isDisabled}>
        {icon && <>{icon}</>}
        {text && <>{text}</>}
    </button>
}

export default Button;