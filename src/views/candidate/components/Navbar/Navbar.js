import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { BiArrowBack } from 'react-icons/bi';
import { BsBookmark, BsShare } from 'react-icons/bs';
import SideNavigationBar from '../../../account/components/SideNavigationBar/SideNavigationBar';
import { useRef } from 'react';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import { dowellLoginUrl } from '../../../../lib/axios';


function Navbar({ title, changeToBackButton, backButtonLink, disableSideBar, handleShareJobBtnClick, removeShareOptions }) {
  const [sidebar, setSidebar] = useState(false);
  const [show, handleShow]=useState(false);
  const { isNotificationEnabled, setNotificationStatus } = useNavigationContext();
  
  const sideNavbarRef = useRef(null);
  

  const showSidebar = () => setSidebar(!sidebar);
  const transistionNavBar=()=>{
    if (window.scrollY > 100){
      handleShow(true);
    }else{
      handleShow(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", transistionNavBar)
  
    return () => {
      window.removeEventListener("scroll", transistionNavBar)
    }
  }, [])

  return (
   
      <IconContext.Provider value={{ color: '#000000', size:'22px' }}>
        <div className={`navbar nav__green`}>
          {
            changeToBackButton ? <>
              <Link to={backButtonLink} className='menu-bars'>
                <BiArrowBack className='white-color' />
              </Link>
              
              {
                !removeShareOptions &&
                <div className='mini__Nav__Links__Container'>
                  <Link to={'#'} >
                    <BsBookmark className='white-color' />
                  </Link>

                  <Link to={'#'} onClick={handleShareJobBtnClick}>
                    <BsShare className='white-color' />
                  </Link>
                </div>
              }
              
            </> : 
            
            <>
              <Link to='#' className='menu-bars'>
                <FaBars className='icons white-color' onClick={disableSideBar ? () => {} : () => showSidebar()}  />
              </Link>
            </>
          }
          
          <h3 className='page__title'>{title}</h3>
          {disableSideBar && <a href={dowellLoginUrl} className="login__Btn__Link" rel='noopener' aria-label='continue to login with dowell function'>Login</a>}
        </div>
        
        {
          sidebar && 
          <SideNavigationBar
            className={'candidate__SideNav'}
            isNotificationEnabled={isNotificationEnabled}
            setNotificationStatus={() => setNotificationStatus(prevValue => { return !prevValue })}
            sideNavRef={sideNavbarRef}
            closeSideNavbar={() => showSidebar(false)}
          />
        }
        
      </IconContext.Provider>
  
  );
}

export default Navbar;