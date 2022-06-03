import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { SidebarData } from './Hr_SidebarData';
import './css/Hr_Navbar.css';
import { IconContext } from 'react-icons';
// import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const theme = createTheme({
    palette: {
   
      secondary: {
        // This is green.A700 as hex.
        main: '#C4C4C4',
      },
    },

  });
  const useStyles = makeStyles((theme)=>({
      button:{
          
      }
  }))
  


function Navbar( {title}) {
  const [sidebar, setSidebar] = useState(false);
  const [show, handleShow]=useState(false);
  const navigate=useNavigate();
  

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
  
  const classes=useStyles();
  

  return (
   
      <IconContext.Provider value={{ color: '#000000', size:'22px' }}>
        <div className={`navbar ${show && "nav__grey"}`}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars className='icons' onClick={showSidebar}  />

          </Link>
          <h3 className='page__title'>{title}</h3>
          <div className='bell'>    <BsIcons.BsBell/></div>
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
              
                </li>
                
              );
            })}
           
           <button onClick={()=>navigate('/logout')}
							className='logout-button'>Logout</button>
          </ul>
          
        </nav>
        
      </IconContext.Provider>
  
  );
}

export default Navbar;