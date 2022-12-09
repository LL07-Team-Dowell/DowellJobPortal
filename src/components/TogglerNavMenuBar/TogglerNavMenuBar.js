import React from "react";
import "./style.css";

const TogglerNavMenuBar = ({ menuItems, className, handleMenuItemClick, currentActiveItem }) => {
    if (!menuItems || !Array.isArray(menuItems)) return <></>

    return <div className={`toggler_Nav_Container ${className ? className : ''}`}>
        {
            React.Children.toArray(menuItems.map(item => {
                return <div className={`toggler_Nav_Item ${currentActiveItem === item ? 'active' : ''}`} onClick={handleMenuItemClick ? () => handleMenuItemClick(item) : () => {}}>
                    <span>{item}</span>
                </div>
            }))
        }
    </div>
}

export default TogglerNavMenuBar;