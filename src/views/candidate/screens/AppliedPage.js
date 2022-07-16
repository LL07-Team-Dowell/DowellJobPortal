import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './css/AppliedScreen.css';
import Applied from '../Applied';
import { useNavigationContext } from '../../../contexts/NavigationContext';
import ViewAppliedJobScreen from './ViewAppliedJobScreen/ViewAppliedJobScreen';
import { useLocation } from 'react-router-dom';

function AppliedPage({ user }) {
  const { section } = useNavigationContext();
  const location = useLocation();

  return <>
    
    {
      section === "view_job_application" && <>
        <ViewAppliedJobScreen job={location.state ? location.state.jobToView : {}} applicationDetails={location.state ? location.state.applicationDetails : {}} />
      </>
    }
    {
      section === undefined && <div className='applied__screen'>
      
      <Navbar title="Application status"/>
        <Applied currentUser={user} />
      <Footer/>
      
      </div>
    }
    
  </>
}

export default AppliedPage;
