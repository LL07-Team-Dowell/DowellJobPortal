import React from 'react';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './ArrowNavbar.css';
import { useNavigate } from 'react-router-dom';



function ArrowNavbar({page, icon}) {

  return (
        <div className='secondNavbar__body'>
            <div className='secondNavbar__icon'>
            <Link to={page} className='arrow__icon'>
            <BsIcons.BsArrowLeft className='icons'  />
          </Link>
            </div>
            <div className='icon'>    {icon}</div>


        </div>
  )
}

export default ArrowNavbar