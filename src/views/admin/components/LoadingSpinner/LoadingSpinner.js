import "./style.css";


const LoadingSpinner = ({ color }) => {
    const customSpinnerColor = {
        borderTopColor: color ? color : "#57A639",
    }

    return <div id="loading" className="display" style={customSpinnerColor}></div>
}

export default LoadingSpinner;
