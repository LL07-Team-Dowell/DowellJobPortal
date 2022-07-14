import React, { useEffect, useRef, useState } from 'react';
import './css/Hr_JobScreen.css';
import Search from '../component/Search/Search';
import { hrNavigationLinks } from './hrNavigationLinks';
import BottomNavigationBar from '../component/BottomNavigation/BottomNavigation';
import JobTile from '../../teamlead/components/JobTile/JobTile';
import { myAxiosInstance } from '../../../lib/axios';
import { useNavigationContext } from '../../../contexts/NavigationContext';
import NavigationBar from '../../teamlead/components/NavigationBar/NavigationBar';
import useClickOutside from '../../../hooks/useClickOutside';
import SideNavigationBar from '../../account/components/SideNavigationBar/SideNavigationBar';
import ShortlistedScreen from './ShortlistedScreen';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectedCandidates from '../../teamlead/components/SelectedCandidates/SelectedCandidates';
import { appliedCandidates } from '../candidatesData';
import SelectedCandidatesScreen from '../../teamlead/screens/SelectedCandidatesScreen/SelectedCandidatesScreen';
import ErrorPage from '../../error/ErrorPage';



function Hr_JobScreen() {
  
  const { section, sub_section, path, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
  const [jobs, setJobs] = useState([]);
  const sideNavbarRef = useRef(null);
  const [sideNavbarActive, setSideNavbarActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [jobSearchInput, setJobSearchInput] = useState("");
  
  useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

  const getApplications = async () => {
    // const response = await myAxiosInstance.get("/jobs/get_jobs/");
    await myAxiosInstance.get("/jobs/hrview/")
    const response = await myAxiosInstance.get("/jobs/get_jobs/");
    
    // return response.data;
  }

  const goToJobDetails = (jobData) => navigate("/home/job", { state: { job: jobData } });

  const goToJobApplicationDetails = (candidateData) => navigate(`/home/job/${candidateData.name}`, { state: { candidate: candidateData } });

  useEffect(() => {

    if ( (sub_section !== undefined) && (!location.state) ) return navigate("/home");

    if ( (path !== undefined) && (!location.state)) return navigate("/home");

  }, [sub_section, path])

  useEffect(() => {

    getApplications().then(res => {
      
      // setJobs(res)
    
    }).catch(err => {

      console.log(err)

    });

  }, [])

  return (
    <>
    {
      sub_section === undefined && section === "home" || section === undefined ? <>
        <div className='hr__wrapper'>
          <NavigationBar 
            title={'Jobs'} 
            className={'hr_navigation'} 
            handleMenuIconClick={() => setSideNavbarActive(true)}
          />
          <div className='search'>
            <Search seachValue={jobSearchInput} />
          </div>
          <div className='job__wrapper'>
            {
              React.Children.toArray(jobs.map(job => {
                return <>
                  <JobTile jobData={job} routeToJob={true} handleJobTileClick={goToJobDetails} />
                </>
              }))
            }
          </div>
          
        </div>
      </> :
      
      <>
        <NavigationBar
          handleMenuIconClick={() => setSideNavbarActive(true)}
          className={'hr_navigation'}
          title={section === "shortlisted" ? "Shortlisted" : ""}
          changeToBackIcon={sub_section !== undefined ? true : false}
          handleBackIconClick={() => navigate(-1)}
        />
        
        { 

          sub_section === undefined && section === "shortlisted" ? <>
            <ShortlistedScreen />
          </> :

          sub_section === undefined && section === "user" ? <></> :

          sub_section === undefined &&
          <><ErrorPage disableNav={true} /></>
        }
      
      </>
    }

    {
      path === undefined && sub_section === "job" ? 
      
      <>
      
        <div className='hr__wrapper'>
          <SelectedCandidates title={location.state.job.title} candidatesCount={appliedCandidates.length} hrPageActive={true} />

          {
            <div className='hr__Job__Tile__Container'>
              {
                React.Children.toArray(appliedCandidates.map(candidate => {
                  return <JobTile hrPageActive={true} candidateData={candidate} setShowCandidate={() => {}} handleJobTileClick={goToJobApplicationDetails} />
                }))
              }
            </div>
          }
        </div>
        
      </> : 
      
      path !== undefined && sub_section === "job" ? <>
        {
          <div className='hr__Job__Tile__Container'>
            <>
              <SelectedCandidatesScreen
                hrPageActive={true}
                selectedCandidateData={location.state.candidate}
              />
            </>
          </div>
        }
      </> :

      path !== undefined && sub_section === "after_initial_meet" ? <>
        {
          <div className='hr__Job__Tile__Container'>
            <>
              <SelectedCandidatesScreen
                hrPageActive={true}
                initialMeet={true}
                selectedCandidateData={location.state.candidate}
              />
            </>
          </div>
        }
      </> :

      <></>
    }

    {
      sideNavbarActive && 
      <SideNavigationBar 
        className={'hr_side_navigation'}
        sideNavRef={sideNavbarRef} 
        closeSideNavbar={() => setSideNavbarActive(false)}
        isNotificationEnabled={isNotificationEnabled}
        setNotificationStatus={() => setNotificationStatus(prevValue => { return !prevValue })}
      />
    }

    <BottomNavigationBar links={hrNavigationLinks} />

    </>
  )
}

export default Hr_JobScreen