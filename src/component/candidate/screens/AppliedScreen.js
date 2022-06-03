import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './css/AppliedScreen.css';
import Applied from '../Applied';

function AppliedScreen() {
  return (
    <div className='applied__screen'>
        <Navbar title="Application status"/>
        <Applied/>
        <Footer/>
    </div>
  )
}

export default AppliedScreen
