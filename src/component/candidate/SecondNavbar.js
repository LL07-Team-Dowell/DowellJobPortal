import React from 'react';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './css/SecondNavbar.css';
import { useNavigate } from 'react-router-dom';



function SecondNavbar() {
  const navigate= useNavigate();

  return (
        <div className='secondNavbar__body'>
            <div className='secondNavbar__icon'>
            <Link to='/home' className='arrow__icon'>
            <BsIcons.BsArrowLeft className='icons'  />
          </Link>

            </div>

        </div>
  )
}

export default SecondNavbar