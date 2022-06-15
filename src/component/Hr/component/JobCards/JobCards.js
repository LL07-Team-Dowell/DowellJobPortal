import React from 'react';
import './JobCards.css';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as ImIcons from 'react-icons/im';
import { IconContext } from 'react-icons';
import * as BsIcons from 'react-icons/bs';
import JobApplied from '../../hr_screens/JobApplied/JobApplied';
import { useNavigate } from 'react-router-dom';


function JobCards() {
    const navigate=useNavigate();

    function handleClick(){
        navigate("/id") 
    };
  return (
 
    <div className='column' onClick={handleClick}>
    <div className='job__card'>
        <div className='job__container'>
        <div className='row-texts'>
                <h4><b>Python Programmer</b></h4>
                <p className='details skills'>Skills: Python</p>
                <IconContext.Provider value={{ color: '#838383', size:'14px' }}>
                <div className='mid__section'>
                    <div className='experience'>
                    <FaIcons.FaToolbox/>
                    <span>0-1yr </span>
                    </div>
                    <div className='location'>
                    <FiIcons.FiMapPin/><span>Romote </span>
                    </div>
                </div>
                </IconContext.Provider>                            

            </div>
            <div className='bottom__section'>
                <div className='applied_candidate'>
                    <p>20 candidate applied for the role</p>
                </div>
                <div className='view__section'>
                    <span>View</span>
                    <IconContext.Provider value={{ color: '#000000', size:'17px' }}>
                    <ImIcons.ImArrowRight2/>
                    </IconContext.Provider>                            

              
                </div>
          
                
            </div>
        </div>
    </div>
</div>
  )
}

export default JobCards