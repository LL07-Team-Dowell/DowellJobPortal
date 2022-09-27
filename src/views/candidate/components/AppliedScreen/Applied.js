import React, {useState, useEffect} from 'react';
import './Applied.css';
import { myAxiosInstance } from '../../../../lib/axios';
import AppliedCard from '../AppliedCard/AppliedCard';
import { routes } from '../../../../lib/routes';
import InterviewCard from '../InterviewCard/InterviewCard';
import { mutableNewApplicationStateNames } from '../../../../contexts/NewApplicationContext';


function Applied({ currentUser }) {
  const [Applied, sethandleAppliedShow]=useState(true);
  const [Interview, sethandleInterviewShow]=useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUserApplications, setCurrentUserApplications] = useState([]);
  const [userInterviews, setUserInterviews] = useState([]);
  
  const getAppliedData = async () => {
    const response = await myAxiosInstance.get(routes.Applications);
    const jobsResponse = await myAxiosInstance.get(routes.Jobs);

    const currentUserApplications = response.data.filter(application => application.applicant === currentUser.username);
    const currentUserAppliedJobs = jobsResponse.data.filter((currentJob) => currentUserApplications.find(({ job }) => currentJob.id === job));
    setAppliedJobs(currentUserAppliedJobs);
    setCurrentUserApplications(currentUserApplications);
    return;
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

  const show =() => sethandleAppliedShow(!Applied) || sethandleInterviewShow(!Interview);


  return (
    <div className='wrapper'>
      <div className='containers'>
      <div className="slide-controls">
               <input type="radio" name="slide" id="applied" defaultChecked={true} />
               <input type="radio" name="slide" id="interview"/>
               <label htmlFor="applied" className="slide applied" onClick={show}>Applied ({appliedJobs.length})</label>
               <label htmlFor="interview" className="slide interview" onClick={show}>Interview ({userInterviews.length})</label>
               <div className="slider-tab"></div>
            </div>
      <div className='container__inner'>
        {
          Interview &&
          
          <div className={ Applied ? 'card__switch applied__card': 'card__switch'}>
            <div className='applied__row'>
              <div className='applied__column'>
                {
                  React.Children.toArray(userInterviews.map(interview => {
                    return <>
                      <InterviewCard 
                        guestUser={currentUser.role === process.env.REACT_APP_GUEST_ROLE ? true : false}
                        interviewDetails={interview} 
                        job={appliedJobs.find(appliedJob => appliedJob.id === interview.job_applied)} 
                        currentApplicationStatus={currentUserApplications.find(application => application.job === interview.job_applied).status} 
                        hrDiscordLink={currentUserApplications.find(application => application.job === interview.job_applied).others[mutableNewApplicationStateNames.hr_discord_link]}
                      />
                    </>
                  }))
                }

              </div>
            </div>
          </div>
        }

        {

          Applied && 
          <div className={ Interview ? 'card__switch interview__card': 'card__switch'}>
            <div className='applied__row'>
              <div className='applied__column'>
                {

                  React.Children.toArray(appliedJobs.map(appliedJob => {
                    return <>

                      <AppliedCard job={appliedJob} applicationDetails={currentUserApplications.find(application => application.job === appliedJob.id)} />

                    </>
                  }))
                }
              </div>  
            </div>

          </div>
        }
      </div>
      </div>
    </div>
  )
}

export default Applied;
