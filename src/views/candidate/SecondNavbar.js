import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './css/SecondNavbar.css';



function SecondNavbar({page}) {

  return (
        <div className='secondNavbar__body'>
            <div className='secondNavbar__icon'>
            <Link to={page} className='arrow__icon'>
            <BsArrowLeft className='icons'  />
          </Link>

            </div>

        </div>
  )
}

export default SecondNavbar