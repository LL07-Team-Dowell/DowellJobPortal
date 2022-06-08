import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NavigationItemSelection = ({ items }) => {
    const itemSelectionRef = useRef(null);

    const handleClick = (currentItem) => {
        console.log(currentItem)
    }
    
    return <>
        <div className="item-selection-container">
            {
                items ? React.Children.toArray(items.map((item, index) => {
                    return <>
                    <div className={`item-selection-${index + 1}`} ref={itemSelectionRef} onClick={() => handleClick(itemSelectionRef)}>
                        <Link to={`?tab=${item.toLocaleLowerCase()}`}><span>{ item }</span></Link>
                        <span className="item-selection-indicator"></span>
                    </div>
                    
                    </>
                })): <></>
            }
        </div>
    </>
}

export default NavigationItemSelection;
