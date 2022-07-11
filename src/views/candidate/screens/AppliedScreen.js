import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './css/AppliedScreen.css';
import Applied from '../Applied';

function AppliedScreen({ user }) {
  return (
    <div className='applied__screen'>
        <Navbar title="Application status"/>
        <Applied currentUser={user} />
        <Footer/>
    </div>
  )
}

export default AppliedScreen
