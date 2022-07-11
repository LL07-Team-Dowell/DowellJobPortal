import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';


function Button1() {
  return (
    <div className='button2'>
    <IconContext.Provider value={{ color: '#838383', size:'24px' }}>
        <FiIcons.FiStopCircle  />
        </IconContext.Provider>
    </div>
  )
}

export default Button1