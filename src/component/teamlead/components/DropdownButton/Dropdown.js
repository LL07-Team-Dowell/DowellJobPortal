import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useRef, useState } from 'react';
import useClickOutside from '../../../account/hooks/useClickOutside';

import "./style.css";


const DropdownButton = ({ currentSelection, selections, adminPageActive }) => {
    const currentSelectionRef = useRef(null);
    const selectionsRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useClickOutside(selectionsRef, () => setShowDropdown(false));
    
    const updateCurrentSelection = (selection) => {
        
        if (!currentSelectionRef.current) return;

        currentSelectionRef.current.innerText = selection;

    }

    return <>
        <div className={`dropdown-btn ${adminPageActive ? currentSelectionRef.current ? currentSelectionRef.current.innerText.toLocaleLowerCase() === 'active' ? 'green__Color abs__Pos' : 'orange__Color abs__Pos' : 'abs__Pos' : ''}`} onClick={() => setShowDropdown(prevValue => { return !prevValue })}>
            <span ref={currentSelectionRef}>{ currentSelection }</span>
            <KeyboardArrowDownIcon className="down-icon" />

            {
                selections ? 
                
                <div className={`dropdown-selections ${showDropdown ? 'active_' : ''}`} ref={selectionsRef}>
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
