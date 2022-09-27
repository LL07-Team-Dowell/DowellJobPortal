import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './AppliedScreen.css';
import Applied from '../../components/AppliedScreen/Applied';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import ViewAppliedJobScreen from '../ViewAppliedJobScreen/ViewAppliedJobScreen';
import { useLocation, useSearchParams } from 'react-router-dom';

function AppliedScreen({ user }) {
  const { section } = useNavigationContext();
  const location = useLocation();
  const [ params, setParams ] = useSearchParams();
  const [ passedCategory, setPassedCategory ] = useState(null);

  useEffect(() => {
    const jobCategoryParam = params.get("jobCategory");

    if (!jobCategoryParam) return;

    setPassedCategory(jobCategoryParam);

  }, [params])

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
      <Footer currentCategory={passedCategory && passedCategory}/>
      
      </div>
    }
    
  </>
}

export default AppliedScreen;
