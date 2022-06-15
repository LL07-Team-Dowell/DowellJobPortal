import React from 'react';
import Navbar from '../component/Hr_Navbar';
import Footer from '../component/Hr_footer/Hr_Footer';
import './css/Hr_JobScreen.css';
import JobCards from '../component/JobCards/JobCards';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as ImIcons from 'react-icons/im';
import { IconContext } from 'react-icons';
import * as BsIcons from 'react-icons/bs';
import Search from '../component/Search/Search';



function Hr_JobScreen() {
   
  return (
    <div className='hr__wrapper'>
        <Navbar title='Jobs' icon={<BsIcons.BsBell/>}/>
        <div className='search'>
        <Search/>
        </div>
        <div className='job__wrapper'>
            <div className='row'>
                

                <JobCards />

                <JobCards/>

                <JobCards/>

                <JobCards/>

                <JobCards/>
                
               

            </div>
        </div>
        <Footer/>

    </div>
  )
}

export default Hr_JobScreen