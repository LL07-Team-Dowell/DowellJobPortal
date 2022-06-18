import React, {useState, useEffect} from 'react';
import './css/Job.css';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { axiosInstance, myAxiosInstance } from '../../axios';
import requests from '../../request';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './temporary/loginUser';
import { useAppliedJobsContext } from '../../contexts/AppliedJobsContext';



function JobScreen() {
    const [jobs, setJobs]=useState([]);
    const { appliedJobsState } = useAppliedJobsContext();
    const navigate = useNavigate();

    useEffect(() => {
        loginUser();
    }, [])
    
    useEffect(() => {
      async function fetchData(){
        //   const getJobs=;
          const request = await myAxiosInstance.get(requests.Jobs);
          setJobs(request.data);
          console.log(request)
          return request
      }
      fetchData();
    
    }, []);

    const handleApplyButtonClick = (currentJob) => {
        navigate("/apply/job", { state: { jobToApplyTo: currentJob } })
    }
    
    return (
        <div className='container-wrapper'>
    
            <div className="row">

                {jobs.map(job=>(
                    <div className="column" key={job.id}>
                        <div className="card">

                            <div className="container">
                                <div className='row-text'>
                                    <h4><b>{job.title}</b></h4>
                                    <p className='detail dowell'>Dowell Ux living lab</p>
                                    <p className='detail skill'>Skills: {job.skills.split(",").length > 1 ? job.skills.split(",")[0] + ", ..." : job.skills}</p>
                                    {
                                        appliedJobsState.appliedJobs.find(appliedJob => appliedJob.id === job.id ) == undefined ?
                                        <button className='apply-button' onClick={() => handleApplyButtonClick(job)}>Apply</button> :
                                        <button className='apply-button' disabled={true}>Applied</button>
                                    }
                                
                                </div>
                            

                                <div className='row-bottom'>
                                <IconContext.Provider value={{ color: '#838383', size:'14px' }}>
                                    <ul>
                                        <li>
                                            <FaIcons.FaToolbox/>
                                            0-1 Yr
                                        </li>
                                        <li>
                                            <span className='free'>Freelance</span>
                                        </li>
                                    </ul>
                                    </IconContext.Provider>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default JobScreen