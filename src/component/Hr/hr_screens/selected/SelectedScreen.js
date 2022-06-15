import React, {useState} from 'react';
import './SelectedScreen.css';
import * as BsIcons from 'react-icons/bs';
import ArrowNavbar from '../../component/ArrowNavbar/ArrowNavbar';
import ApplicantDetails from '../../component/ApplicantDetails/ApplicantDetails';
import Project from '../../component/Projects/Project';
import TextArea from '../../component/TextArea/TextArea';
import Status from '../../component/StatusButton/Status';


function SelectedScreen() {
  
  return (
    <div className='selected__container'>
      <ArrowNavbar page='/hr_applied' icon={<BsIcons.BsThreeDotsVertical/>}/>
      <div className='selected__wrapper'>
      <ApplicantDetails/>
      </div>
      <div className='divider'></div>
      <div className='bottom__container'>
        <div className='selected__wrappers'>
          <Project/>
          <div className='remark__section'>
            <TextArea show_discord={false}/>
            <TextArea show_discord={true} />
          </div>
          <div className='status__section'>
            <Status/>

          </div>
        </div>

      </div>

      
    </div>
  )
}

export default SelectedScreen