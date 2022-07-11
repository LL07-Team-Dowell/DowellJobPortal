import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import User from '../User';


function UserScreen() {
  return (
    <div>
        <Navbar title="User"/>
        <User/>
        <Footer/>
    </div>
  )
}

export default UserScreen