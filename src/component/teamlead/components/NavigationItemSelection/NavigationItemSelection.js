import "./style.css";

const NavigationItemSelection = () => {

    const handleClick = (e) => {
        console.log(e.target)
    }
    
    return <>
        <div className="item-selection-container">
            <div className="item-selection-1" onClick={(e) => handleClick(e)}>
                <span>Interview</span>
                <span className="item-selection-indicator"></span>
            </div>
            <div className="item-selection-2" onClick={(e) => handleClick(e)}>
                <span>Selected</span>
                <span className="item-selection-indicator"></span>
            </div>
            <div className="item-selection-3" onClick={(e) => handleClick(e)}>
                <span>Rehire</span>
                <span className="item-selection-indicator"></span>
            </div>
        </div>
    </>
}

export default NavigationItemSelection;
