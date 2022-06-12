import React from 'react';
import './AppliedHeader.css';
import FilterIcon from '../FilterIcon/FilterIcon';

function AppliedHeader({title, sub_title}) {
  return (
    <>
    <section className='appliedheader__container'>
        <div className='appliedheader__counter'>
            <h2>{title}</h2>
            <p> {sub_title}</p>
        </div>
        <div className='appliedheader__sort'>
            <FilterIcon/>
            <p>Sort</p>
        </div>
    </section>
    </>
  )
}

export default AppliedHeader