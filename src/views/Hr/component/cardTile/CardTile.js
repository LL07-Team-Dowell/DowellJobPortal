import React from 'react';
import './CardTile.css';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import { IconContext } from 'react-icons';




function CardTile({applicant_name, experience, applied_date, skills}) {
  return (
    <div className='CardTile__column'>
    <div className='CardTile__container'>
        <div className='candidate__details'>
            <h2>{applicant_name}</h2>
            <p>{applied_date}</p>
        </div>
        <p>Skills:{skills}</p>
        <div className='experience__container'>

            <div className='experience__count'>
            <IconContext.Provider value={{ color: '#838383', size:'18px' }}>

            <FaIcons.FaToolbox/>
            </IconContext.Provider>

            <span>0-{experience}Yr</span>
            </div>
            <div className='viewAll__details'>
                <span> View</span>
                <IconContext.Provider value={{ color: '#000', size:'18px' }}>

                <ImIcons.ImArrowRight2/>
                </IconContext.Provider>

            </div>
        </div>
    </div>
    </div>
  )
}

export default CardTile