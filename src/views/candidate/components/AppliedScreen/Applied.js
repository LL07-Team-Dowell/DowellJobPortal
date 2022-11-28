import React, {useState, useEffect} from 'react';
import './Applied.css';
import { myAxiosInstance } from '../../../../lib/axios';
import { routes } from '../../../../lib/routes';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';
import TogglerNavMenuBar from '../../../../components/TogglerNavMenuBar/TogglerNavMenuBar';
import JobCard from '../../../../components/JobCard/JobCard';
import { candidateStatuses } from '../../utils/candidateStatuses';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../admin/components/LoadingSpinner/LoadingSpinner';


function Applied({ currentUser }) {
  const [ currentNavigationTab, setCurrentNavigationTab ] = useState("Applied");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUserApplications, setCurrentUserApplications] = useState([]);
  const [userInterviews, setUserInterviews] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const navigate = useNavigate();
  
  const getAppliedData = async () => {
    const response = await myAxiosInstance.get(routes.Applications);
    const jobsResponse = await myAxiosInstance.get(routes.Jobs);

    const currentUserApplications = response.data.filter(application => application.applicant === currentUser.username);
    const currentUserAppliedJobs = jobsResponse.data.filter((currentJob) => currentUserApplications.find(({ job }) => currentJob.id === job));
    setAppliedJobs(currentUserAppliedJobs);
    setCurrentUserApplications(currentUserApplications);
    return setLoading(false);
  }

  const getUserInterviews = async () => {
    const response = await myAxiosInstance.get(routes.Meeting);
    setUserInterviews(response.data.filter(meeting => meeting.applicant === currentUser.username));
    return
  }

  useEffect(() => {
    getAppliedData();
    getUserInterviews();
  }, [])

  return <>
    <TogglerNavMenuBar className={"applied__Nav__Toggler"} menuItems={["Applied", "Interview", "Declined"]} handleMenuItemClick={(item) => setCurrentNavigationTab(item)} currentActiveItem={currentNavigationTab} />
    <div className="candidate__View__Applications__Container">
    {
      loading ? <LoadingSpinner /> :

      currentNavigationTab === "Applied" ? <>
        {
          React.Children.toArray(appliedJobs.map(appliedJob => {
            return <JobCard 
              job={appliedJob} 
              showCandidateAppliedJob={true}
              buttonText={"View"}
              handleBtnClick={(job) => navigate("/applied/view_job_application", { state: { jobToView: job, applicationDetails: currentUserApplications.find(application => application.job === appliedJob.id) } })}
            />
          }))
        }
      </> :

      currentNavigationTab === "Interview" ? <>
        {
          React.Children.toArray(userInterviews.map(interview => {
            return <JobCard 
              job={appliedJobs.find(appliedJob => appliedJob.id === interview.job_applied)} 
              interviewDetails={interview} 
              showCandidateInterview={true}
              guestUser={currentUser.role === process.env.REACT_APP_GUEST_ROLE ? true : false}
              currentApplicationStatus={currentUserApplications.find(application => application.job === interview.job_applied).status} 
              handleBtnClick={
                () => currentUserApplications.find(application => application.job === interview.job_applied).others[mutableNewApplicationStateNames.hr_discord_link] ? 
                window.location = currentUserApplications.find(application => application.job === interview.job_applied).others[mutableNewApplicationStateNames.hr_discord_link] : 
                () => {}
              }
              buttonText={"Discord"}
            />
          }))
        }
      </> :

      currentNavigationTab === "Declined" ? <>
        {
          React.Children.toArray(appliedJobs.filter(job => job.status === candidateStatuses.REJECTED).map(appliedJob => {
            return <JobCard 
              job={appliedJob}
              applicationDetails={currentUserApplications.find(application => application.job === appliedJob.id)}
              showCandidateDeclinedJob={true}
              buttonText={"Closed"}
            />
          }))
        }
      </> : <></>
    }
    </div>
  </>
}

export default Applied;
