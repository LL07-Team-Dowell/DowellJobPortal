import React, {useState, useEffect} from 'react';
import './css/Job.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { myAxiosInstance } from '../../axios';
import { requests } from '../../request';
import { useNavigate } from 'react-router-dom';
import { useAppliedJobsContext } from '../../contexts/AppliedJobsContext';
import { useNavigationContext } from '../../contexts/NavigationContext';
import { tasksData } from '../teamlead/tasks';
import JobTile from '../teamlead/components/JobTile/JobTile';



function JobScreen() {
    const [jobs, setJobs]=useState([]);
    const { appliedJobsState } = useAppliedJobsContext();
    const navigate = useNavigate();
    const { section } = useNavigationContext();
    
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
                {
                    section == undefined ? <>
                        {jobs.map(job=>(
                            <div className="column" key={job.id}>
                                <div className="card">

                                    <div className="container">
                                        <div className='row-text'>
                                            <h4><b>{job.title}</b></h4>
                                            <p className='detail dowell'>Dowell Ux living lab</p>
                                            <p className='detail skill'>Skills: {job.skills}</p>
                                            {
                                                appliedJobsState.appliedJobs.find(appliedJob => appliedJob.id === job.id ) == undefined ?
                                                <button className='apply-button' onClick={() => handleApplyButtonClick(job)}>Apply</button> :
                                                <button className='apply-button' disabled={true}>Applied</button>
                                            }
                                        
                                        </div>
                                    

                                        <div className='row-bottom'>
                                        <IconContext.Provider value={{ color: '#838383', size:'14px' }}>
                                            <ul className='job__Detail__Span_Container'>
                                                <li>
                                                    <FaIcons.FaToolbox/>
                                                    {job.time_period}
                                                </li>
                                                <li>
                                                    <span className='free'>{job.typeof}</span>
                                                </li>
                                            </ul>
                                            </IconContext.Provider>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </>: 

                    section == "task" ? <>
                        <div className="tasks-container">
                            {
                                React.Children.toArray(tasksData.map(dataitem => {
                                    return <JobTile showTask={true} taskData={dataitem} handleJobTileClick={() => {}} />
                                }))
                            }
                        </div>
                    </> : <></>

                }

                
                
            </div>
        </div>
    )
}

export default JobScreen