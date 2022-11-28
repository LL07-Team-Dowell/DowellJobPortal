import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import './AppliedScreen.css';
import Applied from '../../components/AppliedScreen/Applied';
import { useNavigationContext } from '../../../../contexts/NavigationContext';
import ViewAppliedJobScreen from '../ViewAppliedJobScreen/ViewAppliedJobScreen';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TitleNavigationBar from '../../../../components/TitleNavigationBar/TitleNavigationBar';

function AppliedScreen({ user }) {
  const { section } = useNavigationContext();
  const location = useLocation();
  const [ params, setParams ] = useSearchParams();
  const [ passedCategory, setPassedCategory ] = useState(null);
  const navigate = useNavigate();

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
      <TitleNavigationBar title={"Application Status"} handleBackBtnClick={() => navigate(-1)} />
        <Applied currentUser={user} />
      <Footer currentCategory={passedCategory && passedCategory}/>
      
      </div>
    }
    
  </>
}

export default AppliedScreen;
