import React, {useState, useEffect} from 'react';
import './css/Applied.css';
import { myAxiosInstance } from '../../lib/axios';
import AppliedCard from './components/AppliedCard/AppliedCard';


function Applied({ currentUser }) {
  const [Applied, sethandleAppliedShow]=useState(true);
  const [Interview, sethandleInterviewShow]=useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUserApplications, setCurrentUserApplications] = useState([]);
  
  const getAppliedData = async () => {
    const response = await myAxiosInstance.get("/jobs/get_applications/");
    const jobsResponse = await myAxiosInstance.get("/jobs/get_jobs/");

    const currentUserApplications = response.data.filter(application => application.applicant === currentUser.username);
    const currentUserAppliedJobs = jobsResponse.data.filter((currentJob) => currentUserApplications.find(({ job }) => currentJob.id === job));
    setAppliedJobs(currentUserAppliedJobs);
    setCurrentUserApplications(currentUserApplications);
    return;
  }

  useEffect(() => {

    getAppliedData();

  }, [])

  const show =() => sethandleAppliedShow(!Applied) || sethandleInterviewShow(!Interview);


  return (
    <div className='wrapper'>
      <div className='containers'>
      <div className="slide-controls">
               <input type="radio" name="slide" id="applied" defaultChecked={true} />
               <input type="radio" name="slide" id="interview"/>
               <label htmlFor="applied" className="slide applied" onClick={show}>Applied ({appliedJobs.length})</label>
               <label htmlFor="interview" className="slide interview" onClick={show}>Interview ({[].length})</label>
               <div className="slider-tab"></div>
            </div>
      <div className='container__inner'>
        {
          Interview &&
          
          <div className={ Applied ? 'card__switch applied__card': 'card__switch'}>
            <div className='applied__row'>
              <div className='applied__column'>
                {
                  React.Children.toArray([].map(job => {
                    return <>
                      
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
