import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Project.css';

function Project() {
  return (
    <div className='project__container'>
        <div className='project__label'>Project </div>
        <div className='dropdown__menu'><Dropdown/></div>
    </div>
  )
}

export default Project