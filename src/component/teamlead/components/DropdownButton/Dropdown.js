import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useRef, useState } from 'react';

import "./style.css";


const DropdownButton = ({ currentSelection, selections }) => {
    const currentSelectionRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const updateCurrentSelection = (selection) => {
        
        if (!currentSelectionRef.current) return;

        currentSelectionRef.current.innerText = selection;

    }

    return <>
        <div className="dropdown-btn" onClick={() => setShowDropdown(prevValue => { return !prevValue })}>
            <span ref={currentSelectionRef}>{ currentSelection }</span>
            <KeyboardArrowDownIcon className="down-icon" />

            {
                selections ? 
                
                <div className={`dropdown-selections ${showDropdown ? 'active' : ''}`}>
                    {React.Children.toArray(selections.map(selection => {
                        return <div className="dropdown-selection-item" onClick={ () => updateCurrentSelection(selection) } >
                            {selection}
                        </div>
                    }))}
                </div> : <></>

            }
        </div>
    </>
}

export default DropdownButton;
