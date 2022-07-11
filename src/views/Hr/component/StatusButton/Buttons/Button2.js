import React from 'react';
import * as BiIcons from 'react-icons/bi';
import { IconContext } from 'react-icons';


function Button2() {
  return (
    <div className='button2'>
    <IconContext.Provider value={{ color: '#838383', size:'18px' }}>
        <BiIcons.BiStopCircle/>
        </IconContext.Provider>
    </div>
  )
}

export default Button2