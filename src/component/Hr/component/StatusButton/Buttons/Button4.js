import React from 'react';
import * as BiIcons from 'react-icons/bi';
import { IconContext } from 'react-icons';


function Button4() {
  return (
    <div className='button3'>
    <IconContext.Provider value={{ color: '#FC3939', size:'24px' }}>
        <BiIcons.BiStopCircle  />
        </IconContext.Provider>
    </div>
  )
}

export default Button4