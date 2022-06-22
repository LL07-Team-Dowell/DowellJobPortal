import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../component/Hr_Navbar';
import Footer from '../component/Hr_footer/Hr_Footer';
import './css/Hr_JobScreen.css';
import JobCards from '../component/JobCards/JobCards';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as ImIcons from 'react-icons/im';
import { IconContext } from 'react-icons';
import * as BsIcons from 'react-icons/bs';
import Search from '../component/Search/Search';
import { hrNavigationLinks } from './hrNavigationLinks';
import BottomNavigationBar from '../component/BottomNavigation/BottomNavigation';
import JobTile from '../../teamlead/components/JobTile/JobTile';
import { myAxiosInstance } from '../../../axios';
import { loginUser } from '../../candidate/temporary/loginUser';
import { useNavigationContext } from '../../../contexts/NavigationContext';
import NavigationBar from '../../teamlead/components/NavigationBar/NavigationBar';
import useClickOutside from '../../account/hooks/useClickOutside';
import SideNavigationBar from '../../account/components/SideNavigationBar/SideNavigationBar';
import Hr_AppliedScreen from './Hr_AppliedScreen';
import ShortlistedScreen from './ShortlistedScreen';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectedCandidates from '../../teamlead/components/SelectedCandidates/SelectedCandidates';
import { appliedCandidates } from '../candidatesData';
import SelectedCandidatesScreen from '../../teamlead/screens/SelectedCandidatesScreen/SelectedCandidatesScreen';



function Hr_JobScreen() {
  
  const [currentCandidate, setCurrentCandidate] = useState({});
  const { section, sub_section, path, isNotificationEnabled, setNotificationStatus } = useNavigationContext();
  const [jobs, setJobs] = useState([]);
  const sideNavbarRef = useRef(null);
  const [sideNavbarActive, setSideNavbarActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useClickOutside(sideNavbarRef, () => setSideNavbarActive(false));

  const getApplications = async () => {
    const response = await myAxiosInstance.get("/jobs/get_jobs/");
    return response.data;
  }

  const goToJobDetails = (jobData) => navigate("/hr_screen/home/job", { state: { job: jobData } });

  const goToJobApplicationDetails = (candidateData) => navigate(`/hr_screen/home/job/${candidateData.name}`, { state: { candidate: candidateData } });

  useEffect(() => {

    if ( (sub_section !== undefined) && (!location.state) ) return navigate("/hr_screen/home");

    if ( (path !== undefined) && (!location.state)) return navigate("/hr_screen/home");

  }, [sub_section, path])

  useEffect(() => {
    loginUser();

    getApplications().then(res => {
      
      setJobs(res)
    
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
            <Search/>
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
          title={section === "after_initial_meet" ? "After Initial Meeting" : ""}
          hrPageActive={sub_section !== undefined ? true : false}
          handleBackIconClick={() => navigate(-1)}
        />
        
        { 
          sub_section === undefined && section === "applied" ? <>
            <Hr_AppliedScreen />
          </> : 
          
          sub_section === undefined && section === "after_initial_meet" ? <>
            <ShortlistedScreen />
          </> :

          sub_section === undefined && section === "user" ? <></> :

          <></>
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

    <BottomNavigationBar currentPage={'hr_screen'} links={hrNavigationLinks} />

    </>
  )
}

export default Hr_JobScreen