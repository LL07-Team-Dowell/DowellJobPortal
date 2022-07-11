import React from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';
import Alerts from '../Alerts';

function AlertScreen() {
  return (
    <div>
        <Navbar title="Alerts"/>
        <Alerts/>
        <Footer/>
    </div>
  )
}

export default AlertScreen