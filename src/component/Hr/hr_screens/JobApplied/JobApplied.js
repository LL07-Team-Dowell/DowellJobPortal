import React from 'react';
import './JobApplied.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import Selected from '../../component/Active/Selected/Selected';
import Active from '../../component/Active/Active';

import ArrowNavbar from '../../component/ArrowNavbar/ArrowNavbar';

function JobApplied() {
  return (
<div className='Applied__wrapper'>
        <ArrowNavbar page='/hr_screen' icon={<BsThreeDotsVertical/>}/>
        <div className='Applied__container'>
            <Selected/>
        </div>
        </div>
  )
}

export default JobApplied