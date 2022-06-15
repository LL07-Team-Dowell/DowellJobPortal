import React from 'react';
import Navbar from '../component/Hr_Navbar';
import Footer from '../component/Hr_footer/Hr_Footer';
import * as BsIcons from 'react-icons/bs';

import './css/Hr_AppliedScreen.css';
import NavigationList from '../component/NavigationList/NavigationList';
import Active from '../component/Active/Active';
import Shorlisted from '../component/Active/Shortlisted/Shorlisted';
import Selected from '../component/Active/Selected/Selected';
import Interview from '../component/Active/Interview/Interview';

function ShortlistedScreen() {
 

  return (
    <div className='Applied__wrapper'>
        <Navbar icon={<BsIcons.BsThreeDotsVertical/>}/>
        <div className='Applied__container'>
            <Shorlisted/>
        </div>
        

        <Footer
              
       

        />

    </div>
  )
}

export default ShortlistedScreen