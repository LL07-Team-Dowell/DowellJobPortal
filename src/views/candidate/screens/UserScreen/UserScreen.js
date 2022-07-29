import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { PageUnderConstruction } from '../../../under_construction/ConstructionPage';
import BottomNavigationBar from '../../../Hr/component/BottomNavigation/BottomNavigation';
import { afterSelectionLinks } from '../../utils/afterSelectionLinks';


function UserScreen({ afterSelection }) {
  return (
    <div>
      <Navbar title="User"/>
      <PageUnderConstruction />
      { afterSelection ? <BottomNavigationBar links={afterSelectionLinks} /> : <Footer/> }
    </div>
  )
}

export default UserScreen