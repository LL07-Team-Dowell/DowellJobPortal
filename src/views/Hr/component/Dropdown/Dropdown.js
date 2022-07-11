import React from 'react';
import './Dropdown.css';
import * as MdIcons from 'react-icons/md';
import { IconContext } from 'react-icons';


function Dropdown() {
  return (
    <div className='dropdown__container'>
        <div className='dropdown__content'>
            <div className='project__titles'>Hr Hiring</div>
            <IconContext.Provider value={{  size:'25px' }}>

            <div className='dropdown__arrow'><MdIcons.MdKeyboardArrowDown/></div>
            </IconContext.Provider>

        </div>

    </div>
  )
}

export default Dropdown