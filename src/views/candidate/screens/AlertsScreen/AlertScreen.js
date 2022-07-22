import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Alerts from '../../components/Alerts/Alerts';
import { PageUnderConstruction } from '../../../under_construction/ConstructionPage';

function AlertScreen() {
  return (
    <div>
        <Navbar title="Alerts"/>
        <PageUnderConstruction />
        <Footer/>
    </div>
  )
}

export default AlertScreen