import React, {useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import './NavigationList.css';
import Active from '../Active/Active';
import Shorlisted from '../Active/Shortlisted/Shorlisted';
import Selected from '../Active/Selected/Selected';
import Interview from '../Active/Interview/Interview';



function NavigationList({items}) {
    const [activeTab, setActiveTab] = useState(false);

  






  return (
      <>
    <div className='navigation__container'>
        {
            items ? React.Children.toArray(items.map((item, index)=>{
                return<>
                    <div  className={ activeTab ? 'select__item active' : 'select__item' } >
                    <Link  to='#'><span >{ item }</span></Link>
                        <span className="select__indicator"></span>
                    </div>
                    

                </>
            })):<></>
        }
    </div>
    <div><Active /></div>
    

    </>

  )
}

export default NavigationList