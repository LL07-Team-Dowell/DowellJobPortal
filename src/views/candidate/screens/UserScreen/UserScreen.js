import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { PageUnderConstruction } from '../../../under_construction/ConstructionPage';


function UserScreen() {
  return (
    <div>
      <Navbar title="User"/>
      <PageUnderConstruction />
      <Footer/>
    </div>
  )
}

export default UserScreen